import localforage from 'localforage';
import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR
} from '../config';

export const performActionIfProductNotInCart = (store_slug, product_slug, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
            if (items == null) {
                callback();
                return;
            }

            if (items !== null) {
                if (items[store_slug] === undefined) {
                    callback();
                    return;
                }

                if (items[store_slug].products[product_slug] === undefined) {
                    callback();
                    return;
                }
            } 
    }).catch((err) => {
        if (err) {
            console.log('i am reaching herettt');
            console.log(err);
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    });
}

export const getCartProductQuantityValue = (store_slug, product_slug, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items !== null) {
            if (items[store_slug] !== undefined) {
                callback(items[store_slug].products[product_slug].quantity);
                return;
            }
        }
    }).catch((err) => {
        if (err) {
            console.log(err);
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    });
}