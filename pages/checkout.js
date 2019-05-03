import Global from '../components/reusable/Global';
import '../assets/styles/layouts/checkout.scss';
import AccountInfo from '../components/views/checkout/AccountInfo';
import OrderSummary from '../components/views/checkout/OrderSummary';

class Checkout extends React.Component {
	render() {
		return (
			<Global>
                <div className='maximum-width'>
                    <div className='row reset-row'>
                        <div className='col-lg-8 col-md-8 col-sm-8 col-12'>
                            <div className='checkout-process'>
                                <div className='single-process'>
                                    <div className='process-point'></div>
                                    <div className='process-name'>1. Account info</div>
                                </div>
                                <div className='single-process'>
                                    <div className='process-point'></div>
                                    <div className='process-name'>2. Billing and shipping address</div>
                                </div>
                                <div className='single-process'>
                                    <div className='process-point'></div>
                                    <div className='process-name'>3. Delivery</div>
                                </div>
                                <div className='single-process'>
                                    <div className='process-point'></div>
                                    <div className='process-name'>4. Payment</div>
                                </div>
                            </div>
                            <AccountInfo />
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-4 col-12 order-summary-grid'>
                            <OrderSummary />
                        </div>
                    </div>
                </div>
			</Global>
		);
	}
}

export default Checkout;