import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private commonService = inject(CommonService);
  private baseUrl = this.commonService.baseUrl;

  constructor(private http: HttpClient) {}

  // 🔹 Register user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, { username, password });
  }

  // 🔹 Login user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password });
  }

  // 🔹 Logout user
  logout(): void {
    localStorage.removeItem('token');
  }

  // 🔹 Get JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
