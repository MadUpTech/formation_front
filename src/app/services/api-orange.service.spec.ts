import { TestBed } from '@angular/core/testing';

import { ApiOrangeService } from './api-orange.service';

describe('ApiOrangeService', () => {
  let service: ApiOrangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOrangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
