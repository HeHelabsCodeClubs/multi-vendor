import React, { Component } from 'react';
import '../../assets/styles/layouts/footer.scss';
import { API_URL } from '../../config';
import CookiesPopup from './CookiesPopup';
// import LiveChat from './LiveChat';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            displayToTopButton: false,
            scrollPosition: 0,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.checkScroll = this.checkScroll.bind(this);
        this.handleScrollToTop = this.handleScrollToTop.bind(this);
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

    render() {
        const { categories} = this.state;
        return (
            <div className='footer-wrapper'>
                <div className='maximum-width footer-wrapper-box'>
                    <div className='footer-wrapper-content'>
                        <div className='row reset-row'>
                            <div className='col-12 subscribe-grid'>
                                <div className='footer-title'>Get more from Hehe</div>
                                <div className='subscribe'>
                                    <input type='text' name='email' placeholder='Email' />
                                    <button>Subscribe</button>
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