import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

	loading = false;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private authService: AuthService,
  ) {
    this.createLoginForm()
  }

  ngOnInit() {}
  onLogin() {
    console.log("lofdsdasdsad")
    const controls = this.loginForm.controls;
		// if (this.loginForm.invalid) {
		// 	Object.keys(controls).forEach(controlName =>
		// 		controls[controlName].markAsTouched()
		// 	);
		// 	return;
		// }
    let	email = controls['email'].value;
    let	password= controls['password'].value;
    this.authService.login(email, password);
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
			])],
			password: ['', Validators.compose([
				Validators.required,
			])]
		});
  }
}
