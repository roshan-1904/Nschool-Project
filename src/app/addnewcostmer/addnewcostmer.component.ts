import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-addnewcostmer',
  templateUrl: './addnewcostmer.component.html',
  styleUrls: ['./addnewcostmer.component.css']
})
export class AddnewcostmerComponent implements OnInit {
  
  @Input() newUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: ''
  };

  @Output() onAddUser = new EventEmitter<any>();
   showErrors: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  submitUser(): void {
    this.showErrors = true;

    if (
      !this.newUser.firstName.trim() ||
      !this.newUser.lastName.trim() ||
      !this.validateEmail(this.newUser.email) ||
      !this.validatePhone(this.newUser.phone) ||
      !this.newUser.state.trim() ||
      !this.newUser.country.trim()
    ) {
      return; 
    }
       const userWithDate = {
      ...this.newUser,
      date: new Date()
    };
       this.onAddUser.emit(userWithDate);
  }
     validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
    validatePhone(phone: string): boolean {
    return /^\d{10,15}$/.test(phone);
  }
}
