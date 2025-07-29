// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-component1',
//   templateUrl: './component1.component.html',
//   styleUrls: ['./component1.component.css']
// })
// export class Component1Component implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  openDropdownIndex: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(index: number): void {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

}
