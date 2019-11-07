import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { notify } from 'react-notify-toast';
import Breadcrumb from '../../reusable/Breadcrumb';
import InputField from '../../reusable/InputField';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import { getValidatedInputErrorMessage } from '../../../helpers/validation';
import { setPageAsVisited } from '../../../helpers/checkout_page_visits';
import { 
    storeTokenInLocalStorage, 
    storeAuthUserInfoInLocalStorage,
    redirectUserToAfterLoginPage
} from '../../../helpers/auth';
import {
    setDiscountForCustomerFirstPurchase
} from '../../../helpers/coupon_code_functionality';
import { 
    API_URL, 
    API_ROOT_URL,
    USER_AUTHENTICATED,
    UNKNOWN_ERROR,
    PLATFORM_CLIENT_ID,
    PLATFORM_CLIENT_SECRET,
    USER_FORBIDDEN,
    ALERT_TIMEOUT
} from '../../../config';


class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            newsletterCheckbox: 0,
            inputIsInvalid: false,
            errorMessage: '',
            loginStatus: 'initial',
            inputWithError: '',
            messageType: 'error'
        };
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.getLoginButtonText = this.getLoginButtonText.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.validateInputFields = this.validateInputFields.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.performOnRegistrationSuccess = this.performOnRegistrationSuccess.bind(this);
        this.performOnUserAuthFailure = this.performOnUserAuthFailure.bind(this);
        this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
        this.renderRegistrationActionLayout = this.renderRegistrationActionLayout.bind(this);
        this.renderForgotPasswordActionLayout = this.renderForgotPasswordActionLayout.bind(this);
    }

    getLoginButtonText() {
        const { loginStatus } = this.state;
        switch(loginStatus) {
            case 'submitting':
                return 'Logging...';
            case 'submitted':
                return 'Logged';
            default:
                return 'Login';
        }
    }

    
    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }
    
    handleFormSubmission(e) {
        e.preventDefault();
        const {
            email,
            password,
            newsletterCheckbox,
            loginStatus
        } = this.state;

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
                    context: 'Password',
                    inputStateValue: password,
                    inputStateName: 'password'
                }
            ]
        ];

        if (!this.validateInputFields(customerValidationRules)) {
            return;
        }

        if (loginStatus === 'initial') {
            this.setState({
                loginStatus: 'submitting'
            });

            fetch(`${API_URL}/customers/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    subscribed_to_news_letter: newsletterCheckbox
                })
            }).then(async (res) => {
                try {
                    const response = await res.json();
                    this.handleResponse(response);
                    
                } catch (err) {
                    console.log('error');
                    console.log(err);
                }
            });
        }
    }

    handleResponse(response) {
        const { status_code, errors } = response;
        switch(Number(status_code)) {
            case 200:
                const {
                    email,
                    first_name,
                    last_name,
                    gender,
                    cart_customer_id,
                    id
                } = response.data;
                const user = {
                    email,
                    first_name,
                    last_name,
                    gender,
                    cart_customer_id,
                    id
                };

                this.performOnRegistrationSuccess(user, this.state.password);
                break;
            case 401:
                const customErrorMessage = errors[0];
                this.performOnUserAuthFailure(customErrorMessage);
                break;
            default:
                this.performOnUserAuthFailure();
                notify.show(UNKNOWN_ERROR, 'error', ALERT_TIMEOUT);

        }
    }

    performOnUserAuthFailure(message) {
        const errMessage = ((message === '') || (message === undefined)) ? USER_FORBIDDEN : message; 
        this.setState({
            loginStatus: 'initial',
            inputIsInvalid: true,
            errorMessage: errMessage
        });
    }

    performOnRegistrationSuccess(user, userPassword) {
        fetch(`${API_ROOT_URL}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                grant_type: "password",
                client_id: PLATFORM_CLIENT_ID,
                client_secret: PLATFORM_CLIENT_SECRET,
                username: user.email,
                password: userPassword,
                scope: "*"
            })
        }).then(async (res) => {
            try {
                const response = await res.json();
                const {
                    access_token,
                    expires_in
                } = response;
                if (access_token) {
                    this.setState({
                        loginStatus: 'submitted',
                        inputIsInvalid: true,
                        messageType: 'success',
                        errorMessage: USER_AUTHENTICATED
                    });
                    const { redirectPageAfterLogin } = this.props;
                    /**
                     * Store token in cookie
                     * store user information in localstorage
                     * redirect to homepage
                     */
                    storeTokenInLocalStorage(access_token, expires_in);
                    storeAuthUserInfoInLocalStorage(user);
                    setDiscountForCustomerFirstPurchase(user);
                    setPageAsVisited('account'); // set checkout page account as visited
                    redirectUserToAfterLoginPage(redirectPageAfterLogin);
                } else {
                    this.performOnUserAuthFailure();
                }
            } catch (err) {
                console.log('error');
                console.log(err);
            }
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

    renderBreadCrumbs() {
        const { showBreadCrumbs } = this.props;
        if (showBreadCrumbs) {
            return (
                <Breadcrumb>
                    <a href="/" className="breadcrumb-link">Home</a>
                        <span> / </span>
                    <a href="/register" className="breadcrumb-current">Register</a>
                </Breadcrumb>
            );
        }
        return null;
    }

    renderRegistrationActionLayout() {
        const { displayRegistrationLayout } = this.props;
        if (displayRegistrationLayout) {
            return (
                <div className='auth-text'>
                    Don't have an account? <a href='/register'>Register</a>
                </div>
            );
        }

        return null;
    }

    renderForgotPasswordActionLayout() {
        const { displayForgotPasswordLayout } = this.props;
        if (displayForgotPasswordLayout) {
            return (
                <div className='auth-text'>
                    Forgot your password ? <a href='/forgot'>Reset</a>
                </div>
            );
        }
        return (
            <div className='auth-text'>
                Forgot your password ? <a href='/forgot'>Reset</a>
            </div>
        );
    }

    render() {
        const {
            inputWithError,
            inputIsInvalid,
            errorMessage,
            messageType
        } = this.state;
        const { actionTitle } = this.props;
        return (
            <div>
                {this.renderBreadCrumbs()}
                <div className='auth-title'>{actionTitle}</div>
                {/* auth title codes */}
                <div className="auth-title">
                    <img src="https://res.cloudinary.com/hehe/image/upload/v1571155428/logistics-platform/images/Group_1005.svg" />
                    <h5>Sign In with HeHe</h5>
                </div>
                <MessageDisplayer 
                display={inputIsInvalid ? true : false }
                errorMessage={errorMessage}
                type={messageType}
                />
                <form className='auth-form' onSubmit={this.handleFormSubmission}>
                    <InputField 
                        typeOfInput='text_field'
                        type='email' 
                        id='email'
                        name='email'
                        placeholder='Email'
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
                    
                    <InputField 
                        typeOfInput='text_field'
                        type='password' 
                        id='password'
                        name='password'
                        placeholder='Password'
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
                    
                    <InputField 
                        typeOfInput='checkbox'
                        type='checkbox'
                        name='newsletterCheckbox'
                        fieldText='Sign up for our newsletter!'
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
                    <div className='auth-button'>
                        {/* Auth button hehe */}
                        <button type="submit" className="auth-default-btn">
                            <img src="https://res.cloudinary.com/hehe/image/upload/v1571155428/logistics-platform/images/Group_1391.svg" />
                            {this.getLoginButtonText()}
                        </button>
                    </div>
                    {this.renderRegistrationActionLayout()}
                    {this.renderForgotPasswordActionLayout()}
                </form>
            </div>
        )
    }
}

export default SignInForm;