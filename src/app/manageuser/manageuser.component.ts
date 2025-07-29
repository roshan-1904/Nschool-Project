
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../shared/dbservies';
import { Hotel } from '../shared/model';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  hotelForm!: FormGroup;
  hotels: Hotel[] = [];
  isEditMode = false;
  editHotelId: string | null = null;
  

  constructor(private fb: FormBuilder, private hotelService: HotelService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHotels();
  }

  initForm(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      location: ['', Validators.required],
      amount: [0, Validators.required],
      currency: ['€'],
      rating: [5],
      reviewCount: [0],
      roomDescription: [''],
      imageUrls: [[]],
    });
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe((res) => {
      this.hotels = res;
    });
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) return;

    const hotelData = this.hotelForm.value;

    if (this.isEditMode && this.editHotelId) {
      this.hotelService.updateHotel(this.editHotelId, hotelData).subscribe(() => {
        this.resetForm();
        this.loadHotels();
      });
    } else {
      this.hotelService.addHotel(hotelData).subscribe(() => {
        this.resetForm();
        this.loadHotels();
      });
    }
  }

  editHotel(hotel: Hotel): void {
    this.isEditMode = true;
    this.editHotelId = hotel._id!;
    this.hotelForm.patchValue(hotel);
  }

  deleteHotel(id: string): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(id).subscribe(() => this.loadHotels());
    }
  }

  resetForm(): void {
    this.hotelForm.reset();
    this.isEditMode = false;
    this.editHotelId = null;
    this.hotelForm.patchValue({ currency: '€', rating: 5 });
  }
}
