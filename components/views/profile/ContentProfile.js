import React, { Component } from 'react';
import OrderRow from "../profile/OrderRow";

class ContentProfile extends Component {
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
                        <OrderRow/>
                    </table>
                </div>
            </div>
        );
    }
}

export default ContentProfile;