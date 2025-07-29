import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './model'; 

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) {}

  // GET all hotels
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/list`);
  }

  // POST  Add  hotel
  addHotel(hotel: Hotel): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, hotel);
  }

  //  Update  hotel
  updateHotel(id: string, hotel: Hotel): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, hotel);
  }

  //  Delete  hotel 
  deleteHotel(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
