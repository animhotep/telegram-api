import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgrxComponent} from './ngrx/ngrx.component';

const routes: Routes = [
  {
    path: 'ngrx',
    component: NgrxComponent,
    data: {title: 'ngrx'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
