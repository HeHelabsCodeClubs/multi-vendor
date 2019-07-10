import localforage from 'localforage';
import cookie from 'js-cookie';
import { ORDER_DATA_TOKEN, CART_ITEMS_KEY, LOCAL_SHIPMENTS_KEY } from '../config';
/**
 * This helper contains all the functionalities to create and proccess an order
 * 
 */

export const createPaymentSubmissionData = (payment_method, cartItems, shipmentData) => {
    switch (payment_method) {
        case 'card':
            return createCardPaymentSubmissionData(cartItems, shipmentData);
        default:
            return {};
    }
}

export const storeOrderDATACookie = (order_id) => {
    // const data = {
    //     payment_method: payment_method,
    //     order_data: order_data
    // };
    // data.push(order_data);
    cookie.set(ORDER_DATA_TOKEN, order_id);
}

export const removeOrderDATACookie = () => {
    cookie.remove(ORDER_DATA_TOKEN);
}

export const perfomOnPaymentSuccess = () => {
    localforage.removeItem(CART_ITEMS_KEY);
    localforage.removeItem(LOCAL_SHIPMENTS_KEY);
    removeOrderDATACookie();
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
                cart_shipping_id: shipment[3] 
            };
            cartItems[store_slug].shipment_method = data;
        }
    });

    return DataToSubmit;
}


