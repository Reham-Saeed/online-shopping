import { Component } from '@angular/core';
import { ITestimonial } from '../../../core/interfaces/itestemonial';
import { TestimonialService } from '../../../core/services/testimonial/testimonial.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
  testimonials!: ITestimonial[];
  statusOptions!: ITestimonial['status'][];

  constructor(private testimonialService: TestimonialService) {}

  loadPendingTestimonials() {
    this.testimonialService.getPendingTest().subscribe((res) => {
      this.testimonials = Array.isArray(res.data) ? res.data : [];
    });
  }
  
  ngOnInit() {
    this.loadPendingTestimonials();
  }

  updateStatus(event: Event, testimonialId: string | undefined) {
    if (!testimonialId) return;

    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as ITestimonial['status'];
    if (!newStatus) return;

    this.testimonialService
      .updateStatus(testimonialId, newStatus)
      .subscribe((updatedTestimonial) => {
        const index = this.testimonials.findIndex(
          (t) => t._id === testimonialId
        );
        if (index !== -1)
          this.testimonials[index].status = updatedTestimonial.status;
      });
  }
}
