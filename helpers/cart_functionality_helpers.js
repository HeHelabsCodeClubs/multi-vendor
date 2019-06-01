import localforage from 'localforage';
import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR
} from '../config';

export const performActionIfProductNotInCart = (store_slug, product_slug, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (!items) {
            if (items[store_slug].products[product_slug]) {
                callback();
            }
        }
    }).catch((err) => {
        throw UNABLE_TO_GET_CART_ITEMS_ERROR;
    });
}

export const getCartProductQuantityValue = (store_slug, product_slug, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items) {
            callback(items[store_slug].products[product_slug].quantity);
            return items[store_slug].products[product_slug].quantity;
        }
    }).catch((err) => {
        throw UNABLE_TO_GET_CART_ITEMS_ERROR;
    });
}