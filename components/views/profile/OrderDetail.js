import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
                                    <p>Delivery status</p>
                                    <h5>DELIVERED</h5>
                                </div>
                                <div className="card-content">
                                    <p>Billing address</p>
                                    <h5>Same as billing addess</h5>
                                </div>
                            </div>
                        </div>

                        <div className='delivery-content'>
                            <div className='store-logo'>
                                <img className='store-img' src="" />
                                <span className='store-name'>
                                    <span className='name'>Mart</span>(3 Items from Hmart store)
                                </span>
                            </div>
                            <div className="table-wrapper">                
                                <table>
                                    <thead>
                                        <th>Order items</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total Price</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <tr>
                                                    <td><img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /></td>
                                                    <td>Zara<span>Pair</span></td>
                                                </tr>
                                            </td>                                            
                                            <td>Rwf 6800</td>
                                            <td>12</td>                                            
                                            <td>Rwf 6800</td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <tr>
                                                    <td><img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /></td>
                                                    <td>Zara<span>Pair</span></td>
                                                </tr>
                                            </td>                                            
                                            <td>Rwf 6800</td>
                                            <td>12</td>                                            
                                            <td>Rwf 6800</td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <tr>
                                                    <td><img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /></td>
                                                    <td>Zara<span>Pair</span></td>
                                                </tr>
                                            </td>                                            
                                            <td>Rwf 6800</td>
                                            <td>12</td>                                            
                                            <td>Rwf 6800</td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <tr>
                                                    <td><img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /></td>
                                                    <td>Zara<span>Pair</span></td>
                                                </tr>
                                            </td>                                            
                                            <td>Rwf 6800</td>
                                            <td>12</td>                                            
                                            <td>Rwf 6800</td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <tr>
                                                    <td><img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /></td>
                                                    <td>Zara<span>Pair</span></td>
                                                </tr>
                                            </td>                                            
                                            <td>Rwf 6800</td>
                                            <td>12</td>                                            
                                            <td>Rwf 6800</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className='total-price'>
                                <div className='subtotal'>
                                    <span className='t-title'>Subtotal: </span>
                                    <span className='t-content'>Rwf 21050</span>	
                                </div>
                                <div className='shipping-grid'>
                                    <span className='shipping-title'>Shipping method</span>
                                    <span className='shipping-dropdown'>
                                        WHS internatianal
                                    </span>
                                    Shipping: Rwf 1050
                                </div>
                                <div className='total-grid checkout-total-grid row reset-row'>
                                    Delivery time 6 days
                                    <span className='total'>
                                        <span className='t-title'>Total: </span>
                                        <span className='t-content'>Rwf 21050</span>
                                    </span>
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