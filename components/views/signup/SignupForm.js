import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { notify } from 'react-notify-toast';
import '../../../assets/styles/layouts/landing.scss';
import '../../../assets/styles/layouts/auth.scss';
import { 
    API_URL, 
    API_ROOT_URL,
    USER_NOT_CREATED,
    SUCCESSFULLY_CREATED_USER,
    UNKNOWN_ERROR,
    PLATFORM_CLIENT_ID,
    PLATFORM_CLIENT_SECRET
} from '../../../config';
import InputField from '../../reusable/InputField';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import { getValidatedInputErrorMessage } from '../../../helpers/validation';
import { 
    storeTokenInLocalStorage, 
    storeAuthUserInfoInLocalStorage,
    redirectUserToAfterLoginPage
} from '../../../helpers/auth';
import Breadcrumb from '../../reusable/Breadcrumb';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            password: '',
            passwordRepeat: '',
            terms: 0,
            newsletterCheckbox: 0,
            inputIsInvalid: false,
            errorMessage: '',
            registerStatus: 'initial',
            inputWithError: '',
            messageType: 'error'
        };

        //this.validationsRules = customerRegistrationValidationRules;
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.getRegisterButtonText = this.getRegisterButtonText.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.validateInputFields = this.validateInputFields.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.performOnRegistrationSuccess = this.performOnRegistrationSuccess.bind(this);
        this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
        this.renderLoginActionLayout = this.renderLoginActionLayout.bind(this);
    }

    getRegisterButtonText() {
        const { registerStatus } = this.state;
        switch(registerStatus) {
            case 'submitting':
                return 'Registering...';
            case 'submitted':
                return 'Registered';
            default:
                return 'Register';
        }
    }

    
    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }

    renderErrors(errors) {
		if (!_.isEmpty(errors)) {
			const errorList = errors.map(error => {
				return <li key={error}>{error}</li>;
			});
			return <ul>{errorList}</ul>;
		}
		return <div />;
    }
    
    handleFormSubmission(e) {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            passwordRepeat,
            gender,
            newsletterCheckbox,
            terms,
            registerStatus
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
                    context: 'Gender',
                    inputStateValue: gender,
                    inputStateName: 'gender'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'Password',
                    inputStateValue: password,
                    inputStateName: 'password'
                }
            ],
            [
                {
                    type: 'empty',
                    context: 'Password confirmation',
                    inputStateValue: passwordRepeat,
                    inputStateName: 'passwordRepeat'
                },
                {
                    type: 'password_confirmation',
                    context: 'Password confirmation',
                    inputStateValue: passwordRepeat,
                    optionalInputStateValue: password,
                    inputStateName: 'passwordRepeat'
                }
            ],
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

        if (registerStatus === 'initial') {
            this.setState({
                registerStatus: 'submitting'
            });

            fetch(`${API_URL}/customers/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    user_type: 'customer',
                    password: password,
                    gender: gender,
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
        const { status_code } = response;
        switch(Number(status_code)) {
            case 201:
                this.setState({
                    registerStatus: 'submitted',
                    inputIsInvalid: true,
                    messageType: 'success',
                    errorMessage: SUCCESSFULLY_CREATED_USER
                });
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
            case 405:
                this.setState({
                    registerStatus: 'initial',
                    inputIsInvalid: true,
                    errorMessage: USER_NOT_CREATED
                });
                break;
            default:
                this.setState({
                    registerStatus: 'initial',
                    inputIsInvalid: true,
                    errorMessage: USER_NOT_CREATED
                });
                notify.show(UNKNOWN_ERROR, 'error', 2000);

        }
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
                    /**
                     * Store token in cookie
                     * store user information in localstorage
                     * redirect to homepage
                     */
                    storeTokenInLocalStorage(access_token, expires_in);
                    storeAuthUserInfoInLocalStorage(user);
                    redirectUserToAfterLoginPage('/');
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
                    <a href="#" className="breadcrumb-current">Register</a>
                </Breadcrumb>
            );
        }
        return null;
    }

    renderLoginActionLayout() {
        const { displayLoginLayout } = this.props;
        if (displayLoginLayout) {
            return (
                <div className='auth-text'>
                    Already have an account? <a href='/signin'>Login</a>
                </div>
            );
        }

        return null;
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
                {this.renderBreadCrumbs()}
                <div className='auth-title'>Register</div>
                <MessageDisplayer 
                display={inputIsInvalid ? true : false }
                errorMessage={errorMessage}
                type={messageType}
                />
                <form className='auth-form' onSubmit={this.handleFormSubmission}>
                    <InputField
                        typeOfInput='text_field'
                        type='text'
                        id='first-name'
                        name='firstName'
                        placeholder='First Name' 
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
                    <InputField
                        typeOfInput='text_field'
                        type='text' 
                        id='last-name'
                        name='lastName'
                        placeholder='Last Name' 
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
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
                        typeOfInput='selector'
                        id='gender'
                        name='gender'
                        selectorData={[
                            { text: 'Female', id: 'female' },
                            { text: 'Male', id: 'male' },
                        ]}
                        placeholder='Gender'
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
                        typeOfInput='text_field'
                        type='password' 
                        id='password_repeat'
                        name='passwordRepeat'
                        placeholder='Repeat password' 
                        updateInputFieldValue={this.getInputFieldValue}
                        inputWithError={inputWithError}
                    />
                    <InputField 
                        typeOfInput='checkbox'
                        type='checkbox'
                        name='terms'
                        fieldText='Select the checkbox to accept the Terms and Conditions'
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
                        <button type='submit'>
                            {this.getRegisterButtonText()}
                        </button>
                    </div>
                    {this.renderLoginActionLayout()}
                </form>
            </div>
        )
    }
}

export default SignupForm;