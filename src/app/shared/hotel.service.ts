import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './hotel.model';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private baseUrl = 'http://localhost:3000/hotels'; 

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/list`);
  }
  
  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.baseUrl}/add`, hotel);
  }

updateHotel(id: string, hotel: Hotel): Observable<Hotel> {
  return this.http.put<Hotel>(`http://localhost:3000/hotels/update/${id}`, hotel);
}

  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
