import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {BOOKS_APIS} from '../../lookups/apis.lookups';
import {ChangeDetectorService} from '../../services/change-detector';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  params: any;
  userInfo: any;

  constructor( private route: ActivatedRoute, private utilService: UtilService, private changeDetectorService: ChangeDetectorService) {
    this.route.queryParams.subscribe((params: any) => {
      this.params = params;
    });
    this.userInfo = this.utilService.getUserInfo();
    this.changeDetectorService.watchUserInfoChanges().subscribe(value => {
      this.userInfo = this.utilService.getUserInfo();
    });
  }

  getRouterParams = () => this.params;
  getImgUrl = (book) => book.coverImage ? 'data:image/jpeg;base64,' + book.coverImage : 'assets/img/image.png';
  ableForReserveBooks = () => (!this.userInfo.reservedBooks || this.userInfo.reservedBooks.length <  this.userInfo.plan.books) && !this.userInfo.admin;
  navigate = (path, bookId?) => this.utilService.navigate(path, bookId ? {id: bookId} : {});
  isReserved = (book) => !this.userInfo.reservedBooks || this.userInfo.admin ? false : this.userInfo.reservedBooks.find(reserveBook => reserveBook.id === book.id) != null;
  delete(bookInfo, componentRef): void{
    componentRef.loading = true;
    this.utilService.deleteResource(BOOKS_APIS.book + bookInfo.id).subscribe(value => {
      componentRef.loading = false;
      this.utilService.alert('Book Deleted successfully', this, 20000);
      this.utilService.navigate('../books');
    }, error => this.utilService.alert('Error While delete Book', componentRef));
  }

}
