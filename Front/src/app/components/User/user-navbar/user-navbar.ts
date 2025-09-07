import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  ClosedCaptionIcon,
  LucideAngularModule,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-user-navbar',
  imports: [CommonModule, NgClass, RouterLink, LucideAngularModule],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbar {
  readonly SearchIcon = SearchIcon;
  readonly UserIcon = UserIcon;
  readonly CartIcon = ShoppingBagIcon;
  readonly MenuIcon = MenuIcon;
  readonly CloseIcon = ClosedCaptionIcon;
  isMenuOpen = false;

  constructor(public router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isActive(path: string) {
    return this.router.url === path;
  }
}
