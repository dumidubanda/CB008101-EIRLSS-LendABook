import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksComponent} from './books.component';
import {BookFormComponent} from './book-form/book-form.component';
import {BooksCategoriesComponent} from './books-categories/books-categories.component';
import {BookPageComponent} from './book-page/book-page.component';

const routes: Routes = [
  {path: '', component: BooksComponent},
  {path: 'form', component: BookFormComponent},
  {path: 'categories', component: BooksCategoriesComponent},
  {path: 'book', component: BookPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
