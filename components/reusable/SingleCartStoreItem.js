import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';
import isObjectEmpty from '../../helpers/is_object_empty';
import SingleCartProductItem from './SingleCartProductItem';
import { 
    singleStoreProductsCount,
    singleStoreTotalPrice 
} from '../../helpers/cart_functionality_helpers';


class SingleCartStoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeData: {}
        };
        this.renderStoreInfo = this.renderStoreInfo.bind(this);
        this.renderStoreProducts = this.renderStoreProducts.bind(this);
        this.renderStoreTotalPrice = this.renderStoreTotalPrice.bind(this);
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

    renderStoreTotalPrice() {
        const { storeData } = this.state;
        if (!isObjectEmpty(storeData)) {
            const totalPrice = singleStoreTotalPrice(storeData);
            return (
                <div className='total-price'>
                    <div className='subtotal'>{`Sutotal: Rwf ${totalPrice}`}</div>
                    <div className='shipping-grid'>
                        <span className='shipping-title'>Shipping method</span>
                        <span className='shipping-dropdown'>
                            <Select2
                                defaultValue={1}
                                data={[
                                    { text: 'WHS', id: 1 },
                                    { text: 'another WHS', id: 2 },
                                    { text: 'other WHS', id: 3}
                                ]}
                            />
                        </span>
                        <span className='shipping'>{`Total: Rwf ${totalPrice}`}</span>
                    </div>
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