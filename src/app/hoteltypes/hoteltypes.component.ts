import { Component, OnInit } from '@angular/core';
import { HotelService } from '../shared/hotel.service';
import { Hotel } from '../shared/hotel.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-hoteltypes',
  templateUrl: './hoteltypes.component.html',
  styleUrls: ['./hoteltypes.component.css']  
})
export class HoteltypesComponent implements OnInit {
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


  hotels: Hotel[] = [];
  editIndex: number | null = null;
editedHotel: Hotel = {} as Hotel;
dropdownVisible = false;
showAddHotelForm = false;
selectedHotel: Hotel | null = null;
  filteredHotels: Hotel[] = [];
selectedHotelIds: Set<string> = new Set();


    searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private svc: HotelService) {}

  ngOnInit() {
    this.loadHotels();
  }

   loadHotels() {
    this.svc.getHotels().subscribe({
      next: data => {
        this.hotels = data;
        this.applyFilter(); 
      },
      error: err => alert('Error fetching hotels: ' + err.message)
    });
  }


  toggleDropdown() {
  this.dropdownVisible = !this.dropdownVisible;
}
onSubmit() {
  const urls = this.imageInput.split(',')
  .map(s => s.trim())
  .filter(s => s && (s.startsWith('http') || s.startsWith('/assets')));

  
  const h: Hotel = {
    hotelName: this.hotelName,
    location: this.location,
    amount: this.amount,
    currency: this.currency,
    rating: this.rating,
    reviewCount: this.reviewCount,
    imageUrls: urls,
    roomDescription: this.roomDescription,
    bhk2: !!this.bhk2,
    bhk3: !!this.bhk3,   
    ac: !!this.ac,
    nonAc: !!this.nonAc,
  };

  this.svc.addHotel(h).subscribe({
    next: savedHotel => {
      alert('Hotel added');
      this.hotels.push(savedHotel);
      this.reset();
    },
    error: (e: any) => alert('Error: ' + e.message)
  });
}

  reset() {
    this.hotelName = '';
    this.location = '';
    this.amount = 0;
    this.currency = '';
    this.rating = 0;
    this.reviewCount = 0;
    this.imageInput = '';
    this.roomDescription = '';
    this.bhk2 = false;
    this.bhk3 = false;
    this.ac = false;
    this.nonAc = false;

  }


  startEdit(hotel: Hotel, index: number) {
  this.editIndex = index;
  this.editedHotel = { ...hotel ,imageUrls: [...(hotel.imageUrls || [])]}; 
}

cancelEdit() {
  this.editIndex = null;
  this.editedHotel = {} as Hotel;
}
saveEdit() {
  if (this.editIndex === null || !this.editedHotel._id) return;


console.log(' update hotel with ID:', this.editedHotel._id, this.editedHotel);
  this.svc.updateHotel(this.editedHotel._id, this.editedHotel).subscribe({
    next: updatedHotel => {
      this.hotels[this.editIndex!] = updatedHotel;
      this.cancelEdit();
      alert('Hotel updated successfully');
    },
    error: err => {
      console.error('Update error:', err);
      alert('Update failed: ' + (err.error?.message || err.message));
    }
  });
}


deleteHotel(hotelId: string, index: number) {
  if (!confirm('Are you sure you want to delete this hotel?')) return;

  this.svc.deleteHotel(hotelId).subscribe({
    next: () => {
      this.hotels.splice(index, 1); 
      alert('Hotel deleted successfully');
    },
    error: err => {
      console.error('Delete failed:', err);
      alert('Delete failed: ' + (err.error?.message || err.message));
    }
  });
}

toggleAddHotelForm(hotel?: Hotel) {
  this.selectedHotel = hotel ?? null;
  this.showAddHotelForm = !this.showAddHotelForm;
}

