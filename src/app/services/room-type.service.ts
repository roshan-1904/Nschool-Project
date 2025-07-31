import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RoomTypeService {
  private enabled$ = new BehaviorSubject<boolean>(true);
  isEnabled$ = this.enabled$.asObservable();

  private selected$ = new BehaviorSubject<string>('');
  selectedRoomType$ = this.selected$.asObservable();

  private acTypeVisible$ = new BehaviorSubject<boolean>(true);
  acTypeVisible = this.acTypeVisible$.asObservable();

  private roomVarietyVisible$ = new BehaviorSubject<boolean>(true);
  roomVarietyVisible = this.roomVarietyVisible$.asObservable();

  setEnabled(val: boolean)
   { this.enabled$.next(val); }
  setSelected(val: string)
   { this.selected$.next(val); }
  setAcTypeVisibility(val: boolean)
   { this.acTypeVisible$.next(val); }
  setRoomVarietyVisibility(val: boolean) 
  { this.roomVarietyVisible$.next(val); }
  
  
}
