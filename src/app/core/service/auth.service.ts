import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@shared/interfaces/auth.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(body: Auth): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, body, {
      withCredentials: true,
    });
  }
}
