


// import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Hotel } from '../shared/model';

// @Component({
//   selector: 'app-addnewmanage',
//   templateUrl: './addnewmanage.component.html',
//   styleUrls: ['./addnewmanage.component.css']
// })
// export class AddnewmanageComponent implements OnInit {

//   hotelForm!: FormGroup;
//   isEditMode: boolean = false;

//  @Input() editHotel: Hotel | null = null;
//   @Output() saveAdded = new EventEmitter<void>();
//   @Output() closePanel = new EventEmitter<void>();

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.initForm();
//      if (this.editHotel) {
//       this.isEditMode = true;
//       this.hotelForm.patchValue(this.editHotel);
//     }
//   }

//   initForm(): void {
//     this.hotelForm = this.fb.group({
//       hotelName: ['', [Validators.required, Validators.minLength(3)]],
//       location: ['', Validators.required],
//       amount: [0, [Validators.required, Validators.min(1)]],
//       currency: ['€', Validators.required],
//       rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
//       reviewCount: [0, [Validators.required, Validators.min(0)]],
//       roomDescription: ['', Validators.required],
//       imageUrls: ['', Validators.required] // could add custom URL validator
//     });
//   }

//   onSubmit(): void {
//     if (this.hotelForm.invalid) {
//       this.hotelForm.markAllAsTouched(); 
//       return;
//     }
//      const hotelData: Hotel = { ...this.editHotel, ...this.hotelForm.value };
//     this.saveHotel.emit(hotelData);
//     this.closePanel.emit();
//     this.isEditMode = false

//   }

//   resetForm(): void {
//     this.hotelForm.reset();
//     this.hotelForm.patchValue({ currency: '€', rating: 5 });
//     this.isEditMode = false;
//   }

//   onCancel(): void {
//     this.closePanel.emit();
//   }
// }


import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../shared/model';

@Component({
  selector: 'app-addnewmanage',
  templateUrl: './addnewmanage.component.html',
  styleUrls: ['./addnewmanage.component.css']
})
export class AddnewmanageComponent implements OnInit {
  @Input() editHotel: Hotel | null = null;
  @Output() saveHotel = new EventEmitter<Hotel>();
  @Output() closePanel = new EventEmitter<void>();

  hotelForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.editHotel) {
      this.isEditMode = true;
      this.hotelForm.patchValue(this.editHotel);
    }
  }

  initForm(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      currency: ['€', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewCount: [0, [Validators.required, Validators.min(0)]],
      roomDescription: ['', Validators.required],
      imageUrls: ['']  // handle array logic as needed
    });
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }
    const hotelData: Hotel = { ...this.editHotel, ...this.hotelForm.value };
    this.saveHotel.emit(hotelData);
    this.closePanel.emit();
    this.isEditMode = false;
  }

  onCancel(): void {
    this.closePanel.emit();
  }

  resetForm(): void {
    this.hotelForm.reset();
    this.hotelForm.patchValue({ currency: '€', rating: 5 });
    this.isEditMode = false;
  }
}
