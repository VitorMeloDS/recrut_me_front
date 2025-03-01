import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invite } from '@shared/interfaces/invite.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(`${this.apiUrl}/`);
  }

  createInvite(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/invite`, { email });
  }
}
