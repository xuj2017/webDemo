// import { UnSaveGuard } from './guard/unSaveGuard';
import { LoginGuard } from './guard/login';
import { ChatComponent } from './chat/chat.component';
import { SellerComponent } from './seller/seller.component';
import { ProdustDescComponent } from './produst-desc/produst-desc.component';
import { HeaderComponent } from './header/header.component';
import { CommentComponent } from './comment/comment.component';
import { Code404Component } from './code404/code404.component';
import { ProdustComponent } from './produst/produst.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CanActivate,CanDeactivate, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/home",//重定向到home组件
    pathMatch:"full"
  },
  {
    path:'chat',
    component:ChatComponent,
    outlet:"aux"
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path:'produst',
    component:ProdustComponent,
    children:[
      {
        path:'',
        component:ProdustDescComponent
      },
      {
        path:'seller/:id',
        component:SellerComponent
      }
    ],
    canActivate:[LoginGuard]
  //  CanDeactivate:[UnSaveGuard]
  },{
    path:'comment/:id',
    component:CommentComponent,
    resolve:{
      produst:ProdustResolve
    }
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
  exports: [RouterModule],
  providers:[LoginGuard,ProdustResolve]
})
export class AppRoutingModule { }
