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
  country: string;

  i: string;             // variabel untuk ambil param
  testArray = [];
  datasetD = [];

  constructor(
    private route: ActivatedRoute,
    private get: HttpGetService
  ) { }

  ngOnInit() {

    // ambil data api hari ini, disajikan dalam bentuk chart
    this.route.queryParams.subscribe(params => {
      this.i = params['item'];

      this.get.getDetail(this.i).subscribe((res: any) => {
        this.testArray = res;
        
        this.country = this.testArray[0].Country      // ambil data negara untuk ditampilkan

        this.datasetD.push(this.testArray.reverse());
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


        // info Covid kemarin
        this.canvas = document.getElementById('myChartYesterday');
        this.ctx = this.canvas.getContext('2d');
        let myChartYesterday = new Chart(this.ctx, {
          type: 'pie',
          data: {
              labels: ["Sembuh", "Positif", "Meninggal"],
              datasets: [{
                  label: '# of Votes',
                  data: [this.testArray[1].Recovered,this.testArray[1].Confirmed,this.testArray[1].Deaths],
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
    });

  }
}
