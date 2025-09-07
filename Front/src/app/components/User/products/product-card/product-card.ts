import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Heart, Star, ShoppingBag } from 'lucide-angular';
import { IProduct } from '../../../../core/interfaces/iproduct';
import { environment } from '../../../../environment/environment';
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, LucideAngularModule, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: IProduct;
  staticURL = environment.uploadsURL;
  
  constructor(private _CartService: CartService) {}

  addToCart(productId: string, quantity: number) {
    this._CartService.addToCart(productId,quantity).subscribe((res)=>console.log(res)
    )
  }

  icons = { heart: Heart, star: Star, cart: ShoppingBag };
}
