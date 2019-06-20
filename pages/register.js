import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import '../assets/styles/layouts/landing.scss';
import '../assets/styles/layouts/auth.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            password: '',
            passwordRepeat: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, context) {
        switch (context) {
            case 'first_name':
                this.setState({
                    firstName: e.target.value
                });
                break;
            case 'last_name':
                this.setState({
                    lastName: e.target.value
                });
                break;
            case 'email':
                this.setState({
                    email: e.target.value
                });
                break;
            case 'gender':
                this.setState({
                    gender: e.target.value
                });
                break;
            case 'password':
                this.setState({
                    password: e.target.value
                });
                break;
            case 'password_repeat':
                this.setState({
                    passwordRepeat: e.target.value
                });
                break;
            default:
                // do nothing
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            passwordRepeat,
            gender
        } = this.state;

        console.log(this.state);

        if (password !== passwordRepeat) {
            alert("Passwords don't match");
        } else {
            fetch(`${API_URL}/customers/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    user_type: 'customer',
                    password: password,
                    gender: gender
                })
            }).then(async (res) => {
                try {
                    const response = await res.json();
                   // this.handleApiResponse(response);
                } catch (err) {
                    console.log('error');
                    console.log(err);
                }
            });
        }
    }

    render () {
        return (
            <div className='landing-main-wrapper'>
                <div className='row reset-row background-images'>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556122597/multi-vendor/Group_403.png' />
                    </div>
                </div>
                <div className='content-wrapper'>
                    <div className='col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
                        <div className='landing-wrapper'>
                            <div className='auth-content'>
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
                                        />
                                    </div>
                                    <div className='input-field'>
                                        <input 
                                            type='text' 
                                            id='last_name'
                                            name='last_name'
                                            placeholder='Last Name' 
                                            value={this.state.last_name}
                                            onChange={(e) => this.handleChange(e, 'last_name')} 
                                        />
                                    </div>
                                    <div className='input-field'>
                                        <input 
                                            type='email' 
                                            id='email'
                                            name='email'
                                            placeholder='Email'
                                            value={this.state.email}
                                            onChange={(e) => this.handleChange(e, 'email')} 
                                        />
                                    </div>
                                    <div className='input-field'>
                                        <Select2
                                            id='gender'
                                            name='gender'
                                            data={[
                                                { text: 'Female', id: 'female' },
                                                { text: 'Male', id: 'male' },
                                            ]}
                                            placeholder='Gender'
                                            value={this.state.gender}
                                            onChange={(e) => this.handleChange(e, 'gender')}
                                        />
                                    </div>
                                    <div className='input-field'>
                                        <input 
                                            type='password' 
                                            id='password'
                                            name='password'
                                            placeholder='Password'
                                            value={this.state.password}
                                            onChange={(e) => this.handleChange(e, 'password')} 
                                        />
                                    </div>
                                    <div className='input-field'>
                                        <input 
                                            type='password' 
                                            id='password_repeat'
                                            name='password_repeat'
                                            placeholder='Repeat password' 
                                            value={this.state.password_repeat}
                                            onChange={(e) => this.handleChange(e, 'password_repeat')} 
                                        />
                                    </div>
                                    <div className='checkbox-field'>
                                        <input 
                                            type='checkbox' 
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
                                        <button onClick={(e) => this.onSubmit(e)}>Register</button>
                                    </div>
                                    <div className='auth-text'>Already have an account? <a href='/signin'>Login</a></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;