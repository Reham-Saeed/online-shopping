import { Routes } from '@angular/router';
import { UserLayout } from './core/layouts/user.layout/user.layout';
import { AdminLayout } from './core/layouts/admin.layout/admin.layout';
import { isLoggedInGuard } from './core/guards/is-logged-in-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/User/home/home').then((m) => m.Home),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/User/products/products-list/products-list').then(
            (m) => m.ProductsList
          ),
      },
      {
        path: 'products/:route',
        loadComponent: () =>
          import(
            './components/User/products/product-details/product-details'
          ).then((m) => m.ProductDetails),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import(
            './components/User/categories-subcategories/categories/categories'
          ).then((m) => m.Categories),
      },
      {
        path: 'subcategories',
        loadComponent: () =>
          import(
            './components/User/categories-subcategories/subcategories/subcategories'
          ).then((m) => m.Subcategories),
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./components/User/testimonials/testimonials').then(
            (m) => m.Testimonials
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/User/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/User/signup/signup').then((m) => m.Signup),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/User/login/login').then((m) => m.Login),
      },
      {
        path: 'orders',
        canMatch: [isLoggedInGuard],
        loadComponent: () =>
          import('./components/User/orders/orders').then((m) => m.Orders),
      },
      {
        path: 'order-confirm',
        canMatch: [isLoggedInGuard],
        loadComponent: () =>
          import('./components/User/order-confirm/order-confirm').then(
            (m) => m.OrderConfirm
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminLayout,
    canMatch: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/Admin/products/products').then(
            (m) => m.Products
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/Admin/categories/categories').then(
            (m) => m.Categories
          ),
      },
      {
        path: 'subcategories',
        loadComponent: () =>
          import('./components/Admin/subcategories/subcategories').then(
            (m) => m.Subcategories
          ),
      },
      {
        path: 'testimonials',
        loadComponent: () =>
          import('./components/Admin/testimonials/testimonials').then(
            (m) => m.Testimonials
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./components/Admin/orders/orders').then((m) => m.Orders),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/User/login/login').then((m) => m.Login),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./components/User/signup/signup').then((m) => m.Signup),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
