import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
     path: '',
     redirectTo: '/login',
     pathMatch: 'full' 
   },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'dashboard',
    component:HomeComponent,
  },
  {
    path:'dashboard/detail/:id',
    component:DetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
