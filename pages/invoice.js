import React, { Component } from 'react';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/invoice.scss';

var invoice  = {
    status: "success",
    status_code_identifier: "success",
    status_code: 200,
    data: {
        id: 15,
        addresses: {
            billing_address: {
                address1: "Kibagabaga Kurwibutso",
                address2: "32",
                street_addresses: "KG 612 street",
                address_context: "B",
                city: "kigali",
                country: "rw",
                customer_id: 99,
                first_name: "Christophe",
                id: 32,
                last_name: "Mutabazi",
                name: "main",
                phone: "0788439355",
                postcode: 6,
                state: "02",
                tin_number: "108641618"
            },
            shipping_address: {
                address1: "Kibagabaga Kurwibutso",
                address2: "32",
                street_addresses: "KG 612 street",
                address_context: "B",
                city: "kigali",
                country: "rw",
                customer_id: 99,
                first_name: "Christophe",
                id: 32,
                last_name: "Mutabazi",
                name: "main",
                phone: "0788439355",
                postcode: 6,
                state: "02",
                tin_number: "108641618"
            }
        },
        products: [
            {
                name: "Zara",
                price: 6800,
                total_price: 89000,
                quantity: 12,
                seller: "Uzuri",
                unit_type: "pair",
                attributes: [
                    {
                        name: "Size",
                        option: "L"
                    },
                    {
                        name: "Color",
                        option: "Green"
                    }
                ]
            },
            {
                name: "Gist",
                price: 8000,
                total_price: 100000,
                quantity: 18,
                seller: "Uzuri",
                unit_type: "pair",
                attributes: []
            }
        ],
        shipment_method: "WHS NEXT DAY",
        shipment_cost: 2000,
        tracking_number: "WHS89609",
        payment_status: "paid",
        total_paid: 678000
    }
};

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.PrintInvoice = this.PrintInvoice.bind(this);
        this.renderInvoiceProducts = this.renderInvoiceProducts.bind(this);
        this.renderSubTotal = this.renderSubTotal.bind(this);
    };

    PrintInvoice() {
        window.print();
    };

    renderInvoiceProducts() {
        const products = invoice.data.products;
        const productsLayouts = products.map((product) => {
            return (
                <tr>
                    <td>
                        <tr>
                            <td><img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" /></td>
                            <td>{product.name}<span>{product.unit_type}</span></td>
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
    };

    renderSubTotal() {
        const products = invoice.data.products;
        var subTotal = 0;
        for(let i = 0; i < products.length; i++) {
            subTotal += products[i].price;
        }
        return subTotal;
    };

    render () {
        return (
            <Global>
                <div className="invoice-header">
                    <button onClick={this.PrintInvoice} className="print-btn">Print Invoice</button>
                </div>
                <div ref = "PrintMe" className='maximum-width'>
                    <div className="invoice-wrapper">
                        <div className="main-title">
                            <h5>{`Invoice #${invoice.data.id}`}</h5>
                        </div>

                        <div className="row reset-row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Shipping address</p>
                                    <h5>{`${invoice.data.addresses.shipping_address.first_name} ${invoice.data.addresses.shipping_address.last_name}`}</h5>
                                    <h5>{invoice.data.addresses.shipping_address.street_addresses}</h5>
                                    <h5>{invoice.data.addresses.shipping_address.address1}</h5>
                                    <h5>{`${invoice.data.addresses.shipping_address.city}, ${invoice.data.addresses.shipping_address.country}`}</h5>
                                    <h5>{`Phone: ${invoice.data.addresses.shipping_address.phone}`}</h5>
                                    <h5>{`TIN number: ${invoice.data.addresses.shipping_address.tin_number}`}</h5>
                                </div>                             
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Billing address</p>
                                    <h5>{`${invoice.data.addresses.billing_address.first_name} ${invoice.data.addresses.billing_address.last_name}`}</h5>
                                    <h5>{invoice.data.addresses.billing_address.street_addresses}</h5>
                                    <h5>{invoice.data.addresses.billing_address.address1}</h5>
                                    <h5>{`${invoice.data.addresses.billing_address.city}, ${invoice.data.addresses.billing_address.country}`}</h5>
                                    <h5>{`Phone: ${invoice.data.addresses.billing_address.phone}`}</h5>
                                    <h5>{`TIN number: ${invoice.data.addresses.billing_address.tin_number}`}</h5>
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
                                    <h5>{invoice.data.shipment_method}</h5>
                                </div>                                                     
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Total Paid</p>
                                    <h5>{`Rwf ${invoice.data.total_paid}`}</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card empty-offset">
                                <div className="card-content">
                                    <p>Tracking Number</p>
                                    <h5>{invoice.data.tracking_number}</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Payment status</p>
                                    <h5>{invoice.data.payment_status}</h5>
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
                            <p>{`Shipping cost: Rwf ${invoice.data.shipment_cost}`}</p>
                            <h5>{`Grand Total: Rwf ${invoice.data.total_paid}`}</h5>
                        </div>
                    </div>
                    <div className="invoice-footer">
                    <button onClick={this.PrintInvoice} className="print-btn">Print Invoice</button>
                </div>
                </div>
            </Global>
        );
    }
}

export default Invoice;