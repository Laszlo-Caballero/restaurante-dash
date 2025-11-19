import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OptionsHttp } from './httpType';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:8080/api/v1';
  private http = inject(HttpClient);

  get<R>(path: string, options?: OptionsHttp) {
    return this.http.get<R>(`${this.baseUrl}/${path}`, options);
  }

  post<R, B = unknown>(path: string, body: B, options?: OptionsHttp) {
    return this.http.post<R>(`${this.baseUrl}/${path}`, body, options);
  }

  put<R, B>(path: string, body: B, options?: OptionsHttp) {
    return this.http.put<R>(`${this.baseUrl}/${path}`, body, options);
  }

  delete<R>(path: string, options?: OptionsHttp) {
    return this.http.delete<R>(`${this.baseUrl}/${path}`, options);
  }
}
