// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { Component1Component } from './component1.component';

// describe('Component1Component', () => {
//   let component: Component1Component;
//   let fixture: ComponentFixture<Component1Component>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ Component1Component ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(Component1Component);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();

    
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component1Component } from './component1.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component1Component', () => {
  let component: Component1Component;
  let fixture: ComponentFixture<Component1Component>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Component1Component ],
      imports: [ RouterTestingModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(Component1Component);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});
