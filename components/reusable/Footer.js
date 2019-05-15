import React, { Component } from 'react';
import '../../assets/styles/layouts/footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className='footer-wrapper'>
                <div className='maximum-width'>
                    <div className='footer-wrapper-content'>
                        <div className='row reset-row'>
                            <div className='col-lg-2 col-md-2 col-sm-2 col-6'>
                                <div className='footer-title'>Way to shop</div>
                                <div className='footer-content'>
                                    <div className='content'>All products</div>
                                    <div className='content'>Featured products</div>
                                    <div className='content'>Featured shops</div>
                                    <div className='content'>Blogs</div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 col-6'>
                                <div className='footer-title'>Extras</div>
                                <div className='footer-content'>
                                    <div className='content'>About us</div>
                                    <div className='content'>Become a seller</div>
                                    <div className='content'>Advertise with us</div>
                                    <div className='content'>Affiliates</div>
                                    <div className='content'>Testimonials</div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-2 col-sm-2 col-6'>
                                <div className='footer-title'>Quick Links</div>
                                <div className='footer-content'>
                                    <div className='content'>Privacy policies</div>
                                    <div className='content'>Terms & Conditions</div>
                                    <div className='content'>Contact us</div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
                                <div className='footer-title'>Call us</div>
                                <div className='contact-content'>+250 784 849 949</div>

                                <div className='footer-title'>Email us</div>
                                <div className='contact-content'>support@dmmhehe.com</div>

                                <div className='footer-title'>Sell with HeHe</div>
                                <div><button>Become a seller</button></div>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-6 col-12'>
                                <div className='footer-title'>Get more from Hehe</div>
                                <div className='subscribe'>
                                    <input type='text' name='email' placeholder='Email' />
                                    <button>Subscribe</button>
                                </div>
                                <div className='footer-title'>Pay with</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;