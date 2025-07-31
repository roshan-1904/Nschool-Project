import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoryStatus {
  name: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryStatusService {
  private apiUrl = 'http://localhost:3000/api/category-status';  // Your base URL

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<CategoryStatus[]> {
    return this.http.get<CategoryStatus[]>(this.apiUrl);
  }

  getStatusByName(name: string): Observable<CategoryStatus> {
    return this.http.get<CategoryStatus>(`${this.apiUrl}/${name}`);
  }

  updateStatus(name: string, enabled: boolean): Observable<CategoryStatus> {
    return this.http.put<CategoryStatus>(`${this.apiUrl}/${name}`, { enabled });
  }

  createStatus(status: CategoryStatus): Observable<any> {
    return this.http.post<any>(this.apiUrl, status);
  }
}
