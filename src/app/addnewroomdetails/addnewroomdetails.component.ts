// import { Component, EventEmitter, Output } from '@angular/core';
// import { Hotel } from '../shared/hotel.model';        
// import { HotelService } from '../shared/hotel.service';

// @Component({
//   selector: 'app-addnewroomdetails',
//   templateUrl: './addnewroomdetails.component.html',
//   styleUrls: ['./addnewroomdetails.component.css']
// })
// export class AddnewroomdetailsComponent {
  
//   @Output() hotelAdded = new EventEmitter<Hotel>();
//   @Output() cancelForm = new EventEmitter<void>();

//   hotelName = '';
//   location = '';
//   amount = 0;
//   currency = '';
//   rating = 0;
//   reviewCount = 0;
//   imageInput = '';
//   roomDescription = '';
//   bhk2 = false;
//   bhk3 = false;
//   ac = false;
//   nonAc = false;

//   constructor(private svc: HotelService) {}

//   onSubmit() {
//     const urls = this.imageInput.split(',')
//       .map(url => url.trim())
//       .filter(url => url && (url.startsWith('http') || url.startsWith('/assets')));

//     const newHotel: Hotel = {
//       hotelName: this.hotelName,
//       location: this.location,
//       amount: this.amount,
//       currency: this.currency,
//       rating: this.rating,
//       reviewCount: this.reviewCount,
//       imageUrls: urls,
//       roomDescription: this.roomDescription,
//       bhk2: this.bhk2,
//       bhk3: this.bhk3,
//       ac: this.ac,
//       nonAc: this.nonAc
//     };

//     this.svc.addHotel(newHotel).subscribe({
//       next: (savedHotel) => {
//         alert('Hotel added successfully');
//         this.hotelAdded.emit(savedHotel);
//         this.resetForm();
//       },
//       error: (e) => alert('Error: ' + e.message)
//     });
//   }

//   resetForm() {
//     this.hotelName = '';
//     this.location = '';
//     this.amount = 0;
//     this.currency = '';
//     this.rating = 0;
//     this.reviewCount = 0;
//     this.imageInput = '';
//     this.roomDescription = '';
//     this.bhk2 = false;
//     this.bhk3 = false;
//     this.ac = false;
//     this.nonAc = false;
//   }

//   cancel() {
//     this.cancelForm.emit();
//   }
// }





import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Hotel } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';

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

