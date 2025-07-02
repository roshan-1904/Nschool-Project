// import { Component, OnInit } from '@angular/core';
// import { Route } from '@angular/router';

// @Component({
//   selector: 'app-page1',
//   templateUrl: './page1.component.html',
//   styleUrls: ['./page1.component.css']
// })
// export class Page1Component implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openProperty(id: string) {
    this.router.navigate(['/property', id]);
  }
}









