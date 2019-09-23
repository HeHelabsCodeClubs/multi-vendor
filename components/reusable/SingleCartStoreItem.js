import React, { Component } from 'react';
import isObjectEmpty from '../../helpers/is_object_empty';
import SingleCartProductItem from './SingleCartProductItem';
import { 
    singleStoreProductsCount,
    singleStoreTotalPrice 
} from '../../helpers/cart_functionality_helpers';
import InputField from '../reusable/InputField';


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
        this.renderShipmentMethodSelector = this.renderShipmentMethodSelector.bind(this);
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
                    <span className='store-name'>{`${info.name} (${storeProductsCount} ${itemsText})`}</span>
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

    renderShipmentMethodSelector(storeData) {
        const { shipment_methods } = storeData.info;
        if (shipment_methods.length == 0) {
            return null;
        }

        const selectorData = shipment_methods.map((shipment_method, index) => {
            const { title, description, cart_shipment_id } = shipment_method;
            return {
                text: title,
                id: `${title},${description},${cart_shipment_id}`
            };
        });
        return (
            <InputField 
            typeOfInput='selector'
            id='shipment-method-selector'
            name='shipmentMethod'
            selectorData={[
                { text: 'Female', id: 'female' },
                { text: 'Male', id: 'male' },
            ]}
            hideLabel={true}
            placeholder='shipment'
            updateInputFieldValue={this.getInputFieldValue}
            />
        );
    }

    renderStoreTotalPrice() {
        const { storeData } = this.state;
        if (!isObjectEmpty(storeData)) {
            const totalPrice = singleStoreTotalPrice(storeData);
            return (
                <div className='total-price'>
                    <div className='subtotal'>{`Sutotal: Rwf ${totalPrice}`}</div>
                    {/* <div className='shipping-grid'>
                        <span className='shipping-title'>Shipping <span className="hidden-xs">method</span></span>
                        <span className='auth-form'>
                            {this.renderShipmentMethodSelector(storeData)}
                        </span>
                        <span className='shipping'>{`Total: Rwf ${totalPrice}`}</span>
                    </div> */}
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