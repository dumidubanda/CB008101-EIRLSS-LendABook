import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './services/interceptors/auth-guard.service';
import {NotAuthGuard} from './services/interceptors/not-auth-guard.service';

const routes: Routes = [
  {path: '', children: [{path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}], canActivate: [NotAuthGuard]},
  {path: 'home', children: [{path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)}],
    canActivate: [AuthGuard]},
  {path: 'books', children: [{path: '', loadChildren: () =>
        import('./modules/books/books.module').then(m => m.BooksModule)}], canActivate: [AuthGuard]},
  {path: 'videos', children: [{path: '', loadChildren: () =>
        import('./modules/videos/videos.module').then(m => m.VideosModule)}], canActivate: [AuthGuard]},
  {path: 'reservations', children: [{path: '', loadChildren: () =>
        import('./modules/reservations/reservations.module').then(m => m.ReservationsModule)}], canActivate: [AuthGuard]},
  {path: 'profile', children: [{path: '', loadChildren: () =>
        import('./modules/profile/profile.module').then(m => m.ProfileModule)}], canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
