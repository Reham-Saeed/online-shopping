import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ISubcategory, ISubcategoryRes } from '../../interfaces/isubcatgory';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
 private url = environment.apiUrl + 'subcategory';

  constructor(private _Http: HttpClient) {}
  
  getSubcategories(categoryId?: string) {
    let url = this.url;
    if (categoryId) url += `?category=${categoryId}`;
    return this._Http.get<ISubcategoryRes>(url);
  }

  addSubcategory(data: FormData) {
    return this._Http.post<ISubcategory>(this.url, data);
  }

  updateSubcategory(id: string, data: FormData) {
    return this._Http.put<ISubcategory>(`${this.url}/${id}`, data);
  }

  toggleDelete(id: string) {
    return this._Http.patch(`${this.url}/${id}`, {});
  }
}
