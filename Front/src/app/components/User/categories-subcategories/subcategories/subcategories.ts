import { Component, signal } from '@angular/core';
import { CategoryCard } from '../category-card/category-card';
import { CommonModule } from '@angular/common';
import { ISubcategory } from '../../../../core/interfaces/isubcatgory';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../../../core/services/category/category.service';

@Component({
  selector: 'app-subcategories',
  imports: [CategoryCard, CommonModule,RouterLink],
  templateUrl: './subcategories.html',
  styleUrl: './subcategories.css',
})
export class Subcategories {
  subcategories!: ISubcategory[];

  constructor(
    private _CategoryService: CategoryService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let title: string | null = '';
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        title = param.get('title');
      },
    });
    this._CategoryService
      .getCategoryByTitle(title)
      .subscribe((res) => (this.subcategories=res.subcategories
      ));
  }
}
