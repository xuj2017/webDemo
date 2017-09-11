import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NoPageComponent} from './no-page/no-page.component';
import {CrisisCenterComponent} from './crisis-center/crisis-center.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {
    path: 'crisis-center',
    component:CrisisCenterComponent
  },{
    path:'heroes',
    component:HeroesComponent
  },{
    path:'',
    redirectTo:'/heroes',
    pathMatch:'full'
  },{
    path:'**',
    component:NoPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
