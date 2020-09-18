import { Component, OnInit } from '@angular/core';
import { HttpGetService } from '../http-get.service';
// import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    // private fb:FormBuilder,
    private get: HttpGetService
  ) { }

  arrayPage = [];
  globalData = [];

  ngOnInit() {
    this.get.getCountry().subscribe((res: any) => {
      this.arrayPage = res;
      console.log(this.arrayPage)
    });

    this.get.getGlobal().subscribe((res: any) => {
      this.globalData = res.Global;
      console.log(this.globalData);
    });
  }

}
