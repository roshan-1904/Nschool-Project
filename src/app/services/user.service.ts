import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/register`, data);
  }

  getAllUsers() {
    return this.http.get(this.baseUrl);
  }
    addUser(user: any) {
    return this.http.post(this.baseUrl, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
