// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-property-detail',
//   templateUrl: './property-detail.component.html',
//   styleUrls: ['./property-detail.component.css']
// })
// export class PropertyDetailComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
})
export class PropertyDetailComponent implements OnInit {
  propertyId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id');
  }
}

