import React, { Component } from 'react';
import InputField from '../../reusable/InputField';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import { getValidatedInputErrorMessage } from '../../../helpers/validation';
import { getClientAuthToken, getOrderCookie } from '../../../helpers/auth';
import { getCartItems } from '../../../helpers/cart_functionality_helpers';
import { retrieveShipmentData } from '../../../helpers/shipment_method_functionality_helpers';
import { API_URL, APP_CARD_PAYMENT_RETURN_URL } from '../../../config';
import { ORDER_CREATION_UNKWOWN_ERROR } from '../../../config';
import { getDiscountDataInLocalStorage } from '../../../helpers/coupon_code_functionality';
import isObjectEmpty from '../../../helpers/is_object_empty';
import MoMoWaitingUserMessage from './MoMoWaitingUserMessage';
import MoMoPendingUserMessage from './MoMoPendingUserMessage';
import MoMoProcessedUserMessage from './MoMoProcessedUserMessage';
import { 
    createPaymentSubmissionData,
    storeOrderDATACookie,
    removeOrderDATACookie,
    getMoMoErrorMessage,
    storeMoMoPaymentStatusCookie
 } from '../../../helpers/process_payment';
import MoMoUserErrorMessage from './MoMoUserErrorMessage';


var Stomp = require('stompjs');

let MOMO_PAYMENT_UNRESPONSIVENESS_TIMEOUT = 0;
let timeoutInterval = undefined;
let momoTransactionRequestStatus = undefined;

