import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from '../../../../services/util.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() sideMenu: any[] = [];
  constructor(private utilService: UtilService) { }
  ngOnInit(): void {
  }


  navigate(path): void{
    this.utilService.navigate(path);
  }
}
