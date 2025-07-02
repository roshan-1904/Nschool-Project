import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirminghamComponent } from './birmingham.component';

describe('BirminghamComponent', () => {
  let component: BirminghamComponent;
  let fixture: ComponentFixture<BirminghamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirminghamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirminghamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
