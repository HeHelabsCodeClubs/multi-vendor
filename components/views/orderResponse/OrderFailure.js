import React, { Component } from 'react';

class OrderFailure extends Component {
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
            <div className='landing-wrapper failure-content'>
                <div className='auth-content'>
                    <div>
                        <h1>Sorry</h1>
                    </div>
                    <div>
                        <h5>{message}</h5>
                        {/* <p>Something went wrong! Please make sure you filled out</p>
                        <p>true and try again!</p> */}
                    </div>
                    <ul>
                        <li><a href="/checkout/payment">Try again</a></li>
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