import React, { Component } from 'react';
import Router from 'next/router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderContent from '../components/views/profile/OrderContent';
import SideProfile from "../components/views/profile/SideProfile";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/profile.scss';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import { getClientAuthToken, getTokenValue } from '../helpers/auth';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';

class OrderDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerOrdersData: [],
            orderDetailsInfo: {},
            orderPayments: {},
            orderShippingAddress: {},
            orderBillingAddress: {},
            orderItems: [],
            newcartItem: {},
            newCartContent: {}
        };
        this.handleReorder = this.handleReorder.bind(this);
        this.updateNewCartItems = this.updateNewCartItems.bind(this);
    }
    static async getInitialProps({ req, res }) {
        const token = req ? getTokenValue(req.headers.cookie) : getClientAuthToken();
        if (token) {
            const orderId = req ? req.params.id : Router.router.query.id;

            const res = await fetch(`${API_URL}/customers/orders/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const response = await res.json();
            
            return {
                customerOrdersData: response.data,
                orderDetailsInfo: response.data.detail.info,
                orderPayments: response.data.detail.payment,
                orderShippingAddress: response.data.detail.adress.shipping_address,
                orderBillingAddress: response.data.detail.adress.billing_address,
                orderItems: response.data.items
            }

        } else {
            Router.push('/signin')
        }
    }

    componentDidMount() {
        const { customerOrdersData, orderDetailsInfo, orderPayments, orderShippingAddress, orderBillingAddress, orderItems } = this.props;
        
        if (customerOrdersData) {
            this.setState({
                customerOrdersData,
                orderDetailsInfo,
                orderPayments,
                orderShippingAddress,
                orderBillingAddress,
                orderItems
            });            
        }
    }

    updateNewCartItems() {
        const {customerOrdersData, newCartContent} = this.state;
        if (Object.keys(customerOrdersData).length !== 0) {
            const cartContent = customerOrdersData.items;
            var newCart = {};
            Object.values(cartContent).forEach(value =>{
                const storeName =  value.store_info.store.name;
                const products =  value.products;
                newCart[storeName] = products;  
                
            })
            this.setState({
                newCartContent: newCart
            })
            console.log('new cart items are', newCartContent);
            window.localStorage.setItem('CART_ITEMS', JSON.stringify(newCartContent));
        }
    }

    handleReorder() {
        // clear cart
        window.localStorage.removeItem('CART_ITEMS');

        // clear shipping methods

        // update new cart
        this.updateNewCartItems();
        
    
        // Update shipping methods

    }

    render () {
        const { orderDetailsInfo, orderPayments, orderShippingAddress, orderBillingAddress, orderItems } = this.state;
        return (
            <GoogleAnalyticsLogger>
                <Global>
                    <div className="row reset-row profile-page">
                        <div className="col-lg-3 col-md-3 col-sm-5 col-12 sidemenu">
                            <SideProfile />
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-7 col-12 main-content">
                            <div className="order-detail">
                                <div className="content-header">
                                    <h5>Order #{orderDetailsInfo.id}</h5>
                                    <div>
                                        <button onClick={this.handleReorder} className="primry-btn">Re-order</button>
                                    </div>
                                </div>

                                <Tabs>
                                    <TabList>
                                        <Tab>General info</Tab>
                                    </TabList>
                                
                                    <TabPanel>
                                        <OrderContent 
                                        info={orderDetailsInfo}
                                        payment={orderPayments}
                                        shipping={orderShippingAddress}
                                        billing={orderBillingAddress}
                                        items={orderItems}
                                        />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </Global>
            </GoogleAnalyticsLogger>
        );
    }
}

export default OrderDetailPage;
