import React, { Component } from 'react';

class UserDetail extends Component {
    render () {
        return (
            <div className="user-detail">
                <div className="user-header">
                    <div className="user-dp">
                        <img src="https://res.cloudinary.com/hehe/image/upload/v1559573668/multi-vendor/products/1/vro0lorshxiasgf8eg9d.jpg" />
                    </div>
                    <h5>Jane Doe</h5>
                </div>

                <div className="user-summary__detail">
                    <table>
                        <tr>
                            <td>0 <span>All Orders</span></td>
                            <td>0 <span>Awaiting Payment</span></td>
                            <td>0 <span>Awaiting Shipment</span></td>
                            <td>0 <span>Awaiting delivery</span></td>
                            <td>0 <span>Awaiting Feedback</span></td>
                            <td>0 <span>Disputes</span></td>
                        </tr>
                    </table>
                </div>

                <div className="row reset-row user-info__body">
                    <div className="col-12">
                        <div className="card-content">
                            <div className="card-header">
                                <h5>Profile Details</h5>
                                <button><span className='icon-Path-68'></span> Edit</button>
                            </div>

                            <div className="card-body">
                                <table>
                                    <tr>
                                        <td>FistName:</td>
                                        <th>Jane</th>
                                    </tr>
                                    <tr>
                                        <td>LastName:</td>
                                        <th>Doe</th>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <th>0788300901</th>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <th>djane@email.sell</th>
                                    </tr>
                                    <tr>
                                        <td>Password:</td>
                                        <th>*********</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="card-content">
                            <div className="card-header">
                                <h5>Address 1</h5>
                                <div className="button-container">
                                    <button><span className='icon-Path-68'></span> Edit</button>
                                    <button><span className='icon-Path-60'></span> Delete</button>
                                </div>
                                
                            </div>

                            <div className="card-body">
                                <table>
                                    <tr>
                                        <td>Country:</td>
                                        <th>RWANDA</th>
                                    </tr>
                                    <tr>
                                        <td>Province:</td>
                                        <th>Kigali</th>
                                    </tr>
                                    <tr>
                                        <td>City:</td>
                                        <th>Kigali</th>
                                    </tr>
                                    <tr>
                                        <td>Neighborhood:</td>
                                        <th>Rugando-Remera</th>
                                    </tr>
                                    <tr>
                                        <td>House No.:</td>
                                        <th>10</th>
                                    </tr>
                                    <tr>
                                        <td>Street No.:</td>
                                        <th>Kg 7 ave</th>
                                    </tr>
                                    <tr>
                                        <td>Address type:</td>
                                        <th>Residential</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="card-content">
                            <div className="card-header">
                                <h5>Address 2</h5>
                                <div className="button-container">
                                    <button><span className='icon-Path-68'></span> Edit</button>
                                    <button><span className='icon-Path-60'></span> Delete</button>
                                </div>
                            </div>

                            <div className="card-body">
                            <table>
                                    <tr>
                                        <td>Country:</td>
                                        <th>RWANDA</th>
                                    </tr>
                                    <tr>
                                        <td>Province:</td>
                                        <th>Kigali</th>
                                    </tr>
                                    <tr>
                                        <td>City:</td>
                                        <th>Kigali</th>
                                    </tr>
                                    <tr>
                                        <td>Neighborhood:</td>
                                        <th>Kicukiro-Gahanga</th>
                                    </tr>
                                    <tr>
                                        <td>House No.:</td>
                                        <th>10</th>
                                    </tr>
                                    <tr>
                                        <td>Street No.:</td>
                                        <th>KK 171 st</th>
                                    </tr>
                                    <tr>
                                        <td>Address type:</td>
                                        <th>Residential</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetail;