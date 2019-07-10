import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrderContent from './OrderContent';
import Invoice from './Invoice';

class OrderDetail extends Component {
    render () {
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
                        <OrderContent/>
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