
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-registerconstmer',
  templateUrl: './registerconstmer.component.html',
  styleUrls: ['./registerconstmer.component.css']
})
export class RegisterconstmerComponent implements OnInit {
  currentPage: number = 1;
itemsPerPage: number = 10;
globalSearchText: string = '';
  users: any[] = [];

  newUser: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
    country: string;
  } = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: '',
  };

  filters = {
    serial: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    date: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data as any[];
    });
  }

  addUser() {
    if (Object.values(this.newUser).some(v => (v as string).trim() === '')) {
      alert('Please fill all fields!');
      return;
    }

    const userToAdd = {
      ...this.newUser,
      date: new Date()
    };

  this.userService.registerUser(userToAdd).subscribe({
    next: (response) => {
      alert('User registered successfully');
     
      this.userService.getAllUsers().subscribe((data) => {
        this.users = data as any[];
      });

      
      this.newUser = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        state: '',
        country: '',
      };
    },
    error: (err) => {
      alert('Failed to register user: ' + err.message);
    }
  });

  }
  filteredUsers() {
  if (!this.globalSearchText.trim()) return this.users;

  const search = this.globalSearchText.toLowerCase();

  return this.users.filter((user, index) => {
    const serial = (index + 1).toString();
    const name = `${user.firstName} ${user.lastName}`;
    const email = user.email;
    const phone = user.phone;
    const location = `${user.state}, ${user.country}`;
    const date = new Date(user.date).toLocaleDateString();

    return (
      serial.includes(search) ||
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      phone.toLowerCase().includes(search) ||
      location.toLowerCase().includes(search) ||
      date.includes(search)
    );
  });
}

  deleteUser(userToDelete: any): void {
  const index = this.users.indexOf(userToDelete);
  if (index > -1 && confirm('Are you sure you want to delete this user?')) {
    this.users.splice(index, 1);
  }
}

paginatedUsers() {
  const filtered = this.filteredUsers();
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return filtered.slice(startIndex, endIndex);
}

changePage(page: number) {
  this.currentPage = page;
}
totalPages(): number[] {
  const total = Math.ceil(this.filteredUsers().length / this.itemsPerPage);
  return Array.from({ length: total }, (_, i) => i + 1);
}

editIndex: number | null = null;
editedUser: any = {};

startEdit(user: any, globalIndex: number) {
  this.editIndex = globalIndex;
  this.editedUser = { ...user };
}

saveEdit(globalIndex: number) {
  this.users[globalIndex] = { ...this.editedUser };
  this.editIndex = null;
}

cancelEdit() {
  this.editIndex = null;
}

exportToExcel(): void {
  const exportData = this.filteredUsers().map((user, index) => ({
    'S. No.': index + 1,
    'First Name': user.firstName,
    'Last Name': user.lastName,
    'Email': user.email,
    'Phone': user.phone,
    'State': user.state,
    'Country': user.country,
    'Registered On': new Date(user.date).toLocaleString()
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Customers': worksheet },
    SheetNames: ['Customers']
  };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data: Blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  });

  FileSaver.saveAs(data, 'Registered_Customers.xlsx');
}


}
