import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dropdownVisible: boolean = false;
  selectedComponent: string | null = 'dashboard';
  selectedSubComponent: string | null = null;

  isHoveringModule: boolean = false;
  isHoveringComponent: boolean = false;
  isHovered: boolean = false;
 progressList = [
  { label: 'bookings Completed', value: 80 },
  { label: 'bookings Processing', value: 55 },
  { label: 'Other Statuses', value: 30 }
];

 constructor() {}

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onComponentHover(component: string, hovering: boolean): void {
    this.selectedComponent = hovering ? component : 'dashboard';
    this.isHoveringModule = hovering;
    this.isHovered = hovering;
  }

  onSubComponentHover(subComponent: string, hovering: boolean): void {
    this.selectedSubComponent = hovering ? subComponent : null;
    this.isHoveringComponent = hovering;
  }

  onLeave(area: string): void {
    if (area === 'dashboard' || area === 'registerconstmer') {
      this.isHoveringModule = false;
    } else if (area === 'component') {
      this.isHoveringComponent = false;
    }

    setTimeout(() => {
      if (!this.isHoveringModule && !this.isHoveringComponent) {
        this.selectedComponent = 'dashboard';
        this.selectedSubComponent = null;
        this.isHovered = false;
      }
    }, 200);
  }
}
