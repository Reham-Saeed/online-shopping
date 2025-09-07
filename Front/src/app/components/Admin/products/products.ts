import { Component } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../../core/services/product/product.service';
import { CommonModule, NgClass } from '@angular/common';
import { CategoryService } from '../../../core/services/category/category.service';
import { SubcategoryService } from '../../../core/services/subcategory/subcategory.service';
import { ISubcategory } from '../../../core/interfaces/isubcatgory';
import { ICategory } from '../../../core/interfaces/icatgory';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products!: IProduct[];
  categories!: ICategory[];
  subcategories!: ISubcategory[];
  showModal = false;
  editingProduct!: IProduct | null;

  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _SubcategoryService: SubcategoryService
  ) {}

  productForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    category: new FormControl(''),
    subcategory: new FormControl(''),
    image: new FormControl(null),
    route: new FormControl(''),
  });


  
  loadProducts() {
    this._ProductService.getProducts().subscribe((res) => (this.products = res.data));
  }
  
  loadCategories() {
    this._CategoryService.getCategories().subscribe((res) => (this.categories = res.data));
  }
  
  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }
  
  loadSubcategories(categoryId: string) {
    this._SubcategoryService.getSubcategories(categoryId).subscribe((res) => (this.subcategories = res.data));
  }

  openModal(product?: IProduct) {
    this.showModal = true;
    if (product) {
      this.editingProduct = product;
      this.productForm.patchValue({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category._id,
        subcategory: product.subcategory._id,
        route: product.route,
      });
      this.loadSubcategories(product.category._id);
    } else {
      this.editingProduct = null;
      this.productForm.reset();
      this.subcategories = [];
    }
  }

  closeModal() {
    this.showModal = false;
    this.editingProduct = null;
    this.productForm.reset();
    this.subcategories = [];
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({ image: file });
    }
  }
  onCategoryChange(event: Event) {
    const categoryId = (event.target as HTMLSelectElement).value;
    if (!categoryId) return;
    this.productForm.patchValue({ subcategory: '' });
    this.loadSubcategories(categoryId);
  }

  submitForm() {
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach((key) => {
      const value = this.productForm.get(key)?.value;
      if (value) formData.append(key, value);
    });

    if (this.editingProduct) {
      this._ProductService
        .updateProduct(this.editingProduct._id, formData)
        .subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
    } else {
      this._ProductService.addProduct(formData).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }
  toggleDelete(product: any) {
    this._ProductService.toggleDelete(product._id).subscribe({
      next: (res: any) => {
        product.isDeleted = res.data.isDeleted;
      },
    });
  }
}
