import { Injectable } from '@angular/core';
import {APP_CASH_KEY} from '../lookups/app.lookups';

@Injectable({
  providedIn: 'root'
})
export class CashServiceService {

    constructor() {}

    // -------------------- local storage ------------------
    saveLocalStorage = (key, value) => localStorage.setItem(APP_CASH_KEY + key, key !== 'currentLocale' ? JSON.stringify(value) : value);
    removeLocalStorage = (key) => localStorage.removeItem(APP_CASH_KEY + key);
    getLocalStorage = (key): any => JSON.parse(localStorage.getItem(APP_CASH_KEY + key));


    // -------------------- session storage ------------------
    setSessionData = (key, data) =>  sessionStorage.setItem(APP_CASH_KEY + key, JSON.stringify(data));
    getSessionData = (key): any => JSON.parse(sessionStorage.getItem(APP_CASH_KEY + key));
    deleteSessionData = (key) => sessionStorage.removeItem(APP_CASH_KEY + key);
    clearSession = () => sessionStorage.clear();


  // -------------- handle remember me --------------------
  handleRememberMe(remember, cashData, customerProfile){
    if ( remember ) {
      this.saveLocalStorage('user', cashData.userDATA);
      this.setSessionData('user', cashData.userDATA);
      this.saveLocalStorage('customerProfile', customerProfile);
      this.setSessionData('customerProfile', customerProfile);
    }
  }
}
