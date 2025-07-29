import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-bookingconstmer',
  templateUrl: './bookingconstmer.component.html',
  styleUrls: ['./bookingconstmer.component.css']
})
export class BookingconstmerComponent implements OnInit {

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

  editBooking(booking: any) {
    this.form = { ...booking }; 
      if (booking.bookingDate) {
      this.form.bookingDate = new Date(booking.bookingDate).toISOString().split('T')[0];
    }
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
    this.paginatedBookings = this.bookings.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.bookings.length) {
      this.currentPage++;
      this.paginate();
    }
  }

  exportToExcel(): void {
  const dataToExport = this.bookings.map((booking, index) => ({
    'S. No': index + 1,
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

  
}
