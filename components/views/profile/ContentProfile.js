import React, { Component } from 'react';
import OrderRow from "../profile/OrderRow";
import OrderDetail from "../profile/OrderDetail";

class ContentProfile extends Component {
    render () {
        return (
            <div>
                {/* <OrderRow/> */}
                <OrderDetail />
            </div>
        );
    }
}

export default ContentProfile;