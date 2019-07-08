import React, { Component } from 'react';
import SingleStoreOrderSummary from './SingleStoreOrderSummary';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { 
    getCartItems,
    countCartItems,
    storeProductsTotalPrice
} from '../../../helpers/cart_functionality_helpers';
import { 
    getTotalShippingPrice 
} from '../../../helpers/shipment_method_functionality_helpers';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: {},
            totalItemsPrice: 0,
            totalShippingPrice: 0,
            triggerUpdateForSingleStoreShippingPrice: false
        };
        this.updateCartItems = this.updateCartItems.bind(this);
        this.renderCartItemsTotal = this.renderCartItemsTotal.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.updateTotalShippingPrice = this.updateTotalShippingPrice.bind(this);
        this.updateShippingPriceForAStore = this.updateShippingPriceForAStore.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { triggerShipmentMethodUpdate } = nextProps;
        if (triggerShipmentMethodUpdate) {
            // update total shipping price
            getTotalShippingPrice((totalPrice) => {
                this.updateTotalShippingPrice(totalPrice);
                // update shipping price for each store
                this.updateShippingPriceForAStore();
                
            });
        }
    }

    componentDidMount() {
        getCartItems((items) => {
           this.updateCartItems(items);
        });

        // update total shipping price
        getTotalShippingPrice((totalPrice) => {
            this.updateTotalShippingPrice(totalPrice);
        });
    }

    updateShippingPriceForAStore() {
        const { triggerUpdateForSingleStoreShippingPrice } = this.state;
        if (!triggerUpdateForSingleStoreShippingPrice) {
            this.setState({
                triggerUpdateForSingleStoreShippingPrice: true
            });

            // back to initital state
            setTimeout(() => {
                this.setState({
                    triggerUpdateForSingleStoreShippingPrice: false
                })
            }, 400);
        }
    }

    updateCartItems(items) {
        this.setState({
            cartItems: items
        });
    }

    updateTotalShippingPrice(totalPrice) {
        const { totalShippingPrice } = this.state;
        if (totalShippingPrice !== totalPrice) {
            this.setState({
                totalShippingPrice: totalPrice
            });
        }
    }

    renderCartItemsTotal() {
        const { cartItems, totalShippingPrice } = this.state;
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
                        <span className='s-price'>{`Rwf ${totalShippingPrice}`}</span>
                    </div>
                </div>
            );
        }

        return null;
    }

    renderProducts() {
        const { cartItems, triggerUpdateForSingleStoreShippingPrice } = this.state;
        if (!isObjectEmpty(cartItems)) {
            const storeLayout = [];
            Object.keys(cartItems).forEach((storeSlug, index) => {
                const data = {
                    slug: storeSlug,
                    ...cartItems[storeSlug]
                };
                storeLayout.push(
                    <SingleStoreOrderSummary 
                    key={`${storeSlug}-${index}`}
                    storeData={data}
                    triggerUpdateForSingleStoreShippingPrice={triggerUpdateForSingleStoreShippingPrice}
                    />
                );
            });
            return storeLayout;
        }
        return null; 
    }
	render() {
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