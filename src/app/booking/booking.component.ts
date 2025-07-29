
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoomTypeService } from '../services/room-type.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  submitted = false;
  msg = '';
 showRoomVariety = true;

  acEnabled = true;
  nonAcEnabled = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
     private rt: RoomTypeService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      acType: ['', Validators.required],
      bedType: ['', Validators.required],
      bookingDate: ['', Validators.required],
      accommodation: ['', Validators.required],
      paymentMode: ['', Validators.required],
      packageType: ['', Validators.required],
      userType: ['', Validators.required],
      roomVariety: ['', Validators.required] 
    });
  }

  ngOnInit() {
   
     this.rt.isEnabled$.subscribe(enabled => {
      this.showRoomVariety = enabled;
      const ctl = this.bookingForm.get('roomVariety');
     if (enabled) 
        ctl?.enable();
      else {
        ctl?.disable();
        ctl?.setValue('');
      }
    });
    this.rt.selectedRoomType$.subscribe(type => {
      this.bookingForm.get('roomVariety')?.setValue(type);
    });

  }

  get f() {
    return this.bookingForm.controls;
  }
  onSubmit() {
  this.submitted = true;

  if (this.bookingForm.invalid) {
    console.warn('Form is invalid', this.bookingForm.value);
    return;
  }

  console.log('Form submitted', this.bookingForm.value);
  this.http.post('http://localhost:3000/api/roombookings', this.bookingForm.value).subscribe({
    next: () => {
      this.msg = 'Room Booked Successfully!';
      setTimeout(() => {
        this.router.navigate(['/main']); 
      }, 1500); 
    },
    error: () => {
      this.msg = 'Error during booking';
    }
  });
}

}
