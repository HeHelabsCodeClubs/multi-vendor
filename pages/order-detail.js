import React, { Component } from 'react';
import Router from 'next/router';
import localforage from 'localforage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderContent from '../components/views/profile/OrderContent';
import SideProfile from "../components/views/profile/SideProfile";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/profile.scss';
import fetch from 'isomorphic-unfetch';
import { API_URL, CART_ITEMS_KEY } from '../config';
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
        };
        this.handleReorder = this.handleReorder.bind(this);
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

    handleReorder() {
        // clear cart
        localforage.removeItem(CART_ITEMS_KEY).then((data) => {
            const {customerOrdersData} = this.state;

            var newCart = {};
            if (Object.keys(customerOrdersData).length !== 0) {
                const cartContent = customerOrdersData.items;

                Object.values(cartContent).forEach(value =>{
                    const { name, url, icon } = value.store_info.store;
                    const orderProducts = value.products;

                    var products = {};
                    
                    for ( let i = 0; i < orderProducts.length; i++ ) {
                        const {name, price, qty_ordered, } = orderProducts[i];
                        const product_name = {
                            name,
                            cart_image_url: '',
                            has_attributes: 0,
                            price,
                            quantity: qty_ordered,
                            stock: 100,
                            has_discount: 0,
                            special_price: 0,
                            discount_percent: 0,
                            attributes: 
                                {
                                    short_description: "<p>Amazing Kid’s Scooter</p>",
                                    description: "<p>Amazing Kid’s Scooter</p>",
                                    meta_title: "",
                                    meta_keywords: "",
                                    meta_description: "Amazing Kid’s Scooter",
                                    weight: "12"
                                }
                        }
                        products[name] = product_name;
                    }

                    const info = {
                        name,
                        url,
                        icon,
                        shipment_methods: []
                    }
                    const storeDetails = {
                        info,
                        products
                    }
                    newCart[name] = storeDetails;  
                })
            }
            console.log('items are', newCart);
            console.log('order items are', customerOrdersData.items);

            localforage.setItem(CART_ITEMS_KEY, newCart).then((data) => {
                Router.replace('/checkout/addresses');
            })

        }).catch((err) => {
            console.log(err);
        });

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
