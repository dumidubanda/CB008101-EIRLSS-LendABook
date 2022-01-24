import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BookFormComponent } from './book-form/book-form.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BooksCategoriesComponent } from './books-categories/books-categories.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {FileManagerModule} from '../common/file-manager/file-manager.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BookPageComponent } from './book-page/book-page.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookFormComponent,
    BooksCategoriesComponent,
    BookPageComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
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
export class BooksModule { }
