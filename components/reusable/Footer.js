import React, { Component } from 'react';
import '../../assets/styles/layouts/footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className='footer-wrapper'>
                <div className='maximum-width'>
                    <div className='footer-wrapper-content'>
                        <div className='row reset-row'>
                            <div className='col-lg-2 col-md-2 col-sm-3 col-6'>
                                <div className='footer-title'>Way to shop</div>
                                <div className='footer-content'>
                                    <div className='content'><a href="/categories/clothing-fashion">Clothing &amp; Fashion</a></div>
                                    <div className='content'><a href="/categories/electronics">Electronics</a></div>
                                    <div className='content'><a href="/categories/home-appliances">Home Appliances</a></div>
                                    <div className='content'><a href="/categories/kids-babies">Kids &amp; Babies</a></div>
                                    <div className='content'><a href="/categories/groceries">Groceries</a></div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-3 col-6'>
                                <div className='footer-title'>Extras</div>
                                <div className='footer-content'>
                                    <div className='content'><a href="https://hehe.rw/" target="_blank">About us</a></div>
                                    <div className='content'><a href="https://hehe.rw/#contactUs" target="_blank">Become a seller</a></div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-3 col-6'>
                                <div className='footer-title'>Quick Links</div>
                                <div className='footer-content'>
                                    <div className='content'><a href="/privacy">Privacy policies</a></div>
                                    <div className='content'><a href="/terms">Terms &amp; Conditions</a></div>
                                    <div className='content'><a href="https://hehe.rw/#contactUs" target="_blank">Contact us</a></div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
                                <div className='footer-title'>Call us</div>
                                <div className='contact-content'>+250 786 456 686</div>

                                <div className='footer-title'>Email us</div>
                                <div className='contact-content'>support@dmmhehe.com</div>

                                <div className='footer-title'>Sell with HeHe</div>
                                <div><a href="https://hehe.rw/#contactUs" target="_blank"><button>Become a seller</button></a></div>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-12 subscribe-grid'>
                                <div className='footer-title'>Get more from Hehe</div>
                                <div className='subscribe'>
                                    <input type='text' name='email' placeholder='Email' />
                                    <button>Subscribe</button>
                                </div>
                                <div className='footer-title'>Pay with</div>
                                <div className='footer-payment-mode'>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/Visa-icon.png' /></span>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/mastercard-logo-icon-png_44630.png' /></span>
                                    <span className='payment'><img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1559309603/multi-vendor/MoMo-icon.png' /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;