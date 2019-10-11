/**
 * Validation functions
 */

/**
 * 
 * @param {string} value 
 * @param {string} context 
 * 
 * @return {string}
 */
export const getValidatedInputErrorMessage = (validationContext, context, value, value2) => {
    switch(validationContext) {
        case 'empty':
            if (isFieldEmpty(value)) {
                return getEmptyFieldErrorMessage(value, context);
            }
            return '';
        case 'email':
            /**
             * Validations for emails
             */
            if (isFieldEmpty(value)) {
                return getEmptyFieldErrorMessage(value, context);
            }

            if (!isEmailValid(value)) {
                return getInvalidEmailErrorMessage(context);
            }
            return '';
        case 'phone':
            if (!mtnPhoneNumberHasRightLength(value)) {
                return getInvalidMtnPhoneNumberErrorMessage(context);
            }
            return '';
        case 'password_confirmation':
            /**
             * Validations for password confirmation
             */
            if (!stringValuesAreEqual(value, value2)) {
                return getNotEqualValuesErrorMessage('password');
            }
            return '';
        default: 
            return '';
    }
}

/**
 * 
 * @param {string} value 
 * @param {integer} value
 * 
 * @return {boolean}
 */
const isFieldEmpty = (value) => {
    if (typeof value === 'number') {
        if (value === 0) {
            return true;
        }
    }

    if (value === '') {
        return true;
    }

    return false;
}

/**
 * Provide empty field validation error
 * 
 * @param {string} context
 * 
 * @return {string}
 */
const getEmptyFieldErrorMessage = (value, context) => {
    if (typeof value === 'number') {
        return `Please read and accept the ${context} before proceeding.`;
    }
    return `The ${context} is required`;
}

/**
 * Provide invalid email error message
 * 
 * @param {string} context
 * 
 * @return {string}
 */
const getInvalidEmailErrorMessage = (context) => {
    return `${context} is not a valid email`;
}

/**
 * Validate email
 * 
 * @param {string} email
 * 
 * @return {boolean}
 */

 const isEmailValid = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
 }

 /**
  * Provide error message for not equal values
  * 
  */
 const getNotEqualValuesErrorMessage = (type) => {
    switch(type) {
        case 'password':
            return 'Your passwords does not match';
        default:
            return 'Not equal';
    }
 }

 const getInvalidMtnPhoneNumberErrorMessage = (context) => {
     return `Your ${context} is not valid. Please check and try again.`;
 }

 /**
  * Check if two strings are equal
  * 
  * @param {string} value
  * @param {string} value2
  * 
  * @return {boolean}
  */
 function stringValuesAreEqual(value, value2) {
    if (value === value2) {
        return true;
    }
    return false;
 }

 /**
  * Checks if an mtn phone number has the right length with "250" included
  * 
  * @param {string} phoneNumber 
  * 
  * @return {boolean}
  */
 function mtnPhoneNumberHasRightLength(phoneNumber) {
    if (phoneNumber.length !== 12) {
        return false;
    }
    return true;
 }

