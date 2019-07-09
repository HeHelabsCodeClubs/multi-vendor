import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { notify } from 'react-notify-toast';
import '../../../assets/styles/layouts/landing.scss';
import '../../../assets/styles/layouts/auth.scss';
import '../../../assets/styles/layouts/orderResponse.scss';


class OrderFailure extends Component {
    render() {
        return (
            <div className='landing-wrapper failure-content'>
                <div className='auth-content'>
                    <div>
                        <h1>Sorry</h1>
                    </div>
                    <div>
                        <h5>Your payment Failed</h5>
                        <p>Something went wrong! Please make sure you filled out</p>
                        <p>true and try again!</p>
                    </div>
                    <ul>
                        <li><a href="#">Try again</a></li>
                        <li>or Go to <a href="/">Home page</a></li>
                    </ul>
                    <div className="site-logo">
                        <a href='/'>
                            <img src='https://res.cloudinary.com/hehe/image/upload/v1556120378/multi-vendor/HeHe_Logo_Original_landscape.svg' />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderFailure;