import localforage from 'localforage';
import { 
    DISCOUNT_DATA,
    UNABLE_TO_GET_DISCOUNT_DATA,
    UNABLE_TO_SAVE_DISCOUNT_DATA,
    API_URL,
    FIRST_USER_PURCHASE_PROMO_CODE
} from '../config';

/**
 * Stores the discount data in the local storage
 * 
 * @param {string} couponCode 
 * @param {number} discount 
 * @param {function} callback 
 */
export const storeCouponCodeInLocalStorage = (couponData, callback) => {
    localforage.setItem(DISCOUNT_DATA, couponData).then(() => {
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

/**
 * Calculates discount
 * 
 * 
 * @param {number} totalItemsPrice 
 * @param {number} totalShippingPrice 
 * @param {object} discountData 
 */

export const calculateDiscount = (totalItemsPrice, totalShippingPrice, discountData) => {
    let productsTotalAmount = totalItemsPrice;
    let totalShippingAmount = totalShippingPrice;

    if (Object.keys(discountData).length !== 0) {
        const { 
            used_on_order, 
            used_on_seller, 
            is_fixed_amount, 
            is_configurable,
            conditions : {
                on_order,
                on_shipping,
                discount,
                discount_percent
            }
        } = discountData;
    
        //if (Number(used_on_order) === 1) {
            if (Number(is_fixed_amount) === 1) {
                if (Number(on_order) === 1) {
                    productsTotalAmount = productsTotalAmount - discount;
                }
    
                if (Number(on_shipping) === 1) {
                    totalShippingAmount = totalShippingAmount - discount;
                } 
    
                return productsTotalAmount + totalShippingAmount;
            }
    
            if (Number(is_configurable) === 1) {
                if (Number(on_order) === 1) {
                    productsTotalAmount = Math.floor((productsTotalAmount * Number(discount_percent)) / 100);
                }
    
                if (Number(on_shipping) === 1) {
                    totalShippingAmount = Math.floor((totalShippingAmount * Number(discount_percent)) / 100);
                } 
    
                return productsTotalAmount + totalShippingAmount;
            }
        //}
    }

    return productsTotalAmount + totalShippingAmount;
}

/**
 * Retrieves the discount amount
 * 
 * @param {number} totalItemsPrice 
 * @param {number} totalShippingPrice 
 * @param {object} discountData 
 */
export const getDiscountAmount = (totalItemsPrice, totalShippingPrice, discountData) => {
    if (Object.keys(discountData).length !== 0) {
        const { 
            used_on_order, 
            used_on_seller, 
            is_fixed_amount, 
            is_configurable,
            conditions : {
                on_order,
                on_shipping,
                discount,
                discount_percent
            }
        } = discountData;
    
        //if (Number(used_on_order) === 1) {
            if (Number(is_fixed_amount) === 1) {
                return discount;
            }
    
            if (Number(is_configurable) === 1) {
                if (Number(on_order) === 1) {
                    return Math.floor((totalItemsPrice * Number(discount_percent)) / 100);
                }
    
                if (Number(on_shipping) === 1) {
                    return Math.floor((totalShippingPrice * Number(discount_percent)) / 100);
                } 
            }
        //}
    }

    return 0;
}

export const getCouponDataFromApi = (coupon_code, callback) => {
    const data = {
        coupon_code
    };

    fetch(`${API_URL}/coupons/discount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async (res) => {
        try {
            const response = await res.json();
            if (callback !== undefined) {
                callback(response);
            }
            // console.log('response', response.status_code);
        } catch (err) {
            if (err) {
                console.log(err);
            } 
        }
    }).catch((err) => {
        if (err) {
            console.log('err', err);
        }
    });
}


export const setDiscountForCustomerFirstPurchase = (user) => {
    fetch(`${API_URL}/customers/${user.id}/purchase`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        } 
    }).then(async (res) => {
        try {
            const response = await res.json();
            if (response.status == 'success') {
                /**
                 * Get discount data
                 */
                getCouponDataFromApi(FIRST_USER_PURCHASE_PROMO_CODE, (response) => {
                    const { data } = response;
                    storeCouponCodeInLocalStorage(data, () => null);
                });
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
