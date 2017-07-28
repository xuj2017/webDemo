import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [//只能申明组件  模块  管道
    AppComponent
  ],
  imports: [//依赖
    BrowserModule
  ],
  providers: [],//声明服务
  bootstrap: [AppComponent]//声明主组件
})
export class AppModule { }
