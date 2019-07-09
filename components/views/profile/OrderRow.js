import React, { Component } from 'react';

class OrderRow extends Component {
    render () {
        return (
            <div>
                <div className="content-header">
                    <h5>Orders</h5>
                </div>
                <div className="table-wrapper">                
                    <table>
                        <thead>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Payment method</th>
                            <th>Payment status</th>
                            <th>Delivery status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a href="#">#000012</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>
                            <tr>
                                <td><a href="#">#000013</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>

                            <tr>
                                <td><a href="#">#000014</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>

                            <tr>
                                <td><a href="#">#000015</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>

                            <tr>
                                <td><a href="#">#000016</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>


                            <tr>
                                <td><a href="#">#000017</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>
                            <tr>
                                <td><a href="#">#000018</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>

                            <tr>
                                <td><a href="#">#000019</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>
                            <tr>
                                <td><a href="#">#000020</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>
                            <tr>
                                <td><a href="#">#000021</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>
                            <tr>
                                <td><a href="#">#000022</a></td>
                                <td>Jan 12, 2016 <span>16:18</span></td>
                                <td>Cash on delivery</td>
                                <td> <span className="badge-txt">Paid </span> </td>
                                <td> <span className="badge-txt">In progress</span></td>
                                <td>Rwf 6800</td>
                                <td><a href="#"><span className='icon-Path-60'></span></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderRow;