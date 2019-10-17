import React, { Component } from 'react';

export default class MoMoPendingUserMessage extends Component {
    constructor(props) {
        super(props);
    }
   render() {
        return (
            <div>
                <h5>
                    Please confirm your payment on your phone by responding to a popup message <br /> or dial
                    <span>*182*7#</span>
                </h5>
            </div>
        );
   }
}