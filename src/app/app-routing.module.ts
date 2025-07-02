import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
 { path: '', component: HomeComponent },
  { path: 'page1', component: Page1Component },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
