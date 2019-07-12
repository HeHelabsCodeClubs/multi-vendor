import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import InputField from '../../reusable/InputField';
import { COUNTRY_API_KEY, COUNTRY_API_URL } from '../../../config';
import RegionData from '../../../helpers/regionData';
import CityData from '../../../helpers/cityData';
import { getValidatedInputErrorMessage } from '../../../helpers/validation';
import MessageDisplayer from '../../reusable/MessageDisplayer';

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
			residentialAddressType: false,
			commercialAddressType: false,
			inputWithError: false,
			errorMessage: '',
			inputIsInvalid: false,
			messageType: 'error',
			hasProvidedCustomerDetails: false,
			defaultCountryFetchDataUrl: 'country/all',
			defaultStatesFetchDataUrl: 'region/rw/all',
			defaultCitiesFetchDataUrl: 'city/rw/search/?region=kigali_province'
		};
		this.getInputFieldValue = this.getInputFieldValue.bind(this);
		this.getFormSelectorsData = this.getFormSelectorsData.bind(this);
		this.fetchRegionsData = this.fetchRegionsData.bind(this);
		this.updateFieldSelectorData = this.updateFieldSelectorData.bind(this);
		this.handleChangeOfSelectorData = this.handleChangeOfSelectorData.bind(this);
		this.updateFormFieldsToInitialData = this.updateFormFieldsToInitialData.bind(this);
		this.renderAddressTypePlaceholders = this.renderAddressTypePlaceholders.bind(this);
		this.submitValues = this.submitValues.bind(this);
		this.validateInputFields = this.validateInputFields.bind(this);
		this.handleToggleOfAddressType = this.handleToggleOfAddressType.bind(this);
		this.getTheRightAddressType = this.getTheRightAddressType.bind(this);
	}

	componentDidMount() {
		this.getFormSelectorsData(true);
		this.updateFormFieldsToInitialData();
		
	}

	componentWillReceiveProps(nextProps) {
		const { provideCustomerDetails } = nextProps;
		const { hasProvidedCustomerDetails } = this.state;
		if (provideCustomerDetails && !hasProvidedCustomerDetails) {
			this.setState({
				hasProvidedCustomerDetails: true
			}, () => this.submitValues())
		}
	}

	updateFormFieldsToInitialData() {
		const { customerAddressData, formType } = this.props;
		if (customerAddressData) {
			const addressType = this.getTheRightAddressType(customerAddressData[formType].address_type);
			this.setState({
				firstName: customerAddressData[formType].first_name,
				lastName: customerAddressData[formType].last_name,
				email: customerAddressData[formType].email,
				phone: customerAddressData[formType].phone,
				country: customerAddressData[formType].country,
				state: customerAddressData[formType].state === '02' ? 'kigali_province,rw' : customerAddressData[formType].last_name,
				city: customerAddressData[formType].city,
				streetNumber: customerAddressData[formType].address_1,
				houseNumber: customerAddressData[formType].address_2,
				residentialAddressType: addressType === 'residential' ? true : false,
				commercialAddressType: addressType === 'commercial' ? true : false
			});
		}
	}

	getTheRightAddressType(address_type) {
		if (address_type !== undefined && address_type !== '') {
			if (address_type === 'commercial') {
				return 'commercial';
			}
		}
		return 'residential';
	}

	submitValues() {
		const data = {};
		const { formType } = this.props;
		const { 
			firstName,
			lastName,
			email,
			phone,
			country,
			state,
			city,
			streetNumber,
			houseNumber,
			commercialAddressType
		 } = this.state;

		 const customerValidationRules = [
            [
                {
                    type: 'empty',
                    context: 'First name',
                    inputStateValue: firstName,
                    inputStateName: 'firstName'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'Last name',
                    inputStateValue: lastName,
                    inputStateName: 'lastName'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'Email',
                    inputStateValue: email,
                    inputStateName: 'email'
                },
                {
                    type: 'email',
                    context: 'Email',
                    inputStateValue: email,
                    inputStateName: 'email'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'Phone',
                    inputStateValue: phone,
                    inputStateName: 'phone'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'Country',
                    inputStateValue: country,
                    inputStateName: 'country'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'State',
                    inputStateValue: state,
                    inputStateName: 'state'
                }
			],
			[
                {
                    type: 'empty',
                    context: 'District',
                    inputStateValue: city,
                    inputStateName: 'city'
                }
			]
        ];

        if (!this.validateInputFields(customerValidationRules)) {
			this.setState({
				hasProvidedCustomerDetails: false
			});
            return;
        }
		 data[formType] = {
			firstName,
			lastName,
			email,
			phone,
			country,
			state,
			city,
			streetNumber,
			houseNumber
		};

		if (formType === 'shipping') {
			data[formType].address_type = commercialAddressType ? 'commercial' : 'residential';
		}

		this.props.getSubmittedValues((data), () => {
			this.setState({
				hasProvidedCustomerDetails: false
			});
		});
	}

	validateInputFields(validationRules) {
        for(let i = 0; i < validationRules.length; i++) {
            const currentValidation = validationRules[i];
            for (let y = 0; y < currentValidation.length; y++) {
                const {
                    type,
                    context,
                    inputStateValue,
                    optionalInputStateValue,
                    inputStateName
                } = currentValidation[y];
                const fieldErrorMessage = type !== 'password_confirmation' ? getValidatedInputErrorMessage(type, context, inputStateValue) : getValidatedInputErrorMessage(type, context, inputStateValue, optionalInputStateValue);
                if (fieldErrorMessage !== '') {
                    this.setState({
                        inputIsInvalid: true,
                        inputWithError: inputStateName,
                        errorMessage: fieldErrorMessage
                    });
                    setTimeout(() => {
                        this.setState({
                            inputIsInvalid: false,
                            inputWithError: '',
                        });
                    }, 2000);
                    return false;
                }
            }
        }
        return true;
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
								id: item.city.toLowerCase()
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
        }, () => {
			this.handleToggleOfAddressType(fieldStateName, newValue);
		});
	}

	handleToggleOfAddressType(fieldStateName, newValue) {
		if (fieldStateName === 'residentialAddressType') {
			console.log('hereeee');
			if (newValue === true) {
				this.setState({
					commercialAddressType: false
				});
			}
		}

		if (fieldStateName === 'commercialAddressType') {
			console.log('here but', newValue);
			if (newValue === true) {
				this.setState({
					residentialAddressType: false
				});
			}
		}
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

	renderAddressTypePlaceholders() {
		const { formType } = this.props;
		const { 
			residentialAddressType,
			commercialAddressType
		 } = this.state;
		if (formType === 'shipping') {
			return (
				<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
					<div className='input-checkbox billing-checkbox'>
						<span className='remember'>Address type:</span>
						<InputField 
						typeOfInput='checkbox'
						type='checkbox'
						name='residentialAddressType'
						fieldText='Residential'
						updateInputFieldValue={this.getInputFieldValue}
						defaultInputValue={residentialAddressType}
						/>
						
						<InputField 
						typeOfInput='checkbox'
						type='checkbox'
						name='commercialAddressType'
						fieldText='Commercial'
						updateInputFieldValue={this.getInputFieldValue}
						defaultInputValue={commercialAddressType}
						/>

						{/* <span className='remember'><input type='checkbox' />Residential</span>
						<span className='remember'><input type='checkbox' />Commercial</span> */}
					</div>
				</div>
			);
		}

		return null;
	}

    render() {
		const { 
			inputWithError,
			countrySelectorData,
			stateSelectorData,
			citySectorData,
			firstName,
			lastName,
			email,
			phone,
			country,
			state,
			city,
			streetNumber,
			houseNumber,
			inputIsInvalid,
			errorMessage,
			messageType
		 } = this.state;
		const { formTitle } = this.props;
        return (
            <div className='auth-content delivery-address'>
				<div className='account-info-title billing-title'>{formTitle}</div>
				<MessageDisplayer 
                display={inputIsInvalid ? true : false }
                errorMessage={errorMessage}
                type={messageType}
                />
				<form className='row reset-row auth-form signin-form shipping-form' >
                    <div className=' col-lg-6 col-md-6 col-sm-6 col-12'>
						<InputField
							typeOfInput='text_field'
							type='text'
							id='first-name'
							name='firstName'
							placeholder='First name' 
							defaultInputValue={firstName}
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
						defaultInputValue={lastName}
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
							defaultInputValue={email}
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
							defaultInputValue={phone}
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
							defaultInputValue={country}
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
							defaultInputValue={state}
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
							placeholder='District'
							defaultInputValue={city}
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					{/* <div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<InputField 
							typeOfInput='text_field'
							type='text'
							id='neighborhood'
							name='neighborhood'
							defaultInputValue={neighborhood}
							// selectorData={[
							// 	{ text: 'Kigali', id: 'kigali' },
							// 	{ text: 'Gasabo', id: 'Gasabo' },
							// ]}
							placeholder='Neighborhood'
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div> */}
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12'>
						<InputField
							typeOfInput='text_field'
							type='text' 
							id='street-number'
							name='streetNumber'
							placeholder='Street no' 
							defaultInputValue={streetNumber}
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
						<InputField
							typeOfInput='text_field'
							type='text' 
							id='house-number'
							name='houseNumber'
							placeholder='House no' 
							defaultInputValue={houseNumber}
							updateInputFieldValue={this.getInputFieldValue}
							inputWithError={inputWithError}
						/>
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
						&nbsp;
					</div>
					{this.renderAddressTypePlaceholders()}
				</form>
            </div>
        );
    }
}

export default DeliveryCustomerDetailForm;