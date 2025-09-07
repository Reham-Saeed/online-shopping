import { Component } from '@angular/core';
import { ArrowRight, Heart, LucideAngularModule, ShoppingBag, Star, TrendingUp } from 'lucide-angular';
import { ProductsList } from '../products/products-list/products-list';
import { Categories } from '../categories-subcategories/categories/categories';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, ProductsList, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  icons = {
    arrow_right: ArrowRight,
    star: Star,
    heart: Heart,
    cart: ShoppingBag,
    trending_up: TrendingUp,
  };
}
