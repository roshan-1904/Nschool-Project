import { Component, OnInit } from '@angular/core';
import { RoomTypeService } from '../services/room-type.service';
import { CategoryStatusService, CategoryStatus } from '../services/category-status.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  isEnabled = true;
  selectedRoomType = '';
  categoryStatuses = new Map<string, boolean>();

  categories = [
    { n: 'Luxury', d: 'High-end hotels with premium services.' },
    { n: 'Budget', d: 'Affordable accommodation.' },
    { n: 'Business', d: 'Business travel-friendly.' },
    { n: 'Resort', d: 'Pools, spas, leisure.' },
    { n: 'Boutique', d: 'Stylish & personalized.' },
    { n: 'Heritage', d: 'Historic charm.' },
    { n: 'Airport Hotel', d: 'Near airports.' },
    { n: 'Extended Stay', d: 'Long-term stays.' },
    { n: 'Eco Hotel', d: 'Green & sustainable.' },
    { n: 'Hostel', d: 'Shared budget lodging.' }
  ];

  constructor(
    private rt: RoomTypeService,
    private catStatusSvc: CategoryStatusService
  ) {}

  ngOnInit(): void {
    const storedEnabled = localStorage.getItem('roomEnabled');
    if (storedEnabled !== null) {
      this.isEnabled = storedEnabled === 'true';
      this.rt.setEnabled(this.isEnabled);
    }

    const storedType = localStorage.getItem('selectedRoomType');
    if (storedType) {
      this.selectedRoomType = storedType;
      this.rt.setSelected(this.selectedRoomType);
    }

    this.catStatusSvc.getStatuses().subscribe({
      next: (statuses: CategoryStatus[]) => {
        statuses.forEach(s => this.categoryStatuses.set(s.name, s.enabled));
      },
      error: err => {
        console.error('Could not connect to API:', err);
        alert('Failed to connect to server. Make sure the backend is running.');
      }
    });
  }

  setCategoryStatus(name: string, enabled: boolean): void {
    if (!this.isEnabled) return;

    this.categoryStatuses.set(name, enabled);

    this.catStatusSvc.updateStatus(name, enabled).subscribe({
      next: () => console.log(`Category ${name} set to ${enabled}`),
      error: (e: any) => console.error('Update failed', e)
    });
  }

  isCategoryEnabled(name: string): boolean {
    return this.categoryStatuses.get(name) ?? false;
  }

  toggleEnabled(state: boolean): void {
    this.isEnabled = state;
    localStorage.setItem('roomEnabled', String(state));
    this.rt.setEnabled(state);
    this.rt.setAcTypeVisibility(state);
    this.rt.setRoomVarietyVisibility(state);


    this.catStatusSvc.updateStatus('AC', state).subscribe({
      next: () => console.log('Updated AC'),
      error: err => console.error('Error updating AC:', err)
    });

    this.catStatusSvc.updateStatus('RoomVariety', state).subscribe({
      next: () => console.log('Updated RoomVariety'),
      error: err => console.error('Error updating RoomVariety:', err)
    });
  }

  selectRoomType(type: string): void {
    if (!this.isEnabled) return;
    this.selectedRoomType = type;
    localStorage.setItem('selectedRoomType', type);
    this.rt.setSelected(type);
  }
}
