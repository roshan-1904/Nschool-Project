import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mycomponent2Component } from './mycomponent2.component';

describe('Mycomponent2Component', () => {
  let component: Mycomponent2Component;
  let fixture: ComponentFixture<Mycomponent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mycomponent2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mycomponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
