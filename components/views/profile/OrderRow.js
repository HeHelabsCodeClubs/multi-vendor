import _ from 'lodash';
import React, { Component } from 'react';

class OrderRow extends Component {
    constructor(props) {
        super(props);
    }

    triggerSingleOrderDisplay(id) {
        this.props.changeActiveContent(id);
    }

    renderOrders(orders) {
        if (!_.isEmpty(orders)) {
            const orderLayout = orders.map((order) => {
                const date = order.created_at.split(' ');
                const paymentStatus = order.status === 'processing' ? 'paid' : order.status.split('_').join(' ');
                const id = order.order_id;
                return (
                    <tr>
                        <td><a href='#' onClick={() => this.triggerSingleOrderDisplay(id)}>#{id}</a></td>
                        <td>{date[0]} <span>{date[1]}</span></td>
                        <td className="mobile-invisible">{order.method_title}</td>
                        <td className="mobile-invisible"> <span className="badge-txt">{paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}</span> </td>
                        {/* <td> <span className="badge-txt">In progress</span></td> */}
                        <td>Rwf {order.base_grand_total} <span className="mobile-visible">{order.method_title}</span></td>
                        <td className="mobile-invisible"><a href="#" onClick={() => this.triggerSingleOrderDisplay(id)}><span className='icon-external_link'></span></a></td>
                    </tr>
                );
            });
            return orderLayout
        }
    }

    render () {
        const { orders } = this.props;
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
                            <th className="mobile-invisible">Payment method</th>
                            <th className="mobile-invisible">Payment status</th>
                            <th>Amount</th>
                            <th className="mobile-invisible">Action</th>
                        </thead>
                        <tbody>
                            {this.renderOrders(orders)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OrderRow;