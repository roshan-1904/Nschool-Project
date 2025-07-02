import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IretouchComponent } from './iretouch.component';

describe('IretouchComponent', () => {
  let component: IretouchComponent;
  let fixture: ComponentFixture<IretouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IretouchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IretouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
