import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import SignupForm from '../components/views/signup/SignupForm';
import Header from '../components/reusable/header/Header';
import '../assets/styles/layouts/landing.scss';
import '../assets/styles/layouts/auth.scss';
import '../assets/styles/layouts/header.scss';
import Global from '../components/reusable/Global';

class Register extends Component {
    render () {
        return (
            <Global>
                <div className='landing-main-wrapper'>
                    <Notifications />
                    <div className='content-wrapper dont-center'>
                        <div className='col-12'>
                            <div className='landing-wrapper'>
                                <div className='auth-content'>
                                    <SignupForm 
                                    showBreadCrumbs={true}
                                    displayLoginLayout={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Global>
        )
    }
}

export default Register;