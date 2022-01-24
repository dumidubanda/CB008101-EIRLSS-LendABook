import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {ChangeDetectorService} from '../../services/change-detector';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

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
  getVideoUrl = (video) => 'data:image/jpeg;base64,' +  video.data;
  ableForReserveVideos = () => (!this.userInfo.reservedVideos || this.userInfo.reservedVideos.length <  this.userInfo.plan.videos ) && !this.userInfo.admin;
  navigate = (path, videoId?) => this.utilService.navigate(path, videoId ? {id: videoId} : {});
  isReserved = (book) => !this.userInfo.reservedVideos || this.userInfo.admin ? false : this.userInfo.reservedVideos.find(reservedVideo => reservedVideo.id === book.id) != null;

}
