import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';

import * as jwt_decode from 'jwt-decode';


import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5041/api';

  constructor(private http: HttpClient) {}
  
  login(email: string, password: string,userType:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/UserAuth/login`, { email, password ,userType});
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  setuserName(email:string):void
  {
    localStorage.setItem('email',email);
  }
  getuserName():string |null{
    return localStorage.getItem('email');
  }

  
  logout(): void {
    localStorage.removeItem('authToken');
   
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // return true if token exists
  }

  getUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const decodedToken: any = (jwt_decode as unknown as (token: string) => any)(token);

    return decodedToken.role; // Assuming "role" was set in the token claims
}
  
}
