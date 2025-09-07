import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { IProduct, IProductRes, IProductsRes } from '../../interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl + 'product';

  constructor(private _Http: HttpClient) {}

  getProducts(params?: any) {
    return this._Http.get<IProductsRes>(this.url, { params });
  }

  getProductDetails(route: string) {
    return this._Http.get<IProductRes>(this.url + `/${route}`);
  }

  addProduct(data: FormData) {
    return this._Http.post<IProduct>(this.url, data);
  }

  updateProduct(productId: string, data: FormData) {
    return this._Http.put<IProduct>(`${this.url}/${productId}`, data);
  }

  toggleDelete(productId: string) {
    return this._Http.patch(`${this.url}/${productId}`, {});
  }
}
