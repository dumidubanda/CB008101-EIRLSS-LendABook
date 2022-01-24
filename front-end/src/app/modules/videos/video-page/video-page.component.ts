import { Component, OnInit } from '@angular/core';
import {APP_CURRENCY} from '../../../lookups/app.lookups';
import {UtilService} from '../../../services/util.service';
import {CashServiceService} from '../../../services/cash-service.service';
import {COMMENTS_APIS, RESERVATIONS_APIS, VIDEOS_APIS} from '../../../lookups/apis.lookups';
import {VideosService} from '../videos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements OnInit {

  userInfo;
  APP_CURRENCY = APP_CURRENCY;
  loading;
  videoInfo: any;
  formGroup: FormGroup;
  comments: any[] = [];
  loadingComments;

  constructor(private utilService: UtilService, public videosService: VideosService,
              private fb: FormBuilder, private cash: CashServiceService) {
    this.userInfo = this.utilService.getUserInfo();
  }

  ngOnInit(): void {
    this.getBookData(this.videosService.getRouterParams().id);
  }

  getBookData(videoId): void {
    this.loading = true;
    this.utilService.getRequest(VIDEOS_APIS.video + videoId ).subscribe(value => {
      this.videoInfo = value;
      this.comments = value.comments;
      this.loading = false;
      this.createCommentForm();
    }, error => this.utilService.alert('Error getting Video Info!', this));
  }

  reserve(): void{
    const request: any = {reservationDate: new Date()};
    request.video = {id: this.videoInfo.id};
    request.user = {id: this.userInfo.id};
    this.utilService.postRequest(RESERVATIONS_APIS.videos , request).subscribe((value: any) => {
      this.utilService.alert('Video Reserve Successfully', this);
      if ( this.userInfo.reservedVideos){
        this.userInfo.reservedVideos = [{id: this.videoInfo.id}];
      } else{
        this.userInfo.reservedVideos.push({id: this.videoInfo.id});
      }
      this.cash.setSessionData('user', this.userInfo);
      this.videoInfo.reserved = true;
      this.loading = false;
    }, error => this.utilService.alert('Error While Reserve Video!', this));
  }


  delete(): void{
    this.loading = true;
    this.utilService.deleteResource(VIDEOS_APIS.video + this.videoInfo.id).subscribe(value => {
      this.loading = false;
      this.utilService.alert('Video Deleted successfully', this, 20000);
      this.utilService.navigate('../videos');
    }, error => this.utilService.alert('Error While delete Video', this));
  }


  createCommentForm(): void{
    this.formGroup = this.fb.group({
      id: ['', []],
      comment: ['', [Validators.required]],
      commentDate: [new Date(), [Validators.required]],
      user: [this.userInfo.id, [Validators.required]],
      video: [this.videoInfo.id, [Validators.required]],
    });
  }
  submitComment(): void{
    if ( this.formGroup.invalid) { return; }
    this.loadingComments = true;
    const request = this.formGroup.value;
    request.user = {id: this.userInfo.id};
    request.video = {id: this.videoInfo.id};
    this.utilService.postRequest(COMMENTS_APIS.video, request).subscribe((value:any) => {
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
