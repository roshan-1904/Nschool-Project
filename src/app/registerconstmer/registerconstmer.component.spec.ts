import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterconstmerComponent } from './registerconstmer.component';

describe('RegisterconstmerComponent', () => {
  let component: RegisterconstmerComponent;
  let fixture: ComponentFixture<RegisterconstmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterconstmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterconstmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
