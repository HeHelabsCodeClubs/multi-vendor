import React, { Component } from 'react';
import SingleStoreOrderSummary from './SingleStoreOrderSummary';
import isObjectEmpty from '../../../helpers/is_object_empty';
import InputField from '../../reusable/InputField';
import MessageDisplayer from '../../reusable/MessageDisplayer';
import { 
    getCartItems,
    countCartItems,
    storeProductsTotalPrice
} from '../../../helpers/cart_functionality_helpers';
import { 
    getTotalShippingPrice 
} from '../../../helpers/shipment_method_functionality_helpers';
import { 
    storeCouponCodeInLocalStorage,
    getCouponCodeInLocalStorage,
    calculateDiscount,
    getDiscountAmount,
    getCouponDataFromApi
} from '../../../helpers/coupon_code_functionality';
import { 
    API_URL,
    EMPTY_PROMO_CODE_FIELD,
    UNREGISTERED_PROMO_CODE,
    UNEXPECTED_PROMO_CODE_ERROR,
    PROMO_CODE_SUCCESSFULLY_APPLIED,
    ALERT_TIMEOUT
} from '../../../config';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: {},
            totalItemsPrice: 0,
            totalShippingPrice: 0,
            triggerUpdateForSingleStoreShippingPrice: false,
            couponCode: '',
            displayMessageBox: false,
            boxMessageType: 'success',
            boxMessage: '',
            submittingCouponCode: false,
            orderDiscount: {}
        };
        this.updateCartItems = this.updateCartItems.bind(this);
        this.renderCartItemsTotal = this.renderCartItemsTotal.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.updateTotalShippingPrice = this.updateTotalShippingPrice.bind(this);
        this.updateShippingPriceForAStore = this.updateShippingPriceForAStore.bind(this);
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.getCouponCodeDiscount = this.getCouponCodeDiscount.bind(this);
        this.handleCouponDisountResponse = this.handleCouponDisountResponse.bind(this);
        this.displayMessageBox = this.displayMessageBox.bind(this);
        this.displayDiscountAmount = this.displayDiscountAmount.bind(this);
        this.renderPromoCodeInputField = this.renderPromoCodeInputField.bind(this);
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

        /**
         * Check if there's no discount
         */
        getCouponCodeInLocalStorage((discountData) => {
            if (Object.keys(discountData).length !== 0) {
                this.setState({
                    orderDiscount: discountData
                });
            }
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

    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }

    getCouponCodeDiscount() {
        const { couponCode } = this.state;
        if (couponCode === '') {
            this.displayMessageBox('failure', EMPTY_PROMO_CODE_FIELD);
            return;
        }

        this.setState({
            submittingCouponCode: true
        });

        getCouponDataFromApi(couponCode, (response) => {
            this.handleCouponDisountResponse(response);
        });
    }

    handleCouponDisountResponse(response) {
        switch(response.status_code) {
            case 200:
                /**
                 * Apply discount on total order amount
                 * Store discount price in localstorage
                 */
                this.setState({
                    submittingCouponCode: false
                });
                const { data } = response;
                storeCouponCodeInLocalStorage(data, () => {
                    this.setState({
                        orderDiscount: data
                    }, () => {
                        this.displayMessageBox("success", PROMO_CODE_SUCCESSFULLY_APPLIED);
                    });
                });
                return;
            case 410:
                /**
                 * Inform the user that we do not have a registered coupon
                 */
                this.setState({
                    submittingCouponCode: false
                });
                this.displayMessageBox("failure", UNREGISTERED_PROMO_CODE);
                return;
            default:
                /**
                 * An unexpected error happened
                 */
                this.setState({
                    submittingCouponCode: false
                });
                this.displayMessageBox("failure", UNEXPECTED_PROMO_CODE_ERROR);
                return;
        }
    }

    displayDiscountAmount(totalItemsPrice, totalShippingPrice) {
        const { orderDiscount } = this.state;
        if (Object.keys(orderDiscount).length !== 0) {
            return (
                <div className='line total'>
                    <span className="row total-t discount-container">
                        <span className='title'>Discount:</span>
                        <span className='t-price'>{`Rwf ${getDiscountAmount(totalItemsPrice, totalShippingPrice, orderDiscount)}`}</span>
                    </span>
                </div>
            );
        }
        return null;
    }

    displayMessageBox(messageType, message) {
        this.setState({
            boxMessage: message,
            boxMessageType: messageType === "failure" ? "failure" : "success",
            displayMessageBox: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    displayMessageBox: false
                });
            }, ALERT_TIMEOUT);
        });
    }

    renderPromoCodeInputField() {
        const { submittingCouponCode, orderDiscount } = this.state;
        if (Object.keys(orderDiscount).length === 0) {
            const couponCodeSubmitButton = submittingCouponCode ? (
                <img 
                src='https://res.cloudinary.com/hehe/image/upload/v1560444707/multi-vendor/Shop_loader.gif' 
                />
            ) : 'Apply';
            return (
                <div className='line top-margin'>
                    <InputField 
                    typeOfInput='text_field'
                    name='couponCode'
                    placeholder="Gift certificate or promo code"
                    classN='form-control'
                    inputWrapperClassName="input-group mb-3 has-button-attached"
                    hasLabel={false}
                    updateInputFieldValue={this.getInputFieldValue}
                    InnerContent={
                        <div className="input-group-append">
                            <button 
                            onClick={this.getCouponCodeDiscount}
                            className={submittingCouponCode ? 'input-group-text is-loading' : 'input-group-text'}
                            disabled={submittingCouponCode ? true : false}
                            >
                                {couponCodeSubmitButton}
                            </button>
                        </div>
                    }
                    />
                </div>
            );
        }
        return null;
    }

    renderCartItemsTotal() {
        const { 
            cartItems, 
            totalShippingPrice, 
            displayMessageBox, 
            boxMessageType,
            boxMessage,
            orderDiscount
        } = this.state;
        if (!isObjectEmpty(cartItems)) {
            const totalItems = countCartItems(cartItems);
            const totalItemsText = totalItems === 1 ? `${totalItems} item` : `${totalItems} item(s)`;
            const totalItemsPrice = storeProductsTotalPrice(cartItems);
            const overallTotal = calculateDiscount(totalItemsPrice, totalShippingPrice, orderDiscount);
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
                    {this.displayDiscountAmount(totalItemsPrice, totalShippingPrice)}
                    <div className='line'>
                        <span className='title'>Total:</span>
                        <span className='t-price'>{`Rwf ${overallTotal}`}</span>
                    </div>
                    <MessageDisplayer
                    type={boxMessageType}
                    display={displayMessageBox}
                    errorMessage={boxMessage}
                    />
                    {/** promo code goes here */}
                    {this.renderPromoCodeInputField()}
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