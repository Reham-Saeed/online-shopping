import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl + 'user';

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return this.http.get<any>(`${this.url}/me`);
  }

  updateCurrentUser(data: any) {
    return this.http.put<any>(`${this.url}/me`, data);
  }
}
