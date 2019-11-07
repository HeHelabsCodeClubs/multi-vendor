import _ from 'lodash';
import React, { Component } from 'react';
import Link from 'next/link';
import currencyDisplay from '../../../helpers/currency_display';

class OrderRow extends Component {
    constructor(props) {
        super(props);
    }

    getOrderStatusWrapperClass(orderStatus) {
        switch(orderStatus) {
            case 'processing':
                return 'delivered';
            case 'pending_payment':
                return 'pending-payment';
            case 'pending':
                return 'pending';
            case 'canceled':
                return 'canceled';
            default:
                return ';'
        }
    }

    renderOrders(orders) {
        
        if (!_.isEmpty(orders)) {
            const orderLayout = orders.map((order) => {
                const date = order.created_at.split(' ');
                const amount = Math.trunc(order.base_grand_total);
                const paymentStatus = order.status === 'processing' ? 'paid' : order.status.split('_').join(' ');
                const id = order.order_id;
                const statusWrapperClassName = this.getOrderStatusWrapperClass(order.status);
                return (
                    <tr>
                        <td>
                            <Link href={`/profile/orders?id=${order.id}`} as={`/profile/orders/${order.id}`}>
                                <a>#{id}</a>
                            </Link>
                        </td>
                        <td>{date[0]} <span>{date[1]}</span></td>
                        <td className="mobile-invisible">{order.method_title}</td>
                        <td className="mobile-invisible"> <span className={`badge-txt ${statusWrapperClassName}`}>{paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}</span> </td>
                        <td>Rwf {currencyDisplay(order.base_grand_total)} <span className="mobile-visible">{order.method_title}</span></td>
                        <td className="mobile-invisible">
                            <Link href={`/profile/orders/?id=${order.id}`} as={`/profile/orders/${order.id}`}>
                                <a><span className='icon-external_link'></span></a>
                            </Link>
                        </td>
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