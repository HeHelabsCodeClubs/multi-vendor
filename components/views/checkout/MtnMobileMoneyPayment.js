import React, { Component } from 'react';
import InputField from '../../reusable/InputField';

export default class MtnMobileMoneyPayment extends Component {
    render() {
        return (
            <div>
                <div className='single-payment clicked'>
                    <div className='single-payment-title'>
                        <span className='title-left'>Mobile Money</span>
                        <span className='title-right'></span>
                    </div>
                    <div className='card-payment momo-payment'>
                        <h5>Pay with MTN Mobile Money at no hassle.</h5>
                        <h5>Enter MTN MoMo number</h5>
                        <InputField 
                            typeOfInput='text_field'
							type='text' 
							placeholder='078 - - - - - - -'
                        />
                        <p className="number-input__txt">Input phone number associated with your MTN Mobile Money Account.</p>
                        <p>1.Click "SUBMIT MY ORDER".</p>
                        <p>2.From the USSD prompt on your hand-held, input your Mobile Money PIN.</p>
                        <p> 3.Follow further steps.</p>
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