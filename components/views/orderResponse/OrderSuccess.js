import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { notify } from 'react-notify-toast';
import '../../../assets/styles/layouts/landing.scss';
import '../../../assets/styles/layouts/auth.scss';
import '../../../assets/styles/layouts/orderResponse.scss';


class OrderSuccess extends Component {
    render() {
        return (
            <div className='landing-wrapper success-content'>
                <div className='auth-content'>
                    <div>
                        <h1>Thank You</h1>
                    </div>
                    <div>
                        <h5>Your payment is successfull</h5>
                        <p>Thank yo for shopping with us! An automated receipt will</p>
                        <p>be sent on your registered email</p>
                    </div>
                    <ul>
                        <li><a href="/">Go back home</a></li>
                        <li>or Go to <a href="/order"> Orders page</a></li>
                    </ul>
                    <div className="site-logo">
                        <a href='/'>
                            <img src='https://res.cloudinary.com/hehe/image/upload/v1556120378/multi-vendor/HeHe_Logo_Original_landscape.svg' />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderSuccess;