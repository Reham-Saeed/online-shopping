import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ITestimonial, ITestimonialRes } from '../../interfaces/itestemonial';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  private url = environment.apiUrl + 'testimonial';

  constructor(private _Http: HttpClient) {}

  getApprovedTest() {
    return this._Http.get<ITestimonialRes>(this.url);
  }

  addTestimonial(userTestimonial: ITestimonial) {
    return this._Http.post<any>(this.url, userTestimonial);
  }

  getPendingTest(){
    return this._Http.get<ITestimonialRes>(`${this.url}/admin`);
  }

  updateStatus(id: string, status: string){
    return this._Http.put<ITestimonial>(`${this.url}/admin/${id}`, { status });
  }
}
