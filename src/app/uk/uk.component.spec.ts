import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkComponent } from './uk.component';

describe('UkComponent', () => {
  let component: UkComponent;
  let fixture: ComponentFixture<UkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
