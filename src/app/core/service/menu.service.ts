import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '@shared/interfaces/profile.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  finAll(): Observable<Menu[]> {
    return this.http.get<{ data: Menu[] }>(`${this.apiUrl}/menu`).pipe(
      map((response) => response.data),
      catchError(() => of([]))
    );
  }
}
