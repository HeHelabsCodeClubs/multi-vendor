import React, { Component } from 'react';

export default class MoMoWaitingUserMessage extends Component {
    constructor(props) {
        super(props);
    }
   render() {
        return (
            <div>
                <h5>Please wait while we process your payment...</h5>
                <p>
                    Please confirm your payment on your phone by responding to a popup message <br /> or dial
                    <span>*182*7#</span>
                </p>
            </div>
        );
   }
}