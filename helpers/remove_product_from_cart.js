import localforage from 'localforage';
import isObjectEmpty from './is_object_empty';

import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR,
    UNABLE_TO_SAVE_LOCAL_DATA_ERROR
}  from '../config';

export default (product, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items !== null) {
            const updatedCartItems = removeProductFromStore(items, product);
            localforage.setItem(CART_ITEMS_KEY, updatedCartItems).then(() => {
                callback();
            }).catch((err) => {
                if (err) {
                    throw UNABLE_TO_SAVE_LOCAL_DATA_ERROR;
                }
            });
        }
    }).catch((err) => {
        if (err) {
            console.log(err);
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    })
}

function removeProductFromStore(cartItems, product) {
    const { store: { slug } } = product;
    delete cartItems[slug].products[product.slug];
    if (isObjectEmpty(cartItems[slug].products)) {
        delete cartItems[slug];
    }
    return cartItems;
}