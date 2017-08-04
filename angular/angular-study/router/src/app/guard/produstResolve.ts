import { Injectable } from '@angular/core';
import { Produst } from '../produst/produst.component';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProdustResolve implements Resolve<Produst> {

    constructor(private router:Router){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        let produstId:number = route.params["id"];

        if(produstId == 1){
            return new Produst(1,"iphone7")
        }else{
            this.router.navigate(['./home']);
             return undefined;
        }
       
    }
} 