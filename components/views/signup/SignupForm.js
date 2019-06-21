import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';
import fetch from 'isomorphic-unfetch';
import { notify } from 'react-notify-toast';
import { 
    API_URL, 
    USER_NOT_CREATED,
    SUCCESSFULLY_CREATED_USER,
    UNKNOWN_ERROR
} from '../../../config';
import '../../../assets/styles/layouts/landing.scss';
import '../../../assets/styles/layouts/auth.scss';

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
            newsletterCheckbox: 0,
            emailError: '',
            lastNameError: '',
            firstNameError: '',
            genderError: '',
            passwordError: '',
            passwordRepeatError: '',
            registerStatus: 'initial'
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getRegisterButtonText = this.getRegisterButtonText.bind(this);
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

    handleChange(e, context) {
        switch (context) {
            case 'first_name':
                this.setState({
                    firstName: e.target.value
                }, () => {
                    this.validateFirstName();
                });
                break;
            case 'last_name':
                this.setState({
                    lastName: e.target.value
                }, () => {
                    this.validateLastName();
                });
                break;
            case 'email':
                this.setState({
                    email: e.target.value
                }, () => {
                    this.validateEmail();
                });
                break;
            case 'gender':
                this.setState({
                    gender: e.target.value
                }, () => {
                    this.validateGender();
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value
                }, () => {
                    this.validatePassword();
                });
                break;
            case 'password_repeat':
                this.setState({
                    passwordRepeat: e.target.value
                }, () => {
                    this.validatePasswordRepeat();
                });
                break;
            case 'terms_checkbox':
                this.setState({
                    newsletterCheckbox: e.target.checked === true ? 1 : 0
                });
                break;
            default:
                // do nothing
        }
    }

    validateFirstName = () => {
        const { 
            firstName
        } = this.state;
        if (!firstName) {
            this.setState({
                firstNameError: 'The first name is required'
            });
        }
    }

    validateLastName = () => {
        const { 
            lastName
        } = this.state;
        if (!lastName) {
            this.setState({
                lastNameError: 'The last name is required'
            });
        }
    }

    validateEmail = () => {
        const { 
            email
        } = this.state;
        if (!email) {
            this.setState({
                emailError: 'The email is required'
            });
        }
    }

    validateGender = () => {
        const { 
            gender
        } = this.state;
        if (!gender) {
            this.setState({
                genderError: 'The gender is required'
            });
        }
    }

    validatePassword = () => {
        const { 
            password
        } = this.state;
        if (!password) {
            this.setState({
                passwordError: 'The password is required'
            });
        }
    }

    validatePasswordRepeat = () => {
        const { 
            passwordRepeat
        } = this.state;
        if (!passwordRepeat) {
            this.setState({
                passwordRepeatError: 'Please confirm your password'
            });
        }
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
    
    onSubmit(e) {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            passwordRepeat,
            gender,
            newsletterCheckbox,
            registerStatus
        } = this.state;

        console.log(this.state);
        if (registerStatus === 'initial') {
            if (password !== passwordRepeat) {
                notify.show('Passwords don\'t match', 'error', 2000);
            } else {
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
                        console.log(response);
                        this.setState({
                            registerStatus: 'submitted'
                        });
                        if (response.status_code === 201) {
                            notify.show(SUCCESSFULLY_CREATED_USER, 'success', 2000);
                        } else if (response.status_code === 405) {
                            notify.show(USER_NOT_CREATED, 'error', 2000);
                        } else {
                            notify.show(UNKNOWN_ERROR, 'error', 2000)
                        }
                    } catch (err) {
                        console.log('error');
                        console.log(err);
                    }
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div className='breadcrumbs'>Home / Registration</div>
                <div className='auth-title'>Register</div>
                <form className='auth-form' >
                    <div className='input-field'>
                        <input 
                            type='text'
                            id='first_name'
                            name='first_name'
                            placeholder='First Name' 
                            value={this.state.first_name}
                            onChange={(e) => this.handleChange(e, 'first_name')}
                            onBlur={this.validateFirstName}
                            className={`${this.state.firstNameError ? 'is-invalid' : ''}`} 
                        />
                        <div className='validation-error'>{this.state.firstNameError}</div>
                    </div>
                    <div className='input-field'>
                        <input 
                            type='text' 
                            id='last_name'
                            name='last_name'
                            placeholder='Last Name' 
                            value={this.state.last_name}
                            onChange={(e) => this.handleChange(e, 'last_name')} 
                            onBlur={this.validateLastName}
                            className={`${this.state.lastNameError ? 'is-invalid' : ''}`}
                        />
                        <div className='validation-error'>{this.state.lastNameError}</div>
                    </div>
                    <div className='input-field'>
                        <input 
                            type='email' 
                            id='email'
                            name='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={(e) => this.handleChange(e, 'email')} 
                            onBlur={this.validateEmail}
                            className={`${this.state.emailError ? 'is-invalid' : ''}`}
                        />
                        <div className='validation-error'>{this.state.emailError}</div>
                    </div>
                    <div className='input-field'>
                        <Select2
                            id='gender'
                            name='gender'
                            data={[
                                { text: 'Female', id: 'female' },
                                { text: 'Male', id: 'male' },
                            ]}
                            options={{
                                placeholder: 'Gender'
                            }}
                            value={this.state.gender}
                            onChange={(e) => this.handleChange(e, 'gender')}
                            onBlur={this.validateGender}
                            className={`${this.state.genderError ? 'is-invalid' : ''}`}
                        />
                        <div className='validation-error'>{this.state.genderError}</div>
                    </div>
                    <div className='input-field'>
                        <input 
                            type='password' 
                            id='password'
                            name='password'
                            placeholder='Password'
                            value={this.state.password}
                            onChange={(e) => this.handleChange(e, 'password')} 
                            onBlur={this.validatePassword}
                            className={`${this.state.passwordError ? 'is-invalid' : ''}`}
                        />
                        <div className='validation-error'>{this.state.passwordError}</div>
                    </div>
                    <div className='input-field'>
                        <input 
                            type='password' 
                            id='password_repeat'
                            name='password_repeat'
                            placeholder='Repeat password' 
                            value={this.state.password_repeat}
                            onChange={(e) => this.handleChange(e, 'password_repeat')} 
                            onBlur={this.validatePasswordRepeat}
                            className={`${this.state.passwordRepeatError ? 'is-invalid' : ''}`}
                        />
                        <div className='validation-error'>{this.state.passwordRepeatError}</div>
                    </div>
                    <div className='checkbox-field'>
                        <input 
                            type='checkbox' 
                            id='terms_checkbox'
                            name='terms_checkbox'
                            checked={this.state.terms_checkbox}
                            onChange={(e) => this.handleChange(e, 'terms_checkbox')} 
                        />
                        <span>Select the checkbox to accept the Terms and Conditions</span>
                    </div>
                    <div className='checkbox-field'>
                        <input 
                            type='checkbox'
                        />
                        <span>Sign up for our newsletter!</span>
                    </div>
                    <div className='auth-button'>
                        <button onClick={(e) => this.onSubmit(e)}>{this.getRegisterButtonText()}</button>
                    </div>
                    <div className='auth-text'>Already have an account? <a href='/signin'>Login</a></div>
                </form>
            </div>
        )
    }
}

export default SignupForm;