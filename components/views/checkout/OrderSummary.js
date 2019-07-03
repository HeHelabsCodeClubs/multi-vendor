import React, { Component } from 'react';
import { 
    getCartItems,
    countCartItems,
    storeProductsTotalPrice,
    singleStoreProductsCount,
    singleStoreTotalPrice
} from '../../../helpers/cart_functionality_helpers';
import isObjectEmpty from '../../../helpers/is_object_empty';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: {},
            totalItemsPrice: 0
        };
        this.updateCartItems = this.updateCartItems.bind(this);
        this.renderCartItemsTotal = this.renderCartItemsTotal.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    componentDidMount() {
        getCartItems((items) => {
           this.updateCartItems(items);
        });
    }

    updateCartItems(items) {
        this.setState({
            cartItems: items
        });
    }

    renderCartItemsTotal() {
        const { cartItems } = this.state;
        if (!isObjectEmpty(cartItems)) {
            const totalItems = countCartItems(cartItems);
            const totalItemsText = totalItems === 1 ? `${totalItems} item` : `${totalItems} item(s)`;
            const totalItemsPrice = storeProductsTotalPrice(cartItems);
            return (
                <div className='white-background'>
                    <div className='line'>
                        <span className='title'>{totalItemsText}</span>
                        <span className='t-price'>{`Rwf ${totalItemsPrice}`}</span>
                    </div>
                    <div className='line'>
                        <span className='title'>Total shipping:</span>
                        <span className='s-price'>Rwf 2100</span>
                    </div>
                </div>
            );
        }

        return null;
    }

    renderProducts() {
        const { cartItems } = this.state;
        if (!isObjectEmpty(cartItems)) {
            const storeLayout = [];
            Object.keys(cartItems).forEach((storeSlug, index) => {
                const storeProducts = cartItems[storeSlug].products;
                const productsLayout = [];
                Object.keys(storeProducts).forEach((productSlug, index) => {
                    if (Number(storeProducts[productSlug].has_attributes) === 0) {
                        const { name, price, quantity, has_discount, special_price } = storeProducts[productSlug];
                        const productPrice = Number(has_discount) === 1 ? Number(special_price) : Number(price);
                        const totalPrice = Number(productPrice) * Number(quantity);
                        productsLayout.push(
                            <div 
                            className='cart-product'
                            key={`${name}-${index}`}
                            >
                                <div className='line'>
                                    <span className='title'>{name}</span>
                                    <span className='u-price'>{`Rwf ${totalPrice}`}</span>
                                </div>
                                <div className='product-att'>{`qty: ${quantity}`}</div>
                                <div className='product-att'>{`Unit price: Rwf ${price}`}</div>
                            </div>
                        );
                    } else {
                        const { meta, name } = storeProducts[productSlug];
                        const products = meta.map((product, index) => {
                            const productPrice = Number(product.has_discount) === 1 ? Number(product.special_price) : Number(product.price);
                            const totalPrice = Number(product.quantity) * productPrice;
                            const optionsLayout = [];
                            const { options } = product;
                            Object.keys(options).forEach((option, index) => {
                                optionsLayout.push(
                                    <div 
                                    className='product-att'
                                    key={`${option}-${index}`}
                                    >
                                    {`${option}: ${options[option].title}`}
                                    </div>
                                );
                            });
                            return (
                                <div 
                                className='cart-product'
                                key={`${name}-${index}`}
                                >
                                    <div className='line'>
                                        <span className='title'>{name}</span>
                                        <span className='u-price'>{`Rwf ${totalPrice}`}</span>
                                    </div>
                                    <div className='product-att'>{`qty: ${product.quantity}`}</div>
                                    {optionsLayout}
                                    <div className='product-att'>{`Unit price: Rwf ${product.price}`}</div>
                                </div>
                            );
                        });
                        productsLayout.push(products);
                    }
                });

                const storeProductsCount = singleStoreProductsCount(cartItems[storeSlug]);
                const productsCountText = storeProductsCount === 1 ? `(${storeProductsCount} Item from ${cartItems[storeSlug].info.name} store)` : `(${storeProductsCount} Items from ${cartItems[storeSlug].info.name} store)`;
                const storeTotalPrice = singleStoreTotalPrice(cartItems[storeSlug]);
                storeLayout.push(

                    <div 
                    className='white-background'
                    key={`${storeSlug}-${index}`}
                    >
                        <div 
                        className='checkout-cart-header'
                        >
                            <div className='store-cart-content'>
                                <img className='store-logo' src={cartItems[storeSlug].info.icon}/>
                                <span className='store-name'>{cartItems[storeSlug].info.name}</span>
                            </div>
                            <span className='store-items'>{productsCountText}</span>
                            
                        </div>
                        {productsLayout}
                    
                    {/* <div className='gift-block'>
                        <div>
                            <input type='text' placeholder='Gift certificate or promo code' />
                            <button>Apply</button>
                        </div>
                    </div> */}
                    <div>
                        <div className='subtotal'><span className='light-title'>Subtotal:</span> {`Rwf ${storeTotalPrice}`}</div>
                        <div className='shipping'><span className='light-title'>Shipping:</span>  Rwf 100</div>
                        <div className='total'><span className='total-t'><span className='light-title'>Total:</span>  Rwf 1100</span></div>
                    </div>
                </div>
                    
                );
            });
            return storeLayout;
        }
        return null; 
    }
	render() {
        console.log('items', this.state.cartItems);
		return (
            <div className='order-summary-wrapper'>
                <div className='order-summary'>
                    <div className='order-summary-title'>Order Summary</div>
                    {this.renderCartItemsTotal()}
                </div>
                <div className='products'>
                    <div className='order-summary-title'>Products</div>
                    {this.renderProducts()}
                </div>
            </div>
		);
	}
}

export default OrderSummary;