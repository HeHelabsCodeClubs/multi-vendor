import React, { Component } from 'react';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/invoice.scss';

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.PrintInvoice = this.PrintInvoice.bind(this);
    };

    PrintInvoice () {
        window.print();
    }

    render () {
        const invoice  = {
            "status": "success",
            "status_code_identifier": "success",
            "status_code": 200,
            "data": {
                "id": 15,
                "addresses": {
                    "billing_address": {
                        "address1": "Kibagabaga Kurwibutso",
                        "address2": "32",
                        "address_context": "B",
                        "city": "kigali",
                        "country": "rw",
                        "customer_id": 99,
                        "first_name": "Christophe",
                        "id": 32,
                        "last_name": "Mutabazi",
                        "name": "main",
                        "phone": "0788439355",
                        "postcode": 6,
                        "state": "02"
                    },
                    "shipping_address": {
                        "address1": "Kibagabaga Kurwibutso",
                        "address2": "32",
                        "address_context": "B",
                        "city": "kigali",
                        "country": "rw",
                        "customer_id": 99,
                        "first_name": "Christophe",
                        "id": 32,
                        "last_name": "Mutabazi",
                        "name": "main",
                        "phone": "0788439355",
                        "postcode": 6,
                        "state": "02"
                    }
                },
                "products": [
                    {
                        "name": "Zara",
                        "price": 6800,
                        "total_price": 89000,
                        "quantity": 12,
                        "seller": "Uzuri",
                        "attributes": [
                            {
                             "name": "Size",
                             "option": "L"
                            },
                            {
                             "name": "Color",
                             "option": "Green"
                            }
                        ]
                            
                    },
                    {
                        "name": "Gist",
                        "price": 6800,
                        "total_price": 89000,
                        "quantity": 18,
                        "seller": "Uzuri",
                        "attributes": []
                    }
                ],
                "shipment_method": "WHS NEXT DAY",
                "tracking_number": "WHS89609",
                "payment_status": "paid",
                "total_paid": 678000
            }
        }
        
        return (
            <Global>
                <div className="invoice-header">
                    <button onClick={this.PrintInvoice} className="print-btn">Print Invoice</button>
                </div>
                <div ref = "PrintMe" className='maximum-width'>
                    <div className="invoice-wrapper">
                        <div className="main-title">
                            <h5>Invoice #0015</h5>
                        </div>

                        <div className="row reset-row">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
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

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Billing address</p>
                                    <h5>Jane Mane,</h5>
                                    <h5>KG  611 street</h5>
                                    <h5>Rugando - Remera</h5>
                                    <h5>Kigali, Rwanda</h5>
                                    <h5>Phone: 0723456789</h5>
                                    <h5>TIN number:</h5>
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
                                    <h5>WHS NEXT DAY</h5>
                                </div>                                                     
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Total Paid</p>
                                    <h5>Rwf 6800</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card empty-offset">
                                <div className="card-content">
                                    <p>Tracking Number</p>
                                    <h5>WHS7900347757663R</h5>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-6 col-6 head-card">
                                <div className="card-content">
                                    <p>Payment status</p>
                                    <h5>PAID</h5>
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
                                        <td>Uzuri</td>
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
                                        <td>Uzuri</td>
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
                                        <td>Uzuri</td>
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
                                        <td>Uzuri</td>
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
                                        <td>Uzuri</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="invoice-footer">
                            <p>Subtotal: Rwf 21050</p>
                            <p>Shipping cost: Rwf 1050</p>
                            <h5>Grand Total: Rwf 21050</h5>

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

// class PrintInvoice extends Component {
//     render() {
//       return (
//         <div>
//           <ReactToPrint
//             trigger={() => <a href="#">Print this out!</a>}
//             content={() => this.componentRef}
//             copyStyles={true}
//           />
//           <Invoice ref={el => (this.componentRef = el)} />
//         </div>
//       );
//     }
//   }

// export default PrintInvoice;