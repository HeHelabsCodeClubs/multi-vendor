import React, { Component } from 'react';
import StockIncrementer from './StockIncrementer';
import isObjectEmpty from '../../helpers/is_object_empty';

export default class SingleCartProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {}
        };
        this.renderProductPrice = this.renderProductPrice.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
    }

    componentDidMount() {
        const { product } = this.props;
        if (product !== undefined) {
            this.setState({
                productData: product
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { product } = nextProps;
        this.setState({
            productData: product
        });
    }
 
    renderProductPrice(product) {
        const { 
            has_discount,
            discount_percent,
            special_price,
            price
        } = product;
        if (Number(has_discount) === 1) {
            return (
                <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset prices-discounts'>
                    <div className='cart-bk'>
                        <div className='discount'>{`${discount_percent}% OFF`}</div>
                    </div>
                    <div className='cart-bk'>
                        <div className='edit'><span className='icon-Path-68'></span><span className="xs-hidden__txt">Edit</span></div>
                        <div className='initial-price'>{`Rwf ${price}`}</div>
                    </div>
                    <div className='cart-bk'>
                        <div className='remove'><span className='icon-Path-60'></span><span className="xs-hidden__txt">Remove</span></div>
                        <div className='price'>{`Rwf ${special_price}`}</div>
                    </div>    
                </div>
            )
        }

        return (
            <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset prices-discounts'>
                <div className='cart-bk'>
                    &nbsp;
                </div>
                <div className='cart-bk'>
                    <div className='edit'><span className='icon-Path-68'></span><span className="xs-hidden__txt">Edit</span></div>
                </div>
                <div className='cart-bk'>
                    <div className='remove'><span className='icon-Path-60'></span><span className="xs-hidden__txt">Remove</span></div>
                    <div className='price'>{`Rwf ${price}`}</div>
                </div>    
            </div>
        );
    }

    renderProduct() {
        const { productData } = this.state;
        if (!isObjectEmpty(productData)) {
            const {
                cart_image_url,
                name,
                quantity
            } = productData;
            return (
                <div className='row reset-row cart-item'>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                        <img className='cart-product-img' src={cart_image_url} />
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset name-incremenet'>
                        <div className='product-name'>{name}</div>
                        {/* <div className='qty-measurement'>Pce</div> */}
                        {/* <div className='qty-increment'>
                            <span className='decrement'>-</span>
                            <span className='number'>{quantity}</span>
                            <span className='increment'>+</span>
                        </div> */}
                        <StockIncrementer 
                        stock={productData.stock}
                        updateCartOnChange={true}
                        product={productData}
                        />
                    </div>
                    {this.renderProductPrice(productData)}
                </div>
            );
        }

        return null;
    }

    render() {
        return this.renderProduct();
    }
}