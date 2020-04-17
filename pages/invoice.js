import React, { Component } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Global from '../components/reusable/Global';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import { getClientAuthToken } from '../helpers/auth';
import { API_URL } from '../config';
import { isArray } from 'util';
import '../assets/styles/main.scss';

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {}
        };
        this.PrintInvoice = this.PrintInvoice.bind(this);
        this.renderInvoiceProducts = this.renderInvoiceProducts.bind(this);
        this.renderSubTotal = this.renderSubTotal.bind(this);
        this.invoiceContent = this.invoiceContent.bind(this);
    };

    async componentDidMount() {
        const { router } = Router;
        const token = getClientAuthToken();
        const invoiceId = router.query.id;
        const res = await fetch(`${API_URL}/invoices/${invoiceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const response = await res.json();
        const data = response.data
        this.setState({
            invoiceData: data
        });
    }

    PrintInvoice() {
        window.print();
    };

    renderInvoiceProducts() {
        const { invoiceData } = this.state;
        if (Object.keys(invoiceData).length !== 0){
            const products = invoiceData.products;
            const productsLayouts = products.map((product) => {
                return (
                    <tr>
                        <td>
                            <tr>
                                <td>
                                    {/* <img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /> */}
                                </td>
                                <td>{product.name}
                                {/* <span>{product.unit_type}</span> */}
                                </td>
                            </tr>
                        </td>                                            
                        <td>{`Rwf ${product.price}`}</td>
                        <td>{product.quantity}</td>                                            
                        <td>{`Rwf ${product.total_price}`}</td>
                        <td>{product.seller}</td>
                    </tr>
                )
            });
            return productsLayouts;
        } else null
    };

    renderSubTotal() {
        const { invoiceData } = this.state;
        const products = invoiceData.products;
        var subTotal = 0;
        if(isArray(products)){
            for(let i = 0; i < products.length; i++) {
                subTotal += products[i].total_price;
            }
            return subTotal;
        } else null        
    };

    invoiceContent() {
        const { invoiceData } = this.state;
        if (Object.keys(invoiceData).length !== 0){
            return (
                <div>
                    <div className="invoice-header">
                        <button onClick={this.PrintInvoice} className="print-btn">Print Invoice</button>
                    </div>
                    <div ref = "PrintMe" className='maximum-width'>
                        <div className="invoice-wrapper">
                            <div className="main-title">
                                <h5>{`Invoice #${invoiceData.id}`}</h5>
                            </div>

                            <div className="row reset-row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                    <div className="card-content">
                                        <p>Shipping address</p>
                                        <h5>{`${ invoiceData.addresses.shipping.first_name} ${ invoiceData.addresses.shipping.last_name}`}</h5>
                                        <h5>{ invoiceData.addresses.shipping.street_addresses}</h5>
                                        <h5>{ invoiceData.addresses.shipping.address1}</h5>
                                        <h5>{`${ invoiceData.addresses.shipping.city}, ${ invoiceData.addresses.shipping.country}`}</h5>
                                        <h5>{`Phone: ${ invoiceData.addresses.shipping.phone}`}</h5>
                                        <h5>{`TIN number: ${ invoiceData.addresses.shipping.tin_number}`}</h5>
                                    </div>                             
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                    <div className="card-content">
                                        <p>Billing address</p>
                                        <h5>{`${ invoiceData.addresses.billing.first_name} ${ invoiceData.addresses.billing.last_name}`}</h5>
                                        <h5>{ invoiceData.addresses.billing.street_addresses}</h5>
                                        <h5>{ invoiceData.addresses.billing.address1}</h5>
                                        <h5>{`${ invoiceData.addresses.billing.city}, ${ invoiceData.addresses.billing.country}`}</h5>
                                        <h5>{`Phone: ${ invoiceData.addresses.billing.phone}`}</h5>
                                        <h5>{`TIN number: ${ invoiceData.addresses.billing.tin_number}`}</h5>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card empty-offset mobile-invisible">
                                    
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card company-info">
                                    <div className="card-content">
                                        <h5 className="company-details">DMMHeHe ltd</h5>                            
                                        <h5>KG  611 street</h5>
                                        <h5>Rugando - Remera</h5>
                                        <h5>Kigali, Rwanda</h5>
                                        <h5>Phone: 0723456789</h5>
                                        <h5>TIN number:</h5>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            <div className="row reset-row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                    <div className="card-content">
                                        <p>Shipping method</p>
                                        <h5>{ invoiceData.shipment_method}</h5>
                                    </div>                                                     
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                    <div className="card-content">
                                        <p>Total Paid</p>
                                        <h5>{`Rwf ${ invoiceData.total_paid}`}</h5>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card empty-offset">
                                    <div className="card-content">
                                        <p>Tracking Number</p>
                                        <h5>{ invoiceData.tracking_number}</h5>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                    <div className="card-content">
                                        <p>Payment status</p>
                                        <h5>{ invoiceData.payment_status}</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="table-wrapper">                
                                <table>
                                    <thead>
                                        <th>Items list</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total Price</th>
                                        <th>Seller</th>
                                    </thead>
                                    <tbody>
                                        {this.renderInvoiceProducts()}
                                    </tbody>
                                </table>
                            </div>

                            <div className="invoice-footer">
                                <p>{`Subtotal: ${this.renderSubTotal()}`}</p>
                                <p>{`Shipping cost: Rwf ${ invoiceData.shipment_cost}`}</p>
                                <h5>{`Grand Total: Rwf ${ invoiceData.total_paid}`}</h5>
                            </div>
                        </div>
                        <div className="invoice-footer">
                            <button onClick={this.PrintInvoice} className="print-btn">Print Invoice</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render () {
        return (
            <GoogleAnalyticsLogger>
                 <Global>
                    {this.invoiceContent()}
                </Global>
            </GoogleAnalyticsLogger>
        );
    }
}

export default Invoice;