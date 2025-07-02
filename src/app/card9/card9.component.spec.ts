import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card9Component } from './card9.component';

describe('Card9Component', () => {
  let component: Card9Component;
  let fixture: ComponentFixture<Card9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Card9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Card9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
