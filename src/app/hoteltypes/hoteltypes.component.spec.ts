import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteltypesComponent } from './hoteltypes.component';

describe('HoteltypesComponent', () => {
  let component: HoteltypesComponent;
  let fixture: ComponentFixture<HoteltypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoteltypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoteltypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
