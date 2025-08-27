import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-bookingconstmer',
  templateUrl: './bookingconstmer.component.html',
  styleUrls: ['./bookingconstmer.component.css']
})
export class BookingconstmerComponent implements OnInit {
selectedUsers: string[] = [];
showFormOnly = false;
selectedCountry: string = '';
  bookings: any[] = [];
  filteredBookings: any[] = [];
  paginatedBookings: any[] = [];
  form: any = {};
  loading = true;
  error = '';
  itemsPerPage = 10;
  currentPage = 0;
 searchTerm: string = '';
 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.http.get<any[]>('http://localhost:3000/api/roombookings').subscribe({
      next: data => {
        this.bookings = data;
        this.filteredBookings = [...this.bookings];
         this.paginate();
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load bookings';
        this.loading = false;
      }
    });
  }

    applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(booking =>
      booking.name?.toLowerCase().includes(term) ||
      booking.phone?.toLowerCase().includes(term) ||
      booking.location?.toLowerCase().includes(term)
    );
      this.currentPage = 0; 
  this.paginate();
  }

  onSubmit() {
    const url = this.form._id
      ? `http://localhost:3000/api/roombookings/${this.form._id}`
      : 'http://localhost:3000/api/roombookings';

    const method = this.form._id ? 'put' : 'post';

    this.http[method](url, this.form).subscribe({
      next: () => {
        this.form = {};
        this.loadBookings();
      },
      error: () => {
        alert('Error saving booking');
      }
    });
  }

  addUser(newUser: any) {
  this.http.post('http://localhost:3000/api/roombookings', newUser).subscribe({
    next: () => {
      this.showFormOnly = false; 
      this.loadBookings();       
    },
    error: () => {
      alert('Failed to add booking.');
    }
  });
}


  editBooking(booking: any) {
    this.form = { ...booking }; 
      if (booking.bookingDate) {
      this.form.bookingDate = new Date(booking.bookingDate).toISOString().split('T')[0];
    }
      this.showFormOnly = true; 
  }

  deleteBooking(id: string) {
    if (confirm('Are you sure you want to permanently delete this booking?')) {
      this.http.delete(`http://localhost:3000/api/roombookings/${id}`).subscribe({
        next: () => this.loadBookings(),
        error: () => alert('Failed to delete booking')
      });
    }
  }
  paginate() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedBookings = this.filteredBookings.slice(start, end);
  }
    get totalPages(): number {
    return Math.ceil(this.filteredBookings.length / this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.filteredBookings.length) {
      this.currentPage++;
      this.paginate();
    }
  }

    previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginate();
    }
  }


  showCountry(component: string): void {
  if (component === 'addnewbooking') {
    this.showFormOnly = true;
  }
}



exportToCSV(): void {
  const csvRows = [
    [
      'S.No',
      'Name',
      'Email',
      'Phone',
      'Location',
      'AC Type',
      'Bed Type',
      'Booking Date',
      'Accommodation',
      'Payment Mode',
      'Package Type',
      'User Type'
    ]
  ];

 this.getSelectedOrPaginatedBookings().forEach(booking => {
    csvRows.push([
      booking.name,
      booking.email,
      booking.phone,
      booking.location,
      booking.acType,
      booking.bedType,
      new Date(booking.bookingDate).toLocaleDateString(),
      booking.accommodation,
      booking.paymentMode,
      booking.packageType,
      booking.userType
    ]);
  });

  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  saveAs(blob, `bookings_${new Date().getTime()}.csv`);
}

// ✅ PDF Export
exportToPDF(): void {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Customer Booking List', 14, 15);

  const headers = [
    [
      'S.No',
      'Name',
      'Email',
      'Phone',
      'Location',
      'AC Type',
      'Bed Type',
      'Booking Date',
      'Accommodation',
      'Payment Mode',
      'Package Type',
      'User Type'
    ]
  ];

  const data = this.getSelectedOrPaginatedBookings().map(booking => [
    booking.name,
    booking.email,
    booking.phone,
    booking.location,
    booking.acType,
    booking.bedType,
    new Date(booking.bookingDate).toLocaleDateString(),
    booking.accommodation,
    booking.paymentMode,
    booking.packageType,
    booking.userType
  ]);

  autoTable(doc, {
    head: headers,
    body: data,
    startY: 20,
    styles: { fontSize: 8 }
  });

  doc.save(`bookings_${new Date().getTime()}.pdf`);
}

exportToExcel(): void {
  const dataToExport = this.getSelectedOrPaginatedBookings().map((booking, index) => ({
    'Name': booking.name,
    'Email': booking.email,
    'Phone': booking.phone,
    'Location': booking.location,
    'AC Type': booking.acType,
    'Bed Type': booking.bedType,
    'Booking Date': new Date(booking.bookingDate).toLocaleDateString(),
    'Accommodation': booking.accommodation,
    'Payment Mode': booking.paymentMode,
    'Package Type': booking.packageType,
    'User Type': booking.userType,
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Bookings': worksheet },
    SheetNames: ['Bookings']
  };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, 'bookings');
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
}

toggleUserSelection(userId: string, checked: boolean): void {
  if (checked) {
    if (!this.selectedUsers.includes(userId)) {
      this.selectedUsers.push(userId);
    }
  } else {
    this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
  }
}

isSelected(userId: string): boolean {
  return this.selectedUsers.includes(userId);
}

toggleSelectAllVisible(checked: boolean): void {
  const idsOnPage = this.paginatedBookings.map(b => b._id);
  if (checked) {
    idsOnPage.forEach(id => {
      if (!this.selectedUsers.includes(id)) {
        this.selectedUsers.push(id);
      }
    });
  } else {
    this.selectedUsers = this.selectedUsers.filter(id => !idsOnPage.includes(id));
  }
}

areAllVisibleSelected(): boolean {
  return this.paginatedBookings.every(b => this.selectedUsers.includes(b._id));
}

private getSelectedOrPaginatedBookings(): any[] {
  if (this.selectedUsers.length > 0) {
    return this.paginatedBookings.filter(b => this.selectedUsers.includes(b._id));
  }
  return this.paginatedBookings;
}

clearSelectedUsers(): void {
  this.selectedUsers = [];
}
getCheckedValue(event: Event): boolean {
  const input = event.target as HTMLInputElement;
  return input?.checked ?? false;
}



deleteSelectedUsers(): void {
  if (this.selectedUsers.length === 0) return;

  const confirmed = confirm(`Are you sure you want to delete ${this.selectedUsers.length} selected booking(s)?`);
  if (!confirmed) return;

  const deleteRequests = this.selectedUsers.map(id =>
    this.http.delete(`http://localhost:3000/api/roombookings/${id}`)
  );

  Promise.all(deleteRequests.map(req => req.toPromise()))
    .then(() => {
      this.clearSelectedUsers();
      this.loadBookings();
    })
    .catch(() => alert('Failed to delete selected bookings'));
}

handleUserForm(userData: any) {
  if (userData._id) {
    console.log('Updating booking with ID:', userData._id);
    this.http.put(`http://localhost:3000/api/roombookings/${userData._id}`, userData).subscribe({
      next: () => {
        this.showFormOnly = false;
        this.loadBookings();
      },
      error: () => alert('Failed to update booking.')
    });
  } else {
    console.log('Adding new booking:', userData);
    this.http.post('http://localhost:3000/api/roombookings', userData).subscribe({
      next: () => {
        this.showFormOnly = false;
        this.loadBookings();
      },
      error: () => alert('Failed to add booking.')
    });
  }
}

}

