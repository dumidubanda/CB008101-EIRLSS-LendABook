import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadingAreaComponent } from './uploading-area/uploading-area.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [UploadingAreaComponent],
  imports: [
    CommonModule, FileUploadModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [UploadingAreaComponent]
})
export class FileManagerModule { }
