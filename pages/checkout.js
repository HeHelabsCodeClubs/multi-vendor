import Router from 'next/router';
import Link from 'next/link';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/checkout.scss';
import AccountInfo from '../components/views/checkout/AccountInfo';
import OrderSummary from '../components/views/checkout/OrderSummary';
import Billing from '../components/views/checkout/Billing';
import Delivery from '../components/views/checkout/Delivery';
import Payment from '../components/views/checkout/Payment';
import Loader from '../components/reusable/Loader';
import { getClientAuthToken } from '../helpers/auth';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContent: ''
        };
        this.renderContent = this.renderContent.bind(this);
        this.renderAccountView = this.renderAccountView.bind(this);
        this.renderBillingView = this.renderBillingView.bind(this);
        this.renderDeliveryView = this.renderDeliveryView.bind(this);
        this.renderPaymentView = this.renderPaymentView.bind(this);
        this.decideContentToShow = this.decideContentToShow.bind(this);
    }

    static async getInitialProps({ req, query }) {
        // if req means it is being rendered on the server
        if (req) {
            return {};
        }
        const isClient = typeof document !== undefined;
        if (isClient) {
            const token = getClientAuthToken();
            const { page } = query;
            if (page === 'account') {
                if (token) {
                    Router.push('/checkout?page=addresses', '/checkout/addresses');
                }
            } else {
                if (!token) {
                    Router.push('/checkout?page=account', '/checkout/account');
                }
            }
        }
        return {};
    }

    componentDidMount() {
        this.decideContentToShow();
    }

    componentWillReceiveProps(nextProps) {
        this.decideContentToShow();
    }

    decideContentToShow() {
        const { router: { query: { page } } } = Router;
        //const { page } = query;
        if (page) {
            switch(page) {
                case 'account':
                    this.setState({
                        activeContent: 'accountInfo'
                    });
                    break;
                case 'addresses':
                    this.setState({
                        activeContent: 'billing'
                    });
                    break;
                case 'delivery':
                    this.setState({
                        activeContent: 'delivery'
                    });
                    break;
                case 'payment':
                    this.setState({
                        activeContent: 'payment'
                    });
                    break;
                default:
                    /**
                     * Redirect to 404 page
                     */
            }

        }
    }

    renderContent() {
        const { activeContent } = this.state;
        switch(activeContent) {
            case 'accountInfo':
                return <AccountInfo />;
            case 'billing':
                return <Billing />;
            case 'delivery':
                return <Delivery />;
            case 'payment':
                return <Payment />;
            default:
                return (
                    <div className='row loader-row'>
                        <Loader />
                    </div>
                );
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
                                <Link
                                href="/checkout?page=account"
                                as="/checkout/account"
                                >
                                    <a 
                                    className='single-process done' 
                                    >
                                        <h5 className='process-name'>1. Account info</h5>
                                    </a>
                                </Link>
                                <Link
                                href="/checkout?page=addresses"
                                as="/checkout/addresses"
                                >
                                    <a className='single-process active'>
                                        <h5 className='process-name'>2. Billing and shipping address</h5>
                                    </a>
                                </Link>
                                <Link
                                href="/checkout?page=delivery"
                                as="/checkout/delivery"
                                >
                                    <a className='single-process' onClick={this.renderDeliveryView}>
                                        <h5 className='process-name'>3. Delivery</h5>
                                    </a>
                                </Link>
                               <Link
                               href="/checkout?page=payment"
                               as="/checkout/payment"
                               >
                                    <a className='single-process' onClick={this.renderPaymentView}>
                                        <h5 className='process-name'>4. Payment</h5>
                                    </a>
                               </Link>
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