import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`

  private readonly ACCESS_TOKE_KEY = 'access_token';
  private readonly REFRESH_TOKE_KEY = 'refresh_token'

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<AuthResponse>{
    
  }
}
