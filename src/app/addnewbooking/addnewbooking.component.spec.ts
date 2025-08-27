import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewbookingComponent } from './addnewbooking.component';

describe('AddnewbookingComponent', () => {
  let component: AddnewbookingComponent;
  let fixture: ComponentFixture<AddnewbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
