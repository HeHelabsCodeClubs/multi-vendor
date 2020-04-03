import React, { Component } from 'react';
import InputField from '../../reusable/InputField';
import Notifications, { notify } from 'react-notify-toast';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import { getValidatedInputErrorMessage } from '../../../helpers/validation';
import { getCartItems, singleStoreTotalPrice, storeProductsTotalPrice, singleStoreName } from '../../../helpers/cart_functionality_helpers';
import { retrieveShipmentData } from '../../../helpers/shipment_method_functionality_helpers';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { 
    createPaymentSubmissionData,
    storeOrderDATACookie,
    removeOrderDATACookie,
    removeMoMoPaymentStatusCookie
 } from '../../../helpers/process_payment';
 import { API_URL } from '../../../config';
 import { getClientAuthToken, getOrderCookie } from '../../../helpers/auth';
 import { ORDER_CREATION_UNKWOWN_ERROR } from '../../../config';
 import { getDiscountDataInLocalStorage } from '../../../helpers/coupon_code_functionality';
import SearchDropdown from '../../reusable/header/SearchDropdown';

const channels = [
    {code: 'azzi-cosmetics'},
    {code: 'a-f-l-i-m-b-a'},
    {code: 'kigali-pottery'},
    {code: 'ki-pepeokids'},
    {code: 'k-dreamy'},
    {code: 'jewel-rock'},
    {code: 'je-te-promets'},
    {code: 'iwawe-tech'},
    {code: 'hope-line-sports'},
    {code: 'shema-shop'},
    {code: 'posh-creative'},
    {code: 'nk-clothing'},
    {code: 'new-ma-maison'},
    {code: 'mode-lingeries'},
    {code: 'kukiranguzo'},
    {code: 'smart-pillow-rwanda'},
    {code: 'uzi-collections'},
    {code: 'tomorrow-accessories'}
]

