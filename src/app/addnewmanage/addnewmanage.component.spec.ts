import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewmanageComponent } from './addnewmanage.component';

describe('AddnewmanageComponent', () => {
  let component: AddnewmanageComponent;
  let fixture: ComponentFixture<AddnewmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewmanageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
