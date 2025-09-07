import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges , ViewChild} from '@angular/core';
import { Hotel } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addnewroomdetails',
  templateUrl: './addnewroomdetails.component.html',
  styleUrls: ['./addnewroomdetails.component.css']
})
export class AddnewroomdetailsComponent implements OnChanges {
  @Input() hotel: Hotel | null = null;
  @Output() hotelAdded = new EventEmitter<Hotel>();
  @Output() hotelUpdated = new EventEmitter<Hotel>();
  @Output() cancelForm = new EventEmitter<void>();



  @ViewChild('hotelForm') hotelForm!: NgForm;




  hotelName = '';
  location = '';
  amount!: number;
  currency = '';
  rating = 0;
  reviewCount = 0;
  imageInput = '';
  roomDescription = '';
  bhk2 = false;
  bhk3 = false;
  ac = false;
  nonAc = false;
  showBhkError = false;
  showAcError = false;
  constructor(private svc: HotelService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hotel'] && this.hotel) {
      this.prefillForm(this.hotel);
    }
  }

  prefillForm(h: Hotel) {
    this.hotelName = h.hotelName;
    this.location = h.location;
    this.amount = h.amount;
    this.currency = h.currency;
    this.rating = h.rating;
    this.reviewCount = h.reviewCount;
    this.imageInput = (h.imageUrls || []).join(', ');
    this.roomDescription = h.roomDescription;
    this.bhk2 = !!h.bhk2;
    this.bhk3 = !!h.bhk3;
    this.ac = !!h.ac;
    this.nonAc = !!h.nonAc;
  }

  onSubmit() {

      // Mark all fields as touched to trigger validation
    this.hotelForm.control.markAllAsTouched();

    // Custom validations
    this.showBhkError = !(this.bhk2 || this.bhk3);
    this.showAcError = !(this.ac || this.nonAc);

    if (this.hotelForm.invalid || this.showBhkError || this.showAcError) {
      alert('Please fill all required fields correctly.');
      return;
    }
     const form = document.querySelector('form') as HTMLFormElement;
       if (this.hotelForm.invalid) {
      this.hotelForm.control.markAllAsTouched(); // Mark all fields touched
      alert('Please fill in all required fields.');
      return;
    }
  
  if (!form.checkValidity()) {
    const elements = form.querySelectorAll('.form-control');
    elements.forEach(el => el.classList.add('was-validated'));
    alert('Please fill in all required fields correctly.');
    return;
  }
    const urls = this.imageInput.split(',').map(s => s.trim()).filter(Boolean);
    const h: Hotel = {
      _id: this.hotel?._id,
      hotelName: this.hotelName,
      location: this.location,
      amount: this.amount,
      currency: this.currency,
      rating: this.rating,
      reviewCount: this.reviewCount,
      imageUrls: urls,
      roomDescription: this.roomDescription,
      bhk2: this.bhk2,
      bhk3: this.bhk3,
      ac: this.ac,
      nonAc: this.nonAc
    };

    if (this.hotel?._id) {
      this.svc.updateHotel(this.hotel._id, h).subscribe({
        next: updated => {
          alert('Hotel updated');
          this.hotelUpdated.emit(updated);
        },
        error: err => alert('Update failed: ' + err.message)
      });
    } else {
      this.svc.addHotel(h).subscribe({
        next: saved => {
          alert('Hotel added');
          this.hotelAdded.emit(saved);
        },
        error: err => alert('Add failed: ' + err.message)
      });
    }
  }

  cancel() {
    this.cancelForm.emit();
  }
}

