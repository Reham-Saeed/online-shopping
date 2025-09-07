import { Component } from '@angular/core';
import { UserNavbar } from "../../../components/User/user-navbar/user-navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user.layout',
  imports: [UserNavbar, RouterOutlet],
  templateUrl: './user.layout.html',
  styleUrl: './user.layout.css'
})
export class UserLayout {

}
