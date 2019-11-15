import localforage from 'localforage';
import cookie from 'js-cookie';
import { 
    countSingleStoreCartItems,
    calculateMartStorePackagingFee 
} from './cart_functionality_helpers';
import { 
    ORDER_DATA_TOKEN, 
    CART_ITEMS_KEY, 
    LOCAL_SHIPMENTS_KEY, 
    DISCOUNT_DATA,
    TRANSACTION_FAILED_MESSAGE,
    NON_ACTIVE_USER_ACCOUNT_MESSAGE,
    USER_EXCEEDED_AMOUNT_TO_SEND_MESSAGE,
    USER_INSUFFICIENT_FUNDS_MESSAGE,
    USER_NOT_REGISTERED_MESSAGE,
    MINIMUM_FUNDS_TO_SEND_MESSAGE,
    PAYMENT_STATUS_TOKEN
} from '../config';
/**
 * This helper contains all the functionalities to create and proccess an order
 * 
 */

export const createPaymentSubmissionData = (payment_method, cartItems, shipmentData) => {
    switch (payment_method) {
        case 'card':
            return createCardPaymentSubmissionData(cartItems, shipmentData);
        case 'momo':
            return createCardPaymentSubmissionData(cartItems, shipmentData);
        default:
            return {};
    }
}

export const storeOrderDATACookie = (order_id) => {
    cookie.set(ORDER_DATA_TOKEN, order_id);
}

export const storeMoMoPaymentStatusCookie = (status) => {
    cookie.set(PAYMENT_STATUS_TOKEN, status);
}

export const removeOrderDATACookie = () => {
    cookie.remove(ORDER_DATA_TOKEN);
}

export const removeMoMoPaymentStatusCookie = () => {
    cookie.remove(PAYMENT_STATUS_TOKEN);
}

export const perfomOnPaymentSuccess = () => {
    localforage.removeItem(CART_ITEMS_KEY);
    localforage.removeItem(LOCAL_SHIPMENTS_KEY);
    localforage.removeItem(DISCOUNT_DATA);
    removeOrderDATACookie();
    removeMoMoPaymentStatusCookie();
}

const createCardPaymentSubmissionData = (cartItems, shipmentData) => {
    const DataToSubmit = cartItems;
    Object.keys(cartItems).forEach((store_slug) => {
        if (shipmentData[store_slug] !== undefined) {
            const shipment = shipmentData[store_slug].method.split(',');
            const data = {
                title: shipment[0],
                description: shipment[1],
                rate: shipment[2],
                cart_shipping_id: shipment[3],
                code: shipment[4] ? shipment[4] : 'sales.carriers.whs-nextday.active'
            };
            cartItems[store_slug].shipment_method = data;
            if (store_slug === 'mart') {
                const storeQuantity = countSingleStoreCartItems(cartItems[store_slug].products);
                const packagingFee = calculateMartStorePackagingFee(Number(storeQuantity));
                cartItems[store_slug].packaging_fee = packagingFee;
                
            } else {
                cartItems[store_slug].packaging_fee = 0; 
            }
        }
    });

    return DataToSubmit;
}

export const getMoMoErrorMessage = (API_ERROR_MESSAGE) => {
    switch(API_ERROR_MESSAGE) {
        case "TRANSACTION_FAILED":
            return TRANSACTION_FAILED_MESSAGE;
        case "NO_USER_ACTIVE_ACCOUNT":
            return NON_ACTIVE_USER_ACCOUNT_MESSAGE;
        case "EXCEEDED_AMOUNT_TO_SEND":
            return USER_EXCEEDED_AMOUNT_TO_SEND_MESSAGE;
        case "INSUFFICIENT_FUNDS":
            return USER_INSUFFICIENT_FUNDS_MESSAGE;
        case "USER_NOT_REGISTERED":
            return USER_NOT_REGISTERED_MESSAGE;
        case "BELOW_MINIMUM_AMOUNT_TO_SEND":
            return MINIMUM_FUNDS_TO_SEND_MESSAGE;
        case "TRANSACTION_NOT_FOUND":
            return TRANSACTION_FAILED_MESSAGE;
        case "UNKNOWN_ERROR":
            return TRANSACTION_FAILED_MESSAGE;
        case "LONG_API_RESPONSE":
            return TRANSACTION_FAILED_MESSAGE;
        case "TOKEN_EXPIRED":
            return TRANSACTION_FAILED_MESSAGE;
        case "CAN_NOT_GET_QUEUE_CREDENTIALS":
            return TRANSACTION_FAILED_MESSAGE;
        case "API_PARAMS_VALIDATION_ERROR":
            return TRANSACTION_FAILED_MESSAGE;
        case "API_INTERNAL_SERVER_ERROR":
            return TRANSACTION_FAILED_MESSAGE;
        case "UNEXPECTED_API_RESPONSE_STATUS_CODE":
            return TRANSACTION_FAILED_MESSAGE;
        default:
            return TRANSACTION_FAILED_MESSAGE;

    }
}


