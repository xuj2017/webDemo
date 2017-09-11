import { Injectable } from '@angular/core';
// import * as console from 'console';

@Injectable()
export class LoggerService {

  constructor() { }

  log(message:string){
    console.log(message);
  }
}
