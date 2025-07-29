// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   submitted = false;
//   loginMsg = '';

//   constructor(private fb: FormBuilder,private router:Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   get f(): { [key: string]: AbstractControl } {
//     return this.loginForm.controls;
//   }

//   onLogin(): void {
//   this.submitted = true;
//   this.loginMsg = '';

//   if (this.loginForm.invalid) return;

//   const enteredData = this.loginForm.value;
//   const savedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');

//   if (enteredData.email === savedUser.email && enteredData.password === savedUser.password) {
//     this.loginMsg = 'Login successful!';
    
//     setTimeout(() => {
//       this.router.navigate(['/booking']);
//     }, 1500);
//   } else {
//     this.loginMsg = 'try again.';
//   }
// }



// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    this.loginMsg = '';

    if (this.loginForm.invalid) return;

    const enteredData = this.loginForm.value;

    // Enforce Gmail only
    if (!enteredData.email.endsWith('@gmail.com')) {
      this.loginMsg = 'Please use a valid Gmail address.';
      return;
    }

    // Get saved user from localStorage
    const savedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');

    // Check if savedUser exists and matches entered email and password
    if (
      savedUser.email === enteredData.email &&
      savedUser.password === enteredData.password
    ) {
      this.loginMsg = 'Login successful!';

      setTimeout(() => {
        this.router.navigate(['/booking']);
      }, 1500);
    } else {
      this.loginMsg = ' Try again.';
    }
  }
}












// onLogin(): void {
//   this.submitted = true;
//   this.loginMsg = '';

//   if (this.loginForm.invalid) return;

//   const enteredData = this.loginForm.value;
//   const savedUser = JSON.parse(localStorage.getItem('registeredUser') || '{}');

//   if (enteredData.email === savedUser.email && enteredData.password === savedUser.password) {
//     this.loginMsg = 'Login successful!';

//     setTimeout(() => {
//       this.router.navigate(['/booking']);  // <-- Navigation here
//     }, 1500);
//   } else {
//     this.loginMsg = 'Invalid credentials.';
//   }
// }