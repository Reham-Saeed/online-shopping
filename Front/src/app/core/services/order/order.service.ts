import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { IOrder, IOrderRes } from '../../interfaces/iorder';
import { ICart } from '../../interfaces/icart';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = environment.apiUrl + 'order';

  constructor(private _Http: HttpClient) {}

  createOrder() {
    return this._Http.post<any>(this.url, {});
  }

  getUserOrders() {
    return this._Http.get<any>(`${this.url}/my-orders`);
  }

  getAllOrders() {
    return this._Http.get<IOrderRes>(this.url);
  }

  updateOrderStatus(orderId: string, status: string) {
    return this._Http.patch<IOrder>(`${this.url}/${orderId}/status`, { status });
  }
}
