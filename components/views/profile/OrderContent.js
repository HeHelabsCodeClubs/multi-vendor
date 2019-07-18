import React, { Component } from 'react';

class OrderContent extends Component {
    constructor(props) {
        super(props);
    }

    renderOrderInfo(info, payment, shipping, billing) {
        const paymentStatus = info.status;
        const shippingName = `${shipping.first_name} ${shipping.last_name}`
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
                            <h5>{shippingName}</h5>
                            <h5>{shipping.address2}</h5>
                            <h5>{shipping.city}</h5>
                            <h5>Phone: {shipping.phone}</h5>
                            <h5>TIN number:</h5>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                        <div className="card-content">
                            <p>Delivery status</p>
                            <h5>DELIVERED</h5>
                        </div>
                        {this.renderBillingAddress(shipping, billing)}
                    </div>
                </div>
            </div>
        )
    }

    renderBillingAddress(shipping, billing) {
        const billingName = `${billing.first_name} ${billing.last_name}`
        if (
            shipping.address1 === billing.address1 &&
            shipping.address2 === billing.address2 &&
            shipping.city === billing.city &&
            shipping.country === billing.country &&
            shipping.first_name === billing.first_name &&
            shipping.last_name === billing.last_name &&
            shipping.phone === billing.phone
        ) {
            return (
                <div className="card-content">
                    <p>Billing address</p>
                    <h5>Same as billing addess</h5>
                </div>
            )
        } else {
            return (
                <div className="card-content">
                    <p>Shipping address</p>
                    <h5>{billingName}</h5>
                    <h5>{billing.address2}</h5>
                    <h5>{billing.city}</h5>
                    <h5>Phone: {billing.phone}</h5>
                    <h5>TIN number:</h5>
                </div>
            )
        }
    }

    renderOrderItems(items) {
        const stores = items
        const sellers = Object.keys(stores).map(function(key) {
            return [Number(key), stores[key]];
        });
        const sellerLayout = sellers.map((seller) => {
            console.log('seller', seller);
            const products = seller[1].products;
            const store = seller[1].store_info;
            const productsLayout = products.map((product) => {
                const productImg = product.image !== null ? product.image.path : null;
                return (
                    <div className='delivery-content'>
                        <div className='store-logo'>
                            <img className='store-img' src={store.store.logo} />
                            <span className='store-name'>
                                <span className='name'>{store.store.name}</span>({products.length} Items from {store.store.name} store)
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
                                                <td><img src={productImg} /></td>
                                                <td>{product.name}<span>{product.type}</span></td>
                                            </tr>
                                        </td>                                            
                                        <td>Rwf {product.price}</td>
                                        <td>{product.qty_ordered}</td>                                            
                                        <td>Rwf {product.total}</td>
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
            })
            return productsLayout;
        });
        return sellerLayout;
    }
    render () {
        const { info, payment, shipping, billing, items } = this.props;
        return (
            <div>
                {this.renderOrderInfo(info, payment, shipping, billing)}
                {this.renderOrderItems(items)}
            </div>
        );
    }
}

export default OrderContent;