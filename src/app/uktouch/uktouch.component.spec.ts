import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UktouchComponent } from './uktouch.component';

describe('UktouchComponent', () => {
  let component: UktouchComponent;
  let fixture: ComponentFixture<UktouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UktouchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UktouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
