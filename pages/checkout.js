import Global from '../components/reusable/Global';
import '../assets/styles/layouts/checkout.scss';
import AccountInfo from '../components/views/checkout/AccountInfo';
import OrderSummary from '../components/views/checkout/OrderSummary';
import Billing from '../components/views/checkout/Billing';
import Delivery from '../components/views/checkout/Delivery';
import Payment from '../components/views/checkout/Payment';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContent: 'accountInfo'
        };
        this.renderContent = this.renderContent.bind(this);
        this.renderAccountView = this.renderAccountView.bind(this);
        this.renderBillingView = this.renderBillingView.bind(this);
        this.renderDeliveryView = this.renderDeliveryView.bind(this);
        this.renderPaymentView = this.renderPaymentView.bind(this);
    }

    renderContent() {
        const { activeContent } = this.state;

        if (activeContent === 'accountInfo') {
            return <AccountInfo />
        } else if (activeContent === 'billing') {
            return <Billing />
        } else if (activeContent === 'delivery') {
            return <Delivery />
        } else if (activeContent === 'payment') {
            return <Payment />
        }
    }
    renderAccountView() {
        this.setState({
            activeContent: 'accountInfo'
        })
    }

    renderBillingView() {
        this.setState({
            activeContent: 'billing'
        })
    }
    renderDeliveryView() {
        this.setState({
            activeContent: 'delivery'
        })
    }
    renderPaymentView() {
        this.setState({
            activeContent: 'payment'
        })
    }
	render() {
		return (
			<Global>
                <div className='maximum-width'>
                    <div className='row reset-row'>
                        <div className='col-lg-8 col-md-8 col-sm-8 col-12'>
                            <ul className='checkout-process'>
                                <li className='single-process done' onClick={this.renderAccountView}>
                                    <div className='process-name'>1. Account info</div>
                                </li>
                                <li className='single-process active' onClick={this.renderBillingView}>
                                    <div className='process-name'>2. Billing and shipping address</div>
                                </li>
                                <li className='single-process' onClick={this.renderDeliveryView}>
                                    <div className='process-name'>3. Delivery</div>
                                </li>
                                <li className='single-process' onClick={this.renderPaymentView}>
                                    <div className='process-name'>4. Payment</div>
                                </li>
                            </ul>
                            {this.renderContent()}
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