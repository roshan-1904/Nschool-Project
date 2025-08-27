// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HotelService {

//   constructor() { }
// }

// hotel.service.ts
// hotel.service.ts
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Hotel } from './shared/model';

// @Injectable({ providedIn: 'root' })
// export class HotelService {
//   private base = 'http://localhost:3000/hotels';
//   constructor(private http: HttpClient) {}
//   getHotels(): Observable<Hotel[]> { return this.http.get<Hotel[]>(`${this.base}/list`); }
//   addHotel(h: Hotel): Observable<any>   { return this.http.post(`${this.base}/add`, h); }
// }

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Hotel } from './shared/model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotels: Hotel[] = [];

  constructor() {}

  getHotels(): Observable<Hotel[]> {
    return of(this.hotels);
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    if (!hotel.hotelName) {
      return throwError(() => new Error('Hotel name is required'));
    }
    this.hotels.push(hotel);
    return of(hotel);
  }

  
}


