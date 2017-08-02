import { HeaderComponent } from './header/header.component';
import { CommentComponent } from './comment/comment.component';
import { Code404Component } from './code404/code404.component';
import { ProdustComponent } from './produst/produst.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // children: []
    component:HomeComponent
  },
  {
    path:'produst',
    component:ProdustComponent
  },{
    path:'comment/:id',
    component:CommentComponent
  },{
    path:'header',
    component:HeaderComponent
  },{
    path:'**',
    component:Code404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
