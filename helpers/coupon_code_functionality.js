import localforage from 'localforage';
import { 
    DISCOUNT_DATA,
    UNABLE_TO_GET_DISCOUNT_DATA,
    UNABLE_TO_SAVE_DISCOUNT_DATA 
} from '../config';

/**
 * Stores the discount data in the local storage
 * 
 * @param {string} couponCode 
 * @param {number} discount 
 * @param {function} callback 
 */
export const storeCouponCodeInLocalStorage = (couponCode, discount, callback) => {
    const data = {
        coupon_code: couponCode,
        discount
    };
    localforage.setItem(DISCOUNT_DATA, data).then(() => {
        if (callback !== undefined) {
            callback();
        }
    }).catch((err) => {
        if(err) {
            throw UNABLE_TO_SAVE_DISCOUNT_DATA;
        }
    });
}

/**
 * Retrieves the discount amount in the local storage
 * 
 * @param {function} callback 
 */
export const getCouponCodeInLocalStorage = (callback) => {
    localforage.getItem(DISCOUNT_DATA).then((discount_data) => {
        if (callback !== undefined) {
            if (discount_data !== null) {
                callback(discount_data.discount);
            } else {
                callback(0);
            }
        }
    }).catch((err) => {
        if (err) {
            throw UNABLE_TO_GET_DISCOUNT_DATA;
        }
    })
}

/**
 * Retrieves the discount data in the local storage
 * 
 * @param {function} callback 
 */
export const getDiscountDataInLocalStorage = (callback) => {
    localforage.getItem(DISCOUNT_DATA).then((discount_data) => {
        if (callback !== undefined) {
            if (discount_data !== null) {
                callback(discount_data);
            } else {
                callback({});
            }
        }
    }).catch((err) => {
        if (err) {
            throw UNABLE_TO_GET_DISCOUNT_DATA;
        }
    })
}
