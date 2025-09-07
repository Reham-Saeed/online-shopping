import { Component, OnInit } from '@angular/core';
import { ICart } from '../../../core/interfaces/icart';
import { CartService } from '../../../core/services/cart/cart.service';
import { UserService } from '../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order/order.service';
import { IUser } from '../../../core/interfaces/iuser';

@Component({
  selector: 'app-order-confirm',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-confirm.html',
  styleUrl: './order-confirm.css',
})
export class OrderConfirm implements OnInit {
  user!: IUser;
  cart!: ICart;
  editingUser = false;

  constructor(
    private _CartService: CartService,
    private _UserService: UserService,
    private _OrderService: OrderService
  ) {}

  loadUser() {
    this._UserService.getCurrentUser().subscribe((res) => {
      this.user = res.data;
    });
  }

  loadCart() {
    this._CartService.getCart().subscribe((res) => {
      this.cart = res.data;
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadCart();
  }

  toggleEditUser() {
    this.editingUser = !this.editingUser;
  }

  saveUserChanges() {
    const updatedData = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
    };

    this._UserService.updateCurrentUser(updatedData).subscribe((res) => {
      this.user = res.data;
      this.editingUser = false;
    });
  }

  confirmOrder() {
    this._OrderService.createOrder().subscribe((res) => console.log(res));
  }
}
