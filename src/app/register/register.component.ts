import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  responseMsg = '';
  countries = ['India', 'USA', 'UK', 'CANADA','JAPAN','UK',];
  states = ['Gujarat', 'Maharashtra', 'Texas', 'Tamil Nadu',''];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  get f() {
    return this.registerForm.controls;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const match = formGroup.controls[matchingControlName];
      if (match.errors && !match.errors['mustMatch']) return;
      if (control.value !== match.value) {
        match.setErrors({ mustMatch: true });
      } else {
        match.setErrors(null);
      }
    };
  }
  onSubmit(): void {
  this.submitted = true;
  if (this.registerForm.invalid) return;


  const user = {
    email: this.registerForm.value.email,
    password: this.registerForm.value.password
  };

  localStorage.setItem('registeredUser', JSON.stringify(user));


  this.responseMsg = 'Registration successful!';
  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1500);
}

}
