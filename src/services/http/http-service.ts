import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);

  get<R>(path: string) {
    return this.http.get<R>(`${this.baseUrl}/${path}`);
  }

  post<R, B>(path: string, body: B) {
    return this.http.post<R>(`${this.baseUrl}/${path}`, body);
  }

  put<R, B>(path: string, body: B) {
    return this.http.put<R>(`${this.baseUrl}/${path}`, body);
  }

  delete<R>(path: string) {
    return this.http.delete<R>(`${this.baseUrl}/${path}`);
  }
}
