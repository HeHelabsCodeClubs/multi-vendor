import React, { Component } from 'react';
import { perfomOnPaymentSuccess } from '../../../helpers/process_payment';


class OrderSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Your payment is successfull'
        };
    }
    componentDidMount() {
        const { message } = this.props;
        this.setState({
            message
        });
        /**
         * Perform on payment successful
         * DONE:
         * 1.Clear local data cart
         * 2.Clear order Cookie
         * 3.Clear local shipment data
         */
        perfomOnPaymentSuccess();
    }
    componentWillReceiveProps(nextProps) {
        const { message } = nextProps;
        this.setState({
            message
        });
    }
    render() {
        const { message } = this.state;
        return (
            <div className='landing-wrapper success-content'>
                <div className='auth-content'>
                    <div>
                        <h1>Thank You</h1>
                    </div>
                    <div>
                        <h5>{message}</h5>
                        <p>Thank you for shopping with us! An automated receipt will</p>
                        <p>be sent on your registered email</p>
                    </div>
                    <ul>
                        <li><a href="/">Continue Shopping</a></li>
                        {/* <li>or Go to <a href="/order"> Orders page</a></li> */}
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

export default OrderSuccess;