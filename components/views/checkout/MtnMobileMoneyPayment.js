import React, { Component } from 'react';

export default class MtnMobileMoneyPayment extends Component {
    render() {
        return (
            <div>
                <div className='single-payment clicked'>
                    <div className='single-payment-title'>
                        <span className='title-left'>Mobile Money</span>
                        <span className='title-right'></span>
                    </div>
                    <div className='card-payment'>
                        
                    </div>
                </div>
                <div className='payment-comment'>
                    <div className='comment-title'>You can leave us a comment here</div>
                    <div className='comment-input'>
                        <textarea type='text' name='comment' />
                    </div>
                </div> 
            </div>
        );
    }
}