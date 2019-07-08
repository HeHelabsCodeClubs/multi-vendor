import React, { Component } from 'react';
import Router from 'next/router';
import SingleStoreDeliveryItem from './SingleStoreDeliveryItem';
import Loader from '../../reusable/Loader';
import { getCartItems } from '../../../helpers/cart_functionality_helpers';
import isObjectEmpty from '../../../helpers/is_object_empty';

class Delivery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: {}
		};
		this.updateCartItems = this.updateCartItems.bind(this);
		this.renderItems = this.renderItems.bind(this);
		this.renderPlaceOrderButton = this.renderPlaceOrderButton.bind(this);
		this.redirectToPayment = this.redirectToPayment.bind(this);
	}

	componentDidMount() {
		getCartItems((items) => {
			this.updateCartItems(items)
		});
	}

	updateCartItems(items) {
		this.setState({
			cartItems: items
		});
	}

	renderItems() {
		const { cartItems } = this.state;
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

	renderPlaceOrderButton() {
		return (
			<div className='shipping-btn'>
				<button 
				type='button'
				className='auth-button'
				onClick={this.redirectToPayment}
				>
				Place Order
				</button>
			</div>
		);
	}
	render() {
		return (
            <div className='account-info-wrapper'>
                <div className='payment-section delivery-section'>
					<div className='account-info-title'>
						<h5>Choose delivery methods</h5>
					</div>
					{this.renderPlaceOrderButton()}
				</div>
				{this.renderItems()}
				<div className='shipping-btn'>
					{this.renderPlaceOrderButton()}
				</div>
            </div>
		);
	}
}

export default Delivery;