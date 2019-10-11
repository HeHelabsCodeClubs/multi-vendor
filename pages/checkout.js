import Router from 'next/router';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/checkout.scss';
import '../assets/styles/layouts/auth.scss';
import AccountInfo from '../components/views/checkout/AccountInfo';
import OrderSummary from '../components/views/checkout/OrderSummary';
import Billing from '../components/views/checkout/Billing';
import Delivery from '../components/views/checkout/Delivery';
import Payment from '../components/views/checkout/Payment';
import Loader from '../components/reusable/Loader';
import Overlay from '../components/reusable/Overlay';
import CheckoutPageSectionLink from '../components/views/checkout/CheckoutPageSectionLink';
import { getClientAuthToken, getTokenValue } from '../helpers/auth';
import { API_URL, CART_ITEMS_KEY } from '../config';
import { getCartItems } from '../helpers/cart_functionality_helpers';
import IsObjectEmpty from '../helpers/is_object_empty';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeContent: '',
            sideContentClass: 'wrap',
            triggerUpdateOfCustomerDeliveryAddress: false,
            triggerShipmentMethodUpdate: false,
            accountPageVisitedClass: 'single-process',
            billingPageVisitedClass: 'single-process',
            showOverlay: false,
            overlayContent: null,
            triggerValidateDelivery: false

        };
        this.renderContent = this.renderContent.bind(this);
        this.renderAccountView = this.renderAccountView.bind(this);
        this.renderBillingView = this.renderBillingView.bind(this);
        this.renderDeliveryView = this.renderDeliveryView.bind(this);
        this.renderPaymentView = this.renderPaymentView.bind(this);
        this.decideContentToShow = this.decideContentToShow.bind(this);
        this.getCustomerAccountAddresses = this.getCustomerAccountAddresses.bind(this);
        this.handleTabItemClick = this.handleTabItemClick.bind(this);
        this.updateShipmentInfo = this.updateShipmentInfo.bind(this);
        this.toogleDisplayOverlay = this.toogleDisplayOverlay.bind(this);
        this.redirectToSpecificPage = this.redirectToSpecificPage.bind(this);
    }

    static async getInitialProps({ req, query }) {
        // if req means it is being rendered on the server
        if (req) {
            if (req.params.page === 'addresses') {
                const token = getTokenValue(req.headers.cookie);
                if (token) {
                    const res = await fetch(`${API_URL}/customers/addresses`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    
                    });
                    const response = await res.json();
                    return {
                        customerAddressData: response.data
                    };
                }

                return {
                    customerAddressData: []
                }
                
            }
        } else {
            const isClient = typeof document !== undefined;
            if (isClient) {
                // remove order data cookie
                const token = getClientAuthToken();
                const { page } = query;
                if (page === 'account') {
                    if (token) {
                        Router.push('/checkout?page=addresses', '/checkout/addresses');
                    }
                } else {
                    if (!token) {
                        Router.push('/checkout?page=account', '/checkout/account');
                    } else  {
                        if (page === 'addresses') {
                            const res = await fetch(`${API_URL}/customers/addresses`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                            
                            });
                            const response = await res.json();
                            return {
                                customerAddressData: response.data
                            };
                        }
                    }
                }
            }
        }
        
        return {};
    }

    componentWillMount() {
        /**
         * If no cart items redirect user to homepage
         */
        getCartItems((items) => {
            if (!items ){
				Router.push('/');
				return;
			} 

			const itemsIsObject = (typeof items) === 'object' ? true : false;
			if (itemsIsObject) {
				if (IsObjectEmpty(items)) {
					Router.push('/');
					return;
				}
			}
        });
    }

    getCustomerAccountAddresses(token) {
        fetch(`${API_URL}/customers/addresses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
           
        }).then(async (res) => {
            try {
                const response = await res.json();
            } catch (err) {
                console.log('error');
                console.log(err);
            }
        });
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
        const { 
            activeContent,
            triggerUpdateOfCustomerDeliveryAddress,
            triggerValidateDelivery
        } = this.state;
        const { customerAddressData } = this.props;
        switch(activeContent) {
            case 'accountInfo':
                return (
                    <AccountInfo
                        showBreadCrumbs={true} 
                    />
                );
            case 'billing':
                return (
                    <Billing
                    showBreadCrumbs={true} 
                    customerAddressData={customerAddressData}
                    triggerUpdateOfCustomerDeliveryAddress={triggerUpdateOfCustomerDeliveryAddress}
                    />
                );
            case 'delivery':
                return (
                    <Delivery
                    showBreadCrumbs={true}
                    updateShipmentInfo={this.updateShipmentInfo}
                    triggerValidateDelivery={triggerValidateDelivery}
                    />
                );
            case 'payment':
                return (
                    <Payment
                    showBreadCrumbs={true}
                    toogleDisplayOverlay={this.toogleDisplayOverlay}
                    />
                    );
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
        });
    }

    redirectToSpecificPage(page) {
        const actionUrl = `/checkout?page=${page}`;
        const asUrl = `/checkout/${page}`;
        Router.push(actionUrl, asUrl);
    }

    handleTabItemClick(tab_name) {
        const { router: { query: { page } } } = Router;
        switch(tab_name) {
            case 'delivery':
                if (page === 'addresses') {
                    this.setState({
                        triggerUpdateOfCustomerDeliveryAddress: true
                    });
                    setTimeout(() => {
                        this.setState({
                            triggerUpdateOfCustomerDeliveryAddress: false
                        });
                    }, 400);

                    break;
                }

                if (page === 'delivery' || page === 'payment') {
                    this.setState({
                        activeContent: 'delivery'
                    });
                    this.redirectToSpecificPage('delivery');
                    break;
                }

                break;
            case 'payment':
                if(page === 'delivery' || page === 'addresses') {
                    this.setState({
                        triggerValidateDelivery: true
                    });
                    setTimeout(() => {
                        this.setState({
                            triggerValidateDelivery: false
                        });
                    }, 400);
                    break;
                }
                this.redirectToSpecificPage('payment');
                break;
            default:
                // do nothing
        }
    }
    updateShipmentInfo() {
        const { triggerShipmentMethodUpdate } = this.state;
        if (!triggerShipmentMethodUpdate) {
            this.setState({
                triggerShipmentMethodUpdate: true
            });

            // go to initial state
            setTimeout(() => {
                this.setState({
                    triggerShipmentMethodUpdate: false
                });
            }, 400)
        }
    }

    toogleDisplayOverlay(show, content) {
        if (show) {
            this.setState({
                showOverlay: true,
                overlayContent: content !== undefined ? content : null
            });
        } else {
            this.setState({
                showOverlay: false
            })
        }
    }

    
	render() {
        const { 
            triggerShipmentMethodUpdate, 
            showOverlay,
            overlayContent 
        } = this.state;
		return (
            <GoogleAnalyticsLogger>
			<Global>
                <Overlay 
                show={showOverlay}
                overlayContent={overlayContent}
                />
                <div className='maximum-width'>
                    <div className='row reset-row checkout-content'>
                        <div className='col-lg-8 col-md-8 col-sm-8 col-12 checkouot__left-block not-sticky__container'>
                            <ul className='checkout-process'>
                                <CheckoutPageSectionLink 
                                pageName='account'
                                title='1. Account info'
                                />
                                <CheckoutPageSectionLink 
                                pageName='addresses'
                                title='2. Billing and shipping address'
                                />
                                <CheckoutPageSectionLink 
                                pageName='delivery'
                                title='3. Delivery'
                                doOnClick={() => this.handleTabItemClick('delivery')}
                                />
                                <CheckoutPageSectionLink 
                                pageName='payment'
                                title='4. Payment'
                                doOnClick={() => this.handleTabItemClick('payment')}
                                />
                            </ul>

                            {this.renderContent()}
                        </div> 
                        <div className='col-lg-4 col-md-4 col-sm-4 col-12 order-summary-grid not-sticky__container'>
                            <OrderSummary 
                            triggerShipmentMethodUpdate={triggerShipmentMethodUpdate}
                            />
                        </div> 
                    </div>
                </div>
			</Global>
            </GoogleAnalyticsLogger>
		);
	}
}

export default Checkout;