import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor() { }

  getProduct():Product{
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
