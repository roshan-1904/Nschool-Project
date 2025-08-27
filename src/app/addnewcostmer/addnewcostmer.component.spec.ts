import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcostmerComponent } from './addnewcostmer.component';

describe('AddnewcostmerComponent', () => {
  let component: AddnewcostmerComponent;
  let fixture: ComponentFixture<AddnewcostmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcostmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewcostmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
