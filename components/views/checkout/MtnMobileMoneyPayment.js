import React, { Component } from 'react';
import InputField from '../../reusable/InputField';

export default class MtnMobileMoneyPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: 0,
            inputWithError: '',
            buttonStatus: 'initial'
        }
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
    }
    renderSubmitButton() {
		const { buttonStatus } = this.state;
		const buttonText  = buttonStatus === 'initial' ? 'Submit My Order' : 'Submitting';
		const buttonClass = buttonStatus === 'initial' ? 'auth-button continue-check submit-order' : 'auth-button is-submitting';

		return (
			<div className='shipping-btn'>
				<button 
				className={buttonClass}
				onClick={this.handleOrderSubmission}
				>
				{buttonText}
				</button>
			</div>
		);
    }
    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }
    render() {
        const {
            inputWithError
        } = this.state;
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
                            name='phone'
                            placeholder='078 - - - - - - -'
                            updateInputFieldValue={this.getInputFieldValue}
                            inputWithError={inputWithError}
                        />
                        <p className="number-input__txt">Input phone number associated with your MTN Mobile Money Account.</p>
                        <p>1.Click "SUBMIT MY ORDER".</p>
                        <p>2.From the USSD prompt on your hand-held, input your Mobile Money PIN.</p>
                        <p>3.Follow further steps.</p>
                    </div>
                </div>
                <div className='payment-comment'>
                    <div className='comment-title'>You can leave us a comment here</div>
                    <div className='comment-input'>
                        <textarea type='text' name='comment' />
                    </div>
                </div> 
                <div className='payment-terms-container'>
                    <InputField 
                    typeOfInput='checkbox'
                    type='checkbox'
                    name='terms'
                    fieldText='Select this check box to accept the Terms and Conditions'
                    updateInputFieldValue={this.getInputFieldValue}
                    inputWithError={inputWithError}
                    />
                </div>
                {this.renderSubmitButton()}
            </div>
        );
    }
}