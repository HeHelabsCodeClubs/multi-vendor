import localforage from 'localforage';
import { getCartItems } from './cart_functionality_helpers';
import { retrieveShipmentData } from './shipment_method_functionality_helpers';
import { getCouponCodeInLocalStorage} from './coupon_code_functionality';
import { getClientAuthToken } from './auth';
import { 
    API_URL,
    CART_ITEMS_KEY,
    DISCOUNT_DATA,
    LOCAL_SHIPMENTS_KEY
} from '../config';


export const updatedCartItemOnApi = (callback) => {
    getLocalCheckoutData((requestData) => {
        const token = getClientAuthToken();
        if (token) {
            fetch(`${API_URL}/cart-items`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            }).then(async (res) => {
                try {
                    const response = await res.json();
                    if (callback) {
                        callback();
                    }
                } catch (err) {
                    if (err) {
                        console.log('err', err);
                    }
                }
            }).catch((err) => {
                if (err) {
                    console.log('err', err);
                }
            });
        }

    });
}

/**
 * Gets updated cart items for user
 * 
 * @param {*} callback 
 */
export const getUpdatedCartItemFromApi = (callback) => {
    const token = getClientAuthToken();
    if (token) {
        fetch(`${API_URL}/cart-items`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            } 
        }).then(async (res) => {
            try {
                const response = await res.json();
                if (response.status == 'success') {
                    if (response.data) {
                        if (response.data.length !== 0) {
                            /**
                             * Update current checkout data
                             * with historical cached data
                             * 
                             */
                            updateCheckoutContentOnUserLogin(response.data, callback);
                        } else {
                            /**
                             * User has not synced any checkout data yet
                             * 
                             * Sync checkout data
                             */
                            updatedCartItemOnApi(callback);
                        }
                    }
                }
            } catch (err) {
                if (err) {
                    console.log('err', err);
                }
            }
        }).catch((err) => {
            if (err) {
                console.log('err', err);
            }
        });
    }
}

/**
 * Helper functions
 * 
 * *************************************
 */

 /**
  * Gets local data
  * 
  * @param {function} callback 
  */

const getLocalCheckoutData = (callback) => {
    const data = {
        cart_content: {},
        shipment_methods: {},
        discount: {}
    };

    getCartItems((cartItems) => {
        data.cart_content = cartItems;

        retrieveShipmentData((shipments) => {
            data.shipment_methods = shipments;

            getCouponCodeInLocalStorage((discount) => {

                data.discount = discount;

               callback(data);

            });
        });
    });
}

/**
 * Update checkout content on
 * user login
 * 
 * 
 * @param {object} data 
 */
const updateCheckoutContentOnUserLogin = (data, callback) => {
    const { 
        cart_content,
        discount,
        shipment_methods
    } = data;

    /**
     * Update cart content
     * 
     */
    updateCartItems(cart_content, () => {

        /**
         * Update shipments data
         */

        updateShipmentData(shipment_methods, () => {

            /**
             * Update Discount data
             * 
             */

            updateDiscountData(discount, callback);
        });
    });
}

/**
 * Updates cart content on user login
 * 
 * @param {object} cart_content 
 * @param {function} callback 
 */
const updateCartItems = (cart_content, callback) => {
    getCartItems((items) => {
        let cartItems = {};
        if (items === null) {
            cartItems = cart_content;
        } else {
            cartItems = {...items, ...cart_content};
        }
        
        localforage.setItem(CART_ITEMS_KEY, cartItems).then(
            () => {
                if (callback) {
                    callback();
                }  
        }).catch((err) => {
            if (err) {
                console.log('error', err);
            }
        });
    });
}

/**
 * Updates Shipment data on user login
 * 
 * @param {object} shipment_methods 
 * @param {function} callback 
 */
const updateShipmentData = (shipment_methods, callback) => {
    retrieveShipmentData((existingShipmentMethods) => {
        const shipments = (Object.keys(existingShipmentMethods).length === 0) ? shipment_methods : {...existingShipmentMethods, ...shipment_methods};
        localforage.setItem(LOCAL_SHIPMENTS_KEY, shipments).then(
            () => {
               if (callback) {
                   callback();
               }
            }
        ).catch((err) => {
            if (err) {
                console.log('error', err);
            }
        });
    });
}

/**
 * Updates discount data on user login
 * 
 * @param {object} discount 
 * @param {function} callback 
 */
const updateDiscountData = (discount, callback) => {
    localforage.setItem(DISCOUNT_DATA, discount).then(
        () => {
            if (callback) {
                callback();
            }
        }
    ).catch((err) => {
        if (err) {
            console.log('error', err);
        }
    });
}