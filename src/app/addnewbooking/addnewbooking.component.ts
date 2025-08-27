
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-addnewbooking',
  templateUrl: './addnewbooking.component.html',
  styleUrls: ['./addnewbooking.component.css']
})
export class AddnewbookingComponent implements OnInit {
  @Input() formData: any;
  @Output() onAddUser = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  form: any = {};

  constructor() {}
  ngOnInit(): void {
  if (this.formData) {
    this.form = { ...this.formData };
    if (this.form.bookingDate) {
      const date = new Date(this.form.bookingDate);
      this.form.bookingDate = date.toISOString().split('T')[0];
    }
  }
}
  submitForm() {
    if (this.form.name && this.form.email && this.form.phone) {
      this.onAddUser.emit(this.form);
      this.form = {};
    } else {
      alert('Please fill all required fields.');
    }
  }
  cancel() {
    this.onCancel.emit();
  }
}
