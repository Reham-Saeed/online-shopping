import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ILogin, ILoginRes, ISignup, IUserData, IUserRes} from '../../interfaces/iuser';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrl + 'user';
  private token_key = 'token';

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  signup(data: ISignup) {
    return this._HttpClient.post<IUserRes>(this.url, data);
  }

  login(data: ILogin) {
    return this._HttpClient.post<ILoginRes>(this.url + '/login', data)
      .pipe(
        tap((res) => {
          const token = res.token;
          if (token) {
            this.storeToken(token);
          }
        })
      );
  }

  private storeToken(token: string) {
    localStorage.setItem(this.token_key, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token_key);
  }

  private decodeToken(token: string): IUserData | null {
    try {
      const decode = jwtDecode<IUserData>(token);
      if (!decode) {
        return null;
      }
      if (decode.exp) {
        const expiry = decode.exp * 1000;
        if (expiry > Date.now()) {
          return decode;
        }
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  getUserData(): IUserData | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return this.decodeToken(token);
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getUserData();
  }
}
