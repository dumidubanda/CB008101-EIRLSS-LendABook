import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../../services/util.service';
import {VIDEOS_APIS} from '../../../lookups/apis.lookups';

@Component({
  selector: 'app-videos-form',
  templateUrl: './videos-form.component.html',
  styleUrls: ['./videos-form.component.css']
})
export class VideosFormComponent implements OnInit {

  videoInfo: any;
  loading;
  formGroup: FormGroup;
  categories: any[] = [];
  constructor(private fb: FormBuilder, private  uti: UtilService) {
    if ( !this.uti.getUserInfo().admin){
      this.uti.navigate('../videos');
    }
  }
  ngOnInit(): void {
    this.getCategories();
  }

  createForm(videoInfo): void {
    this.formGroup = this.fb.group({
      id: [videoInfo.id, []],
      name: [videoInfo.name, [Validators.required]],
      price: [videoInfo.price, [Validators.required]],
      language: [videoInfo.language, []],
      dimensions: [videoInfo.dimensions, [Validators.required]],
      copies: [videoInfo.copies, [Validators.required]],
      data: [videoInfo.data, [Validators.required]],
      publisher: [videoInfo.publisher, [Validators.required]],
      author: [videoInfo.author, [Validators.required]],
      publishingDate: [videoInfo.publishingDate, [Validators.required]],
      country: [videoInfo.country, [Validators.required]],
      director: [videoInfo.director, [Validators.required]],
      duration: [videoInfo.duration, [Validators.required]],
      watchingAge: [videoInfo.watchingAge, [Validators.required]],
      category: [videoInfo.category ? videoInfo.category.id : videoInfo.category, [Validators.required]],
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
    if ( this.videoInfo && this.videoInfo.id ){
      this.uti.putResource(VIDEOS_APIS.url, request).subscribe(value => {
        this.submitCallback(value);
      }, error => this.uti.alert('Error While Saving Video Info', this));
    } else{
      this.uti.postRequest(VIDEOS_APIS.url, request).subscribe(value => {
        this.submitCallback(value);
      }, error => this.uti.alert('Error While Saving Video Info', this));
    }
  }
  submitCallback(value): void{
    this.videoInfo = value;
    this.uti.alert('Video Info Saved successfully', this, 20000);
  }

  getCategories(): void{
    this.loading = true;
    this.uti.getRequest(VIDEOS_APIS.categories).subscribe(value => {
      this.categories = value;
      this.loading = false;
      this.createForm({});
    }, error => {
      this.uti.alert('Error getting Categories!', this);
      this.createForm({});
    });
  }

  delete(): void{
    if ( !this.videoInfo || !this.videoInfo.id) { return; }
    this.loading = true;
    this.uti.deleteResource(VIDEOS_APIS.url + this.videoInfo.id).subscribe(value => {
      this.createForm({});
      this.videoInfo = {};
      this.uti.alert('Video Deleted successfully', this, 20000);
    }, error => {
      this.uti.alert('Error While delete Video', this);
    });
  }

  handleFilesEvents(event): void{
    if ( event && event.action){
      switch (event.action) {
        case 'DELETE': {
          // this.visitCheckupAttachments.splice(event.index, 1);
          break;
        }
        case 'FILES': {
          this.formGroup.controls['data'].setValue(event.filesQueue[0].content);
          console.log(this.formGroup.value);
          break;
        }
      }
    }
  }

}
