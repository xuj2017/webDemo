---
title: angular-study
date: 2017-07-27 10:31:54
tags: angular
---
## 1.安装`angular-cli`

```
   $ npm install -g @angular/cli
   // ng -v 检测是否装好
   // ng new auction 初始化angular项目基础架构
```
```typescript
@Component({//装饰器
  selector: 'app-root',//元数据及其指
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//组件元数据装饰器
export class AppComponent {
  title = 'app';
}
//控制器
```