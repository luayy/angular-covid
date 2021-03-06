import { Component, OnInit } from '@angular/core';
import { HttpGetService } from '../http-get.service';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    // private fb:FormBuilder,
    private get: HttpGetService, 
    private router: Router
  ) { }

  arrayPage = [];
  globalData = [];
  byCountry = []

  ngOnInit() {
    this.get.getCountry().subscribe((res: any) => {
      this.arrayPage = res;
      // console.log(this.arrayPage)
    });

    this.get.getGlobal().subscribe((res: any) => {
      this.globalData = res.Global;
      this.byCountry = res.Countries
      console.log(this.globalData);
    });
  }
  logout(){
    this.router.navigate(['/login']);
  }


}
