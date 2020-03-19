import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderContent from './OrderContent';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';
import { getClientAuthToken } from '../../../helpers/auth';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsInfo: {},
            orderPayments: {},
            orderShippingAddress: {},
            orderBillingAddress: {},
            orderItems: [],
        };
    }
    async componentDidMount() {
        const token = getClientAuthToken();
        const { orderId } = this.props;
        const res = await fetch(`${API_URL}/customers/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const response = await res.json();
        this.setState({
            orderDetailsInfo: response.data.detail.info,
            orderPayments: response.data.detail.payment,
            orderShippingAddress: response.data.detail.adress.shipping_address,
            orderBillingAddress: response.data.detail.adress.billing_address,
            orderItems: response.data.items
        });
    }

    render () {
        const { orderDetailsInfo, orderPayments, orderShippingAddress, orderBillingAddress, orderItems } = this.state;
        return (
            <div className="order-detail">
                <div className="content-header">
                    <h5>Order #{orderDetailsInfo.id}</h5>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>General info</Tab>
                        {/* <Tab>Messages</Tab> */}
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

                    {/* <TabPanel>
                        <h2>Any content 3</h2>
                    </TabPanel> */}
                </Tabs>

            </div>
        );
    }
}

export default OrderDetail;