import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { Component1Component } from './component1/component1.component';
import { MainComponent } from './main/main.component';

    
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AddnewcostmerComponent } from './addnewcostmer/addnewcostmer.component';

     
     



const routes: Routes = [
  {path:'',component:MainComponent},
  { path: 'component1/:id', component: Component1Component },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'booking', component: BookingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {path:'addnewcostmer',component:AddnewcostmerComponent}
       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
