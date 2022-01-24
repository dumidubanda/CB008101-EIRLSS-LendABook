import { Component } from '@angular/core';
import {APP_SIDE_MENU} from './lookups/app.lookups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sideMenu: any[] = APP_SIDE_MENU;
}
