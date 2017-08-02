import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produst',
  templateUrl: './produst.component.html',
  styleUrls: ['./produst.component.css']
})
export class ProdustComponent implements OnInit {
  private produstId:number;

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    //获取URL中id
    this.produstId = this.routeInfo.snapshot.queryParams["id"];
  }

}
