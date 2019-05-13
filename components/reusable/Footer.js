import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                <div className='maximum-width'>
                    <div className='row'>
                        <div className='col-lg-2 col-md-2 col-sm-2 col-6'>
                            <div className='footer-title'>Way to shop</div>
                            <div className='footer-content'>
                                <div></div>
                            </div>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-2 col-6'>
                            <div className='footer-title'>Extras</div>
                        </div>
                        <div className='col-lg-2 col-md-2 col-sm-2 col-6'>
                            <div className='footer-title'>Quick Links</div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
                            <div className='footer-title'>Call us</div>
                            <div className='footer-title'>Email us</div>
                            <div className='footer-title'>Sell with HeHe</div>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-3 col-6'>
                            <div className='footer-title'>Get more from Hehe</div>
                            <div className='footer-title'>Pay with</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;