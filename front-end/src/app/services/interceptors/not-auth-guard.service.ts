import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CashServiceService} from '../cash-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

    constructor(private cash: CashServiceService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      if (this.cash.getSessionData('user')) {
        this.router.navigate(['../home']);
        return false;
      } else {
        return true;
      }
    }
}
