import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  LabelResult = [];
  DeathResult = [];
  RecoverResult = [];
  ConfirmResult = [];

  constructor(
    private route: ActivatedRoute,
    private get: HttpGetService,
    private router: Router
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
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(255, 99, 132, 1)'
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
                      'rgba(76, 175, 80,1.0)',
                      'rgba(255, 87, 34,1.0)',
                      'rgba(158, 158, 158,1.0)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            responsive: false
          }
        });

        // prepare data untuk grafik line
        var count = this.testArray.length;
        var counter = 0;
        while(count > 0) {
            this.LabelResult[counter] = this.testArray[counter].Date;
            this.DeathResult[counter] = this.testArray[counter].Deaths;
            this.RecoverResult[counter] = this.testArray[counter].Recovered;
            this.ConfirmResult[counter] = this.testArray[counter].Confirmed;
            counter++;
            count --;
        }
        this.LabelResult = this.LabelResult.reverse();
        this.DeathResult = this.DeathResult.reverse();
        this.RecoverResult = this.RecoverResult.reverse();
        this.ConfirmResult = this.RecoverResult.reverse();

        // info covid dalam bentuk line chart
        this.canvas = document.getElementById('lineChart');
        this.ctx = this.canvas.getContext('2d');

        let lineChart = new Chart(this.ctx, {
          type: 'line',
          data: {
              labels: this.LabelResult,
              datasets: [{
                  label: 'Angka kematian',
                  data: this.DeathResult,
                  backgroundColor: [
                      'rgba(0, 230, 34, 1)',
                      // 'rgba(54, 162, 235, 1)',
                      // 'rgba(255, 206, 86, 1)'
                  ],
                  fill: false,
                  borderColor: 'rgba(0, 227, 63, 48)',
                  borderWidth: 3
              },{
                label: 'Angka kesembuhan',
                data: this.RecoverResult,
                backgroundColor: [
                    'rgba(0, 230, 34, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)'
                ],
                fill: false,
                borderColor: 'rgba(0, 52, 235, 67)',
                borderWidth: 3
            },{
              label: 'Angka terinfeksi',
              data: this.ConfirmResult,
              backgroundColor: [
                  'rgba(0, 230, 34, 1)',
                  // 'rgba(54, 162, 235, 1)',
                  // 'rgba(255, 206, 86, 1)'
              ],
              fill: false,
              borderColor: 'rgba(0, 230, 200, 50 )',
              borderWidth: 3
          }]
          },
          options: {
            responsive: false
          }
        });

      });
    });

  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }
  logout(){
    this.router.navigate(['/login']);
  }
}
