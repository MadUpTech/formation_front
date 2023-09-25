import { TestBed } from '@angular/core/testing';

import { AppAuthInterceptor } from './app-auth.interceptor';

describe('AppAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppAuthInterceptor = TestBed.inject(AppAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