export default class CardPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: 0,
            inputWithError: '',
            inputIsInvalid: false,
            errorMessage: '',
            messageType: 'error',
            buttonStatus: 'initial',
            cartItems: {},
            shipmentData: {},
            discountData: {}
        };
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.handleOrderSubmission = this.handleOrderSubmission.bind(this);
        this.validateInputFields = this.validateInputFields.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.updateCartItems = this.updateCartItems.bind(this);
        this.updateShipmentData = this.updateShipmentData.bind(this);
        this.proceedToMigs = this.proceedToMigs.bind(this);
        this.createOrderOnTheApi = this.createOrderOnTheApi.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.onOrderCreationUnknownFailure = this.onOrderCreationUnknownFailure.bind(this);
        this.onOrderCreationSuccess = this.onOrderCreationSuccess.bind(this);
        this.onOrderCreationRetry = this.onOrderCreationRetry.bind(this);
        this.onOrderCreationKnownFailure = this.onOrderCreationKnownFailure.bind(this);
    }
    componentDidMount() {
        // get cart data on component load
        getCartItems((items) => {
            this.updateCartItems(items);
        });

        // get shipment data on component load
        retrieveShipmentData((items) => {
            this.updateShipmentData(items);
        });

        //get discount data
        getDiscountDataInLocalStorage((discountData) => {
            if (Object.keys(discountData).length !== 0) {
                this.setState({
                    discountData
                });
            }
        });
    }

    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }
    handleOrderSubmission() {
        const { terms, buttonStatus, cartItems } = this.state;
        /**
         * Hide display box if it was displayed due to api errors
         */
        this.setState({
            inputIsInvalid: false
        });

        /**
         * Validation
         */
        
        const customerValidationRules = [
            [
                {
                    type: 'empty',
                    context: 'Terms and Conditions',
                    inputStateValue: terms,
                    inputStateName: 'terms'
                }
            ]
        ];

        if (!this.validateInputFields(customerValidationRules)) {
            return;
        }

        // proceed to migs
        this.proceedToMigs();
    }

    updateCartItems(items) {
        this.setState({
            cartItems: items
        });
    }

    updateShipmentData(items) {
        this.setState({
            shipmentData: items
        });
    }

    proceedToMigs() {
        const { cartItems, shipmentData } = this.state;

        if (!isObjectEmpty(cartItems) && !isObjectEmpty(shipmentData)) {
            // handle redirection to migs
            const dataToSubmit = createPaymentSubmissionData('card', cartItems, shipmentData);
            const token = getClientAuthToken();
            let doNotSubmit = false;
            let storeClosed = false;
            let storeName = '';
            if (!isObjectEmpty(dataToSubmit) && token) {
                // Check if the order has a minimum total of Rwf 3000 per store 
                Object.keys(dataToSubmit).forEach((storeSlug, index) => {
                    for (let i = 0; i < channels.length; i++) {
                        if (channels[i].code === storeSlug) {
                            const data = {
                                slug: storeSlug,
                                ...cartItems[storeSlug]
                            };
                            storeName = singleStoreName(data);
                            storeClosed = true;
                        }
                    }
                    const data = {
                        slug: storeSlug,
                        ...cartItems[storeSlug]
                    };
                    const storeTotalPrice = singleStoreTotalPrice(data);

                    if (storeTotalPrice < 3000) {
                        doNotSubmit = true
                    }
                });

                if (storeClosed === true) {
                    notify.show(`We're sorry ${storeName} is currently closed in this season.`, 'error', 10000);
                    return;
                }

                if (doNotSubmit === true) {
                    notify.show("Your order should have a minimum total amount of Rwf 3000 per store", 'error', 10000);
                    return;
                }

                this.setState({
                    buttonStatus: 'Submitting'
                });

                const { toogleDisplayOverlay } = this.props;
                toogleDisplayOverlay(true);

                //check if there's no pending order

                // const orderID = getOrderCookie();
                // if (orderID) {
                //     // use already existing order
                //     this.onOrderCreationRetry(orderID);
                //     return;
                // }
                removeOrderDATACookie();
               

                this.createOrderOnTheApi(dataToSubmit, token);
            }
        }
    }

    createOrderOnTheApi(dataToSubmit, token) {
        const { discountData } = this.state;
        const data = {
            payment_type: 'card',
            order_data: dataToSubmit
        };

        /**
         * Add the discount info if there was a discount given
         */
        if (Object.keys(discountData).length !== 0) {
            data.discount = discountData;
        }

        fetch(`${API_URL}/payments/process`, {
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
                if (err) {
                    console.log(err);
                    this.onOrderCreationUnknownFailure(ORDER_CREATION_UNKWOWN_ERROR);
                } 
            }
        }).catch((err) => {
            if (err) {
                console.log('err', err);
                onOrderCreationUnknownFailure(ORDER_CREATION_UNKWOWN_ERROR);
            }
        });
    }

    handleResponse(response) {
        switch(Number(response.status_code)) {
            case 200:
                /**
                 * Proceed to migs
                 */
                this.onOrderCreationSuccess(response.data.order_id);
                return;
            case 405:
                /**
                 * Handle creation failure
                 */
                this.onOrderCreationKnownFailure(response);
                return;
            default:
                /**
                 * Handle errors
                 */
                this.onOrderCreationUnknownFailure();
                return;

        }
    }

    onOrderCreationRetry(orderID) {
        this.onOrderCreationSuccess(orderID);
    }

    onOrderCreationSuccess(orderID) {
        removeOrderDATACookie();
        storeOrderDATACookie(orderID,'card');
        setTimeout(() => {
            window.location = '/process/card';
        }, 500);
    }

    onOrderCreationUnknownFailure(errorMessage) {
        this.setState({
            buttonStatus: 'initial'
        });
        this.props.toogleDisplayOverlay(false);

        if (errorMessage !== undefined) {
            this.setState({
                inputIsInvalid: true,
                errorMessage: errorMessage
            });

            setTimeout(() => {
                this.setState({
                    inputIsInvalid: false
                });
            }, 5000);
        }
    }

    onOrderCreationKnownFailure(response) {
        if (response.errors) {
            const errors = response.errors;
            this.onOrderCreationUnknownFailure(errors[0]);
            return;
        }
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

    renderSubmitButton() {
		const { buttonStatus } = this.state;
		const buttonText  = buttonStatus === 'initial' ? 'Submit My Order' : 'Submitting';
		const buttonClass = buttonStatus === 'initial' ? 'auth-button continue-check submit-order' : 'auth-button is-submitting';

		return (
			<div className='shipping-btn'>
				<button 
				className={buttonClass}
				onClick={this.handleOrderSubmission}
				>
				{buttonText}
				</button>
			</div>
		);
	}

    render() {
        const { 
            inputWithError, 
            inputIsInvalid, 
            errorMessage, 
            messageType,
            buttonStatus,
            cartItems,
            shipmentData
        } = this.state;
        return (
            <div>
                <Notifications />
                <MessageDisplayer 
                display={inputIsInvalid ? true : false }
                errorMessage={errorMessage}
                type={messageType}
                />
                <div className='single-payment clicked'>
                    <div className='single-payment-title'>
                        <span className='title-left title-wrapper'>
                            <h5 className='title'> 
                                Online Credit | Debit Card
                            </h5>
                        </span>
                        <span className='title-right title-wrapper'>
                            <img 
                            className='payment-logo'
                            src='https://res.cloudinary.com/hehe/image/upload/v1559309603/multi-vendor/Visa-icon.png'
                            />
                            <img 
                            className='payment-logo'
                            src='https://res.cloudinary.com/hehe/image/upload/v1559309603/multi-vendor/mastercard-logo-icon-png_44630.png'
                            />
                        </span>
                    </div>
                    <div className='card-payment'>
                        <p>
                            Checkout using online card payment processor. <br />
                            <br />
                            1.&nbsp;Double check your order's subtotals <br />
                            2.&nbsp;Click "SUBMIT MY ORDER" button below <br />
                            3.&nbsp;From external payment gateway,fill all required card's information and proceed with payment.<br />
                            4.&nbsp;You will be redirected back here to the website with payment details.<br />
                            5.&nbsp;In case the payment was successful, you will receive notification via email and/or SMS.<br />
                            6.&nbsp;From that step we will receive your order and then process it.<br />
                            7.&nbsp;Payment is collected by DMM.HeHe Ltd on behalf of the seller.<br />
                            8.&nbsp;For any payment inquiries, please contact our customer care department at muraho@dmmhehe.com , call us on +(250) 786 456 686 or visit us at Kigali Heights 4th floor, KG 7 Ave.<br />
                            <br />
                            Pay with MiGS <br />
                            Pay using credit | debit card through MasterCard <br />
                        </p>
                    </div>
                </div>
                <div className='payment-comment'>
                    <div className='comment-title'>You can leave us a comment here</div>
                    <div className='comment-input'>
                        <textarea type='text' name='comment' />
                    </div>
                </div> 
                <div className='payment-terms-container'>
                    <InputField 
                    typeOfInput='checkbox'
                    type='checkbox'
                    name='terms'
                    fieldText='Select this check box to accept the Terms and Conditions'
                    updateInputFieldValue={this.getInputFieldValue}
                    inputWithError={inputWithError}
                    />
                </div>
                {this.renderSubmitButton()}
            </div>
        );
    }
}