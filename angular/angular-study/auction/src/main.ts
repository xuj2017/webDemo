import './polyfills.ts';//老版本浏览器兼容

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode(); //如果是生产环境则关闭开发者模式
}

platformBrowserDynamic().bootstrapModule(AppModule);
