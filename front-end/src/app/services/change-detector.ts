import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeDetectorService {

  private authChanged = new Subject<any>();
  private userInfoChanged = new Subject<any>();
  constructor() {}

  // -------------- auth---------------
  emitAuthChanges = () => this.authChanged.next(true);
  watchAuthChanges = (): Observable<any> => this.authChanged.asObservable();

  // -------------- userInfoChanged ---------------
  emitUserInfoChanges = () => this.userInfoChanged.next(true);
  watchUserInfoChanges = (): Observable<any> => this.userInfoChanged.asObservable();

}
