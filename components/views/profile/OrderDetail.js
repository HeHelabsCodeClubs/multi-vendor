import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderContent from './OrderContent';
import Invoice from './Invoice';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';
import { getClientAuthToken } from '../../../helpers/auth';

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerSingleOrdersData: []
        };
    }
    async componentDidMount() {
        const { orderId } = this.props;
        const token = getClientAuthToken();
        const res = await fetch(`${API_URL}/customers/orders/87`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const response = await res.json();
        console.log(response);
        this.setState({
            customerSingleOrderData: response.data
        });
    }

    render () {
        const { customerSingleOrderData } = this.state;
        return (
            <div className="order-detail">
                <div className="content-header">
                    <h5>Order #0015</h5>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>General info</Tab>
                        <Tab>Invoice</Tab>
                        <Tab>Messages</Tab>
                    </TabList>
                
                    <TabPanel>
                        <OrderContent order={customerSingleOrderData}/>
                    </TabPanel>

                    <TabPanel>
                        <Invoice/>
                    </TabPanel>

                    <TabPanel>
                        <h2>Any content 3</h2>
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}

export default OrderDetail;