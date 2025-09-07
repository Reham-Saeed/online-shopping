import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ICategory } from '../../interfaces/icatgory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = environment.apiUrl + 'category';

  constructor(private _Http: HttpClient) {}

  getCategories() {
    return this._Http.get<any>(this.url);
  }

  getCategoryByTitle(title: string) {
    return this._Http.get<any>(this.url + `/${title}/subcategories`);
  }

  addCategory(data: FormData) {
    return this._Http.post<ICategory>(this.url, data);
  }

  updateCategory(title: string, data: FormData) {
    return this._Http.put<ICategory>(`${this.url}/${title}`, data);
  }

  toggleDelete(id: string) {
    return this._Http.patch(`${this.url}/${id}`, {});
  }
}
