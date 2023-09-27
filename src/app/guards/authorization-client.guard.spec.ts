import { TestBed } from '@angular/core/testing';

import { AuthorizationClientGuard } from './authorization-client.guard';

describe('AuthorizationClientGuard', () => {
  let guard: AuthorizationClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
