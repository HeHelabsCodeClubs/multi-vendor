import React, { Component } from 'react';
import OrderSuccess from '../components/views/orderResponse/OrderSuccess';
import OrderFailure from '../components/views/orderResponse/OrderFailure';
import PopUpWrapper from '../components/reusable/PopUpWrapper';
import '../assets/styles/layouts/landing.scss';
import '../assets/styles/layouts/auth.scss';
import '../assets/styles/layouts/orderResponse.scss';

class OrderResponse extends Component {
    render () {
        return (
            <div className='landing-main-wrapper'>
                <PopUpWrapper/>

                <div className='content-wrapper'>
                    <div className='order-response__content col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
                        <div className='landing-wrapper'>
                            <div className='auth-content'>
                                <OrderSuccess/>
                                {/* <OrderFailure/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderResponse;