import React, { Component } from 'react';
import Router from 'next/router';
import localforage from 'localforage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderContent from '../components/views/profile/OrderContent';
import SideProfile from "../components/views/profile/SideProfile";
import Global from '../components/reusable/Global';
import fetch from 'isomorphic-unfetch';
import { API_URL, CART_ITEMS_KEY } from '../config';
import { getClientAuthToken, getTokenValue, getUserAuthenticatedInfo } from '../helpers/auth';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import '../assets/styles/main.scss';

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
            authuser: {}
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
        const { customerOrdersData} = this.state
        localforage.removeItem(CART_ITEMS_KEY).then((data) => {
            var newCart = {};
            if (Object.keys(customerOrdersData).length !== 0) {
                const cartContent = customerOrdersData.items;

                Object.values(cartContent).forEach(value =>{
                    const { name, url, icon } = value.store_info.store;
                    const orderProducts = value.products;

                    var products = {};
                    
                    for ( let i = 0; i < orderProducts.length; i++ ) {
                        const {name, price, qty_ordered, } = orderProducts[i];

                        const has_attributes = 0;
                        
                        if (has_attributes === 0 ) {
                            const attributes = {
                                short_description: "<p>Amazing Kid’s Scooter</p>",
                                description: "<p>Amazing Kid’s Scooter</p>",
                                meta_title: "",
                                meta_keywords: "",
                                meta_description: "Amazing Kid’s Scooter",
                                weight: "12"
                            }
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
                                attributes                                
                            };
                            products[name] = product_name;

                        } else {
                            const meta = [
                                {
                                    quantity: 1,
                                    stock: 10,
                                    options: {
                                        Sizes: {
                                            attribute_id: 273,
                                            option_id: 595,
                                            title: "Khaki (42)"
                                        }
                                    },
                                    price: 15000,
                                    has_discount: 0,
                                    special_price: 0,
                                    discount_percent: 0
                                }
                            ];

                            const attributes = {
                                short_description: "<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Color: Beige-Khaki</p>\r\n<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\"> </p>\r\n<p style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Size: Beige (38) ,Khaki (38)-(42</p>",
                                description: "<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Color: Beige-Khaki</p>\r\n<p class=\"MsoNormal\" style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\"> </p>\r\n<p style=\"box-sizing: border-box; margin: 5px 0px 15px; line-height: 1.6em; border: none; background: none; box-shadow: none; color: #333333; font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;\">Size: Beige (38) ,Khaki (38)-(42</p>",
                                options: [
                                    {
                                        type: "select",
                                        code: "4893-25-844",
                                        title: "Sizes",
                                        is_required: 1,
                                        data: [
                                            {
                                                attribute_id: 273,
                                                attribute_sort: 2412,
                                                option_id: 594,
                                                title: "Beige (38) "
                                            },
                                            {
                                                attribute_id: 273,
                                                attribute_sort: 2413,
                                                option_id: 595,
                                                title: "Khaki (42)"
                                            }
                                        ]
                                    }
                                ],
                                meta_title: "",
                                meta_keywords: "",
                                meta_description: "Color: Beige-Khaki\r\n\r\n\r\nSize: Beige (38) ,Khaki (38)-(42",
                                weight: "12"
                            };

                            const product_name = {
                                name,
                                cart_image_url: '',
                                has_attributes,
                                meta,
                                attributes,
                                price,
                                has_discount: 0,
                                special_price: 0,
                                discount_percent: 0
                            }

                            products[name] = product_name;
                        };
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
