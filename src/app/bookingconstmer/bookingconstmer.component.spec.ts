import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingconstmerComponent } from './bookingconstmer.component';

describe('BookingconstmerComponent', () => {
  let component: BookingconstmerComponent;
  let fixture: ComponentFixture<BookingconstmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingconstmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingconstmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
