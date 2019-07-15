import React, { Component } from 'react';
import OrderRow from "../profile/OrderRow";
import OrderDetail from "../profile/OrderDetail";
import Invoice from './Invoice';
import UserDetail from './UserDetail';

class ContentProfile extends Component {
    render () {
        return (
            <div>
                <UserDetail />
                {/* <OrderRow/> */}
                {/* <OrderDetail /> */}
            </div>
        );
    }
}

export default ContentProfile;