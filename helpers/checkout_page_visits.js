import localforage from 'localforage';
import { CHECKOUT_PAGE_VISITS } from '../config';

/**
 * Sets a checkout section as visited
 * @param {string} page 
 */
export const setPageAsVisited = (page, isVisited) => {
    const isVisitedValue = isVisited !== undefined ? isVisited : 1;
    localforage.getItem(CHECKOUT_PAGE_VISITS).then((visits) => {
        if (visits === null) {
            // 
            createPageVisit(page, isVisitedValue);
        } else {
            updatePageVisit(visits, page, isVisitedValue);
        }
    }).catch((err) => {
        if (err) {
            console.log(err);
        }
    });
}

/**
 * Set a new checkout page as visited
 * @param {string} page 
 * @param {integer} isVisitedValue
 * 
 * @return {void}
 */
const createPageVisit = (page, isVisitedValue) => {
    const checkoutPageVisits = {};
    checkoutPageVisits[page] = isVisitedValue;
    localforage.setItem(CHECKOUT_PAGE_VISITS, checkoutPageVisits).then(() => {
        // do nothing
    }).catch((err) => {
        if(err) {
            console.log(err);
        }
    });
}

/**
 * 
 * @param {object} visits 
 * @param {string} page 
 * @param {integer} isVisitedValue
 * 
 * @return {void} 
 */
const updatePageVisit = (visits, page, isVisitedValue) => {
    const updatedVisits = visits;
    updatedPageVisits[page] = isVisitedValue;
    localforage.setItem(CHECKOUT_PAGE_VISITS, updatedVisits).then(() => {
        // do nothing
    }).catch((err) => {
        if(err) {
            console.log(err);
        }
    });
}

/**
 * Checks whether a page has been visited or not
 * @param {string} page 
 * @param {function} callback 
 * 
 * @retun {void}
 */

export const isPageVisited = (page, callback) => {
    localforage.getItem(CHECKOUT_PAGE_VISITS).then((visits) => {
        if (visits === null) { 
            if (callback !== undefined) {
                callback(0);
            }
        } else {
            if (callback !== undefined) {
                callback(visits[page]);
            }
        }
    }).catch((err) => {
        if (err) {
            console.log(err);
        }
    });
}