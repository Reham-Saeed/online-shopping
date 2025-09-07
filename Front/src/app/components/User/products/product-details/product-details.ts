import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../core/services/product/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { IProduct } from '../../../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit{
  product!: IProduct;
  quantity = signal(1);

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService
  ) {}

  increaseQty() {
    this.quantity.set(this.quantity() + 1);
  }

  decreaseQty() {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  addToCart(productId: string) {
    const qty = this.quantity();

    this._CartService.addToCart(productId, qty).subscribe((res) => {
      console.log('Added to cart:', res);
    });
  }

  ngOnInit(): void {
    let route: string | null = '';
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        route = param.get('route');
      },
    });
    this._ProductService.getProductDetails(route).subscribe((res) => {
      this.product = res.data;
    });
  }
}
