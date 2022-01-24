import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservationsComponent} from './reservations.component';
import {ReservationsFormComponent} from './reservations-form/reservations-form.component';

const routes: Routes = [
  {path: '', component: ReservationsComponent},
  {path: 'form', component: ReservationsFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
