import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoomTypeService } from '../services/room-type.service';
import { CategoryStatusService } from '../services/category-status.service'; // ✅ Import service

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
  acTypeVisible = true;
  roomVarietyVisible = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private rt: RoomTypeService,
    private catStatusSvc: CategoryStatusService 
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

  ngOnInit(): void {
    this.rt.isEnabled$.subscribe(enabled => {
      this.showRoomVariety = enabled;
      const rv = this.bookingForm.get('roomVariety');
      if (enabled) {
        rv?.enable();
      } else {
        rv?.disable();
        rv?.setValue('');
      }
    });

    this.rt.selectedRoomType$.subscribe(type => {
      this.bookingForm.get('roomVariety')?.setValue(type);
    });

    this.catStatusSvc.getStatusByName('AC').subscribe(s => {
      this.acTypeVisible = s.enabled;
      const ac = this.bookingForm.get('acType');
      if (s.enabled) ac?.enable();
      else {
        ac?.disable();
        ac?.setValue('');
      }
    });

    this.catStatusSvc.getStatusByName('RoomVariety').subscribe(s => {
      this.roomVarietyVisible = s.enabled;
      const rv = this.bookingForm.get('roomVariety');
      if (s.enabled) rv?.enable();
      else {
        rv?.disable();
        rv?.setValue('');
      }
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.acTypeVisible) {
      this.bookingForm.get('acType')?.setValue('');
    }
    if (!this.roomVarietyVisible) {
      this.bookingForm.get('roomVariety')?.setValue('');
    }

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
