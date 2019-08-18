import { TestBed, async, inject } from '@angular/core/testing';

import { SpotifyAuthGuard } from './spotify-auth.guard';

describe('SpotifyAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAuthGuard]
    });
  });

  it('should ...', inject([SpotifyAuthGuard], (guard: SpotifyAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
