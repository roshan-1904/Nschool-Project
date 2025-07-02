import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card11Component } from './card11.component';

describe('Card11Component', () => {
  let component: Card11Component;
  let fixture: ComponentFixture<Card11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card11Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
