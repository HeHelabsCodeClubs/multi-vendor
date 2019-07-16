import React, { Component } from 'react';
import SideProfile from "../components/views/profile/SideProfile";
import ContentProfile from "../components/views/profile/ContentProfile";
import Global from '../components/reusable/Global';
import OrderRow from '../components/views/profile/OrderRow';
import OrderDetail from "../components/views/profile/OrderDetail";
import '../assets/styles/layouts/profile.scss';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import { getClientAuthToken, getTokenValue } from '../helpers/auth';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //customerOrdersData: [],
            activeContent: 'orders'
        };
    }
    static async getInitialProps({req, query}) {
        if (req) {
            const token = getTokenValue(req.headers.cookie);
            if (token) {
                const token = getClientAuthToken();
                const res = await fetch(`${API_URL}/customers/orders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const response = await res.json();
                return {
                    customerOrdersData: response.data
                };
            }
        } else {
            const isClient = typeof document !== undefined;
            if (isClient) {
                const token = getClientAuthToken();
                const { page } = query;
                if (token) {
                    const res = await fetch(`${API_URL}/customers/orders`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const response = await res.json();
                    console.log(reponse);
                    return {
                        customerOrdersData: response.data
                    };
                }
            }
        }
        return {}
    }

    renderContentProfile() {
        const { activeContent, customerOrdersData } = this.state;
        console.log('customerOrders', customerOrdersData);
        console.log(activeContent);
        switch(activeContent) {
            case 'orders':
                return <OrderRow 
                orders={customerOrdersData} 
                changeActiveContent={() => this.changeActiveContent()}
                />
            
            case 'singleOrder':
                <OrderDetail />
            
            default:
                // Redirect to 404 page
        }
    }

    render () {
        //const { customerOrdersData } = this.state;
        return (
            <Global>
                <div className="row reset-row profile-page">
                    <div className="col-lg-3 col-md-3 col-sm-5 col-12 sidemenu">
                        <SideProfile />
                    </div>

                    <div className="col-lg-9 col-md-9 col-sm-7 col-12 main-content">
                        {/* <ContentProfile customerOrders={customerOrdersData} /> */}
                        {this.renderContentProfile()}
                    </div>
                </div>
            </Global>
        );
    }
}

export default Profile;