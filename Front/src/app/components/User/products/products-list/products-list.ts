import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../core/services/category/category.service';
import { SubcategoryService } from '../../../../core/services/subcategory/subcategory.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-list',
  imports: [ProductCard, CommonModule, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  products!: any[];
  categories!: any[];
  subcategories!: any[];
  searchTerm!: string;
  selectedCategory!: string;
  selectedSubcategory!: string;
  sortBy!: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {}

  loadProducts() {
    const params: any = {};
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedSubcategory) params.subcategory = this.selectedSubcategory;
    if (this.sortBy) {
      params.sort =
        this.sortBy === 'price-low'
          ? 'asc'
          : this.sortBy === 'price-high'
          ? 'desc'
          : '';
    }

    this.productService.getProducts(params).subscribe((res) => {
      this.products = res.data;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
    this.selectedSubcategory = '';

    this.subcategoryService
      .getSubcategories(categoryId)
      .subscribe((res) => {
        this.subcategories = res.data;
      });

    this.loadProducts();
  }

  onSubcategoryChange(subRoute: string) {
    this.selectedSubcategory = subRoute;
    this.loadProducts();
  }

  onSearchChange(term: string) {
    this.searchTerm = term;
    this.loadProducts();
  }

  onSortChange(sort: string) {
    this.sortBy = sort;
    this.loadProducts();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedSubcategory = '';
    this.sortBy = '';
    this.loadProducts();
  }
}
