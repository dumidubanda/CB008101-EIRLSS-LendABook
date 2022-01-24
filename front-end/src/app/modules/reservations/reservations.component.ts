import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {UtilService} from '../../services/util.service';
import {BOOKS_APIS, RESERVATIONS_APIS, VIDEOS_APIS} from '../../lookups/apis.lookups';
import {CashServiceService} from '../../services/cash-service.service';
import {FileManagerService} from '../../services/file-manager.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  userInfo: any = this.uti.getUserInfo();
  loading;
  formGroup: FormGroup;
  displayedColumnsBooks: string[] = this.userInfo.admin ? ['id', 'book', 'user', 'action'] : ['id', 'book', 'action'];
  displayedColumnsVideos: string[] = this.userInfo.admin ?  ['id', 'video', 'user', 'action'] : ['id', 'video', 'action'] ;
  dataSourceVideos = new MatTableDataSource([]);
  dataSourceBooks = new MatTableDataSource([]);
  bookReservations: any[];
  videoReservations: any[];


  constructor(private fb: FormBuilder, private  uti: UtilService, private cash: CashServiceService,
              private fileManagerService: FileManagerService,
              private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.getData();
    this.createForm();
  }

  createForm(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  getData(): void{
    this.loading = true;
    const booksReservationUrl = this.userInfo.admin ? RESERVATIONS_APIS.books : RESERVATIONS_APIS.userBooks + this.userInfo.id;
    const videosReservationUrl = this.userInfo.admin ? RESERVATIONS_APIS.videos : RESERVATIONS_APIS.userVideos + this.userInfo.id;
    this.uti.getRequest(booksReservationUrl).subscribe(value => {
      this.bookReservations = value;
      this.dataSourceBooks = new MatTableDataSource(value);
      this.loading = false;
    }, error => {
      this.uti.alert('Error getting Book Reservations!', this);
    });
    this.loading = true;
    this.uti.getRequest(videosReservationUrl).subscribe(value => {
      this.videoReservations = value;
      this.dataSourceVideos = new MatTableDataSource(value);
      this.loading = false;
    }, error => {
      this.uti.alert('Error getting Video Reservations!', this);
    });
  }
  deleteItem(item, index, type): void {
    this.uti.deleteResource(type === 'video' ? RESERVATIONS_APIS.videosDelete + item.id :
      RESERVATIONS_APIS.booksDelete + item.id).subscribe(value => {
      if ( type === 'video'){
        this.videoReservations.splice(index, 1);
        this.dataSourceVideos = new MatTableDataSource(this.videoReservations);
        this.userInfo.reservedVideos =
          this.userInfo.reservedVideos.filter(video => item.video.id !== video.id);
      } else{
        this.bookReservations.splice(index, 1);
        this.dataSourceBooks = new MatTableDataSource(this.bookReservations);
        this.userInfo.reservedBooks =
          this.userInfo.reservedBooks.filter(book => item.book.id !== book.id);
      }
      this.cash.setSessionData('user',  this.userInfo);
      this.loading = false;
      this.uti.alert('Deleted successfully', this);
    }, error => {
      this.uti.alert('Error Deleted Reservations!', this);
    });
  }

  applyFilterVideos(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVideos.filter = filterValue.trim().toLowerCase();
  }
  applyFilterBooks(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBooks.filter = filterValue.trim().toLowerCase();
  }

  downloadFile(item, type): void{
    this.loading = true;
    this.uti.getRequest(type === 'video' ? VIDEOS_APIS.video + item.video.id : BOOKS_APIS.book + item.book.id ).subscribe(value => {
      this.fileManagerService.downloadContent( value.data, type === 'video' ? 'video/mp4' : 'application/pdf');
      this.loading = false;
    }, error => {
      this.uti.alert('Error While Download Content', this);
    });
  }
  navigate = (path, itemId?) => this.uti.navigate(path, itemId ? {id: itemId} : {});

}
