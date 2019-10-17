export const API_URL = 'https://vendor-dashboard.hehe.rw/api';
export const API_ROOT_URL = 'https://vendor-dashboard.hehe.rw';
export const TOKEN_KEY = 'VENDOR_TOKEN';
export const AUTH_USER_LOCAL_STORAGE_INFO = 'AUTH_USER_LOCAL_INFO';
export const PLATFORM_CLIENT_ID = 2;
export const PLATFORM_CLIENT_SECRET = 'sy71st8Eg4PjgCpHGq25kmC5EbrRvdrF30DSemgL';
export const COUNTRY_API_URL = 'http://battuta.medunes.net/api';
export const COUNTRY_API_KEY = '46545b12aaa7048c8390dfe80c396937';
export const ORDER_DATA_TOKEN = 'ORDER_DATA';
export const APP_DOMAIN='https://hehe.rw';
export const APP_CARD_PAYMENT_RETURN_URL='https://hehe.rw/order-complete/card'
export const PAYMENT_STATUS_TOKEN = 'PAYMENT_STATUS';
export const SITE_GOOGLE_ANALYTICS_ID = 'UA-148530757-1';
export const FIRST_USER_PURCHASE_PROMO_CODE = 'dmmpromo';

// local storage variables
export const CART_ITEMS_KEY = 'CART_ITEMS';
export const LOCAL_SHIPMENTS_KEY = 'SHIPMENT_METHODS_ITEMS';
export const CHECKOUT_PAGE_VISITS = 'CHECKOUT_PAGE_VISITS';
export const UNABLE_TO_SAVE_LOCAL_DATA_ERROR = 'can not store cart items';
export const UNABLE_TO_GET_CART_ITEMS_ERROR = 'can not get cart items';
export const CART_ITEMS_OBJECT_EMPTY = 'can items object empty';
export const CAN_NOT_UPDATE_CART_ITEMS_ERROR = 'can not update cart items';
export const ORDER_CREATION_UNKWOWN_ERROR = 'We are encountering an error! Please try again!';
export const STORE_USER_ACCEPTANCE_FOR_COOKIE_USER = 'COOKIE_USAGE';
export const APP_BETA_NOTIFICATION = 'APP_BETA_NOTIFICATION';
export const DISCOUNT_DATA = 'ORDER_DISCOUNT_DATA';

//User feedback messages
export const USER_NOT_CREATED = 'We were not able to create an account for you. An account with the same email might already exist.';
export const SUCCESSFULLY_CREATED_USER = 'Your account has been successfully created. You will be redirected to the homepage in a few. Enjoy shopping with us!';
export const UNKNOWN_ERROR = 'OOPS! Looks like our shop is failing, please try again later';
export const USER_FORBIDDEN = 'We do not have an account with the email and password you have provided. Please check that both are correct and try again. Thanks!';
export const USER_AUTHENTICATED = 'You have successfully logged in. You will be redirected to the homepage in a few. Enjoy shopping with us!';

/**
 * Promo code user feedback messages
 */
export const EMPTY_PROMO_CODE_FIELD = 'Fill in the promo code first!';
export const UNREGISTERED_PROMO_CODE = "OOPS! We can not find your promo code. Please make sure there's no typo and click on 'apply' to try again. In case it continues contact your promo code provider.";
export const UNEXPECTED_PROMO_CODE_ERROR = "OOPS! Are you connected to the internet? If yes try refreshing the page and try applying the promo code once again.";
export const PROMO_CODE_SUCCESSFULLY_APPLIED = "Your discount was successfully applied";

/**
 * Promo code functionality constants
 */
export const UNABLE_TO_SAVE_DISCOUNT_DATA = 'Discount data not saved';
export const UNABLE_TO_GET_DISCOUNT_DATA = 'Discount data can not be retrieved from the localstorage';

export const ALERT_TIMEOUT= 10000;
export const NOT_ALLOWED_TO_GO_IN_CART = "is out of stock, someone else bought the last one few seconds ago"

export const SUBSCRIBE_INPUT_VALUE_EMPTY = "Please enter the email"

/**
 * MOMO USER FEEDBACK MESSAGES
 */

export const TRANSACTION_FAILED_MESSAGE = "We're sorry! Looks like our MOMO payment service is not working well. If you have already confirmed the transaction on your mobile please call our support team on +250786456686. We're sorry for the incovenience.";
export const NON_ACTIVE_USER_ACCOUNT_MESSAGE = "OOPS! Looks like your phone number is not active on MOMO. Please contact your nearest MTN Service branch to active your number. In case you need further help call our support team on +250786456686.";
export const USER_EXCEEDED_AMOUNT_TO_SEND_MESSAGE = "OOPS! Looks like you have exceeded the amount to send via MOMO on a daily basis. Please try again in a few hours or tomorrow. If the error persist please call our support team on +250786456686.";
export const USER_INSUFFICIENT_FUNDS_MESSAGE = "OOPS! You do not have enough funds on your MOMO account. Please top up your MOMO account and try again.";
export const USER_NOT_REGISTERED_MESSAGE = "OOPS! Your phone number is not registered on MOMO. Visit your MTN nearest service branch to register.";
export const MINIMUM_FUNDS_TO_SEND_MESSAGE = "OOPS! Your total order amount is too low. You can only pay a minimum of 10 RWF via MOMO";