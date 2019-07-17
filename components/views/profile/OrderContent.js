import React, { Component } from 'react';

class OrderContent extends Component {
    constructor(props) {
        super(props);
    }

    renderOrderInfo(info, payment) {
        const paymentStatus = info.status;
        return (
            <div>
                <h5>Placed on {info.created_at}</h5>

                <div className="row reset-row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                        <div className="card-content">
                            <p>Payment method</p>
                            <h5>{payment.method_title}</h5>
                        </div>
                        <div className="card-content">
                            <p>Tracking Number</p>
                            <h5>WHS7900347757663R</h5>
                        </div>                                
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="card-content">
                            <p>Shipping method</p>
                            <h5>{info.shipping_method}</h5>
                        </div>
                        <div className="card-content">
                            <p>Payment status</p>
                            <h5>{paymentStatus}</h5>
                        </div>

                        <div className="card-content">
                            <p>Total Paid</p>
                            <h5>Rwf {info.base_grand_total}</h5>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                    <div className="card-content">
                            <p>Shipping Carrier</p>
                            <h5>{info.shipping_title}</h5>
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
            </div>
        )
    }

    renderOrderItems(items) {
        for (let i = 0; i < items.length; i++) {
            const itemLayout = items[i].map((item) => {
                return (
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
                                                <td>{item.name}<span>Pair</span></td>
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
                )
            });
            return itemLayout;
        }
    }
    render () {
        const { info, payment, shipping, items } = this.props;
        return (
            <div>
                {this.renderOrderInfo(info, payment)}
                {this.renderOrderItems(items)}
            </div>
        );
    }
}

export default OrderContent;