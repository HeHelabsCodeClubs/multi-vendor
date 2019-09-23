import React, { Component } from 'react';
import Router from 'next/router';
import SingleStoreDeliveryItem from './SingleStoreDeliveryItem';
import Loader from '../../reusable/Loader';
import { getCartItems } from '../../../helpers/cart_functionality_helpers';
import isObjectEmpty from '../../../helpers/is_object_empty';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import Breadcrumb from "../../reusable/Breadcrumb";
import {ALERT_TIMEOUT} from "../../../config";

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
			shippingMethodClass: 'input-field'
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
		this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
	}

	componentDidMount () {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillReceiveProps(nextProps) {
		const { triggerValidateDelivery } = nextProps;
		if (triggerValidateDelivery) {
			this.validateShipment();
		}
	}
	componentWillMount() {
		getCartItems((items) => {
			if (!items) {
				Router.push('/');
			}
			this.updateCartItems(items)
		});
	}

	updateCartItems(items) {
		this.setState({
			cartItems: items
		});
	}

	updateShipmentValid(validity) {
		this.setState({
			shipmentValid: validity
		});
	}

	renderItems() {
		const { cartItems, validateShipment, shippingMethodClass } = this.state;
		const { updateShipmentInfo } = this.props;
		if (!isObjectEmpty(cartItems)) {
			const itemsLayout = [];
			Object.keys(cartItems).forEach((item, index) => {
				const data = {
					slug: item,
					...cartItems[item]
				};
				itemsLayout.push(
					<SingleStoreDeliveryItem 
					key={`${cartItems[item].info.name}-${index}`}
					storeData={data}
					updateShipmentInfo={updateShipmentInfo}
					isShipmentValid={this.updateShipmentValid}
					triggerValidation={validateShipment}
					inputClass={shippingMethodClass}
					/>
				);
			});

			return itemsLayout;
		}

		return <Loader />;
	}

	redirectToPayment() {
		/**
		 * Validate shipments
		 */
		const { shipmentValid } = this.state;
		if (!shipmentValid) {
			// display message
			this.setState({
				errorMessage: 'Please choose a delivery method for all the stores. Thanks!',
				displayMessage: true,
				shippingMethodClass: 'input-field is-invalid'
			});

			setTimeout(() => {
				this.setState({
					displayMessage: false
				});
			}, ALERT_TIMEOUT);
			// return;
		} else {
			const actionUrl = '/checkout?page=payment';
        	const asUrl = '/checkout/payment';
        	Router.push(actionUrl, asUrl);
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
	validateShipment() {
		this.setState({
			validateShipment: true
		}, () => {
			setTimeout(() => {
				this.setState({
					validateShipment: false
				});
				this.redirectToPayment();
				this.handleScrollToTop();
			}, 300);
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
				Place Order
				</button>
			</div>
		);
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
                    <a href="#" className="breadcrumb-current">Delivery</a>
                </Breadcrumb>
            );
        }
        return null;
    }

	render() {
		const { displayMessage, errorMessage, messageType } = this.state;
		return (
            <div className='account-info-wrapper'>
				{this.renderBreadCrumbs()}
				<MessageDisplayer 
				display={displayMessage}
				errorMessage={errorMessage}
				type={messageType}
				/>
                <div className='payment-section delivery-section'>
					<div className='account-info-title'>
						<h5>Choose delivery methods</h5>
					</div>
					{this.renderPlaceOrderButton()}
				</div>
				{this.renderItems()}
				<div className='shipping-btn continue-check place-check'>
					{this.renderPlaceOrderButton()}
				</div>
            </div>
		);
	}
}

export default Delivery;