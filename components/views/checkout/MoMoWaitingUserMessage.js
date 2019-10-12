import React, { Component } from 'react';

export default class MoMoWaitingUserMessage extends Component {
    constructor(props) {
        super(props);
    }
   render() {
        return (
            <div>
                <h5>Please wait while we process your payment...</h5>
            </div>
        );
   }
}