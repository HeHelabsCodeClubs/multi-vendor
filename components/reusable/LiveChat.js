
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

class LiveChat extends Component {

    render () {
        return (
            <MessengerCustomerChat
                pageId="104982337540000"
                appId="hehe"
            />
        );
    }
}

export default LiveChat;