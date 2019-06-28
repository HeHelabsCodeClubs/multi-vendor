import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import InputField from '../../reusable/InputField';
import { COUNTRY_API_KEY, COUNTRY_API_URL } from '../../../config';
import RegionData from '../../../helpers/regionData';
import CityData from '../../../helpers/cityData';

class DeliveryCustomerDetailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
			country: '',
			countrySelectorData: [],
			state: '',
			stateSelectorData: [],
			city: '',
			citySectorData: [],
            neighborhood: '',
            streetNumber: '',
			houseNumber: '',
			inputWithError: false,
			defaultCountryFetchDataUrl: 'country/all',
			defaultStatesFetchDataUrl: 'region/rw/all',
			defaultCitiesFetchDataUrl: 'city/rw/search/?region=kigali_province'
		};
		this.getInputFieldValue = this.getInputFieldValue.bind(this);
		this.getFormSelectorsData = this.getFormSelectorsData.bind(this);
		this.fetchRegionsData = this.fetchRegionsData.bind(this);
		this.updateFieldSelectorData = this.updateFieldSelectorData.bind(this);
		this.handleChangeOfSelectorData = this.handleChangeOfSelectorData.bind(this);
	}

	componentDidMount() {
		this.getFormSelectorsData(true);
	}

	getFormSelectorsData(fetchAllData) {
		const {
			defaultCountryFetchDataUrl,
			defaultStatesFetchDataUrl,
			defaultCitiesFetchDataUrl,
		} = this.state;

		if (fetchAllData) {
			/**
			 * Get selector data for countries
			 */
			this.updateFieldSelectorData('country', [
				{
					name: 'Rwanda',
					code: 'rw'
				}
			]);
			//this.fetchRegionsData(defaultCountryFetchDataUrl, 'default', (response) => this.updateFieldSelectorData('country', response));
		}
		
		/**
		 * Get selector data for states defaults to Rwanda states
		 */
		this.updateFieldSelectorData('state', RegionData);
		//this.fetchRegionsData(defaultStatesFetchDataUrl, 'default', (response) => this.updateFieldSelectorData('state', response));

		/**
		 * Get selector data for cities defaults to Rwanda kigali cities
		 */
		this.updateFieldSelectorData('city', CityData.kigali_province);
		//this.fetchRegionsData(defaultCitiesFetchDataUrl, 'change', (response) => this.updateFieldSelectorData('city', response));
	}

	fetchRegionsData(url, context, callback) {
		const requestUrl = context === 'default' ? `${COUNTRY_API_URL}/${url}/?key=${COUNTRY_API_KEY}`: `${COUNTRY_API_URL}/${url}&key=${COUNTRY_API_KEY}`;
		fetch(requestUrl, {
			method: 'GET'
		}).then(async (res) => {
			try {
				const response = await res.json();
				callback(response);
				
			} catch (err) {
				console.log('error');
				console.log(err);
			}
		});
	}

	updateFieldSelectorData(selectorType, response) {
		if (response.length > 0) {
			const selectData = response.map((item) => {
				switch(selectorType) {
					case 'country':
							return {
								text: item.name,
								id: item.code
							};
					case 'state':
							const { region, country } = item;
							const formattedRegion = region.toLowerCase().split(' ').join('_');
							return {
								text: region,
								id: `${formattedRegion},${country}`
							};
					case 'city':
							return {
								text: item.city,
								id: item.city
							};
					default:
							// do nothing
				}
			});

			switch(selectorType) {
				case 'country':
					this.getInputFieldValue('countrySelectorData', selectData);
					break;
				case 'state':
					this.getInputFieldValue('stateSelectorData', selectData);
					break;
				case 'city':
					this.getInputFieldValue('citySectorData', selectData);
					break;
				default:
					// do nothing
			}
		}
	}

	getInputFieldValue(fieldStateName, newValue) {
		if (newValue !== '') {
			this.handleChangeOfSelectorData(fieldStateName, newValue);
		}
        this.setState({
            [fieldStateName]: newValue
        });
	}

	handleChangeOfSelectorData(stateName, stateNewValue) {
		switch(stateName) {
			// case 'country':
			// 	this.setState({
			// 		defaultStatesFetchDataUrl: `region/${stateNewValue}/all`
			// 	}, () => {
			// 		this.getFormSelectorsData(false);
			// 	});
			// 	break;
			case 'state':
				const stateValues = stateNewValue.split(',');
				this.updateFieldSelectorData('city', CityData[stateValues[0]]);
				// this.setState({
				// 	defaultCitiesFetchDataUrl: `city/${stateValues[1]}/search/?region=${stateValues[0]}`
				// }, () => {
				// 	this.getFormSelectorsData(false);
				// });
				break;
			default:
				// do nothing

		}
	}

    render() {
		const { 
			inputWithError,
			countrySelectorData,
			stateSelectorData,
			citySectorData
		 } = this.state;
		const { formTitle } = this.props;
        return (
            <div className='auth-content delivery-address'>
				<div className='account-info-title billing-title'>{formTitle}</div>
				<form className='row reset-row auth-form signin-form shipping-form' >
                    <div className=' col-lg-6 col-md-6 col-sm-6 col-12'>
						<InputField
							typeOfInput='text_field'
							type='text'
							id='first-name'
							name='firstName'
							placeholder='First name' 
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
						<InputField
                        typeOfInput='text_field'
                        type='text' 
                        id='last-name'
                        name='lastName'
                        placeholder='Last Name' 
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
						<InputField 
							typeOfInput='text_field'
							type='email' 
							id='email'
							name='email'
							placeholder='Email'
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField
							typeOfInput='text_field'
							type='text' 
							id='phone'
							name='phone'
							placeholder='Phone' 
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField 
							typeOfInput='selector'
							id='country'
							name='country'
							selectorData={countrySelectorData}
							placeholder='Country'
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField 
							typeOfInput='selector'
							id='state'
							name='state'
							selectorData={stateSelectorData}
							placeholder='State'
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField 
							typeOfInput='selector'
							id='city'
							name='city'
							selectorData={citySectorData}
							placeholder='City'
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField 
							typeOfInput='text_field'
							type='text'
							id='neighborhood'
							name='neighborhood'
							// selectorData={[
							// 	{ text: 'Kigali', id: 'kigali' },
							// 	{ text: 'Gasabo', id: 'Gasabo' },
							// ]}
							placeholder='Neighborhood'
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField
							typeOfInput='text_field'
							type='text' 
							id='street-phone'
							name='streetPhone'
							placeholder='Street no' 
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField
							typeOfInput='text_field'
							type='text' 
							id='house-number'
							name='houseNumber'
							placeholder='House no' 
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
						<div className='input-checkbox billing-checkbox'>
							<span className='remember'>Address type:</span>
							<span className='remember'><input type='checkbox' />Residential</span>
							<span className='remember'><input type='checkbox' />Commercial</span>
						</div>
					</div>
				</form>
            </div>
        );
    }
}

export default DeliveryCustomerDetailForm;