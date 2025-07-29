// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';



// @Component({
//   selector: 'app-page1',
//   templateUrl: './page1.component.html',
//   styleUrls: ['./page1.component.css']
// })
// export class Page1Component {
//   items = [
//     { id: 1, name: 'Card 1' },
//     { id: 2, name: 'Card 2' }
    
//   ];

//   constructor(private router: ActivatedRoute) {}

 
//   ngOnInit() {
//   const id = this.router.snapshot.paramMap.get('id');
//   console.log('Item ID:', id);
 

//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HotelService } from '../shared/dbservies';
// import { Hotel } from '../shared/model';



// @Component({
//   selector: 'app-page1',
//   templateUrl: './page1.component.html',
//   styleUrls: ['./page1.component.css']
// })
// export class Page1Component implements OnInit {
//   hotels: Hotel[] = [];
//   constructor(private router: ActivatedRoute, private hotelService: HotelService) {}

//   ngOnInit() {
//   const id = this.router.snapshot.paramMap.get('id');
//   console.log('Item ID:', id);
//       this.hotelService.getHotels().subscribe((data) => {
//       this.hotels = data;

//     });
//   }
// };

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../shared/dbservies';
import { Hotel } from '../shared/model';



@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  hotels: Hotel[] = [];
  constructor(private router: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit() {
  const id = this.router.snapshot.paramMap.get('id');
  console.log('Item ID:', id);
      this.hotelService.getHotels().subscribe((data) => {
      this.hotels = data;
    });
}
}