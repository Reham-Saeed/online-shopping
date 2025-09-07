import { Component } from '@angular/core';
import { ISubcategory } from '../../../core/interfaces/isubcatgory';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../../core/interfaces/icatgory';
import { CategoryService } from '../../../core/services/category/category.service';
import { SubcategoryService } from '../../../core/services/subcategory/subcategory.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-subcategories',
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './subcategories.html',
  styleUrl: './subcategories.css',
})
export class Subcategories {
  subcategories!: ISubcategory[];
  categories!: ICategory[];
  showModal = false;
  editingSubcategory!: ISubcategory | null;

  constructor(
    private _SubcategoryService: SubcategoryService,
    private _CategoryService: CategoryService
  ) {}

  subcategoryForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    route: new FormControl(''),
    image: new FormControl(null),
  });

  loadSubcategories() {
    this._SubcategoryService.getSubcategories().subscribe((res) => {
      this.subcategories = res.data;
    });
  }

  loadCategories() {
    this._CategoryService.getCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }

  ngOnInit() {
    this.loadSubcategories();
    this.loadCategories();
  }
  
  openModal(subcategory?: ISubcategory) {
    this.showModal = true;
    if (subcategory) {
      this.editingSubcategory = subcategory;
      this.subcategoryForm.patchValue({
        title: subcategory.title,
        category: subcategory.category._id,
        route: subcategory.route,
      });
    } else {
      this.editingSubcategory = null;
      this.subcategoryForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
    this.editingSubcategory = null;
    this.subcategoryForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.subcategoryForm.patchValue({ image: file });
    }
  }

  submitForm() {
    const formData = new FormData();
    Object.keys(this.subcategoryForm.controls).forEach((key) => {
      const value = this.subcategoryForm.get(key)?.value;
      if (value) formData.append(key, value);
    });

    if (this.editingSubcategory) {
      this._SubcategoryService
        .updateSubcategory(this.editingSubcategory._id, formData)
        .subscribe(() => {
          this.loadSubcategories();
          this.closeModal();
        });
    } else {
      this._SubcategoryService.addSubcategory(formData).subscribe(() => {
        this.loadSubcategories();
        this.closeModal();
      });
    }
  }

  toggleDelete(subcategory: ISubcategory) {
    this._SubcategoryService.toggleDelete(subcategory._id).subscribe({
      next: (res: any) => {
        subcategory.isDeleted = res.data.isDeleted;
      },
    });
  }
}
