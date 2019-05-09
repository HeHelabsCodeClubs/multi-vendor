import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Payment extends React.Component {

	render() {
		return (
            <div className='account-info-wrapper'>
				<div className='payment-section'>
					<div className='account-info-title'>Payment</div>
				</div>
                <div className='payment-section'>
					<div className='wallet-title'>User wallet</div>
					<div className='wallet-content'>Available wallet cash: 0 Rwf</div>
				</div>
				<div className='payment-section'>
					<Tabs>
						<TabList>
							<Tab><h5><span className="table-title">Cash on Delivery</span></h5></Tab>
							<Tab><h5><span className="table-title">Pay Now</span></h5></Tab>
						</TabList>
						<TabPanel>
							me
						</TabPanel>
						<TabPanel>
							<div className='single-payment clicked'>
								<div className='single-payment-title'>
									<span className='title-left'><input type='radio' name='card' />Credit card</span>
									<span className='title-right'></span>
								</div>
								<div className='card-payment'>
									<div className='payment-input'>
										<input type='text' name='number' placeholder='Card Number' />
									</div>
									<div className='payment-input'>
										<input type='text' name='name' placeholder='Card Name' />
									</div>
									<div className='payment-input'>
										<input type='date' name='date' placeholder='Expiry Date' className='left' />
										<input type='text' name='cvv' placeholder='Cvv' className='right' />
									</div>
								</div>
							</div>
							<div className='single-payment'>
								<div className='single-payment-title'>
									<span className='title-left'><input type='radio' name='card' />MTN Mobile Money</span>
									<span className='title-right'></span>
								</div>
							</div>
							<div className='payment-comment'>
								<div className='comment-title'>You can leave us a comment here</div>
								<div className='comment-input'>
									<textarea type='text' name='comment' />
								</div>
							</div>
						</TabPanel>
					</Tabs>
				</div>
            </div>
		);
	}
}

export default Payment;