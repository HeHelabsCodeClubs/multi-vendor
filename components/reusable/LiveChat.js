
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

class LiveChat extends Component {

    render () {
        return (
            <MessengerCustomerChat
                pageId="233672900100995"
                appId="hehe-vendor"
            />
        );
    }
}

export default LiveChat;