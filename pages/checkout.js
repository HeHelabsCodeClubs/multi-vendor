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
        this.changeActiveContent = this.changeActiveContent.bind(this);
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

    changeActiveContent() {
        const { activeContent } = this.state;
        if (activeContent === 'accountInfo') {
            this.setState({
                activeContent: 'billing'
            })
        }
        if (activeContent === 'billing') {
            this.setState({
                activeContent: 'delivery'
            })
        }
        if (activeContent === 'delivery') {
            this.setState({
                activeContent: 'payment'
            })
        }
    }
	render() {
		return (
			<Global>
                <div className='maximum-width'>
                    <div className='row reset-row'>
                        <div className='col-lg-8 col-md-8 col-sm-8 col-12'>
                            <div className='checkout-process'>
                                <div className='single-process' onClick={this.changeActiveContent}>
                                    <div className='process-point'></div>
                                    <div className='process-name'>1. Account info</div>
                                </div>
                                <div className='single-process' onClick={this.changeActiveContent}>
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