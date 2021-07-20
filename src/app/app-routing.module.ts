import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgrxComponent} from './ngrx/ngrx.component';

const routes: Routes = [
  { path: 'ngrx', component: NgrxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
