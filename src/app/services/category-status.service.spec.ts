import { TestBed } from '@angular/core/testing';

import { CategoryStatusService } from './category-status.service';

describe('CategoryStatusService', () => {
  let service: CategoryStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
