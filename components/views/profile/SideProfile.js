import React, { Component } from 'react';

class SideProfile extends Component {
    render () {
        return (
            <div>
                <div className="sidemenu-content">
                    <div className="sidemenu-title">
                        <h5>My Profile</h5>
                    </div>
                    <div className="item-menu">
                        <a className="item-title" href="#">Profile details</a>
                    </div>
                    <div className="item-menu active">
                        <a className="item-title" href="#">All Orders</a>
                    </div>
                    <div className="item-menu">
                        <a className="item-title" href="#">Refund &amp; Disputes</a>
                    </div>
                    <div className="item-menu">
                        <a className="item-title" href="#">My Coupons</a>
                    </div>
                    <div className="item-menu">
                        <a className="item-title" href="#">My HeHe Wallet</a>
                    </div>
                    <div className="item-menu">
                        <a className="item-title" href="#">Shipping Address</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideProfile;