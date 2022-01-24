import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: any [] = [];
  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
  }

  navigate(path): void{
    this.utilService.navigate(path);
  }
}
