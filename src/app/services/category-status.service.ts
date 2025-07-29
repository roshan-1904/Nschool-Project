import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CategoryStatus {
  categoryName: string;
  enabled: boolean;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryStatusService {
  private apiUrl = 'http://localhost:3000/api/category-status';

  constructor(private http: HttpClient) {}

  updateStatus(categoryName: string, enabled: boolean): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, { categoryName, enabled });
  }

  getStatuses(): Observable<CategoryStatus[]> {
    return this.http.get<CategoryStatus[]>(this.apiUrl);
  }
}
