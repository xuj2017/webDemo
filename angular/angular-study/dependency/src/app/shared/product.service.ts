import { Injectable } from '@angular/core';
import { LoggerService } from "./logger.service";


@Injectable()
export class ProductService {

  constructor(public logger:LoggerService) { }

  getProduct():Product{
    this.logger.log('getProduct方法被调用');
    return new Product(0,'iphone',5899,'商品');
  }
}

export class Product{
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public desc:string
  ){}
}
