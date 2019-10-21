import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';
import InputField from '../../reusable/InputField';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { 
    singleStoreProductsCount,
    singleStoreTotalPrice 
} from '../../../helpers/cart_functionality_helpers';
import { 
    storeShipmentInLocal,
    retrieveShipmentDataPerStoreSlug
} from '../../../helpers/shipment_method_functionality_helpers';

export default class SingleStoreDeliveryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: {},
            allProductsDisplayed: false,
            shipmentMethod: '',
            shipmentTotalPrice: 0,
            shipmentDescription: '',
            shipmentHasBeenSelected: false,
            inputWithError: ''
        };
        this.renderContent = this.renderContent.bind(this);
        this.showAllProducts = this.showAllProducts.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.renderShipmentMethodSelector = this.renderShipmentMethodSelector.bind(this);
        this.updateShipmentInfo = this.updateShipmentInfo.bind(this);
        this.renderShipmentDescription = this.renderShipmentDescription.bind(this);
        this.renderShipmentTotalLayout = this.renderShipmentTotalLayout.bind(this);
        this.updateLocalShipmentData = this.updateLocalShipmentData.bind(this);
        this.setDefaultShipmentMethodIfInLocalStorage = this.setDefaultShipmentMethodIfInLocalStorage.bind(this);
        this.validatedShipment = this.validatedShipment.bind(this);
    }

    componentDidMount() {
        const { storeData } = this.props;
        this.setState({
            store: storeData
        }, () => {
            this.setDefaultShipmentMethodIfInLocalStorage();
        });
    }

    componentWillReceiveProps(nextProps) {
        const { triggerValidation } = nextProps;
        if (triggerValidation) {
            const { store } = this.state;
            retrieveShipmentDataPerStoreSlug(store.slug, (existingMethod) => {
                this.validatedShipment(existingMethod); 
            });
        }
    }

    validatedShipment(shipment_method) {
        //const { shipmentMethod } = this.state;
        if (shipment_method === '') {
            this.props.isShipmentValid(false);
        } else {
            this.props.isShipmentValid(true);
        }
    }

    setDefaultShipmentMethodIfInLocalStorage() {
        const { store: { slug } } = this.state;
        const { updatedShipmentData } = this.props;
        if (slug !== undefined) {
            retrieveShipmentDataPerStoreSlug(slug, (existingMethod) => {
                if (existingMethod !== '') {
                    let methodData = '';
                    if (updatedShipmentData.length !== 0) {
                        for(let i = 0; i < updatedShipmentData.length; i++) {
                            const methodData = existingMethod.split(',');
                            if (methodData[4].trim() === updatedShipmentData[i].code.trim()) {
                                const {
                                    title,
                                    description,
                                    rate,
                                    cart_shipping_id,
                                    code
                                } = updatedShipmentData[i];
                                methodData = `${title},${description},${rate},${cart_shipping_id},${code}`;
                                this.updateLocalShipmentData(methodData);
                                break;
                            }
                        }
                    } 
                    this.setState({
                        shipmentMethod: methodData !== '' ? methodData : existingMethod,
                        shipmentHasBeenSelected: true
                    });
                }
            });
        }
    }
    showAllProducts() {
        const { allProductsDisplayed } = this.state;
        if (allProductsDisplayed) {
            this.setState({
                allProductsDisplayed: false
            });
            return;
        }

        this.setState({
            allProductsDisplayed: true
        });
    }

    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        }, () => {
            this.updateShipmentInfo(fieldStateName, newValue);
        });
    }

    updateLocalShipmentData(newUpdatedShipmentMethod) {
        const { store, shipmentMethod } = this.state;
        const data = {
            slug: store.slug,
            method: newUpdatedShipmentMethod !== undefined ? newUpdatedShipmentMethod : shipmentMethod
        };
        storeShipmentInLocal(data, () => {
            // trigger update of shipment info in other components
            this.props.updateShipmentInfo();
        });
    }

    updateShipmentInfo(fieldStateName, newValue) {
        if (fieldStateName === 'shipmentMethod') {
            const { shipmentTotalPrice, shipmentHasBeenSelected } = this.state;
            const shipmentData = newValue.split(',');
            if (Number(shipmentData[2]) !== shipmentTotalPrice) {
                this.setState({
                    shipmentTotalPrice: Number(shipmentData[2]), 
                });
            }
            this.updateLocalShipmentData();
            this.setState({
                shipmentDescription: shipmentData[1]
            });

            if (!shipmentHasBeenSelected) {
                this.setState({
                    shipmentHasBeenSelected: true
                });
            }
        }
    }
    renderShipmentTotalLayout() {
        const { shipmentHasBeenSelected, shipmentTotalPrice } = this.state;
        let shipmentPriceText = '';
        if (shipmentHasBeenSelected && (shipmentTotalPrice === 0)) {
            shipmentPriceText = 'Free';
        } else {
            shipmentPriceText = `Rwf ${shipmentTotalPrice}`;
        }
        
        return (
            <span className='shipping'>
                <span className='t-title'>Shipping: </span>
                <span className='t-content'>{shipmentPriceText}</span>
            </span>
        )
    }
    renderShipmentDescription() {
        const {shipmentDescription } = this.state;
        if (shipmentDescription !== '') {
            return (
                <span>
                    {/* <span className='dur-title'>Estimated duration </span> 
                    <span className='dur-content'>2days</span> */}
                    <p>
                        {shipmentDescription}
                    </p>
                </span>
            );
        }

        return <span/>;
    }
    renderShipmentMethodSelector() {
        const { store, shipmentMethod } = this.state;
        const { updatedShipmentData } = this.props;
        const { shipment_methods } = store.info;
        if (shipment_methods.length == 0) {
            return null;
        }
        const shipmentMethods = updatedShipmentData.length !== 0 ? updatedShipmentData : shipment_methods;
        const selectorData = shipmentMethods.map((shipment_method, index) => {
            const { title, description, cart_shipping_id, rate, code } = shipment_method;
            return {
                text: title,
                id: `${title},${description},${rate},${cart_shipping_id}, ${code}`
            };
        });
        return (
            <InputField 
            typeOfInput='selector'
            id='shipment-method-selector'
            name='shipmentMethod'
            selectorData={selectorData}
            hideLabel={true}
            placeholder='Choose shipment'
            updateInputFieldValue={this.getInputFieldValue}
            defaultInputValue={shipmentMethod}
            />
        );
    }
    renderContent() {
        const { 
            store, 
            allProductsDisplayed,
            shipmentTotalPrice 
        } = this.state;
        if (!isObjectEmpty(store)) {
            const { info, products } = store;
            const { name } = info;
            const productsLayout = [];
            Object.keys(products).forEach((productSlug, index) => {
                const { has_attributes } = products[productSlug];
                if (Number(has_attributes) === 0) {
                    const { name, price, quantity, has_discount, special_price } = products[productSlug];
                    const productPrice = Number(has_discount) === 1 ? Number(special_price) : Number(price);
                    const totalPrice = Number(productPrice) * Number(quantity);
                    productsLayout.push(
                        <div 
                        className='cart-product'
                        key={`${name}-${index}`}
                        >
                            <div className='row reset-row'>
                                <div className='col-lg-9 col-md-9 col-sm-8 col-8 col-reset'>
                                    <div className='title'>{name}</div>
                                    <div className='product-att'>{`qty: ${quantity}`}</div>
                                    <div className='product-att'>{`Unit price: Rwf ${price}`}</div>
                                </div>
                                <div className='col-lg-3 col-md-3 col-sm-4 col-4 col-reset'>
                                    <div className='u-price'>{`Rwf ${totalPrice}`}</div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    const { meta, name } = products[productSlug];
                    const optionProducts = meta.map((product, index) => {
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
                                <div className='row reset-row'>
                                    <div className='col-lg-9 col-md-9 col-sm-8 col-8 col-reset'>
                                        <div className='title'>{name}</div>
                                        <div className='product-att'>{`qty: ${product.quantity}`}</div>
                                        {optionsLayout}
                                        <div className='product-att'>{`Unit price: Rwf ${productPrice}`}</div>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-4 col-4 col-reset'>
                                        <div className='u-price'>{`Rwf ${totalPrice}`}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                    productsLayout.push(optionProducts);
                }
            });
            const storeItems = singleStoreProductsCount(store);
            const storeTotalPrice = singleStoreTotalPrice(store);
            const itemsText = storeItems === 1 ? `(${storeItems} item from ${name} store)` : `(${storeItems} items from ${name} store)`;
            const productsWrapperClassName = allProductsDisplayed ? 'store-cartProducts active' : 'store-cartProducts';
            const productsButtonText = allProductsDisplayed ? 'Hide Products' : 'Show Products';
            const finalTotalPrice = storeTotalPrice + shipmentTotalPrice;
            return (
                <div className='delivery-content'>
                    <div className='store-logo'>
                        <div className="left-block">
                            <span className="store-logo-wrapper"><img className='store-img' src={info.icon} /></span>
                            
                            <span className='store-name'>
                                <span className='name'>{name}</span><span className="items-in-cart">{itemsText}</span>
                            </span>
                        </div>
                        <div className="right-block">
                            <button 
                            type='button'
                            className="btn_store-cartProducts"
                            onClick={this.showAllProducts}
                            > 
                                <span className="icon-Angle_down"></span>
                                {productsButtonText}
                            </button>
                        </div>
                    </div>
                    <div className={productsWrapperClassName}>
                        {productsLayout}
                    </div>
                    <div className='total-price'>
                        <div className='subtotal'>
                            <span className='t-title'>Subtotal: </span>
                            <span className='t-content'>{`Rwf ${storeTotalPrice}`}</span>	
                        </div>
                        <div className='shipping-grid'>
                            <span className='shipping-title'>Shipping method</span>
                            <span className='shipping-dropdown'>
                                {this.renderShipmentMethodSelector(store)}
                            </span>
                            {this.renderShipmentTotalLayout()}
                        </div>
                        <div className='total-grid checkout-total-grid row reset-row'>
                            {this.renderShipmentDescription()}
                            <span className='total'>
                                <span className='t-title'>Total: </span>
                                <span className='t-content'>{`Rwf ${finalTotalPrice}`}</span>
                            </span>
                        </div>
                    </div>						
                </div>
            );
            
        }
        return null;
    }
    render() {
        return this.renderContent();
    }
}