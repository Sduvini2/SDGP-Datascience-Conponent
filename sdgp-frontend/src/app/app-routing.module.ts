import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentOneComponent } from './component-one/component-one.component';
import { PagetwoComponent } from './pagetwo/pagetwo.component';

const routes: Routes = [
  { path: '',redirectTo:"/pageone" , pathMatch:"full"},
  { path: 'pageone',component:ComponentOneComponent},
  { path: 'pagetwo',component:PagetwoComponent} ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
