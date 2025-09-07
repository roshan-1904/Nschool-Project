
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../shared/dbservies';
import { Hotel } from '../shared/model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  hotelForm!: FormGroup;
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  paginatedHotels: Hotel[] = [];
  isEditMode = false;
  editHotelId: string | null = null;
  showAddPanel: boolean = false;
   editHotelData: Hotel | null = null;
   selectedHotelIds: Set<string> = new Set();

  
searchTerm: string = '';
  itemsPerPage: number = 10;
  currentPage: number = 1;
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
      this.applyFilter();
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

    applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.hotelName.toLowerCase().includes(term) ||
      hotel.location.toLowerCase().includes(term)
    );

    this.paginateHotels();
  }

  paginateHotels(): void {

    this.hotels.filter(h => this.selectedHotelIds.has(h._id!))

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedHotels = this.filteredHotels.slice(startIndex, endIndex);

    const rows = this.hotels
  .filter(h => this.selectedHotelIds.has(h._id!))
  .map(hotel => [
    hotel.hotelName,
    hotel.location,
    `${hotel.amount} ${hotel.currency}`,
    `${hotel.rating} (${hotel.reviewCount})`,
    hotel.roomDescription,
  ]);

  }

  showAddNewPanel(): void {
  this.showAddPanel = true;
  this.editHotelData = null;
}

closeAddPanel(): void {
  this.showAddPanel = false;
}


  showAddExistingHotel(hotel: Hotel): void {
    this.editHotelData = hotel;
    this.showAddPanel = true;
  }

  
  onSaveHotel(updated: Hotel): void {
    if (this.editHotelData) {
      // update flow
      this.hotelService.updateHotel(updated._id!, updated).subscribe(() => {
        this.loadHotels();
      });
    } else {
      // add flow
      this.hotelService.addHotel(updated).subscribe(() => {
        this.loadHotels();
      });
    }
  }

 
toggleHotelSelection(id: string): void {
  if (this.selectedHotelIds.has(id)) {
    this.selectedHotelIds.delete(id);
  } else {
    this.selectedHotelIds.add(id);
  }
}

toggleSelectAll(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.selectedHotelIds = new Set(this.paginatedHotels.map(h => h._id!));
  } else {
    this.selectedHotelIds.clear();
  }
}
deleteSelectedHotels(): void {
  if (this.selectedHotelIds.size === 0) {
    alert('Please select at least one hotel to delete.');
    return;
  }

  if (confirm(`Are you sure you want to delete ${this.selectedHotelIds.size} selected hotel(s)?`)) {
    const idsToDelete = Array.from(this.selectedHotelIds);

    let deletedCount = 0;
    idsToDelete.forEach(id => {
      this.hotelService.deleteHotel(id).subscribe(() => {
        deletedCount++;
        if (deletedCount === idsToDelete.length) {
          this.selectedHotelIds.clear();
          this.loadHotels();
        }
      });
    });
  }
}


// Export to Excel (.xlsx)
exportToExcel(): void {
  const worksheet = XLSX.utils.json_to_sheet(this.paginatedHotels);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hotels');

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  FileSaver.saveAs(blob, 'hotels.xlsx');
}

// Export to CSV
exportToCSV(): void {
  const worksheet = XLSX.utils.json_to_sheet(this.paginatedHotels);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  FileSaver.saveAs(blob, 'hotels.csv');
}

// Export to PDF
exportToPDF(): void {
  const doc = new jsPDF();

  const columns = ['Hotel Name', 'Location', 'Price', 'Rating', 'Room Description'];
  const rows = this.paginatedHotels.map(hotel => [
    hotel.hotelName,
    hotel.location,
    `${hotel.amount} ${hotel.currency}`,
    `${hotel.rating} (${hotel.reviewCount})`,
    hotel.roomDescription,
  ]);

  doc.setFontSize(14);
  doc.text('Hotel List', 14, 16);

  autoTable(doc, {
    startY: 20,
    head: [columns],
    body: rows,
  });

  doc.save('hotels.pdf');
}

}

