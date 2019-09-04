import localforage from 'localforage';
import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR,
    API_URL
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

export const getCartProductQuantityValue = (product, callback, productIndex) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items !== null) {
            if (items[product.store.slug] !== undefined) {
                if (Number(product.has_attributes) === 0 ) {
                    if (callback !== undefined) {
                        callback(items[product.store.slug].products[product.slug].quantity);
                    }
                } else {
                    callback(items[product.store.slug].products[product.slug].meta[productIndex].quantity);
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
 * Get product attribute options
 * @param {object} product
 * @param {integer} productIndex
 * @param {function} callback 
 */
export const getProductAttributeOptions = (product, productIndex, callback) => {
    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items !== null) {
            if (items[product.store.slug] !== undefined) {
                callback(items[product.store.slug].products[product.slug].meta[productIndex].options);
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
            var size = countSingleStoreCartItems(cartItems[key].products);
            //Object.keys(cartItems[key].products).length;
            counter = counter + size;
        });
    }
    return counter;
}

/**
 * count single store cart items
 * @param {object} singleStoreProduct 
 */
 const countSingleStoreCartItems = (singleStoreProducts) => {
    let counter = 0;
    Object.keys(singleStoreProducts).forEach((key, index) => {
        const { has_attributes } = singleStoreProducts[key];
        if (Number(has_attributes) === 0) {
            counter = counter + singleStoreProducts[key].quantity;
        } else {
            const productOptionSet = singleStoreProducts[key].meta;
            for (let i = 0; i < productOptionSet.length; i++) {
                counter = counter + productOptionSet[i].quantity;
            }
        }
    });
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
            if (products[product_name].meta !== undefined) {
                // product has options
                totalPrice = totalPrice + singleProductOptionTotalPrice(products[product_name].meta);
            } else {
                if (Number(products[product_name].has_discount) === 0) {
                    totalPrice = totalPrice + (products[product_name].quantity * products[product_name].price);
                } else {
                    totalPrice = totalPrice + (products[product_name].quantity * products[product_name].special_price);
                }
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

 /**
  * Calculate total price for products with options in a single store
  */
 function singleProductOptionTotalPrice(productOptions) {
    let totalPrice = 0;
    for (let i = 0; i < productOptions.length; i++) {
        const price = Number(productOptions[i].has_discount) === 1 ? productOptions[i].special_price : productOptions[i].price;
        totalPrice = totalPrice + (productOptions[i].quantity * price);
    }
    return totalPrice;
 }

  /**
   * 
   * @param {string} product_slug 
   * @param {array} product_options 
   * @param {function} func 
   */
  export function isProductOutOfStock(product_slug, product_options, onSuccessFunc, onFailureFunc) {
    fetch(`${API_URL}/products/inventory/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            product_slug: product_slug,
            options: product_options
        })
        
    }).then(async (res) => {
        try {
            const response = await res.json();
            if (response.status === 'success') {
                onSuccessFunc();
                return;
            }

            if (response.status === 'failure') {
                onFailureFunc();
                return;
            }
            
        } catch (err) {
            console.log('error', err);
            onFailureFunc();
            // do something with the error
        }
    }).catch((err) => {
        console.log('error', err);
        onFailureFunc();
    });
  }
