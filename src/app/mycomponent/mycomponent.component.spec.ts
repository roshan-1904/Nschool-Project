import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycomponentComponent } from './mycomponent.component';

describe('MycomponentComponent', () => {
  let component: MycomponentComponent;
  let fixture: ComponentFixture<MycomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
