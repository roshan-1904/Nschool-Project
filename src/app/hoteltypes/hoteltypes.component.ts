import { Component, OnInit } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { Hotel } from '../shared/hotel.model';

@Component({
  selector: 'app-hoteltypes',
  templateUrl: './hoteltypes.component.html',
  styleUrls: ['./hoteltypes.component.css']  
})
export class HoteltypesComponent implements OnInit {
  hotelName = '';
  location = '';
  amount!: number;
  currency = '';
  rating = 0;
  reviewCount = 0;
  imageInput = '';
  roomDescription = '';
  bhk2 = false;
  bhk3 = false;

  hotels: Hotel[] = [];

  constructor(private svc: HotelService) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.svc.getHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data;
      },
      error: (err: any) => alert('Error fetching hotels: ' + err.message)
    });
  }

  onSubmit() {
    const urls = this.imageInput.split(',').map(s => s.trim()).filter(s => s);
    const h: Hotel = {
      hotelName: this.hotelName,
      location: this.location,
      amount: this.amount,
      currency: this.currency,
      rating: this.rating,
      reviewCount: this.reviewCount,
      imageUrls: urls,
      roomDescription: this.roomDescription,
      bhk2: !!this.bhk2,
      bhk3: !!this.bhk3
    };

    this.svc.addHotel(h).subscribe({
      next: (savedHotel: Hotel) => {
        alert('Hotel added');
        this.hotels.push(savedHotel);
        this.reset();
      },
      error: (e: any) => alert('Error: ' + e.message)
    });
  }

  reset() {
    this.hotelName = '';
    this.location = '';
    this.amount = 0;
    this.currency = '';
    this.rating = 0;
    this.reviewCount = 0;
    this.imageInput = '';
    this.roomDescription = '';
    this.bhk2 = false;
    this.bhk3 = false;
  }
}
