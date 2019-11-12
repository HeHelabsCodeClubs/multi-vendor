import React, { Component } from 'react';
import isObjectEmpty from '../../helpers/is_object_empty';
import SingleCartProductItem from './SingleCartProductItem';
import { 
    singleStoreProductsCount,
    singleStoreTotalPrice,
    countSingleStoreCartItems,
    calculateMartStorePackagingFee
} from '../../helpers/cart_functionality_helpers';


class SingleCartStoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: {},
            shipmentMethod: ''
        };
        this.renderStoreInfo = this.renderStoreInfo.bind(this);
        this.renderStoreProducts = this.renderStoreProducts.bind(this);
        this.renderStoreTotalPrice = this.renderStoreTotalPrice.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.renderPackagingFee = this.renderPackagingFee.bind(this);
    }
    componentDidMount() {
        const { store } = this.props;
        if (store) {
            this.setState({
                storeData: store
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { store } = nextProps;
        this.setState({
            storeData: store
        });
    }

    renderStoreInfo() {
        const { storeData } = this.state;
        if (!isObjectEmpty(storeData)) {
            const { info } = storeData;
            const storeProductsCount = singleStoreProductsCount(storeData);
            const itemsText = storeProductsCount === 1 ? 'item' : 'items';
            return (
                <div className='store-logo'>
                    <img className='store-img' src={`${info.icon}`} />
                    <span className='store-name'>{`${info.name} (${storeProductsCount} ${itemsText} from ${info.name} store)`}</span>
                </div>
            );
        }
        
    }

    renderStoreProducts() {
        const { storeData } = this.state;
        if (!isObjectEmpty(storeData)) {
            const { products } = storeData;
            const productsLayout = [];
            Object.keys(products).forEach((product_slug, index) => {
                const productData = products[product_slug];
                productData.store = {
                    slug: storeData.slug
                };
                productData.slug = product_slug;
                productsLayout.push(
                    <SingleCartProductItem 
                    key={product_slug}
                    product={productData}
                    updateCartData={this.props.updateCartData}
                    />
                );
            });

            return productsLayout;
        }
    }

    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }

    renderPackagingFee(store) {
        const { slug, products } = store;
        if (slug === 'mart') {
            const storeItemsQuantity = countSingleStoreCartItems(products);
            const packagingFee = calculateMartStorePackagingFee(Number(storeItemsQuantity));
            return (
                <div className='subtotal'>{`Packaging Fee: Rwf ${packagingFee}`}</div>
            );
        }

        return null;
    }

    renderStoreTotalPrice() {
        const { storeData } = this.state;
        if (!isObjectEmpty(storeData)) {
            const storeItemsQuantity = (storeData.slug === 'mart') ? countSingleStoreCartItems(storeData.products) : 0;
            const packagingFee = (storeData.slug === 'mart') ? calculateMartStorePackagingFee(Number(storeItemsQuantity)) : 0;
            const subTotalPrice = singleStoreTotalPrice(storeData);
            const totalPrice = subTotalPrice + packagingFee;
            return (
                <div className='total-price'>
                    <div className='subtotal'>{`Sutotal: Rwf ${subTotalPrice}`}</div>
                    {this.renderPackagingFee(storeData)}
                    <div className='total-grid'>
                        <span className='total'>{`Total: Rwf ${totalPrice}`}</span>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
            <div className='cart-store-content'>
                {this.renderStoreInfo()}
                {this.renderStoreProducts()}
            </div>
            {this.renderStoreTotalPrice()}
        </div>
        )
    }
}

export default SingleCartStoreItem;