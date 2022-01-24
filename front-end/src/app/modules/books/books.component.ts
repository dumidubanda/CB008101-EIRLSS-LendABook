import { Component, OnInit } from '@angular/core';
import {APP_CURRENCY} from '../../lookups/app.lookups';
import {FormControl} from '@angular/forms';
import {UtilService} from '../../services/util.service';
import {BOOKS_APIS, RESERVATIONS_APIS} from '../../lookups/apis.lookups';
import {CashServiceService} from '../../services/cash-service.service';
import {BooksServiceService} from './books-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  userInfo: any;
  searchCtrl: FormControl = new FormControl();
  loading;
  APP_CURRENCY = APP_CURRENCY;
  books: any[] = [];
  constructor(private utilService: UtilService, private cash: CashServiceService,
              public booksService: BooksServiceService) { }

  ngOnInit(): void {
    this.userInfo = this.utilService.getUserInfo();
    this.getData();
    this.searchCtrl.valueChanges.subscribe(value => {
      if ( !value){
        this.getData();
      }
    });
  }

  getData(): void{
    this.loading = true;
    this.utilService.getRequest(BOOKS_APIS.url).subscribe(value => {
      this.books = value;
      this.loading = false;
    }, error => this.utilService.alert('Error getting books!', this));
  }

  search(event): void{
    if (event.key === "Enter" && this.searchCtrl.value) {
      this.utilService.getRequest(BOOKS_APIS.search + this.searchCtrl.value).subscribe(value => {
        this.books = value;
        this.loading = false;
      }, error => this.utilService.alert('Error getting books!', this));
    }
  }

  reserve(book): void{
    const request: any = {reservationDate: new Date()};
    request.book = {id: book.id};
    request.user = {id: this.userInfo.id};
    this.utilService.postRequest(RESERVATIONS_APIS.books , request).subscribe((value:any) => {
      this.utilService.alert('Book Reserve Successfully', this);
      if ( this.userInfo.reservedBooks){
        this.userInfo.reservedBooks = [{id: book.id}];
      } else{
        this.userInfo.reservedBooks.push({id: book.id});
      }
      this.cash.setSessionData('user', this.userInfo);
      book.reserved = true;
      this.loading = false;
    }, error => this.utilService.alert('Error While Reserve Book!', this));
  }

  delete(book, index): void{
    this.loading = true;
    this.utilService.deleteResource(BOOKS_APIS.book + book.id).subscribe(value => {
      this.books.splice(index, 1);
      this.loading = false;
      this.utilService.alert('Book Deleted successfully', this, 20000);
    }, error => this.utilService.alert('Error While delete Book', this));
  }

}
