import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginCredentials, RegisterCredentials, UserRole } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private readonly USER_KEY = 'current_user'

  constructor(private http: HttpClient) { }

  login(credentials:LoginCredentials ): Observable<AuthResponse>{

    return this.http.post<AuthResponse>(`${this.apiUrl }/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.saveSession(response); 
      })
    )
    
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${this.apiUrl }/register`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.saveSession(response); 
      })
    )
  }

  logout(): void {
    const refreshToken = this.ge
  }





  private saveSession(response: AuthResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
  }


  private clearSession(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }



  

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY); 
  }

  getUser(): UserRole | null {
    const user = 
  }


}
