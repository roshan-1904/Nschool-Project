
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-registerconstmer',
  templateUrl: './registerconstmer.component.html',
  styleUrls: ['./registerconstmer.component.css']
})
export class RegisterconstmerComponent implements OnInit {

  
selectedUsers: any[] = [];
selectAll: boolean = false;
showTableSection: boolean = true;
showFormOnly: boolean = false;
selectedCountry: string = '';
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
    console.log('jsPDF', jsPDF);
  }

  addUser(newUserData: any): void {
    
  if (Object.values(this.newUser).some(val => (val as string).trim() === '')) {
    alert('Please fill all fields!');
    return;
  }

  const newUserWithDate = {
    ...this.newUser,
    date: new Date()
  };

  this.users.unshift(newUserData); 


  this.newUser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    country: ''
  };


  this.selectedCountry = '';
  this.showFormOnly = false;
  this.currentPage = 1;
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
  const exportData = this.paginatedUsers().map((user, index) => ({
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

  FileSaver.saveAs(data, 'Registered_Customers_Page_' + this.currentPage + '.xlsx');
}


nextPage() {
  const totalPages = Math.ceil(this.filteredUsers().length / this.itemsPerPage);
  if (this.currentPage < totalPages) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

  showCountry(country: string): void {
    this.selectedCountry = country;
      this.showFormOnly = true; 
  }




onUserSelectionChange(user: any): void {
  if (user.selected) {
    this.selectedUsers.push(user);
  } else {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
  }
}

toggleAllSelection(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  this.paginatedUsers().forEach(user => {
    user.selected = checked;
    if (checked && !this.selectedUsers.includes(user)) {
      this.selectedUsers.push(user);
    } else if (!checked) {
      this.selectedUsers = [];
    }
  });
}

deleteSelectedUsers(): void {
  if (confirm(`Are you sure you want to delete ${this.selectedUsers.length} user(s)?`)) {
    this.selectedUsers.forEach(user => {
      const index = this.users.indexOf(user);
      if (index > -1) {
        this.users.splice(index, 1);
      }
    });
    this.selectedUsers = [];
  }
}

// file formet downloder
exportToCSV(): void {
  const exportData = this.paginatedUsers().map((user, index) => ({
    'S. No.': index + 1,
    'First Name': user.firstName,
    'Last Name': user.lastName,
    'Email': user.email,
    'Phone': user.phone,
    'State': user.state,
    'Country': user.country,
    'Registered On': new Date(user.date).toLocaleString()
  }));

  const csvRows = [
    Object.keys(exportData[0]).join(','), 
    ...exportData.map(row => Object.values(row).map(String).join(',')) 
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  FileSaver.saveAs(blob, 'Registered_Customers_Page_' + this.currentPage + '.csv');
}


exportToPDF(): void {
  const doc = new jsPDF();

  const exportData = this.paginatedUsers().map((user, index) => [
    index + 1,
    user.firstName,
    user.lastName,
    user.email,
    user.phone,
    user.state,
    user.country,
    new Date(user.date).toLocaleString()
  ]);

  const headers = [['S. No.', 'First Name', 'Last Name', 'Email', 'Phone', 'State', 'Country', 'Registered On']];

  autoTable(doc, {
    head: headers,
    body: exportData,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] }
  });

   doc.save('Registered_Customers_Page_' + this.currentPage + '.pdf');
}

}
