import React, { Component } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import InputField from '../../reusable/InputField';
import DeliveryCustomerDetailForm from './DeliveryCustomerDetailForm';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { API_URL } from '../../../config';
import { getClientAuthToken } from '../../../helpers/auth';
import Breadcrumb from '../../reusable/Breadcrumb';

// just testing deployment
class Billing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			billingFormIsDisplayed: false,
			billingAndShippingSame: true,
			shippingCustomerDetails: {},
			billingCustomerDetails: {},
			retrieveCustomerDetails: false,
			buttonStatus: 'initial',
			displayToTopButton: false,
            scrollPosition: 0,
		};
		this.renderCustomerDetailForm = this.renderCustomerDetailForm.bind(this);
		this.handleBillingAddressDisplay = this.handleBillingAddressDisplay.bind(this);
		this.getSubmittedValues = this.getSubmittedValues.bind(this);
		this.getCustomerDetailsToSubmit = this.getCustomerDetailsToSubmit.bind(this);
		this.createSubmittableDataTemplate = this.createSubmittableDataTemplate.bind(this);
		this.saveCustomerDetailsInfo = this.saveCustomerDetailsInfo.bind(this);
		this.renderSubmitButton = this.renderSubmitButton.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
        this.checkScroll = this.checkScroll.bind(this);
		this.handleScrollToTop = this.handleScrollToTop.bind(this);
		this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
	}

	componentDidMount () {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillReceiveProps(nextProps) {
		const { triggerUpdateOfCustomerDeliveryAddress } = nextProps;
		if (triggerUpdateOfCustomerDeliveryAddress) {
			this.getCustomerDetailsToSubmit();
		}
	}

	handleScroll(event){
        this.setState({
            scrollPosition: window.pageYOffset
        }, () => this.checkScroll())
    }
    checkScroll(){
        if (this.state.scrollPosition > 500) {
            this.setState({
                displayToTopButton: true,
            })
        }
        else {
            this.setState ({ 
                displayToTopButton: false,
            })
        }
    }
    
    handleScrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
   	}

	renderBreadCrumbs() {
		const { showBreadCrumbs } = this.props;
		if (showBreadCrumbs) {
			return (
				<Breadcrumb>
					<a href="/" className="breadcrumb-link">Home</a>
						<span> / </span>
					<a href="/checkout/account" className="breadcrumb-link">Checkout</a>
						<span> / </span>
					<a href="#" className="breadcrumb-current">Addresses</a>
				</Breadcrumb>
			);
		}
		return null;
	}

	getCustomerDetailsToSubmit() {
		this.setState({
			retrieveCustomerDetails: true
		}, () => {

			const IntervalRetrieval = setInterval(() => {
				const { 
					shippingCustomerDetails, 
					billingCustomerDetails,
					billingAndShippingSame
				} = this.state;
				const dataRetrieved = billingAndShippingSame ? (!isObjectEmpty(shippingCustomerDetails)) : (!isObjectEmpty(shippingCustomerDetails) && !isObjectEmpty(billingCustomerDetails))
				if (dataRetrieved) {
					// data has been retrieved
					clearInterval(IntervalRetrieval);
					this.saveCustomerDetailsInfo();
					this.handleScrollToTop();

				}
			}, 300);
		});
	}

	saveCustomerDetailsInfo() {
		const { 
			shippingCustomerDetails, 
			billingCustomerDetails,
			billingAndShippingSame,
			buttonStatus
		} = this.state;

		const data = {
			shipping: this.createSubmittableDataTemplate(shippingCustomerDetails)
		};

		data.same_billing = billingAndShippingSame ? 1 : 0;

		if (!billingAndShippingSame) {
			data.billing = this.createSubmittableDataTemplate(billingCustomerDetails);
		}

		if (buttonStatus === 'initial') {
			this.setState({
				buttonStatus: 'submitting'
			}, () => {
				const token = getClientAuthToken();

				fetch(`${API_URL}/customers/addresses`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(data)
				}).then(async (res) => {
					try {
						const response = await res.json();
						this.handleResponse(response);
						
					} catch (err) {
						console.log('error');
						console.log(err);
					}
				});
			});
		}	
	}

	handleResponse(response) {
		Router.push('/checkout?page=delivery', '/checkout/delivery');
	}

	createSubmittableDataTemplate(customerDetails) {
		const StateData = customerDetails.state.split(',');
		const data =  {
			first_name: customerDetails.firstName,
			last_name: customerDetails.lastName,
			phone: customerDetails.phone,
			state: StateData[0] === 'kigali_province' ? '02' : StateData[0],
			city: customerDetails.city,
			country: customerDetails.country,
			email: customerDetails.email,
			address1: customerDetails.streetNumber,
			address2: customerDetails.houseNumber
		};

		if (customerDetails.address_type) {
			data.address_type = customerDetails.address_type;
		}

		return data;
	}

	renderSubmitButton() {
		const { buttonStatus } = this.state;
		const buttonText  = buttonStatus === 'initial' ? 'Continue' : 'Saving';
		const buttonClass = buttonStatus === 'initial' ? 'auth-button continue-check' : 'auth-button is-submitting';

		return (
			<div className='shipping-btn'>
				<button 
				className={buttonClass}
				onClick={this.getCustomerDetailsToSubmit}
				>
				{buttonText}
				</button>
			</div>
		);
	}

	renderCustomerDetailForm() {
		const { billingAndShippingSame, retrieveCustomerDetails } = this.state;
		const { customerAddressData } = this.props;
		if (billingAndShippingSame) {
			return (
				<div className='account-info-wrapper'>
					{this.renderBreadCrumbs()}
					<DeliveryCustomerDetailForm 
					formTitle='Shipping address'
					formType='shipping'
					submitForm={false}
					customerAddressData={customerAddressData}
					getSubmittedValues={this.getSubmittedValues}
					provideCustomerDetails={retrieveCustomerDetails}
					/>
					<div className="same-bil-ship__checkbox">
						<InputField 
							typeOfInput='checkbox'
							type='checkbox'
							name='billingAndShippingSame'
							fieldText='Billing and shipping address are the same'
							updateInputFieldValue={this.handleBillingAddressDisplay}
							defaultInputValue={billingAndShippingSame}
						/>
					</div>
					{this.renderSubmitButton()}
				</div>
			);
		}

		return (
			<div className='account-info-wrapper'>
				{this.renderBreadCrumbs()}
				<DeliveryCustomerDetailForm 
					formTitle='Shipping address'
					formType='shipping'
					submitForm={false}
					customerAddressData={customerAddressData}
					getSubmittedValues={this.getSubmittedValues}
					provideCustomerDetails={retrieveCustomerDetails}
				/>
				<InputField 
					typeOfInput='checkbox'
					type='checkbox'
					name='billingAndShippingSame'
					fieldText='Billing and shipping address are the same'
					updateInputFieldValue={this.handleBillingAddressDisplay}
				/>
				<DeliveryCustomerDetailForm 
					formTitle='Billing address'
					formType='billing'
					submitForm={false}
					getSubmittedValues={this.getSubmittedValues}
					provideCustomerDetails={retrieveCustomerDetails}
					customerAddressData={customerAddressData}
				/>
				{this.renderSubmitButton()}
			</div>
		);
	}
	handleBillingAddressDisplay(fieldStateName, newValue) {
		this.setState({
			[fieldStateName]: newValue
		});
	}

	getSubmittedValues(data, callback) {
		if (data.shipping) {
			this.setState({
				shippingCustomerDetails: data.shipping
			}, () => {
				callback();
			});
			return;
		}

		if (data.billing) {
			this.setState({
				billingCustomerDetails: data.billing
			},
			() => {
				callback();
			});
			return;
		}
	}

	render() {
		return this.renderCustomerDetailForm();
	}
}

export default Billing;