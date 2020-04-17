import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import SignupForm from '../components/views/signup/SignupForm';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import Global from '../components/reusable/Global';
import '../assets/styles/main.scss';

class Register extends Component {
    render () {
        return (
            <Global>
                <GoogleAnalyticsLogger>
                    <div className='landing-main-wrapper register'>
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
                </GoogleAnalyticsLogger>
            </Global>
        );
    }
}

export default Register;