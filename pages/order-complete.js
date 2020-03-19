import React, { Component } from 'react';
import OrderFeedback from '../components/views/orderResponse/OrderFeeback';
import PopUpWrapper from '../components/reusable/PopUpWrapper';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
// import '../assets/styles/layouts/landing.scss';
// import '../assets/styles/layouts/auth.scss';
// import '../assets/styles/layouts/orderResponse.scss';
import { getTokenValue } from '../helpers/auth';
import { API_URL, APP_DOMAIN } from '../config';

class OrderComplete extends Component {
    static async getInitialProps({ req, res, asPath }) {
        const redirect = res;
        const mainPath = asPath;
        if (req) {
            if (!req.params.payment) {
                if (redirect) {
                    redirect.writeHead(302, {
                      Location: '/'
                    })
                    redirect.end();
                }
            }

            if (req.params.payment !== 'card' && req.params.payment !== 'momo') {
                if (redirect) {
                    redirect.writeHead(302, {
                        Location: '/'
                    })
                    redirect.end();
                }
            }

            const token = getTokenValue(req.headers.cookie);
            if (!token) {
                if (redirect) {
                    redirect.writeHead(302, {
                        Location: '/'
                    })
                    redirect.end();
                }
            }

            const orderID = getTokenValue(req.headers.cookie, 'ORDER_DATA');
            const paymentStatus = getTokenValue(req.headers.cookie, 'PAYMENT_STATUS');

            /**
             * Send Url to server to decide on the direction
             */
            let data = {};

            if (req.params.payment === 'card') {
                data = {
                    payment_method: `${req.params.payment}`,
                    payment_url: `${APP_DOMAIN}${mainPath}`
                };
            }

            if (req.params.payment === 'momo') {
                if (!orderID || !paymentStatus) {
                    if (redirect) {
                        redirect.writeHead(302, {
                            Location: '/'
                        })
                        redirect.end();
                    }
                }
                data = {
                    payment_method: `${req.params.payment}`,
                    payment_status: paymentStatus,
                    order_id: orderID
                };
            }
            
            const res = await fetch(`${API_URL}/payments/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const response = await res.json();
            if (response.status_code) {
                if(Number(response.status_code) == 200) {
                    if (response.data) {
                        if (response.data.data.status === 'success') {
                            return {
                                message: response.data.data.message,
                                displayedLayout: 'success'
                            };
                        } else {
                            return {
                                message: response.data.data.message,
                                displayedLayout: 'failure'
                            };
                        }
                    }
                }

                // check if there errors available
                if(response.data.data.errors) {
                    return {
                        message: response.data.data.errors[0],
                        displayedLayout: 'failure'
                    };
                }
            }

            return {
                message: 'Payment Failed',
                displayedLayout: 'failure'
            };
        }
        
        return {
            message: 'Payment Failed',
            displayedLayout: 'failure'
        };
    }
    
    render() {
        const { message, displayedLayout } = this.props;
        return (
            <GoogleAnalyticsLogger>
                 <div className='landing-main-wrapper'>
                    <PopUpWrapper/>
                    <div className='content-wrapper'>
                        <div className='order-response__content col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
                            {/* <OrderSuccess/> */}
                            <OrderFeedback
                            message={message}
                            displayedLayout={displayedLayout}
                            />
                        </div>
                    </div>
                </div>
            </GoogleAnalyticsLogger>
        );
    }
}

export default OrderComplete;