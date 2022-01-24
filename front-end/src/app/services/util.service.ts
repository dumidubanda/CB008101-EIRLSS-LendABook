import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {CashServiceService} from './cash-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  httpHeaders: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
  };
   constructor(private http: HttpClient,
               private _snackBar: MatSnackBar,
               private cash: CashServiceService,
               private router: Router) {
   }

   getUserInfo(): any{
     return this.cash.getSessionData('user') || {};
   }
    // -------------------- http --------------------
    getRequest(path, params: any = {}) {
      this.createAuthorizationHeader();
      return this.http.get<any>(path, { headers: new HttpHeaders(this.httpHeaders), params: {...params }});
    }
    postRequest(path, body, params: any = {}) {
      this.createAuthorizationHeader();
      return this.http.post(path, body, {headers: new HttpHeaders(this.httpHeaders), params: {...params}});
    }
    putResource(path, body, params: any = {}) {
      this.createAuthorizationHeader();
      return this.http.put(path, body, {headers: new HttpHeaders(this.httpHeaders), params: {...params}});
    }
    deleteResource(path, params: any = {}) {
      this.createAuthorizationHeader();
      return this.http.delete(path, {headers: new HttpHeaders(this.httpHeaders), params: {...params}});
    }


    // ------------- navigation -------------
    navigate(path, params = {}){this.router.navigate([path], { queryParams: params}); }


    // ------------------ alerts ------------------
   alert( message, componentRef?, duration?): void {
     if ( !message){ return; }
     this._snackBar.open(message, 'Splash', {
       horizontalPosition: 'start',
       verticalPosition: 'bottom', duration: duration ? 20000 : 90000});
     if ( componentRef ) {
       componentRef.loading = false;
     }
   }


  createAuthorizationHeader(httpHeaders?) {
    const token: string = this.cash.getSessionData('user') ? this.cash.getSessionData('user').userToken : null;
    if ( token ) {
      this.httpHeaders.Authorization =  token;
        // 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYyMTE4NTI1OH0.CUjjsPuKtPzeRR1CjvM8OIjmyryvF1cUU-MxI2qFS54H3sNZd9MEpAdCDUxK-lJ5jNdSAowoguh5iv7tAEi_Kw';
    }
  }

  // ------------------ logout ---------------
  logOut(){
    this.cash.clearSession();
    this.cash.removeLocalStorage('user');
    this.cash.removeLocalStorage('customerProfile');
    this.navigate('../../');
  }

}
