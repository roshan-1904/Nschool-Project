import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../shared/hotel.service';
import { Hotel } from '../shared/hotel.model';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  hotels: Hotel[] = [];
  hotelId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    console.log('Item ID from route:', this.hotelId);
    this.hotelService.getHotels().subscribe((data) => {
      this.hotels = data;
    });
  }
}
