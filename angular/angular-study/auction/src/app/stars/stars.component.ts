import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input()
  private rating: number = 0;//接收星级评价数值,默认为0

  private stars: boolean[];

  constructor() { }

  ngOnInit() {
    this.stars = [];

    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }

  }

}
