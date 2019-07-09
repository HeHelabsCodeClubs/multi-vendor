import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class OrderDetail extends Component {
    render () {
        return (
            <div>
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
                        <h5>Placed on Jan 12, 2016, 16:18</h5>

                        <div className="row reset-row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                                <div className="card-content">
                                    <p>Payment method</p>
                                    <h5>MTN Mobile money</h5>
                                </div>
                                <div className="card-content">
                                    <p>Tracking Number</p>
                                    <h5>WHS7900347757663R</h5>
                                </div>                                
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className="card-content">
                                    <p>Shipping method</p>
                                    <h5>WHS NEXT DAY</h5>
                                </div>
                                <div className="card-content">
                                    <p>Payment status</p>
                                    <h5>PAID</h5>
                                </div>

                                <div className="card-content">
                                    <p>Total Paid</p>
                                    <h5>Rwf 6800</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <div className="card-content">
                                    <p>Shipping Carrier</p>
                                    <h5>WHS</h5>
                                </div>

                                <div className="card-content">
                                    <p>Shipping address</p>
                                    <h5>Jane Mane,</h5>
                                    <h5>KG  611 street</h5>
                                    <h5>Rugando - Remera</h5>
                                    <h5>Kigali, Rwanda</h5>
                                    <h5>Phone: 0723456789</h5>
                                    <h5>TIN number:</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                                <div className="card-content">
                                    <p></p>
                                    <h5></h5>
                                </div>
                                <div className="card-content">
                                    <p></p>
                                    <h5></h5>
                                </div>
                            </div>
                        </div>



                    </TabPanel>
                    <TabPanel>
                        <h2>Any content 2</h2>
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