import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor(private _AuthService: AuthService) {}

  signupForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),

    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
      ),
    ]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),

    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  submit() {
    this._AuthService
      .signup(this.signupForm.value)
      .subscribe((res) => console.log(res));
  }
}
