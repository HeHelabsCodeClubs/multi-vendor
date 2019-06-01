import localforage from 'localforage';
import { 
    CART_ITEMS_KEY,
    UNABLE_TO_GET_CART_ITEMS_ERROR,
    UNABLE_TO_SAVE_LOCAL_DATA_ERROR,
    CART_ITEMS_OBJECT_EMPTY
}  from '../config';



export default (product) => {
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
        if (!items) {
            const cartItems = createCartItems(product);
            localforage.setItem(CART_ITEMS_KEY, cartItems).catch((err) => {
                throw UNABLE_TO_SAVE_LOCAL_DATA_ERROR;
            });
        } else {
            try {
                updateCartItems(items, product);
            } catch (err) {
                throw err;
            }
        }
    }).catch((err) => {
        throw UNABLE_TO_GET_CART_ITEMS_ERROR;
    });
}

/**
 * Update Stored Cart items
 * 
 * @param {object} product 
 * @return {void}
 */
function updateCartItems(cartItems, newProduct) {
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
    
    localforage.setItem(CART_ITEMS_KEY, updated_cart_items).catch((err) => {
        throw UNABLE_TO_SAVE_LOCAL_DATA_ERROR
    });
}

/**
 * Creates the cart items object
 * @param {object} product 
 * @return {object}
 */

function createCartItems(product) {
    const cartItems = {};
    const { store: { slug, name, url, icon } } = product;
    cartItems[slug] = {
        info: {
            name,
            url,
            icon
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
        discount_percent

    } = product;

    if (Number(has_attributes) == 0) {
        return {
            cart_image_url,
            has_attribute_options: has_attributes,
            price,
            quantity,
            stock,
            has_discount,
            special_price,
            discount_percent
        }
    }

    return {
        cart_image_url,
        has_attribute_options: has_attributes,
        meta: getDataProduct(product)
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
    const { store: { slug }, has_attributes } = newProduct;
    let updatedCartItems = {};
    if (Number(has_attributes) === 0) {
        // product has no attribute options
        // update only product quantity
        cart_items[slug].products[newProduct.slug].quantity = newProduct.quantity;
        updatedCartItems = cart_items;
    }

    if (Number(has_attributes) === 1) {
        // product has attribute options
    }

    return updatedCartItems;
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
    if (Number(has_attributes) === 0) {
        const productData = createCartItemProduct(newProduct);
        cart_items[slug].products[newProduct.slug] = productData;
        updatedCartItems = cart_items;
    }

    if (Number(has_attributes) === 1) {
        // product has attribute options
    }

    return updatedCartItems;
}

function addNewCartItem(cart_items, newProduct) {
    const { store: { slug }, has_attributes } = newProduct;
    let updatedCartItems = {};
    if (Number(has_attributes) === 0) {
        updatedCartItems = cart_items;
        const newCartItems = createCartItems(newProduct);
        updatedCartItems[slug] = newCartItems[slug];
    }

    if (Number(has_attributes) === 1) {
        // product has attribute options
    }
    
    return updatedCartItems;
}
