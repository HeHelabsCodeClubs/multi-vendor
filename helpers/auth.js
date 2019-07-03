import Router from 'next/router';
import localforage from 'localforage';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { TOKEN_KEY, AUTH_USER_LOCAL_STORAGE_INFO, CART_ITEMS_KEY } from '../config';

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
            callback(authUser);
        }).catch((err) => {
            console.log('error');
            console.log(err);
        });
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
    localforage.removeItem(CART_ITEMS_KEY);
}

/**
 * Parse token
 */
export const getTokenValue = (tokenString) => {
    if (tokenString === undefined) {
        return undefined;
    }

    const tokenArray = tokenString.split('=');
    if (tokenArray[1]) {
        return tokenArray[1];
    }
    
    return undefined;
}