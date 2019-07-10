import React, { Component } from 'react';
import { getTokenValue } from '../helpers/auth';
import { API_URL } from '../config';

export default class Process extends Component {
    constructor(props) {
        super(props);
    }

    static async getInitialProps({ req, res }) {
        const redirect = res;
        if (req) {
                const token = getTokenValue(req.headers.cookie);
                const orderData = getTokenValue(req.headers.cookie, 'ORDER_DATA');
                if (orderData && token) {
                    const data = {
                        payment_type: req.params.payment,
                        order_id: orderData
                    };
                    const res = await fetch(`${API_URL}/payments/process`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                    });
                    const response = await res.json();
                    if (response.status_code) {
                        if (response.data) {
                            if (response.data.redirect_url) {
                                if (redirect) {
                                    redirect.writeHead(302, {
                                      Location: response.data.redirect_url
                                    })
                                    redirect.end()
                                }
                            }
                        }
                    }
                    return {};
                }
                return {};
        } 
        return {};
    }
    render() {
        return <div />
    }
}