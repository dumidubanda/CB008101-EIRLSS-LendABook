import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideosComponent} from './videos.component';
import {VideosFormComponent} from './videos-form/videos-form.component';
import {VideosCategoriesComponent} from './videos-categories/videos-categories.component';
import {VideoPageComponent} from './video-page/video-page.component';

const routes: Routes = [
  {path: '', component: VideosComponent},
  {path: 'form', component: VideosFormComponent},
  {path: 'categories', component: VideosCategoriesComponent},
  {path: 'video', component: VideoPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
