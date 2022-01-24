import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { VideosFormComponent } from './videos-form/videos-form.component';
import { VideosCategoriesComponent } from './videos-categories/videos-categories.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {FileManagerModule} from '../common/file-manager/file-manager.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { VideoPageComponent } from './video-page/video-page.component';

@NgModule({
  declarations: [
    VideosComponent,
    VideosFormComponent,
    VideosCategoriesComponent,
    VideoPageComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    FileManagerModule,
    MatTooltipModule
  ]
})
export class VideosModule { }
