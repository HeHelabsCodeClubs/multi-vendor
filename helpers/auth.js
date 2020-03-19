import localforage from 'localforage';
import cookie from 'js-cookie';
import { 
    TOKEN_KEY, 
    AUTH_USER_LOCAL_STORAGE_INFO, 
    ORDER_DATA_TOKEN,
} from '../config';

/**
 * Stores the token in the local storage
 * 
 * @param {string} token
 * @param {number} token_expiry_timestamp
 */
export const storeTokenInLocalStorage = (token, token_expiry_timestamp) => {
    let expiryTime = 1;
    if (token_expiry_timestamp) {
        expiryTime = Number(token_expiry_timestamp);
    }
    cookie.set(TOKEN_KEY, token, { expires: expiryTime });
}

/**
 * Redirects user to after login page
 * 
 * @param {string} login_page
 * @return {void}
 */
export const redirectUserToAfterLoginPage = (login_page) => {
    if (login_page === '/') {
        window.location.href ='/';
        return;
    }
    window.location.href = `/${login_page}`;
}

/**
 * Stores authenticated user info in the localstorage
 * 
 * @param {object} user 
 * @return {void}
 */
export const storeAuthUserInfoInLocalStorage = (user) => {
    localforage.setItem(AUTH_USER_LOCAL_STORAGE_INFO, user);
}

/**
 * Get User authenticated info
 */
export const getUserAuthenticatedInfo = (callback) => {
    const token = getClientAuthToken();
    if (token) {
        localforage.getItem(AUTH_USER_LOCAL_STORAGE_INFO).then((authUser) => {
            if(authUser) {
                callback(authUser);
            } else {
                callback(null);
            }
        }).catch((err) => {
            console.log('error');
            console.log(err);
        });
    } else {
        callback(null);
    }
}

/**
 * Get client auth token
 * 
 */
export const getClientAuthToken = () => {
    return cookie.get(TOKEN_KEY);
}

/**
 * Get client order cookie
 */
export const getOrderCookie = () => {
    return cookie.get(ORDER_DATA_TOKEN);
}

/**
 * Logout User
 */
export const logoutUser = () => {
    cookie.remove(TOKEN_KEY);
    // clear local storage data
    clearAuthUserLocalStorageInfo();
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now())
    window.location.href ='/signin';
}

/**
 * Clear user authenticated local storage data
 */
function clearAuthUserLocalStorageInfo() {
    localforage.removeItem(AUTH_USER_LOCAL_STORAGE_INFO);
    //localforage.removeItem(CART_ITEMS_KEY);
}

/**
 * Parse token
 */
export const getTokenValue = (tokenString, key) => {
    if (tokenString === undefined) {
        return undefined;
    }

    const identifier = (key == undefined) ? TOKEN_KEY : key;

    const cookiesData = tokenString.split(';');
    for(let i = 0; i < cookiesData.length; i++) {
        let singleCookieData = cookiesData[i].split('=');
        if (singleCookieData[0].trim() === identifier) {
            return singleCookieData[1];
        }
    }
    return undefined;
}

