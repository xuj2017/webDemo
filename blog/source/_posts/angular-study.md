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

## 2.安装第三方依赖

```
npm install jquery @types/jquery --save-dev  //@types/jquery为了让ts使用jquery
npm install bootstrap @types/bootstrap --save-dev 

//需在`.angular-cli.json`中   jquery  bootstrap添加才能使用
```

## 3.安装组件

```
ng g component name  //创建新组建
```