import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantouchComponent } from './cantouch.component';

describe('CantouchComponent', () => {
  let component: CantouchComponent;
  let fixture: ComponentFixture<CantouchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantouchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
