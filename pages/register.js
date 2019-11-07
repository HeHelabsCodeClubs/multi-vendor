import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import SignupForm from '../components/views/signup/SignupForm';
import PopUpWrapper from '../components/reusable/PopUpWrapper';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import '../assets/styles/main.scss';

class Register extends Component {
    render () {
        return (
            <GoogleAnalyticsLogger>
                <div className='landing-main-wrapper'>
                    <Notifications />
                    <PopUpWrapper/>

                    <div className='content-wrapper dont-center'>
                        <div className='col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
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
            </GoogleAnalyticsLogger>
        );
    }
}

export default Register;