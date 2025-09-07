import { Component } from '@angular/core';
import { IOrder } from '../../../core/interfaces/iorder';
import { OrderService } from '../../../core/services/order/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  orders!: IOrder[];
  statusOptions!: IOrder['status'][];

  constructor(private orderService: OrderService) {}

  loadOrders() {
    this.orderService.getAllOrders().subscribe((res) => {
      this.orders = res.data;
    });
  }

  ngOnInit() {
    this.loadOrders();
  }

  updateStatus(event: Event, orderId: string) {
    if (!orderId) return;
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as IOrder['status'];

    if (!newStatus) return;

    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex((o) => o._id === orderId);
        if (index !== -1) this.orders[index].status = updatedOrder.status;
      },
      error: (err) => console.error(err),
    });
  }
}
