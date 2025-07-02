import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IreComponent } from './ire.component';

describe('IreComponent', () => {
  let component: IreComponent;
  let fixture: ComponentFixture<IreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
