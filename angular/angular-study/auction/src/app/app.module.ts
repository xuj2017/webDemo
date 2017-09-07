import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {Routes,RouterModule} from '@angular/router';

const routeConfig: Routes = [
  {path:'',component:HomeComponent},
  {path:'product/:productTitle',component:ProductDetailComponent}
]

@NgModule({
  declarations: [//只能申明组件  模块  管道
    AppComponent, NavbarComponent, FooterComponent, SearchComponent, CarouselComponent, ProductComponent, StarsComponent, ProductDetailComponent, HomeComponent
  ],
  imports: [//依赖
    BrowserModule,
    RouterModule.forRoot(routeConfig,{ enableTracing: true })
  ],
  providers: [],//声明服务
  bootstrap: [AppComponent]//声明主组件
})
export class AppModule { }
