import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../core/services/testimonial/testimonial.service';
import { ITestimonial } from '../../../core/interfaces/itestemonial';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, NgClass, ReactiveFormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {
  testimonials!: ITestimonial[];
  showForm: boolean = false;

  constructor(private _TestimonialService: TestimonialService) {}

  reviewForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    rating: new FormControl(null, Validators.required),
  });

  toggleForm() {
    this.showForm = !this.showForm;
  }

  ngOnInit(): void {
    this._TestimonialService.getApprovedTest().subscribe((res) => {
      this.testimonials = res.data;
    });
  }

  submitReview() {
    this._TestimonialService
      .addTestimonial(this.reviewForm.value)
      .subscribe((res) => {
        this.reviewForm.reset();
        this.showForm = false;
      });
  }
}
