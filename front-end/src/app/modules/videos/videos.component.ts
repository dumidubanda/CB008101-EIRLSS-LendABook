import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {APP_CURRENCY} from '../../lookups/app.lookups';
import {UtilService} from '../../services/util.service';
import {BOOKS_APIS, RESERVATIONS_APIS, VIDEOS_APIS} from '../../lookups/apis.lookups';
import {CashServiceService} from '../../services/cash-service.service';
import {VideosService} from './videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  userInfo: any;
  searchCtrl: FormControl = new FormControl();
  loading;
  APP_CURRENCY = APP_CURRENCY;
  videos: any[] = [];
  constructor(private utilService: UtilService,  private cash: CashServiceService,
              public videosService: VideosService) { }

  ngOnInit(): void {
    this.userInfo = this.cash.getSessionData('user') || {};
    this.getData();
    this.searchCtrl.valueChanges.subscribe(value => {
      if ( !value){
        this.getData();
      }
    });
  }

  getData(): void{
    this.loading = true;
    this.utilService.getRequest(VIDEOS_APIS.url).subscribe(value => {
      this.videos = value;
      this.loading = false;
    }, error => {
      this.utilService.alert('Error getting Videos!', this);
    });
  }

  search(event): void{
    if (event.key === "Enter" && this.searchCtrl.value) {
      this.utilService.getRequest(VIDEOS_APIS.search + this.searchCtrl.value).subscribe(value => {
        this.videos = value;
        this.loading = false;
      }, error => {
        this.utilService.alert('Error getting Videos!', this);
      });
    }
  }

  reserve(video): void{
    const request: any = {reservationDate: new Date()};
    request.video = {id: video.id};
    request.user = {id: this.userInfo.id};
    this.utilService.postRequest(RESERVATIONS_APIS.videos , request).subscribe((value: any) => {
      this.utilService.alert('Video Reserve Successfully', this);
      if ( this.userInfo.reservedVideos){
        this.userInfo.reservedVideos = [{id: video.id}];
      } else{
        this.userInfo.reservedVideos.push({id: video.id});
      }
      this.cash.setSessionData('user', this.userInfo);
      video.reserved = true;
      this.loading = false;
    }, error => {
      this.utilService.alert('Error While Reserve video!', this);
    });
  }

  delete(video, index): void{
    this.loading = true;
    this.utilService.deleteResource(VIDEOS_APIS.video + video.id).subscribe(value => {
      this.videos.splice(index, 1);
      this.loading = false;
      this.utilService.alert('Video Deleted successfully', this, 20000);
    }, error => this.utilService.alert('Error While delete Video', this));
  }
}
