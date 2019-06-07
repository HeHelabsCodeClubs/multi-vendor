import React, { Component } from 'react';
import StockIncrementer from './StockIncrementer';
import isObjectEmpty from '../../helpers/is_object_empty';
import RemoveProductFromCart from '../../helpers/remove_product_from_cart';

export default class SingleCartProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {}
        };
        this.renderProductPrice = this.renderProductPrice.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);
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

    removeProductFromCart(item, e) {
        const { product, updateCartData } = item.props;
        if (product) {
            RemoveProductFromCart(product, () => {
                updateCartData();
            });
        }
    }
 
    renderProductPrice(product) {
        const { 
            has_discount,
            discount_percent,
            special_price,
            price
        } = product;
        const removeProductClick = this.removeProductFromCart.bind(product, this);
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
                        <button 
                        className='remove'
                        type='button'
                        onClick={removeProductClick}
                        >
                            <span className='icon-Path-60'></span>
                            <span className="xs-hidden__txt">Remove</span>
                        </button>
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
                    <button 
                    className='remove'
                    type='button'
                    onClick={removeProductClick}
                    >
                        <span className='icon-Path-60'></span>
                        <span className="xs-hidden__txt">Remove</span>
                    </button>
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
                attributes,
                has_attributes
            } = productData;
            console.log('data');
            console.log(productData);
            if (Number(has_attributes) === 0) {
                const pieceDescr = attributes.descquantity !== undefined ? (
                    <div className='qty-measurement'>Pce</div>
                ) : null;
                return (
                    <div className='row reset-row cart-item'>
                        <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                            <img className='cart-product-img' src={cart_image_url} />
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset name-incremenet'>
                            <div className='product-name'>{name}</div>
                            {pieceDescr}
                            <StockIncrementer 
                            stock={productData.stock}
                            updateCartOnChange={true}
                            product={productData}
                            runOnCartChange={this.props.updateCartData}
                            incrementInitial={false}
                            updateInitial={true}
                            layout={'incrementor'}
                            />
                        </div>
                        {this.renderProductPrice(productData)}
                    </div>
                );
            }

            const pieceDescr = attributes.descquantity !== undefined ? (
                <div className='qty-measurement'>Pce</div>
            ) : null;
            return (
                <div className='row reset-row cart-item'>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                        <img className='cart-product-img' src={cart_image_url} />
                    </div>
                    <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset name-incremenet'>
                        <div className='product-name'>{name}</div>
                        {pieceDescr}
                        <StockIncrementer 
                        stock={productData.stock}
                        updateCartOnChange={true}
                        product={productData}
                        runOnCartChange={this.props.updateCartData}
                        incrementInitial={false}
                        updateInitial={true}
                        layout={'incrementor'}
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