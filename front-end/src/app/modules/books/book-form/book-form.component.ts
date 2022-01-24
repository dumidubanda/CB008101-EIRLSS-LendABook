import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UtilService} from '../../../services/util.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BOOKS_APIS} from '../../../lookups/apis.lookups';
import {FileManagerService} from '../../../services/file-manager.service';
import {UploadingAreaComponent} from '../../common/file-manager/uploading-area/uploading-area.component';
import {BooksServiceService} from '../books-service.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  coverImg;
  @ViewChild('fileInputplacholder') fileInput: ElementRef;
  @ViewChild('appUploadingArea') uploader: UploadingAreaComponent;
  bookInfo: any;
  loading;
  formGroup: FormGroup;
  categories: any[] = [];
  constructor(private fb: FormBuilder, private  uti: UtilService,
              public booksService: BooksServiceService,
              private _FileManagerService: FileManagerService) {
    if ( !this.uti.getUserInfo().admin){
      this.uti.navigate('../books');
    }
  }
  ngOnInit(): void {
    if ( this.booksService.getRouterParams() && this.booksService.getRouterParams().id){
      this.getBookData(this.booksService.getRouterParams().id);
    } else{
      this.getCategories();
    }
  }

  getBookData(bookId): void {
    this.loading = true;
    this.uti.getRequest(BOOKS_APIS.book + bookId ).subscribe(value => {
      this.bookInfo = value;
      this.getCategories();
      this.loading = false;
      this.coverImg = this.booksService.getImgUrl(value);
    }, error => this.uti.alert('Error getting book Info!', this));
  }


  createForm(bookInfo): void {
    this.formGroup = this.fb.group({
      id: [bookInfo.id, []],
      name: [bookInfo.name, [Validators.required]],
      price: [bookInfo.price, [Validators.required]],
      language: [bookInfo.language, []],
      dimensions: [bookInfo.dimensions, [Validators.required]],
      copies: [bookInfo.copies, [Validators.required]],
      data: [bookInfo.data, [Validators.required]],
      publisher: [bookInfo.publisher, [Validators.required]],
      author: [bookInfo.author, [Validators.required]],
      publishingDate: [bookInfo.publishingDate, [Validators.required]],
      coverImage: [bookInfo.coverImage, [Validators.required]],
      pages: [bookInfo.pages, [Validators.required]],
      readingAge: [bookInfo.readingAge, [Validators.required]],
      category: [bookInfo.category ? bookInfo.category.id : '', [Validators.required]],
    });
  }

  submit(): void{
    if ( this.formGroup.invalid) { return; }
    this.loading = true;
    const request = this.formGroup.value;
    if ( request.category && request.category.id){
      request.category.id = this.formGroup.value.category;
    } else {
      request.category = {id:  this.formGroup.value.category};
    }
    if ( this.bookInfo && this.bookInfo.id ){
      this.uti.putResource(BOOKS_APIS.url, request).subscribe(value => {
        this.clearForm();
      }, error => this.uti.alert('Error While Saving Book Info', this));
    } else{
      this.uti.postRequest(BOOKS_APIS.url, request).subscribe(value => {
        this.clearForm();
      }, error => this.uti.alert('Error While Saving Book Info', this));
    }
  }

  clearForm(): void{
    this.uploader.clearQueue();
    this.formGroup.reset();
    this.bookInfo = null;
    this.coverImg = null;
    this.loading = false;
    this.uti.alert('Book Info Saved successfully', this, 20000);
  }

  getCategories(): void{
    this.loading = true;
    this.uti.getRequest(BOOKS_APIS.categories).subscribe(value => {
      this.categories = value;
      this.loading = false;
      this.createForm(this.bookInfo || {});
    }, error => {
      this.uti.alert('Error getting Categories!', this);
      this.createForm(this.bookInfo || {});
    });
  }

  delete = () => this.booksService.delete(this.bookInfo, this);

  handleFilesEvents(event): void{
    if ( event && event.action){
      switch (event.action) {
        case 'DELETE': {
          this.formGroup.controls['data'].setValue(null);
          break;
        }
        case 'FILES': {
          this.formGroup.controls['data'].setValue(event.filesQueue[0].content);
          break;
        }
      }
    }
  }

  // ------------ on file selected ------------------
  onFileSelected(event: any): void {
    const ref = this;
    this._FileManagerService.readFileBytes(event.target.files[0]).then((data) => {
          ref.formGroup.controls['coverImage'].setValue(data);
    });
    this._FileManagerService.readFileBase64(event.target.files[0]).then((data) => {
      ref.coverImg = data;
    });
  }
  onImgPlacholderClick(): void{
    const inputElement: HTMLElement = this.fileInput.nativeElement as HTMLElement;
    inputElement.click();
  }
}