export default class MtnMobileMoneyPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: 0,
            phone: '',
            inputWithError: '',
            buttonStatus: 'initial',
            errorMessage: '',
            messageType: 'error',
            inputIsInvalid: false,
            cartItems: {},
            shipmentData: {},
            discountData: {}

        }
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.handleOrderSubmission = this.handleOrderSubmission.bind(this);
        this.validateInputFields = this.validateInputFields.bind(this);
        this.updateCartItems = this.updateCartItems.bind(this);
        this.updateShipmentData = this.updateShipmentData.bind(this);
        this.createOrderOnTheApi = this.createOrderOnTheApi.bind(this);
        this.handleOrderCreationResponse = this.handleOrderCreationResponse.bind(this);
        this.onOrderCreationUnknownFailure = this.onOrderCreationUnknownFailure.bind(this);
        this.onOrderCreationSuccess = this.onOrderCreationSuccess.bind(this);
        this.onOrderCreationRetry = this.onOrderCreationRetry.bind(this);
        this.onOrderCreationKnownFailure = this.onOrderCreationKnownFailure.bind(this);
        this.connectToStomp = this.connectToStomp.bind(this);
        this.handleQueueMessage = this.handleQueueMessage.bind(this);
        this.handlePaymentProcessingResponse = this.handlePaymentProcessingResponse.bind(this);
        this.handleMoMoApiErrors = this.handleMoMoApiErrors.bind(this);
        this.retryTransactionCallback = this.retryTransactionCallback.bind(this);
        this.getMoMoStatus = this.getMoMoStatus.bind(this);
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

    getInputFieldValue(fieldStateName, newValue) {
        //const value = fieldStateName === 'phone' ? `250${newValue}` : newValue;
        this.setState({
            [fieldStateName]: newValue
        });
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
    
    handleOrderSubmission() {
        const { 
            terms, 
            phone, 
            buttonStatus,
            cartItems, 
            shipmentData
        } = this.state;
        const customerValidationRules = [
            [
                {
                    type: 'empty',
                    context: 'Terms and Conditions',
                    inputStateValue: terms,
                    inputStateName: 'terms'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'MTN Phone Number',
                    inputStateValue: phone,
                    inputStateName: 'phone'
                },
                {
                    type: 'phone',
                    context: 'MTN Phone Number',
                    inputStateValue: phone,
                    inputStateName: 'phone'
                }
            ]
            
        ];
        if (!this.validateInputFields(customerValidationRules)) {
            return;
        }

        this.setState({
            buttonStatus: 'submitting'
        });

        this.props.toogleDisplayOverlay(true, <MoMoWaitingUserMessage />);

        if (!isObjectEmpty(cartItems) && !isObjectEmpty(shipmentData)) {
            // handle redirection to migs
            const dataToSubmit = createPaymentSubmissionData('momo', cartItems, shipmentData);
            const token = getClientAuthToken();
            if (!isObjectEmpty(dataToSubmit) && token) {
                // check if there's no pending order
                const orderID = getOrderCookie();
                if (orderID) {
                    // use already existing order
                    //this.onOrderCreationRetry(orderID);
                    removeOrderDATACookie();
                    //return;
                }

                this.createOrderOnTheApi(dataToSubmit, token);
            }
        }
    }

    createOrderOnTheApi(dataToSubmit, token) {
        const { discountData } = this.state;
        const data = {
            payment_type: 'momo',
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
                this.handleOrderCreationResponse(response);
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

    handleOrderCreationResponse(response) {
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

    getMoMoStatus(orderId, token) {
        const data = {
            order_id: orderId
        };
        fetch(`${API_URL}/payments/momo/transaction`, {
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
                const { status, data, errors } = response;
                if (status === 'success') {
                    const message = {
                        Status: data.status
                    };
                    this.handleQueueMessage(message)
                } else if (status === 'failure') {
                    this.handleMoMoApiErrors(errors, 'cleartimeout');
                }
            } catch (err) {
                if (err) {
                    console.log(err);
                    if (momoTransactionRequestStatus !== undefined) {
                        clearInterval(momoTransactionRequestStatus);
                    }
                    if (timeoutInterval !== undefined) {
                        clearInterval(timeoutInterval);
                    }
                    this.onOrderCreationUnknownFailure(ORDER_CREATION_UNKWOWN_ERROR);
                } 
            }
        }).catch((err) => {
            if (err) {
                console.log('err', err);
                if (momoTransactionRequestStatus !== undefined) {
                    clearInterval(momoTransactionRequestStatus);
                }
                if (timeoutInterval !== undefined) {
                    clearInterval(timeoutInterval);
                }
                onOrderCreationUnknownFailure(ORDER_CREATION_UNKWOWN_ERROR);
            }
        });
    }

    connectToStomp(channelCredentials, orderID) {
        const {
            ws_url,
            mq_queue,
            mq_user,
            mq_password
        } = channelCredentials;
        const url = new WebSocket(ws_url);
        const client = Stomp.over(url);
        const queueName = `${mq_queue}${orderID}`;
        client.connect(
            mq_user,
            mq_password,
            (frame) => {
                this.setTimerForUnResponsiveQueue(client);
                client.subscribe(queueName, (message) => {
                    if (message.body) {
                        this.handleQueueMessage(message, client);
                    }
                }, 
                {'x-expires': 2700000}
                );
            },

            (err) => {
                console.log('err', err);
                console.log('retry connection here...');
                this.connectToStomp(channelCredentials, orderID);
            }
        );
    }

    handleQueueMessage(message, client) {
        // if (message.body) {
        //     const { body } = message;
        //     const data = JSON.parse(body);
        //     if (data.Status) {
            if (momoTransactionRequestStatus !== undefined) {
                const { Status } = message;
                switch(Status) {
                    case 'Pending':
                        // handle pending state;
                        this.props.toogleDisplayOverlay(true, <MoMoPendingUserMessage />);
                        return;
                    case 'Processed':
                        // User has successfully paid
                        /**
                         * Close socket connection
                         */
                        //client.disconnect(() => null);
                        if (momoTransactionRequestStatus !== undefined) {
                            clearInterval(momoTransactionRequestStatus);
                        }
                        this.props.toogleDisplayOverlay(true, <MoMoProcessedUserMessage />);
                        storeMoMoPaymentStatusCookie('Processed');
                        setTimeout(() => {
                            window.location = '/order-complete/momo';
                        }, 500);
                        return;
                    default:
                        if (momoTransactionRequestStatus !== undefined) {
                            clearInterval(momoTransactionRequestStatus);
                        }

                        if (timeoutInterval !== undefined) {
                            clearInterval(timeoutInterval);
                        }
                        const errorMessage = getMoMoErrorMessage("UNKOWN_ERROR");
                        this.props.toogleDisplayOverlay(
                            true, 
                            <MoMoUserErrorMessage 
                            message={errorMessage}
                            shouldRetry={true}
                            onActionCallback={this.retryTransactionCallback}
                            />
                        );
                        /**
                         * Close socket connection
                         */
                        //client.disconnect(() => null);

                }
            } 
               
        //     }
        // }
    }


    onOrderCreationSuccess(orderID) {
        removeOrderDATACookie();
        storeOrderDATACookie(orderID, 'momo');
        /**
         * Start listening in the queue for order updates
         */
        const { phone } = this.state;
        const token = getClientAuthToken();

        if (token && orderID && phone) {
            const data = {
                payment_type: 'momo',
                order_id: orderID,
                phone,
                return_url: APP_CARD_PAYMENT_RETURN_URL
            };
            
            fetch(`${API_URL}/payments/process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                const response = await res.json();
                this.handlePaymentProcessingResponse(response, orderID, token);
            }).catch ((err) => {
                if (err) {
                    console.log('err', err);
                }
            });
        }
         
    }

    setTimerForUnResponsiveQueue(client) {
        timeoutInterval = setInterval(() => {
            if (MOMO_PAYMENT_UNRESPONSIVENESS_TIMEOUT < 60) {
                MOMO_PAYMENT_UNRESPONSIVENESS_TIMEOUT = MOMO_PAYMENT_UNRESPONSIVENESS_TIMEOUT + 1;
            } else {
                const errorMessage = getMoMoErrorMessage("UNKOWN_ERROR");
                this.props.toogleDisplayOverlay(
                    true, 
                    <MoMoUserErrorMessage 
                    message={errorMessage}
                    shouldRetry={true}
                    onActionCallback={this.retryTransactionCallback}
                    />
                );
                MOMO_PAYMENT_UNRESPONSIVENESS_TIMEOUT = 0;
                if (timeoutInterval !== undefined) {
                    clearInterval(timeoutInterval);
                }

                if (momoTransactionRequestStatus !== undefined) {
                    clearInterval(momoTransactionRequestStatus);
                    momoTransactionRequestStatus = undefined;
                }
                
                /**
                 * Close socket connection
                 */
                //client.disconnect(() => null);
            }
            
        }, 1000);
    }

    handlePaymentProcessingResponse(response, orderID, token) {
        const { status } = response;
        switch(status) {
            case 'success':
                /**
                 * We have all the required params to process the payment
                 */
                const { data: { mq } } =  response;
                this.props.toogleDisplayOverlay(true, <MoMoPendingUserMessage />);
                // this.connectToStomp(mq, orderID); // stopping the listening in socket for now
                this.setTimerForUnResponsiveQueue();
                momoTransactionRequestStatus = setInterval(() => {
                    this.getMoMoStatus(orderID, token);
                }, 3000);
                break;
            case 'failure':
                /**
                 * Some errors happened
                 */
                const { errors } = response;
                if (errors) {
                    this.handleMoMoApiErrors(errors);
                } else  {
                    this.handleMoMoApiErrors([]);
                }
                break;
            default:
            /**
             * Unexpected error happened
             */
            this.handleMoMoApiErrors([]);
        }
    }

    handleMoMoApiErrors(errors, cl) {
        const errorMessage = errors.length !== 0 ?  getMoMoErrorMessage(errors[0]) : getMoMoErrorMessage("UNEXPECTED_ERROR");
        if (momoTransactionRequestStatus !== undefined) {
            clearInterval(momoTransactionRequestStatus);
        }
        if (cl !== undefined) {
            if (timeoutInterval !== undefined) {
                clearInterval(timeoutInterval);
            }
        }
        this.props.toogleDisplayOverlay(
            true, 
            <MoMoUserErrorMessage 
            message={errorMessage}
            shouldRetry={true}
            onActionCallback={this.retryTransactionCallback}
            />
        );
        return;
    }

    retryTransactionCallback() {
        this.props.toogleDisplayOverlay(false);
        this.setState({
            buttonStatus: 'initial'
        });
        return;
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

    render() {
        const { 
            inputWithError,
            inputIsInvalid,
            errorMessage,
            messageType
        } = this.state;
        return (
            <div>
                <MessageDisplayer 
                    display={inputIsInvalid ? true : false }
                    errorMessage={errorMessage}
                    type={messageType}
                />
                <div className='single-payment clicked'>
                    <div className='single-payment-title'>
                        <span className='title-left'>Mobile Money</span>
                        <span className='title-right'></span>
                    </div>
                    <div className='card-payment momo-payment'>
                        <h5>Pay with MTN Mobile Money at no hassle.</h5>
                        <h5>Enter MTN MoMo number</h5>
                        <InputField 
                            typeOfInput='text_field'
                            name='phone'
							type='text' 
                            placeholder='250 - - - - - - -'
                            updateInputFieldValue={this.getInputFieldValue}
                            inputWithError={inputWithError}
                        />
                        <p className="number-input__txt">Input phone number associated with your MTN Mobile Money Account.</p>
                        <p>1.Click "SUBMIT MY ORDER".</p>
                        <p>2.From the USSD prompt on your hand-held, input your Mobile Money PIN.</p>
                        <p>3.Follow further steps.</p>
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