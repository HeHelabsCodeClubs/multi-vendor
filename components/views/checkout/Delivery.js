import React, { Component } from 'react';
import Router from 'next/router';
import SingleStoreDeliveryItem from './SingleStoreDeliveryItem';
import Loader from '../../reusable/Loader';
import { getCartItems } from '../../../helpers/cart_functionality_helpers';
import isObjectEmpty from '../../../helpers/is_object_empty';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import Breadcrumb from "../../reusable/Breadcrumb";
import {ALERT_TIMEOUT, API_URL} from "../../../config";
import { 
	updateLocalShipmentWithApiShipmentData,
	retrieveShipmentData 
} from '../../../helpers/shipment_method_functionality_helpers';

class Delivery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: {},
			displayMessage: false,
			errorMessage: '',
			messageType: 'error',
			shipmentValid: true,
			validateShipment: false,
			displayToTopButton: false,
			scrollPosition: 0,
			shippingMethodClass: 'input-field',
			shipmentMethods: []
		};
		this.updateCartItems = this.updateCartItems.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.renderPlaceOrderButton = this.renderPlaceOrderButton.bind(this);
		this.redirectToPayment = this.redirectToPayment.bind(this);
		this.updateShipmentValid = this.updateShipmentValid.bind(this);
		this.validateShipment = this.validateShipment.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
        this.checkScroll = this.checkScroll.bind(this);
		this.handleScrollToTop = this.handleScrollToTop.bind(this);
		//this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
		this.getStoreSlugs = this.getStoreSlugs.bind(this);
		this.getStoreShipmentMethods = this.getStoreShipmentMethods.bind(this);
		this.getStoreShipmentMethodData = this.getStoreShipmentMethodData.bind(this);
	}

	componentDidMount () {
		window.addEventListener('scroll', this.handleScroll);
		getCartItems((items) => {
			if (!items) {
				Router.push('/');
			}
			this.updateCartItems(items, this.getStoreShipmentMethods)
		});
	}

	componentWillReceiveProps(nextProps) {
		const { triggerValidateDelivery } = nextProps;
		if (triggerValidateDelivery) {
			this.validateShipment();
		}
	}

	updateCartItems(items, onSuccessCallback) {
		this.setState({
			cartItems: items
		}, () => onSuccessCallback());
	}

	getStoreShipmentMethods() {
		const storeSlugs = this.getStoreSlugs();
		fetch(`${API_URL}/shipment_methods?stores=${storeSlugs}`).then(async (res) => {
			const response = await res.json();
			if (response.data) {
				updateLocalShipmentWithApiShipmentData(storeSlugs.split(','), response.data, () => {
					this.setState({
						shipmentMethods: response.data
					});
				});
			}
		}).catch((err) => {
			console.log('err', err);
		});
	}

	getStoreSlugs() {
		const { cartItems } = this.state;
		const slugs = [];
		Object.keys(cartItems).forEach((slug) => {
			slugs.push(slug);
		});

		return slugs.join(',');
	}

	updateShipmentValid(validity) {
		this.setState({
			shipmentValid: validity
		});
	}

	getStoreShipmentMethodData(storeSlug) {
		const { shipmentMethods } = this.state;
		let storeShipmentData = [];
		for(let i = 0; i < shipmentMethods.length; i++) {
			if (shipmentMethods[i].store === storeSlug) {
				storeShipmentData = shipmentMethods[i].methods;
				break;
			}
		}
		return storeShipmentData;
	}

	renderItems() {
		const { 
			cartItems, 
			validateShipment, 
			shippingMethodClass, 
			shipmentMethods 
		} = this.state;
		const { updateShipmentInfo } = this.props;
		if (!isObjectEmpty(cartItems) && (shipmentMethods.length !== 0)) {
			const itemsLayout = [];
			Object.keys(cartItems).forEach((item, index) => {
				const data = {
					slug: item,
					...cartItems[item]
				};
				const storeShipmentData = this.getStoreShipmentMethodData(item);
				itemsLayout.push(
					<SingleStoreDeliveryItem 
					key={`${cartItems[item].info.name}-${index}`}
					storeData={data}
					updateShipmentInfo={updateShipmentInfo}
					isShipmentValid={this.updateShipmentValid}
					triggerValidation={validateShipment}
					inputClass={shippingMethodClass}
					updatedShipmentData={storeShipmentData}
					/>
				);
			});

			return itemsLayout;
		}

		return <Loader />;
	}

	redirectToPayment() {
		const actionUrl = '/checkout?page=payment';
		const asUrl = '/checkout/payment';
		Router.push(actionUrl, asUrl);
		
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
	validateShipment() {
		/**
		 * Retrieve the shipments data
		 * 
		 */
		const storeSlugs = this.getStoreSlugs().split(',');
		retrieveShipmentData((shipments) => {
			if (Object.keys(shipments).length === Object.keys(storeSlugs).length) {
				this.handleScrollToTop();
				this.redirectToPayment();
			} 
			else {
				const errorMessage = 'Please select how you would want us to deliver your goods for all stores';
				this.handleScrollToTop();
				this.setState({
					errorMessage,
					displayMessage: true,
					shippingMethodClass: 'input-field is-invalid'
				});
				setTimeout(() => {
					this.setState({
						displayMessage: false
					});
				}, ALERT_TIMEOUT);
			}
		});
	}

	renderPlaceOrderButton() {
		return (
			<div className='shipping-btn'>
				<button 
				type='button'
				className='auth-button'
				onClick={this.validateShipment}
				>
				Next
				</button>
			</div>
		);
	}

	render() {
		const { displayMessage, errorMessage, messageType } = this.state;
		return (
            <div className='account-info-wrapper'>
				<div className="checkout-step-title">
					<h5>3. Delivery</h5>
				</div>
				<div className="checkout-phase-content-wrapper">
					<MessageDisplayer 
					display={displayMessage}
					errorMessage={errorMessage}
					type={messageType}
					/>
					<div className='payment-section delivery-section'>
						<div className='account-info-title'>
							<h5>Choose delivery methods</h5>
						</div>
						{/* {this.renderPlaceOrderButton()} */}
					</div>
					{this.renderItems()}
					<div className='shipping-btn continue-check place-check'>
						{this.renderPlaceOrderButton()}
					</div>
				</div>
            </div>
		);
	}
}

export default Delivery;