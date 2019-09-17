import React, { Component } from 'react';
import Router from 'next/router';
// import SideProfile from "../components/views/profile/SideProfile";
import Global from '../components/reusable/Global';
import OrderRow from '../components/views/profile/OrderRow';
import OrderDetail from "../components/views/profile/OrderDetail";
import '../assets/styles/layouts/profile.scss';
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import { getClientAuthToken, getUserAuthenticatedInfo, logoutUser } from '../helpers/auth';
import isObjectEmpty from '../helpers/is_object_empty';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContent: 'orders',
            customerOrdersData: [],
            activeId: 0,
            authUser: {}
        };
        this.renderContentProfile = this.renderContentProfile.bind(this);
        this.changeActiveContent = this.changeActiveContent.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.updateAuthUser = this.updateAuthUser.bind(this);
        this.renderUserProfile = this.renderUserProfile.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    async componentDidMount() {
        const isClient = typeof document !== undefined;
        if (isClient) {
            const token = getClientAuthToken();
            getUserAuthenticatedInfo((user) => {
                this.updateAuthUser(user);
            });
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
                this.setState({
                    customerOrdersData: response.data
                })
            } else {
                Router.push('/signin')
            }
        }
    }

    updateAuthUser(user) {
        this.setState({
            authUser: user
        });
    }
    logOut(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        logoutUser();
    }

    renderUserProfile() {
        const { authUser, customerOrdersData} = this.state;
        const numberOfOrders= customerOrdersData.length;
        if (!authUser) {
            logoutUser()
        }
        if (!isObjectEmpty(authUser)) {
            const {
                last_name,
                first_name
            } = authUser;
            const fullName = `${last_name} ${first_name}`;

            // get initial of the first_name
            const getInitials = function(name) {
                const parts = first_name.split(' ');
                let initial = '';
                for (var i = 0; i < parts.length; i++ ) {
                    if (parts[i].length > 0 && parts[i] !== '' ) {
                        initial += parts[i][0]
                    }
                }
                return initial
            }

            return (
                <div className="user-profile-wrapper">
                    <div className="profile-img-wrapper">
                        <span>{getInitials(first_name)}</span>
                    </div>
                    <div>
                        <h5>{fullName}</h5>
                        <div>
                            <span>{numberOfOrders} oders</span>
                        </div>
                    </div>
                    <div className="logout-btn-wrapper">
                        <a href="/logout" onClick={this.logOut}>Logout</a>
                    </div>
                </div>
            );
        }
    }

    changeActiveContent(id) {
        const { activeContent } = this.state;
        if (id !== undefined) {
            this.setState({
                activeId: id
            });
        }
        if (activeContent === 'orders') {
            this.setState({
                activeContent: 'singleOrder'
            });
        }
    }

    renderContentProfile() {
        const { activeContent, customerOrdersData, activeId } = this.state;
        switch(activeContent) {
            case 'orders':
                return (
                    <OrderRow 
                    orders={customerOrdersData}
                    changeActiveContent={this.changeActiveContent}
                    />
                );
            case 'singleOrder':
                return <OrderDetail orderId={activeId}/>
            
            default:
                // Redirect to 404 page
        }
    }

    changeActivePage() {
        const { activeContent } = this.state;
        if (activeContent === 'singleOrder') {
            this.setState({
                activeContent: 'orders'
            });
        }
    }

    render () {
        return (
            <Global>
                <div className="row reset-row profile-page">
                    <div className="col-12 sidemenu">
                        {this.renderUserProfile()}                        
                    </div>
                    <div className="col-12 main-content">
                        {this.renderContentProfile()}
                    </div>
                </div>
            </Global>
        );
    }
}

export default Profile;