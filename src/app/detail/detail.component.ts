// import { Component, OnInit } from '@angular/core';
// import {ActivatedRoute} from '@angular/router';
// import { HttpGetService } from '../http-get.service';

// @Component({
//   selector: 'app-detail',
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.css']
// })

// export class DetailComponent implements OnInit {
//   i: string;
//   testArray = [];

//   constructor(
//     private route: ActivatedRoute,
//     private get: HttpGetService
//   ) { }

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       this.i = params['item'];

//       this.get.getDetail(this.i).subscribe((res: any) => {
//         this.testArray = res;
//       });
//     });
//   }

// }



import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpGetService } from '../http-get.service';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  title = 'Detail Kasus Covid-19';
  canvas: any;
  ctx: any;

  i: string;
  testArray = [];
  // newestData = [20, 90];
  datasetD = [];

  constructor(
    private route: ActivatedRoute,
    private get: HttpGetService
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.i = params['item'];

      this.get.getDetail(this.i).subscribe((res: any) => {
        this.testArray = res;
        this.datasetD.push(this.testArray.reverse());
        // this.newestData = this.testArray.slice(0,2);
        // console.log(this.testArray[0].Deaths);
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
              labels: ["Sembuh", "Positif", "Meninggal"],
              datasets: [{
                  label: '# of Votes',
                  data: [this.testArray[0].Recovered,this.testArray[0].Confirmed,this.testArray[0].Deaths],
                  backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            responsive: false
          }
        });

      });
      // console.log(this.testArray);
    });

  }
}
