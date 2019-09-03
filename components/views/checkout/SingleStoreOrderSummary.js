import React, { Component } from 'react';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { 
    singleStoreProductsCount,
    singleStoreTotalPrice
} from '../../../helpers/cart_functionality_helpers';
import {
    retrieveShipmentPricePerStoreSlug
} from '../../../helpers/shipment_method_functionality_helpers';

export default class SingleStoreOrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {},
            totalShipmentPrice: 0
        };
        this.renderContent = this.renderContent.bind(this);
        this.updateTotalShipmentPrice = this.updateTotalShipmentPrice.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const { triggerUpdateForSingleStoreShippingPrice } = nextProps;
        if(triggerUpdateForSingleStoreShippingPrice) {
            retrieveShipmentPricePerStoreSlug(this.state.store.slug, (totalPrice) => {
                this.updateTotalShipmentPrice(totalPrice);
            });
        }
    }
    componentDidMount() {
        const { storeData } = this.props;
        this.setState({
            store: storeData
        }, () => {
            // update total shipment price
            retrieveShipmentPricePerStoreSlug(this.state.store.slug, (totalPrice) => {
                this.updateTotalShipmentPrice(totalPrice);
            });
        });
    }

    updateTotalShipmentPrice(totalPrice) {
        const { totalShipmentPrice } = this.state;
        if (totalShipmentPrice !== totalPrice) {
            this.setState({
                totalShipmentPrice: totalPrice
            });
        }
    }
    renderContent() {
        const { store, totalShipmentPrice } = this.state;
        if (!isObjectEmpty(store)) {
            const storeLayout = [];
            const storeProducts = store.products;
            const slug = store.slug;
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

            const storeProductsCount = singleStoreProductsCount(store);
            const productsCountText = storeProductsCount === 1 ? `(${storeProductsCount} Item from ${store.info.name} store)` : `(${storeProductsCount} Items from ${store.info.name} store)`;
            const storeTotalPrice = singleStoreTotalPrice(store);
            const finalTotalPrice = storeTotalPrice + totalShipmentPrice;
            storeLayout.push(

                <div 
                className='white-background'
                key={`${slug}`}
                >
                    <div className='checkout-cart-header'>
                        <div className='store-cart-content'>
                            <span className="store-logo-wrapper"><img className='store-logo' src={store.info.icon}/></span>
                            <span className='store-name'>{store.info.name}</span>
                        </div>
                        <span className='store-items'>{productsCountText}</span>                        
                    </div>
                    <div className="store-products">
                        {productsLayout}
                    </div>
                
                {/* <div className='gift-block'>
                    <div>
                        <input type='text' placeholder='Gift certificate or promo code' />
                        <button>Apply</button>
                    </div>
                </div> */}
                <div>
                    <div className='subtotal'><span className='light-title'>Subtotal:</span> {`Rwf ${storeTotalPrice}`}</div>
                    <div className='shipping'><span className='light-title'>Shipping:</span>  {`Rwf ${totalShipmentPrice}`}</div>
                    <div className='total'><span className='total-t'><span className='light-title'>Total:</span>  {`Rwf ${finalTotalPrice}`}</span></div>
                </div>
            </div>
                
            );

            return storeLayout;
        }

        return null;

    }
    render() {
        return this.renderContent();
    }
}