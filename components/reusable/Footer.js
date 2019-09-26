import React, { Component } from 'react';
import '../../assets/styles/layouts/footer.scss';
import { API_URL } from '../../config';
import CookiesPopup from './CookiesPopup';
// import LiveChat from './LiveChat';
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
                <div className='maximum-width footer-wrapper-box'>
                    <div className='footer-wrapper-content'>
                        <div className='row reset-row'>
                            <div className='col-12 subscribe-grid'>
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
                            </div>
                            <div className="col-6">
                                <div className='footer-title'>Pay with</div>
                                <div className='footer-payment-mode'>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/Visa-icon.png' /></span>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/mastercard-logo-icon-png_44630.png' /></span>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/MoMo-icon.png' /></span>
                                </div>
                            </div>
                            <div className="col-6 footer-links">
                                <ul>
                                    <li><a>Privacy</a></li>
                                    <li><a>Terms &amp; cond.</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div>
                    {this.state.displayToTopButton?
                    <button
                    onClick={this.handleScrollToTop}
                    className="back-to-top"
                    >
                        <span className="icon-Arrow_solid"></span>
                    </button>
                    : null}
                </div> */}
                
                <div>
					<CookiesPopup />
                    {/* <LiveChat /> */}
				</div>
            </div>
        )
    }
}

export default Footer;