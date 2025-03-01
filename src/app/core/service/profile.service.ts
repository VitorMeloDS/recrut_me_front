import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '@shared/interfaces/profile.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  finAll(): Observable<Profile[]> {
    return this.http.get<{ data: Profile[] }>(`${this.apiUrl}/profile`).pipe(
      map((response) => response.data),
      catchError(() => of([]))
    );
  }

  find(id: number | string): Observable<Profile | null> {
    return this.http
      .get<{ data: Profile }>(`${this.apiUrl}/profile/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(() => of(null))
      );
  }

  create(body: any): Observable<Profile | null> {
    return this.http.post<any>(`${this.apiUrl}/profile/`, body).pipe(
      map((response) => response?.data),
      catchError(() => of(null))
    );
  }

  update(id: any, body: any): Observable<Profile | null> {
    return this.http.put<any>(`${this.apiUrl}/profile/${id}`, body).pipe(
      map((response) => response?.data),
      catchError(() => of(null))
    );
  }

  delete(id: any): Observable<string> {
    return this.http.delete<any>(`${this.apiUrl}/profile/${id}`).pipe(
      map((response) => response?.data),
      catchError(() => of('Erro ao deletar perfil.'))
    );
  }
}
