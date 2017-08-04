import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProdustComponent } from './produst/produst.component';
import { Code404Component } from './code404/code404.component';
import { CommentComponent } from './comment/comment.component';
import { HeaderComponent } from './header/header.component';
import { ProdustDescComponent } from './produst-desc/produst-desc.component';
import { SellerComponent } from './seller/seller.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProdustComponent,
    Code404Component,
    CommentComponent,
    HeaderComponent,
    ProdustDescComponent,
    SellerComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
