import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page1Component } from './page1/page1.component';
import { AboutComponent } from './about/about.component';
import { Card1Component } from './card1/card1.component';
import { UkComponent } from './uk/uk.component';
import { AusComponent } from './aus/aus.component';
import { IreComponent } from './ire/ire.component';
import { MycomponentComponent } from './mycomponent/mycomponent.component';

import { LondonComponent } from './london/london.component';
import { BirminghamComponent } from './birmingham/birmingham.component';
import { EdinburghComponent } from './edinburgh/edinburgh.component';
import { TrustComponent } from './trust/trust.component';
import { Mycomponent2Component } from './mycomponent2/mycomponent2.component';
import { BookComponent } from './book/book.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Card9Component } from './card9/card9.component';
import { Card10Component } from './card10/card10.component';
import { Card11Component } from './card11/card11.component';
import { Card12Component } from './card12/card12.component';
import { CitiesComponent } from './cities/cities.component';
import { CountryComponent } from './country/country.component';
import { Card13Component } from './card13/card13.component';
import { FooterComponent } from './footer/footer.component';
import { AllComponent } from './all/all.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UktouchComponent } from './uktouch/uktouch.component';
import { IretouchComponent } from './iretouch/iretouch.component';
import { CantouchComponent } from './cantouch/cantouch.component';

import { Component1Component } from './component1/component1.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { RegisterconstmerComponent } from './registerconstmer/registerconstmer.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingconstmerComponent } from './bookingconstmer/bookingconstmer.component';
import { CategoriesComponent } from './categories/categories.component';







@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    Page1Component,
    AboutComponent,
    Card1Component,
    UkComponent,
    AusComponent,
    IreComponent,
    MycomponentComponent,
  
    LondonComponent,
    BirminghamComponent,
    EdinburghComponent,
    TrustComponent,
    Mycomponent2Component,
    BookComponent,
    NavbarComponent,
    Card9Component,
    Card10Component,
    Card11Component,
    Card12Component,
    CitiesComponent,
    CountryComponent,
    Card13Component,
    FooterComponent,
    AllComponent,
    UktouchComponent,
    IretouchComponent,
    CantouchComponent,
  
    Component1Component,
       MainComponent,
       RoomBookingComponent,
       RegisterComponent,
       LoginComponent,
       BookingComponent,
       AdminComponent,
       ManageuserComponent,
       RegisterconstmerComponent,
       DashboardComponent,
       BookingconstmerComponent,
       CategoriesComponent,
  
    
  
   
   
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
