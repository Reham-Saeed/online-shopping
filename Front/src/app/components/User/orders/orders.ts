import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { IOrder } from '../../../core/interfaces/iorder';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders!: IOrder[];

  constructor(private _OrderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this._OrderService.getUserOrders().subscribe((res) => {
      this.orders = res.data;
    });
  }
}
