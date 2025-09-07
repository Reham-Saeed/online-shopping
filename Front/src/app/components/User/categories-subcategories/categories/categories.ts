import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryCard } from '../category-card/category-card';
import { ICategory } from '../../../../core/interfaces/icatgory';
import { CategoryService } from '../../../../core/services/category/category.service';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, CommonModule, CategoryCard],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit{
  categories!: ICategory[];

  constructor(
    private _CategoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this._CategoryService.getCategories().subscribe((res) => {
      this.categories = res.data;
      console.log(this.categories);
    });
  }
}
