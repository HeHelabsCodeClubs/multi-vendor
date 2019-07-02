import React, { Component } from 'react';
import Link from 'next/link';
import ProductPopup from '../ProductPopup';
import InputField from '../../reusable/InputField';
import DeliveryCustomerDetailForm from './DeliveryCustomerDetailForm';

class Billing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			billingFormIsDisplayed: false,
			billingAndShippingSame: true
		};
		this.renderCustomerDetailForm = this.renderCustomerDetailForm.bind(this);
		this.handleBillingAddressDisplay = this.handleBillingAddressDisplay.bind(this);
	}

	renderCustomerDetailForm() {
		const { billingAndShippingSame } = this.state;
		if (billingAndShippingSame) {
			return (
				<div className='account-info-wrapper'>
					<DeliveryCustomerDetailForm 
					formTitle='Shipping address'
					/>
					<InputField 
						typeOfInput='checkbox'
						type='checkbox'
						name='billingAndShippingSame'
						fieldText='Billing and shipping address are the same'
						updateInputFieldValue={this.handleBillingAddressDisplay}
						defaultInputValue={billingAndShippingSame}
					/>
					<div className='shipping-btn'><button className='auth-button'>Continue</button></div>
				</div>
			);
		}

		return (
			<div className='account-info-wrapper'>
					<DeliveryCustomerDetailForm 
					formTitle='Shipping address'
					formType='shipping'
					submitForm={false}
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
					/>
					<div className='shipping-btn'>
						<button className='auth-button'>Continue</button>
					</div>
			</div>
		);
	}
	handleBillingAddressDisplay(fieldStateName, newValue) {
		this.setState({
			[fieldStateName]: newValue
		});
	}

	render() {
		return this.renderCustomerDetailForm();
	}
}

export default Billing;