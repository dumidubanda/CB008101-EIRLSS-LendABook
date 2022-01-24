import {Component, ContentChild, ElementRef, Input, OnInit, TemplateRef} from '@angular/core';
import {UtilService} from '../../../../services/util.service';
import {ChangeDetectorService} from '../../../../services/change-detector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  userInfo: any = this.utilService.getUserInfo();
  openSide = true;
  @Input() sideMenu: any[] = [];
  @ContentChild('routerTemplate') routerTemplate: TemplateRef<ElementRef>;

  constructor(private utilService: UtilService, private changeDetectorService:ChangeDetectorService) { }
  ngOnInit(): void {
    this.changeDetectorService.watchUserInfoChanges().subscribe(value => {
      this.userInfo = this.utilService.getUserInfo();
    });
  }

}
