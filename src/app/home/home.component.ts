import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
   @ViewChild('scrollContainer') scrollContainer!: ElementRef;
   cities = [
    'London', 'Frankfurt', 'Salford', 'Ruskin University',
    'New York City', 'University College', 'Birmingham', 'Sydney'
  ];

  onSwipeLeft() {
    this.scrollBy(100); 
  }

  onSwipeRight() {
    this.scrollBy(-100); 
  }

  scrollBy(offset: number) {
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  }

   selectedCountry: string = 'ALL';

  showCountry(country: string) {
    this.selectedCountry = country;
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

   onLoginClick() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
  

 
  


