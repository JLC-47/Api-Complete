import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, take, tap } from 'rxjs';
import { AuthResponse, LoginCredentials, RegisterCredentials, User, UserRole } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';

  private  isRefreshing = false;
  private  refrshTokenSubjet = new BehaviorSubject<string | null>(null);

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
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/logout`, {refreshToken}).subscribe({
        next: () => this.clearSession(),
        error: () => this.clearSession()
      });
    } else {
      this.clearSession();
    }

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

  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;  
  }

  getRol() : UserRole | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  get isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }


  refreshToken(): Observable<any> {
    if (this.isRefreshing) {
      return this.refrshTokenSubjet.pipe(
        filter(token => token !== null),
        take(1)
      );
    }

    this.isRefreshing = true;

  }


}
