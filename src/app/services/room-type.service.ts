
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class RoomTypeService {
//   private enabled$ = new BehaviorSubject<boolean>(true);
//   private selected$ = new BehaviorSubject<string>('');
//   private acEnabled$ = new BehaviorSubject<boolean>(true); // 👈 Add this

//   isEnabled$ = this.enabled$.asObservable();
//   selectedRoomType$ = this.selected$.asObservable();
//   isAcEnabled$ = this.acEnabled$.asObservable(); // 👈 Add this

//   setEnabled(val: boolean) {
//     this.enabled$.next(val);
//     this.acEnabled$.next(val); 
//   }

//   setSelected(type: string) {
//     this.selected$.next(type);
//   }
// }

// room-type.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private isEnabledSubject = new BehaviorSubject<boolean>(true);
  isEnabled$ = this.isEnabledSubject.asObservable();

  private selectedRoomTypeSubject = new BehaviorSubject<string>('');
  selectedRoomType$ = this.selectedRoomTypeSubject.asObservable();

  setEnabled(enabled: boolean) {
    this.isEnabledSubject.next(enabled);
  }

  setSelected(type: string) {
    this.selectedRoomTypeSubject.next(type);
  }
}
