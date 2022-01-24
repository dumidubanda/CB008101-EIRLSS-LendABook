import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CashServiceService} from '../../../../services/cash-service.service';
import {UtilService} from '../../../../services/util.service';
import {ChangeDetectorService} from '../../../../services/change-detector';
import {DEFAULT_USER} from '../../../../lookups/app.lookups';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() fixedTop = true;
  @Input() appName;
  @Output() sideMenuBtnEvent = new EventEmitter<any>();
  userInfo: any = DEFAULT_USER;

  constructor(private cash: CashServiceService,
              private changeDetectorService: ChangeDetectorService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.userInfo = this.cash.getSessionData('user') || DEFAULT_USER;
    this.changeDetectorService.watchUserInfoChanges().subscribe(value => {
      this.userInfo = this.cash.getSessionData('user');
    });
  }

  logout(): void{
    this.utilService.logOut();
    this.changeDetectorService.emitUserInfoChanges();
  }

  navigate(path): void{
    this.utilService.navigate(path);
  }
}
