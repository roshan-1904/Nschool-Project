import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from './hotel.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
   private base = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) {}

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.base}/add`, hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.base}/list`);
  }
}
