import { Component, OnInit } from '@angular/core';
import { ICart, ICartChange, ICartRes } from '../../../core/interfaces/icart';
import { CartService } from '../../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart!: ICart;
  changes!: ICartChange[];

  constructor(private _CartService: CartService, private _Router: Router) {}

  loadCart() {
    this._CartService.getCart().subscribe((res: ICartRes) => {
      this.cart = res.data;
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    this._CartService
      .updateQuantity(productId, quantity)
      .subscribe(() => this.loadCart());
  }

  removeItem(productId: string) {
    this._CartService
      .removeFromCart(productId)
      .subscribe(() => this.loadCart());
  }

  clearCart() {
    this._CartService.clearCart().subscribe(() => this.loadCart());
  }

  placeOrder() {
    this.validateCart();
  }

  validateCart() {
    this._CartService.validateCart().subscribe((res) => {
      if (res.hasChanges) {
        this.changes = res.changes || [];
        this.cart.items = this.cart.items.filter(
          (item) => !this.changes.find((c) => c.product === item.product._id)
        );
      } else {
        this._Router.navigate(['/order-confirm']);
      }
    });
  }

  acceptChange(change: ICartChange) {
    if (change.type === 'priceChanged') {
      this._CartService.updateCartPrice(change.product, true).subscribe(() => {
        this.changes = this.changes.filter((c) => c.product !== change.product);
        this.loadCart();
      });
    } else if (change.type === 'stockChanged') {
      this._CartService.updateCartStock(change.product, true).subscribe(() => {
        this.changes = this.changes.filter((c) => c.product !== change.product);
        this.loadCart();
      });
    } else if (change.type === 'outOfStock') {
      this.rejectChange(change);
    }
  }

  rejectChange(change: ICartChange) {
    this._CartService.removeFromCart(change.product).subscribe(() => {
      this.changes = this.changes.filter((c) => c.product !== change.product);
      this.loadCart();
    });
  }
}
