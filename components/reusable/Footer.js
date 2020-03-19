import React, { Component } from 'react';
import { API_URL } from '../../config';
import CookiesPopup from './CookiesPopup';
import LiveChat from './LiveChat';
import Notifications, {notify} from 'react-notify-toast';
import { SUBSCRIBE_INPUT_VALUE_EMPTY, ALERT_TIMEOUT } from '../../config';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            displayToTopButton: false,
            scrollPosition: 0,
            subscribeInputValue: '',
            buttonSubmitting: false,
            subscribeResponse: {}
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.checkScroll = this.checkScroll.bind(this);
        this.handleScrollToTop = this.handleScrollToTop.bind(this);
        this.handleSubscribeInputValue = this.handleSubscribeInputValue.bind(this);
        this.submitSubscriberInfo = this.submitSubscriberInfo.bind(this);
        this.handleSubscribeApiResponse = this.handleSubscribeApiResponse.bind(this);
    };


    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const res = await fetch(`${API_URL}/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        this.setState({
           categories: data.data
        });

    }

    renderFooterCategories(categories) {
        if (categories) {
            const categoryLayout = categories.slice(0, 5).map((category) => {
                return (
                    <div className='content' key={category.slug}>
                        <a href={`/categories/${category.slug}`}>{category.name}</a>
                    </div>
                );
            });
            return categoryLayout;
        }
    }

    handleScroll(event){
        this.setState({
            scrollPosition: window.pageYOffset
        }, () => this.checkScroll())
    }
    checkScroll(){
        if (this.state.scrollPosition > 500) {
            this.setState({
                displayToTopButton: true,
            })
        }
        else {
            this.setState ({ 
                displayToTopButton: false,
            })
        }
    }
    
    handleScrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
   }

   handleSubscribeInputValue(e) {
       this.setState({
           subscribeInputValue: e.target.value
       });
   }

   submitSubscriberInfo(e) {
       e.preventDefault();
       const { subscribeInputValue } = this.state;

        //check if the input value is not empty
        if (subscribeInputValue === '') {
            notify.show(SUBSCRIBE_INPUT_VALUE_EMPTY, "error", ALERT_TIMEOUT);
        } else {
            // hange the button text
            this.setState({
                buttonSubmitting: true
            });

            // ready to send a request
            fetch(`${API_URL}/customers/subscribe`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: subscribeInputValue
                })           
            }).then(async(res) => {
                try {
                    const response = await res.json();
                    this.handleSubscribeApiResponse(response);
                    this.setState({
                        buttonSubmitting: false,
                        subscribeInputValue: '',
                        subscribeResponse: response.data
                    });
                    
                } catch (err) {
                    console.log("err");
                    console.log(err);
                }
            });
        }
   }
   handleSubscribeApiResponse(response) {
       switch(response.status_code) {
           case 200:
                notify.show(`${response.data.message}`, "success", ALERT_TIMEOUT);
               break;
            case 401:
                notify.show(`${response.data.message}`, "error", ALERT_TIMEOUT);
       }
   }

    render() {
        const { categories, subscribeInputValue, buttonSubmitting} = this.state;
        const subscribeButtonText = buttonSubmitting ? 'Submitting' : 'Submit'

        return (
            <div className='footer-wrapper'>
                <Notifications />
                <div className="store-info">
                    <div className='row reset-row'>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-6 footer-card-wrapper">
                            <div className="footer-card">
                                <img src="https://res.cloudinary.com/hehe/image/upload/v1565080905/multi-vendor/icons/footer-info/Card_payment.svg" />
                                <h3>Secure Payment</h3>
                                <p>Pay with the world’s most popular and secure payment methods.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-6 footer-card-wrapper">
                            <div className="footer-card">
                                <img src="https://res.cloudinary.com/hehe/image/upload/v1565080905/multi-vendor/icons/footer-info/Car_Truck.svg" />
                                <h3>Fast Delivery</h3>
                                <p>Think, click and pick up! Delivery from your chosen store to your door.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-6 footer-card-wrapper">
                            <div className="footer-card">
                                <img src="https://res.cloudinary.com/hehe/image/upload/v1565080905/multi-vendor/icons/footer-info/Ptice_Tag.svg" />
                                <h3>Great Value</h3>
                                <p>We offer competitive prices on all products.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-6 footer-card-wrapper">
                            <div className="footer-card">
                                <img src="https://res.cloudinary.com/hehe/image/upload/v1565080905/multi-vendor/icons/footer-info/Return_Arrow.svg" />
                                <h3>Hassle-Free Returns</h3>
                                <p>We offer returns, refunds and replacements if need be. Terms & Conditions apply.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='maximum-width'>
                    <div className='footer-wrapper-content'>
                        <div className='row reset-row'>
                            <div className='col-lg-2 col-md-2 col-sm-3 col-6'>
                                <div className='footer-title'>Way to shop</div>
                                <div className='footer-content'>
                                    {this.renderFooterCategories(categories)}
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-3 col-6'>
                                <div className='footer-title'>Extras</div>
                                <div className='footer-content'>
                                    <div className='content'><a href="https://dmmhehe.com/" target="_blank">About us</a></div>
                                    <div className='content'><a href="https://forms.gle/U3TKe1apATkw1qQQA" target="_blank">Become an Affiliate</a></div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-3 col-6'>
                                <div className='footer-title'>Quick Links</div>
                                <div className='footer-content'>
                                    <div className='content'><a href="/privacy">Privacy policies</a></div>
                                    <div className='content'><a href="/terms">Terms &amp; Conditions</a></div>
                                    <div className='content'><a href="https://seller.hehe.rw/#contactUs" target="_blank">Contact us</a></div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
                                <div className='footer-title'>Call us</div>
                                <div className='contact-content'>+250 786 456 686</div>

                                <div className='footer-title'>Email us</div>
                                <div className='contact-content'>order@hehe.rw</div>

                                <div className='footer-title'>Sell with HeHe</div>
                                <div><a href="https://seller.hehe.rw/#contactUs" target="_blank"><button>Become a seller</button></a></div>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-12 subscribe-grid'>
                                <div className='footer-title'>Get more from Hehe</div>
                                <div className='subscribe'>
                                    <form onSubmit={this.submitSubscriberInfo}>
                                        <input 
                                        type='email'
                                        placeholder='Email'
                                        value={subscribeInputValue}
                                        onChange={this.handleSubscribeInputValue} 
                                        />
                                        <button type="submit">{subscribeButtonText}</button>
                                    </form>
                                </div>
                                <div className='footer-title'>Pay with</div>
                                <div className='footer-payment-mode'>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/Visa-icon.png' /></span>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/mastercard-logo-icon-png_44630.png' /></span>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/MoMo-icon.png' /></span>
                                </div>
                            </div>
                        </div>
                   ` </div>
                </div>

                <div>
                    {this.state.displayToTopButton?
                    <button
                    onClick={this.handleScrollToTop}
                    className="back-to-top"
                    >
                        <span className="icon-Arrow_solid"></span>
                    </button>
                    : null}
                </div>
                <div>
					<CookiesPopup />
                    <LiveChat />
				</div>
            </div>
        )
    }
}

export default Footer;