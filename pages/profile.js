import React, { Component } from 'react';
import Router from 'next/router';
import SideProfile from "../components/views/profile/SideProfile";
import Global from '../components/reusable/Global';
import OrderRow from '../components/views/profile/OrderRow';
// import OrderDetail from "../components/views/profile/OrderDetail";
import '../assets/styles/layouts/profile.scss';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import { getClientAuthToken, getTokenValue } from '../helpers/auth';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerOrdersData: [],
        };
    }
    static async getInitialProps({ req, res }) {
        const token = req ? getTokenValue(req.headers.cookie) : getClientAuthToken();
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
            return {
                customerOrdersData: response.data
            }
        } else {
            if (req) {
                res.writeHead(302, {
                    Location: '/signin'
                    })
                res.end()
            } else {
                Router.push('/signin')
            }
        }
    }

    componentDidMount() {
        const { customerOrdersData } = this.props;
        if (customerOrdersData) {
            this.setState({
                customerOrdersData
            });
        }
    }

    render () {
        const { customerOrdersData } = this.state;
        return (
            <GoogleAnalyticsLogger>
                <Global>
                    <div className="row reset-row profile-page">
                        <div className="col-lg-3 col-md-3 col-sm-5 col-12 sidemenu">
                            <SideProfile />
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-7 col-12 main-content">
                            <OrderRow 
                            orders={customerOrdersData}
                            />
                        </div>
                    </div>
                </Global>
            </GoogleAnalyticsLogger>
        );
    }
}

export default Profile;