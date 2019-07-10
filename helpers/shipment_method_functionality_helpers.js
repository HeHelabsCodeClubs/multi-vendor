import localforage from 'localforage';
import { LOCAL_SHIPMENTS_KEY } from '../config';
/**
 * Handles shipment methods local functionalitys
 */

 /**
  * 
  * @param {object} shipmentData // e.g: { slug: 'mart', method: 'title,description,rate,cart_shipping_id' }
  * @param {function} callback
  * 
  * @return {void} 
  */

 export const storeShipmentInLocal = (shipmentData, callback) => {
    // check if there's no data in the local storage first
    localforage.getItem(LOCAL_SHIPMENTS_KEY).then((items) => {
        if (items === null) {
            // save shipment info
            saveShipmentInfo(shipmentData, callback);
        } else {
            // update items
            updateShipmentInfo(items, shipmentData, callback);
        }
    }).catch((err) => {
        if (err) {
            console.log(err)
        }
    });
 }

 /**
  * Saves shipment info in local storage when it is initially empty
  * @param {object} shipmentData 
  * @param {function} callback 
  * 
  * @return {void}
  */

 const saveShipmentInfo = (shipmentData, callback) => {
     const data = {};
     const { slug, method } = shipmentData;
     data[slug] = {
         method: method
     };
     localforage.setItem(LOCAL_SHIPMENTS_KEY, data).then(() => {
        if (callback !== undefined) {
            callback();
        }
     }).catch((err) => {
        if(err) {
            console.log(err);
        }
     });
 }


 /**
  * Updates shipment methods local data
  * 
  * @param {object} existingShipmentData 
  * @param {object} shipmentData 
  * @param {function} callback 
  * 
  * @return {void}
  */

 const updateShipmentInfo = (existingShipmentData, shipmentData, callback) => {
     const updatedShipmentData = existingShipmentData;
     const { slug, method } = shipmentData;
     if (updatedShipmentData[slug] !== undefined) {
         updatedShipmentData[slug].method = method;
     } else {
         updatedShipmentData[slug] = { method };
     }

     localforage.setItem(LOCAL_SHIPMENTS_KEY, updatedShipmentData).then(() => {
        if (callback !== undefined) {
            callback();
        }
     }).catch((err) => {
         if (err) {
             console.log(err);
         }
     });
 }

 /**
  * Retrieves the shipment info data for a particular store
  * 
  * @param {string} storeSlug 
  * @param {function} callback 
  * 
  * @return {void}
  */

 export const retrieveShipmentDataPerStoreSlug = (storeSlug, callback) => {
     localforage.getItem(LOCAL_SHIPMENTS_KEY).then((items) => {
        if (items === null) {
            if (callback !== undefined) {
                callback('');
            }
        } else {
            if (callback !== undefined) {
                if (items[storeSlug] !== undefined) {
                    callback(items[storeSlug].method);
                } else {
                    callback('');
                }
            }
        }
     }).catch((err) => {
        if (err) {
            console.log(err);
        }
     });
 }

 /**
  * Provides a shipment rate for a particular store
  * 
  * @param {string} storeSlug 
  * @param {function} callback 
  * 
  * @return {void}
  */

 export const retrieveShipmentPricePerStoreSlug = (storeSlug, callback) => {
    localforage.getItem(LOCAL_SHIPMENTS_KEY).then((items) => {
       if (items === null) {
           if (callback !== undefined) {
               callback(0);
           }
       } else {
           if (callback !== undefined) {
               if (items[storeSlug] !== undefined) {
                   const shipmentData = items[storeSlug].method.split(',');
                   callback(Number(shipmentData[2]));
               } else {
                   callback(0);
               }
           }
       }
    }).catch((err) => {
       if (err) {
           console.log(err);
       }
    });
}
/**
 * Get all the shipment data
 * @param {function} callback 
 */
export const retrieveShipmentData = (callback) => {
    localforage.getItem(LOCAL_SHIPMENTS_KEY).then((items) => {
        if (items === null) {
            if (callback !== undefined) {
                callback({});
            }
        } else {
            if (callback !== undefined) {
                callback(items);
            }
        }
     }).catch((err) => {
        if (err) {
            console.log(err);
        }
     });
}

/**
 * Provides the total shipping price
 * 
 * @param {function} callback 
 */

export const getTotalShippingPrice = (callback) => {
    localforage.getItem(LOCAL_SHIPMENTS_KEY).then((items) => {
        if (items === null) {
            if (callback !== undefined) {
                callback(0);
            }
        } else {
            if (callback !== undefined) {
                let totalPrice = 0;
                Object.keys(items).forEach((storeSlug) => {
                    const shipmentData = items[storeSlug].method.split(',');
                    totalPrice = Number(shipmentData[2]) + totalPrice;
                });
                callback(totalPrice);
            }
        }
     }).catch((err) => {
        if (err) {
            console.log(err);
        }
     });
}
