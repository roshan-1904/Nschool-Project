import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdinburghComponent } from './edinburgh.component';

describe('EdinburghComponent', () => {
  let component: EdinburghComponent;
  let fixture: ComponentFixture<EdinburghComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdinburghComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdinburghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
