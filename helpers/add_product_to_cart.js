import localforage from 'localforage';
import { isEqual } from 'lodash.isequal';
import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR,
    UNABLE_TO_SAVE_LOCAL_DATA_ERROR,
    CART_ITEMS_OBJECT_EMPTY,
    CAN_NOT_UPDATE_CART_ITEMS_ERROR
}  from '../config';



export default (product, callback) => {
    /**
     * TO DO:
     * 1.Check if the cart has data
     * 2.If cart has data retrieve data
     * 3.Check if store exist
     * 4.If store does not exist create
     * 5.If store exist
     * 6.Check if product exit
     */

    localforage.getItem(CART_ITEMS_KEY).then((items) => {
        if (items === null) {
            const cartItems = createCartItems(product);
            localforage.setItem(CART_ITEMS_KEY, cartItems).then(() => {
                // run callback
                if (callback !== undefined) {
                    callback();
                }
                return;
            }).catch((err) => {
                if (err) {
                    throw UNABLE_TO_SAVE_LOCAL_DATA_ERROR;
                }
            });
        } else {
            try {
                updateCartItems(items, product, callback);
                return;
            } catch (err) {
                if (err) {
                    console.log(err);
                    throw CAN_NOT_UPDATE_CART_ITEMS_ERROR;
                }
            }
        }
    }).catch((err) => {
        if (err) {
            console.log(err);
            console.log('throwing error here');
            throw UNABLE_TO_GET_CART_ITEMS_ERROR;
        }
    });
}

/**
 * Update Stored Cart items
 * 
 * @param {object} product 
 * @return {void}
 */
function updateCartItems(cartItems, newProduct, callback) {
    const {
        store: { slug },
    } = newProduct;
    let updated_cart_items = {};
    if (storeExist(cartItems, slug)) {
        /**
         * check if product exist in store
         */
        if(storeProductExist(cartItems, slug, newProduct.slug)) {
            // update product
            updated_cart_items = updateCartItemsProduct(cartItems, newProduct);
        } else {
            // add new product
            updated_cart_items = addNewProductCartItem(cartItems, newProduct);
        }

    } else {
        // add new store data to cart items
        updated_cart_items = addNewCartItem(cartItems, newProduct);
    }

    if (Object.keys(updated_cart_items).length === 0 && updated_cart_items.constructor === Object) {
        // don't save empty object
        throw CART_ITEMS_OBJECT_EMPTY;
    }

    /**
     * Save updated data in the cart
    */
    
    localforage.setItem(CART_ITEMS_KEY, updated_cart_items).then(() => {
        if (callback !== undefined) {
            callback();
        }
        return;
    }).catch((err) => {
        if (err) {
            console.log(err);
            throw UNABLE_TO_SAVE_LOCAL_DATA_ERROR
        }
        
    });
}

/**
 * Creates the cart items object
 * @param {object} product 
 * @return {object}
 */

function createCartItems(product) {
    const cartItems = {};
    const { store: { slug, name, url, icon, shipment_methods } } = product;
    cartItems[slug] = {
        info: {
            name,
            url,
            icon,
            shipment_methods
        }
    };

    cartItems[slug].products = {};
    cartItems[slug].products[product.slug] = createCartItemProduct(product);

    return cartItems;
}

/**
 * Create a cart item product
 * 
 * @param {object} product 
 * @return {object}
 */

function createCartItemProduct(product) {
    const {
        cart_image_url,
        has_attributes,
        price,
        quantity,
        stock,
        has_discount,
        special_price,
        discount_percent,
        name,
        attributes,
    } = product;

    if (Number(has_attributes) == 0) {
        return {
            name,
            cart_image_url,
            has_attributes,
            price,
            quantity,
            stock,
            has_discount,
            special_price,
            discount_percent,
            attributes
        }
    }

    return {
        name,
        cart_image_url,
        has_attributes,
        meta: getDataProduct(product),
        attributes,
        price,
        has_discount,
        special_price,
        discount_percent
    }
}

/**
 * Create a cart item product info for a product with attribute options
 * 
 * @param {object} product
 * @return {array}
 */

 function getDataProduct(product) {
    const data = [];
    const {
        quantity,
        stock,
        selected_options,
        price,
        has_discount,
        special_price,
        discount_percent
    } = product;
    data.push({
        quantity,
        stock,
        options: selected_options,
        price,
        has_discount,
        special_price,
        discount_percent
    });

    return data;
 }

 /**
  * Check if store data already exist in the cart
  * 
  * @param {object}
  * @param {string}
  * 
  * @return {boolean}
  */
 function storeExist(cart_items, store_slug) {
    if (cart_items[store_slug] !== undefined) {
        return true;
    }
    return false;
 }

 /**
  * Check if store product exist in the cart
  * 
  */
 function storeProductExist(cart_items, store_slug, store_product_slug) {
     if (cart_items[store_slug].products[store_product_slug]!== undefined) {
         return true;
     }
     return false;
 }

 /**
  * Update cart items product
  * 
  * @param {object}
  * 
  * @return {object}
  */
function updateCartItemsProduct(cart_items, newProduct) {
    const { store: { slug }, has_attributes, index } = newProduct;
    let updatedCartItems = {};
    if (Number(has_attributes) === 0) {
        // product has no attribute options
        // update only product quantity
        cart_items[slug].products[newProduct.slug].quantity = newProduct.quantity;
        updatedCartItems = cart_items;
    }

    if (Number(has_attributes) === 1) {
        // product has attribute options
        const optionsDataSet = cart_items[slug].products[newProduct.slug].meta;
        if (index !== undefined) {
            const productAttributeOptions = optionsDataSet[index].options;
            const { selected_options } = newProduct;
            if (isProductInStorage(productAttributeOptions, selected_options)) {
                optionsDataSet[index].quantity = newProduct.quantity;
            } else {
                const productData = getDataProduct(newProduct);
                optionsDataSet.push(productData[0]);
            }
            
        } else {
            const productData = getDataProduct(newProduct);
            optionsDataSet.push(productData[0]);
        }
        cart_items[slug].products[newProduct.slug].meta = optionsDataSet;
        updatedCartItems = cart_items;
    }
    return updatedCartItems;
}

/**
 * Checks if a product with the selected attribute options is already in storage
 * @param {*} cart_items 
 * @param {*} newProduct 
 */
function isProductInStorage(options, selectedOptions) {
    const optionsLen = Object.keys(options).length;
    let counter = 0;
    Object.keys(options).forEach((key) => {
        if (options[key].title === selectedOptions[key].title) {
            counter = counter + 1;
        }
    });

    if (counter === optionsLen) {
        return true;
    }

    console.log('i am reaching here');

    return false;
}

/**
 * Add new product to cart items
 * 
 * @param {object}
 * 
 * @return {object}
 */
function addNewProductCartItem(cart_items, newProduct) {
    const { store: { slug }, has_attributes } = newProduct;
    let updatedCartItems = {};
    //if (Number(has_attributes) === 0) {
    const productData = createCartItemProduct(newProduct);
    cart_items[slug].products[newProduct.slug] = productData;
    updatedCartItems = cart_items;
    //}

    //if (Number(has_attributes) === 1) {
        // product has attribute options
    //}
    return updatedCartItems;
}

function addNewCartItem(cart_items, newProduct) {
    const { store: { slug } } = newProduct;
    let updatedCartItems = {};
    updatedCartItems = cart_items;
    const newCartItems = createCartItems(newProduct);
    updatedCartItems[slug] = newCartItems[slug];
    return updatedCartItems;
}
