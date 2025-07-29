// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Initially selected country
  selectedCountry: string = 'uk';

  // Dropdown state
  isDropdownOpen = false;

  constructor() { }

  ngOnInit(): void {
  }


  showCountry(country: string): void {
    this.selectedCountry = country;
  }

  
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