onHotelAdded(newHotel: Hotel) {
  this.hotels.push(newHotel);
    this.applyFilter(); 
  this.toggleAddHotelForm();
}
  onHotelUpdated(updatedHotel: Hotel) {
    const index = this.hotels.findIndex(h => h._id === updatedHotel._id);
    if (index !== -1) {
      this.hotels[index] = updatedHotel;
       this.applyFilter();
    }
    this.toggleAddHotelForm();
  }
  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredHotels = this.hotels.filter(hotel =>
      hotel.hotelName?.toLowerCase().includes(term) ||
      hotel.location?.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get paginatedHotels(): Hotel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHotels.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredHotels.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

 prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  toggleSelection(hotelId: string) {
  if (this.selectedHotelIds.has(hotelId)) {
    this.selectedHotelIds.delete(hotelId);
  } else {
    this.selectedHotelIds.add(hotelId);
  }
}

isSelected(hotelId: string): boolean {
  return this.selectedHotelIds.has(hotelId);
}

toggleAllSelection(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {
    this.paginatedHotels.forEach(h => this.selectedHotelIds.add(h._id!));
  } else {
    this.paginatedHotels.forEach(h => this.selectedHotelIds.delete(h._id!));
  }
}

areAllSelected(): boolean {
  return this.paginatedHotels.every(h => this.selectedHotelIds.has(h._id!));
}

deleteSelectedHotels() {
  if (this.selectedHotelIds.size === 0) {
    alert('Please select at least one hotel to delete.');
    return;
  }

  if (!confirm('Are you sure you want to delete the selected hotel(s)?')) return;

  const idsToDelete = Array.from(this.selectedHotelIds);

  idsToDelete.forEach(id => {
    const index = this.hotels.findIndex(h => h._id === id);
    if (index !== -1) {
      this.svc.deleteHotel(id).subscribe({
        next: () => {
          this.hotels.splice(index, 1);
          this.selectedHotelIds.delete(id);
          this.applyFilter(); 
        },
        error: err => {
          console.error('Delete failed:', err);
          alert('Failed to delete hotel: ' + (err.error?.message || err.message));
        }
      });
    }
  });
}


// Export to Excel
exportToExcel() {
  const exportData = this.filteredHotels.map(hotel => ({
    'Hotel Name': hotel.hotelName,
    'Location': hotel.location,
    'Price': `${hotel.amount} ${hotel.currency}`,
    'Rating': `${hotel.rating} (${hotel.reviewCount} reviews)`,
    'Room': hotel.roomDescription,
    'BHK': `${hotel.bhk2 ? '2BHK ' : ''}${hotel.bhk3 ? '3BHK' : ''}`,
    'AC': hotel.ac ? 'AC' : hotel.nonAc ? 'Non-AC' : 'N/A'
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = { Sheets: { 'Hotels': worksheet }, SheetNames: ['Hotels'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'hotels.xlsx');
}

// Export to CSV
exportToCSV() {
  const exportData = this.filteredHotels.map(hotel => ({
    'Hotel Name': hotel.hotelName,
    'Location': hotel.location,
    'Price': `${hotel.amount} ${hotel.currency}`,
    'Rating': `${hotel.rating} (${hotel.reviewCount} reviews)`,
    'Room': hotel.roomDescription,
    'BHK': `${hotel.bhk2 ? '2BHK ' : ''}${hotel.bhk3 ? '3BHK' : ''}`,
    'AC': hotel.ac ? 'AC' : hotel.nonAc ? 'Non-AC' : 'N/A'
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
  FileSaver.saveAs(blob, 'hotels.csv');
}

// Export to PDF
exportToPDF() {
  const doc = new jsPDF();

  const exportData = this.filteredHotels.map(hotel => [
    hotel.hotelName,
    hotel.location,
    `${hotel.amount} ${hotel.currency}`,
    `${hotel.rating} (${hotel.reviewCount} reviews)`,
    hotel.roomDescription,
    `${hotel.bhk2 ? '2BHK ' : ''}${hotel.bhk3 ? '3BHK' : ''}`,
    hotel.ac ? 'AC' : hotel.nonAc ? 'Non-AC' : 'N/A'
  ]);

  autoTable(doc, {
    head: [['Hotel Name', 'Location', 'Price', 'Rating', 'Room', 'BHK', 'AC']],
    body: exportData
  });

  doc.save('hotels.pdf');
}

}
