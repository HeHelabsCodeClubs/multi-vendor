import React, { Component } from 'react';
import CardPayment from './CardPayment';
import MtnMobileMoneyPayment from './MtnMobileMoneyPayment';
import CashOnDeliveryPayment from './CashOnDeliveryPayment';
import Loader from '../../reusable/Loader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { API_URL } from '../../../config';
import { getClientAuthToken } from '../../../helpers/auth';

export default class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paymentMethods: [],
		};
		this.tIndex = {};
		this.getPaymentMethods = this.getPaymentMethods.bind(this);
		this.handleResponse = this.handleResponse.bind(this);
		this.renderTabLists = this.renderTabLists.bind(this);
		this.renderTabPanes = this.renderTabPanes.bind(this);
		this.decideWhichPaymentLayoutToDisplay = this.decideWhichPaymentLayoutToDisplay.bind(this);
	}
	componentDidMount() {
		const { paymentMethods } = this.state;
		if (paymentMethods.length === 0) {
			// get payment methods from api
			this.getPaymentMethods();
		}
	}

	getPaymentMethods() {
		const token = getClientAuthToken();
		if (token) {
			fetch(`${API_URL}/payments`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `Bearer ${token}`
				},
			   
			}).then(async (res) => {
				try {
					const response = await res.json();
					this.handleResponse(response);
					//console.log('payments', response);
				} catch (err) {
					console.log('error');
					console.log(err);
				}
			});
		}
	}

	handleResponse(response) {
		const { status_code, data } = response;
		switch(status_code) {
			case 200:
				this.setState({
					paymentMethods: data 
				});
				break;
			default:
				// display error message
		}
	}

	renderTabPanes(indexes) {
		const tabPanelLayout = [];
		const IndexesLength = Object.keys(indexes).length;
		let counter = 0;
		Object.keys(indexes).forEach((payment_method) => {
			if (indexes[payment_method] === counter) {
				const paymentLayout = this.decideWhichPaymentLayoutToDisplay(payment_method);
				tabPanelLayout.push(
					paymentLayout
				);
				if (counter !== (IndexesLength - 1)) {
					counter = counter + 1;
				}
			}
		});
		return tabPanelLayout;
	}

	decideWhichPaymentLayoutToDisplay(payment_method_title) {
		switch(payment_method_title) {
			case 'credit_card_/_debit_card':
				return (
					<TabPanel>
						<CardPayment />
					</TabPanel>
				);
			case 'mobile_money':
				return (
					<TabPanel>
						<MtnMobileMoneyPayment />
					</TabPanel>
				);
			case 'cash_on_delivery':
				return (
					<TabPanel>
						<CashOnDeliveryPayment />
					</TabPanel>
				);
			default:
				// payment not supported yet

		}
	}

	renderTabLists() {
		const { paymentMethods } = this.state;
		if (paymentMethods.length !== 0) {
			const talListLayout = paymentMethods.map((paymentMethod, index) => {
				const { title } = paymentMethod;
				this.tIndex[title.toLowerCase().split(' ').join('_')] = index;
				return (
					<Tab>
						<h5><span className="table-title">{title}</span></h5>
					</Tab>
				);
			});
			const tabPanesLayout = this.renderTabPanes(this.tIndex);
			return (
				<Tabs defaultIndex={0}>
					<TabList>
						{talListLayout}
					</TabList>
					{tabPanesLayout}
				</Tabs>
			);
		} 
		return <Loader />;
	}

	render() {
		return (
            <div className='account-info-wrapper'>
				<div className='payment-section'>
					<div className='account-info-title'>Payment</div>
				</div>
                {/* <div className='payment-section'>
					<div className='wallet-title'>User wallet</div>
					<div className='wallet-content'>Available wallet cash: 0 Rwf</div>
				</div> */}
				<div className='payment-section'>
					{this.renderTabLists()}
				</div>
            </div>
		);
	}
}