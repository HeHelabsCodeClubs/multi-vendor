import localforage from 'localforage';
import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR
} from '../config';


/**
 * Perfoms a callback function
 * 
 * @param {string} store_slug 
 * @param {string} product_slug 
 * @param {function} callback 
 * 
 * @return {void}
 */

export const performActionIfProductNotInCart = (store_slug, product_slug, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
            if (items == null) {
                if (callback !== undefined) {
                    callback();
                }
                return;
            }

            if (items !== null) {
                if (items[store_slug] === undefined) {
                    if (callback !== undefined) {
                        callback();
                    }
                    return;
                }

                if (items[store_slug].products[product_slug] === undefined) {
                    if (callback !== undefined) {
                        callback();
                    }
                }
            } 
    }).catch((err) => {
        if (err) {
            console.log(err);
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    });
}

/**
 * Gets the quantity value for products without the attribute options
 * 
 * @param {string} store_slug 
 * @param {string} product_slug 
 * @param {function} callback 
 * 
 * @return {void}
 */

export const getCartProductQuantityValue = (store_slug, product_slug, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items !== null) {
            if (items[store_slug] !== undefined) {
                if (callback !== undefined) {
                    callback(items[store_slug].products[product_slug].quantity);
                }
            }
        }
    }).catch((err) => {
        if (err) {
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    });
}

/**
 * Gets all the items in the cart
 * 
 * @param {function} callback
 * @return {void}
 */
export const getCartItems = (callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        callback(items);
    }).catch((err) => {
        if (err) {
            console.log(err);
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    });
}

/**
 * Gets the total number of cart items
 * 
 * @param {object} cartItems 
 * @return {integer}
 */

export const countCartItems = (cartItems) => {
    let counter = 0;
    if (cartItems !== null) {
        Object.keys(cartItems).forEach((key, index) => {
            var size = Object.keys(cartItems[key].products).length;
            counter = counter + size;
        });
    }
    return counter;
}

/**
 * Get single store products count
 * 
 * @param {object}
 * @return {integer}
 */

 export const singleStoreProductsCount = (store) => {
    let counter = 0;
    if (store !== null) {
        counter = Object.keys(store.products).length
    }
    return counter;
 }

 /**
  * Get single store products total price
  * 
  * @param {object} store
  * @return {integer}
  */
 export const singleStoreTotalPrice = (store) => {
     let totalPrice = 0;
     if (store !== null) {
         const { products } = store;
         Object.keys(products).forEach((product_name, index) => {
            if (Number(products[product_name].has_discount) === 0) {
                totalPrice = totalPrice + (products[product_name].quantity * products[product_name].price);
            } else {
                totalPrice = totalPrice + (products[product_name].quantity * products[product_name].special_price);
            }
         });
     }

     return totalPrice;
 }

 /**
  * Get all store products total price
  * 
  * @param {object}
  * @return {integer}
  */
 export const storeProductsTotalPrice = (cartItems) => {
     let totalPrice = 0;
     if (cartItems !== null) {
        Object.keys(cartItems).forEach((store_name, index) => {
            totalPrice = totalPrice + singleStoreTotalPrice(cartItems[store_name]);
        });
     }
     return totalPrice;
 }