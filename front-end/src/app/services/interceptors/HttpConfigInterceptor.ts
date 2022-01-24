import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CashServiceService} from '../cash-service.service';
import {tap} from 'rxjs/operators';
// import {ErrorHandlerService} from './error-handler.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private cash: CashServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.cash.getSessionData('user') ? this.cash.getSessionData('user').userToken : '';
    const apiHeaders:any = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };
    if (token) {
      apiHeaders.token = token;
      request = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('token', token)
      });
    } else {
      request = request.clone({
        headers: request.headers
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
      });
    }
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // if (event && event.body && event.body.code === 1323)
              // this.utilService.notify(NOTIFICATIONS.ERROR, 'privilegeUnSufficientTitle', 'privilegeUnSufficientContent');
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            let data = {};
            data = { reason: error.message,  status: error.url.indexOf('signIn') !== -1 ? 403 : error.status };
            // this.errorHandlerService.handleError(data);
            /*
            if (error && (error.status === 401 || error.status === 0)) {
              this.utilService.logoutEvent();
              this.utilService.setLocalStorage('sessionTimeOut', 'sessionTimeout' + Math.random());
            }*/
          }
        }
      )
    );
  }
}
export class HttpConfiFilterPipegInterceptor {}
