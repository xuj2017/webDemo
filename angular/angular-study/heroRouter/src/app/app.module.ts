import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { NoPageComponent } from './no-page/no-page.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesModule } from './heroes.module';

@NgModule({
  declarations: [
    AppComponent,
    CrisisCenterComponent,
    NoPageComponent
  ],
  imports: [
    BrowserModule,
    HeroesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
