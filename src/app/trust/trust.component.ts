// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-trust',
//   templateUrl: './trust.component.html',
//   styleUrls: ['./trust.component.css']
// })
// export class TrustComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.css']
})
export class TrustComponent implements OnInit {

  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef;
  readonly cardWidth: number = 316; // 300px + 16px gap


  constructor() { }

  ngOnInit(): void { }

  scrollLeft(): void {
    this.cardContainer.nativeElement.scrollBy({
      left: -this.cardWidth,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.cardContainer.nativeElement.scrollBy({
      left: this.cardWidth,
      behavior: 'smooth'
    });
  }
}
