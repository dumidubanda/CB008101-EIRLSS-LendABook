import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../../services/util.service';
import {BOOKS_APIS, COMMENTS_APIS, RESERVATIONS_APIS} from '../../../lookups/apis.lookups';
import {ActivatedRoute} from '@angular/router';
import {BooksServiceService} from '../books-service.service';
import {APP_CURRENCY} from '../../../lookups/app.lookups';
import {CashServiceService} from '../../../services/cash-service.service';
import {FileManagerService} from '../../../services/file-manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  userInfo;
  APP_CURRENCY = APP_CURRENCY;
  loading;
  bookInfo: any;
  formGroup: FormGroup;
  comments: any[] = [];
  loadingComments;

  constructor(private utilService: UtilService, public booksServiceService: BooksServiceService,
              private fb: FormBuilder,
              private cash: CashServiceService, private fileManagerService: FileManagerService) {
    this.userInfo = this.utilService.getUserInfo();
  }

  ngOnInit(): void {
    this.getBookData(this.booksServiceService.getRouterParams().id);
  }

  getBookData(bookId): void {
    this.loading = true;
    this.utilService.getRequest(BOOKS_APIS.book + bookId ).subscribe(value => {
      this.bookInfo = value;
      this.comments = value.comments;
      this.loading = false;
      this.createCommentForm();
    }, error => this.utilService.alert('Error getting book Info!', this));
  }

  reserve(): void{
    const request: any = {reservationDate: new Date()};
    request.book = {id: this.bookInfo.id};
    request.user = {id: this.userInfo.id};
    this.utilService.postRequest(RESERVATIONS_APIS.books , request).subscribe((value: any) => {
      this.utilService.alert('Book Reserve Successfully', this);
      if ( this.userInfo.reservedBooks){
        this.userInfo.reservedBooks = [{id: this.bookInfo.id}];
      } else{
        this.userInfo.reservedBooks.push({id: this.bookInfo.id});
      }
      this.cash.setSessionData('user', this.userInfo);
      this.bookInfo.reserved = true;
      this.loading = false;
    }, error => this.utilService.alert('Error While Reserve Book!', this));
  }
  delete = () => this.booksServiceService.delete(this.bookInfo, this);
  openBook = () => this.fileManagerService.downloadContent( this.bookInfo.data,'application/pdf');



  createCommentForm(): void{
    this.formGroup = this.fb.group({
      id: ['', []],
      comment: ['', [Validators.required]],
      commentDate: [new Date(), [Validators.required]],
      user: [this.userInfo.id, [Validators.required]],
      book: [this.bookInfo.id, [Validators.required]],
    });
  }
  submitComment(): void{
    if ( this.formGroup.invalid) { return; }
    this.loadingComments = true;
    const request = this.formGroup.value;
    request.user = {id: this.userInfo.id};
    request.book = {id: this.bookInfo.id};
    this.utilService.postRequest(COMMENTS_APIS.book, request).subscribe((value:any) => {
      this.createCommentForm();
      this.loadingComments = false;
      value.firstName = this.userInfo.firstName;
      value.lastName = this.userInfo.lastName;
      this.comments.push(value);
    }, error => {
      this.utilService.alert('Error While Saving Comment', this);
      this.loadingComments = false;
    });
  }
}
