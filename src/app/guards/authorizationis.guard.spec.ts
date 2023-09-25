import { TestBed } from '@angular/core/testing';

import { AuthorizationisGuard } from './authorizationis.guard';

describe('AuthorizationisGuard', () => {
  let guard: AuthorizationisGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationisGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
