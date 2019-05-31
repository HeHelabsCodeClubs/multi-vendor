import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';

class SingleCartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <div className='cart-store-content'>
                <div className='store-logo'>
                    <img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
                    <span className='store-name'>Mart (3 Items from Mart store)</span>
                </div>
                <div className='row reset-row cart-item'>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                        <img className='cart-product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288623/multi-vendor/prod_1_2x.png' />
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset name-incremenet'>
                        <div className='product-name'>Cabagge</div>
                        <div className='qty-measurement'>Pce</div>
                        <div className='qty-increment'>
                            <span className='decrement'>-</span>
                            <span className='number'>12</span>
                            <span className='increment'>+</span>
                        </div>
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset prices-discounts'>
                        <div className='cart-bk'>
                            <div className='discount'>10% OFF</div>
                            <div />
                        </div>
                        <div className='cart-bk'>
                            <div className='edit'><span className='icon-Path-68'></span><span className="xs-hidden__txt">Edit</span></div>
                            <div className='initial-price'>Rwf 1000</div>
                        </div>
                        <div className='cart-bk'>
                            <div className='remove'><span className='icon-Path-60'></span><span className="xs-hidden__txt">Remove</span></div>
                            <div className='price'>Rwf 900</div>
                        </div>
                    </div>
                </div>
                <div className='row reset-row cart-item'>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                        <img className='cart-product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288623/multi-vendor/prod_1_2x.png' />
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset name-incremenet'>
                        <div className='product-name'>Cabagge</div>
                        <div className='qty-measurement'>Pce</div>
                        <div className='qty-increment'>
                            <span className='decrement'>-</span>
                            <span className='number'>12</span>
                            <span className='increment'>+</span>
                        </div>
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset prices-discounts'>
                        <div className='cart-bk'>
                            <div className='discount'>10% OFF</div>
                            <div />
                        </div>
                        <div className='cart-bk'>
                            <div className='edit'><span className='icon-Path-68'></span><span className="xs-hidden__txt">Edit</span></div>
                            <div className='initial-price'>Rwf 1000</div>
                        </div>
                        <div className='cart-bk'>
                            <div className='remove'><span className='icon-Path-60'></span><span className="xs-hidden__txt">Remove</span></div>
                            <div className='price'>Rwf 900</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='total-price'>
                <div className='subtotal'>Sutotal: Rwf 21,345</div>
                <div className='shipping-grid'>
                    <span className='shipping-title'>Shipping method</span>
                    <span className='shipping-dropdown'>
                        <Select2
                            defaultValue={2}
                            data={[
                                { text: 'WHS', id: 1 },
                                { text: 'another WHS', id: 2 },
                                { text: 'other WHS', id: 3}
                            ]}
                        />
                    </span>
                    <span className='shipping'>Total: Rwf 21,345</span>
                </div>
                <div className='total-grid'>
                    <span className='total'>Total: Rwf 45,475</span>
                </div>
            </div>
        </div>
        )
    }
}

export default SingleCartItem;