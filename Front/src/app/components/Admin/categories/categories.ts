import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../../core/interfaces/icatgory';
import { CategoryService } from '../../../core/services/category/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{
  categories!: ICategory[];
  showModal = false;
  editingCategory: ICategory | null = null;

  constructor(private _CategoryService: CategoryService) {}

  categoryForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    image: new FormControl(null),
  });

  loadCategories() {
    this._CategoryService
      .getCategories()
      .subscribe((res) => (this.categories = res.data));
  }

  ngOnInit() {
    this.loadCategories();
  }

  openModal(category?: ICategory) {
    this.showModal = true;
    if (category) {
      this.editingCategory = category;
      this.categoryForm.patchValue({ title: category.title });
    } else {
      this.editingCategory = null;
      this.categoryForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.categoryForm.patchValue({ image: event.target.files[0] });
    }
  }

  submitForm() {
    const formData = new FormData();
    Object.keys(this.categoryForm.controls).forEach((key) => {
      const value = this.categoryForm.get(key)?.value;
      if (value) formData.append(key, value);
    });

    if (this.editingCategory) {
      this._CategoryService
        .updateCategory(this.editingCategory._id!, formData)
        .subscribe(() => {
          this.loadCategories();
          this.closeModal();
        });
    } else {
      this._CategoryService.addCategory(formData).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  toggleDelete(category: ICategory) {
    this._CategoryService.toggleDelete(category._id!).subscribe((res:any) => {
      category.isDeleted = res.data.isDeleted;
    });
  }
}
