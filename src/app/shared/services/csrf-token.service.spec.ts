import { TestBed } from '@angular/core/testing';

import { CsrfTokenService } from './csrf-token.service';

describe('CsrfTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsrfTokenService = TestBed.get(CsrfTokenService);
    expect(service).toBeTruthy();
  });
});
