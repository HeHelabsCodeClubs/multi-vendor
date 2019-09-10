import _ from 'lodash';
import React, { Component } from 'react';
import currencyDisplay from '../../../helpers/currency_display';

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
                const amount = Math.trunc(order.base_grand_total);
                const paymentStatus = order.status === 'processing' ? 'paid' : order.status.split('_').join(' ');
                const id = order.order_id;
                return (                    
                    <tr onClick={() => this.triggerSingleOrderDisplay(id)}>
                        <td><a href='#' onClick={() => this.triggerSingleOrderDisplay(id)}>#{id}</a></td>
                        <td>{date[0]} <span>{date[1]}</span></td>
                        {/* <td> <span className="badge-txt">In progress</span></td> */}
                        <td>Rwf {currencyDisplay(order.base_grand_total)} <span>{order.method_title}</span></td>
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
                            <th>Amount</th>
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