import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import {
  ICartItem,
  ICartRes,
  IValidateCartRes,
} from '../../interfaces/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = environment.apiUrl + 'cart';

  constructor(private _Http: HttpClient) {}

  getCart() {
    return this._Http.get<ICartRes>(this.url);
  }

  addToCart(productId: string, quantity: number) {
    return this._Http.post<ICartRes>(this.url, { productId, quantity });
  }

  updateQuantity(productId: string, quantity: number) {
    return this._Http.patch<ICartRes>(this.url + `/${productId}`, { quantity });
  }

  removeFromCart(productId: string) {
    return this._Http.delete<ICartRes>(this.url + `/${productId}`);
  }

  clearCart() {
    return this._Http.delete<ICartRes>(this.url);
  }

  validateCart() {
    return this._Http.get<IValidateCartRes>(this.url + '/validate');
  }

  updateCartPrice(productId: string, acceptNewPrice: boolean) {
    return this._Http.patch<ICartRes>(`${this.url}/update-price`, { productId, acceptNewPrice });
  }

  updateCartStock(productId: string, acceptAvailableStock: boolean) {
    return this._Http.patch<ICartRes>(`${this.url}/update-stock`,{ productId, acceptAvailableStock });
  }
}
