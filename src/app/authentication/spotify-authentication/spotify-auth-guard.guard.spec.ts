import { TestBed, async, inject } from '@angular/core/testing';

import { SpotifyAuthGuardGuard } from './spotify-auth-guard.guard';

describe('SpotifyAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAuthGuardGuard]
    });
  });

  it('should ...', inject([SpotifyAuthGuardGuard], (guard: SpotifyAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
