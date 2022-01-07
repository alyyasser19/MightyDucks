import {isValid, isExpirationDateValid, isSecurityCodeValid, getCreditCardNameByNumber } from 'creditcard.js';

  export const validateCC = (cardNumber, expirationDate, securityCode) => {
    return isValid(cardNumber) && isExpirationDateValid(expirationDate) && isSecurityCodeValid(securityCode);
  }

  export const cardType = (cardNumber) => {
      return getCreditCardNameByNumber(cardNumber);
  }


export default validateCC;
export default cardType;