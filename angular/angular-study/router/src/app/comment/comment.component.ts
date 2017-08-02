import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  private commentId:number;

  constructor(private routerInfo:ActivatedRoute) { }

  ngOnInit() {
    //subscribe参数订略
    this.routerInfo.params.subscribe((params:Params) => this.commentId = params["id"]);
    //snapshot参数快照
    this.commentId = this.routerInfo.snapshot.params["id"];
  }

}
