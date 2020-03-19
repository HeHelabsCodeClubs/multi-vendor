import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { notify } from 'react-notify-toast';
// import '../../../assets/styles/layouts/landing.scss';
// import '../../../assets/styles/layouts/auth.scss';
import Breadcrumb from '../../reusable/Breadcrumb';
import InputField from '../../reusable/InputField';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import { getValidatedInputErrorMessage } from '../../../helpers/validation';
import { 
    API_URL,
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
        this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
    }

    getLoginButtonText() {
        const { loginStatus } = this.state;
        switch(loginStatus) {
            case 'submitting':
                return 'Sending...';
            case 'submitted':
                return 'Sent';
            default:
                return 'Send';
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
            ]
        ];

        if (!this.validateInputFields(customerValidationRules)) {
            return;
        }

        if (loginStatus === 'initial') {
            this.setState({
                loginStatus: 'submitting'
            });

            fetch(`${API_URL}/customers/recover`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            }).then(async (res) => {
                try {
                    const response = await res.json();

                    if(response.status === 'success') {
                        this.setState({
                            loginStatus: 'submitted'
                        });
                        notify.show(response.data.message, 'success', ALERT_TIMEOUT);
                        setTimeout(() => {
                            window.location.href = '/signin';
                        }, 5000);
                    } else {
                        this.setState({
                            loginStatus: 'initial'
                        });
                        notify.show(`We couldn\'t send you a password recovery email, Please try again later`, 'error', ALERT_TIMEOUT);
                    }
                    
                } catch (err) {
                    console.log('error');
                    console.log(err);
                }
            });
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

    renderBreadCrumbs() {
        const { showBreadCrumbs } = this.props;
        if (showBreadCrumbs) {
            return (
                <Breadcrumb>
                    <a href="/" className="breadcrumb-link">Home</a>
                        <span> / </span>
                    <a href="/signin" className="breadcrumb-current">Signin</a>
                </Breadcrumb>
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
        const { actionTitle } = this.props;
        return (
            <div>
                {this.renderBreadCrumbs()}
                <div className='auth-title'>{actionTitle}</div>
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
                    <div>We will send you a link via this email to reset your password</div>
                    <div className='auth-button'>
                        <button type='submit'>
                            {this.getLoginButtonText()}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignInForm;