import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpGetService } from '../http-get.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  i: string;
  testArray = [];

  constructor(
    private route: ActivatedRoute,
    private get: HttpGetService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.i = params['item'];
      
      this.get.getDetail(this.i).subscribe((res: any) => {
        this.testArray = res;
      });
    });  
  }

}