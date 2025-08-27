import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewroomdetailsComponent } from './addnewroomdetails.component';

describe('AddnewroomdetailsComponent', () => {
  let component: AddnewroomdetailsComponent;
  let fixture: ComponentFixture<AddnewroomdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewroomdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewroomdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
