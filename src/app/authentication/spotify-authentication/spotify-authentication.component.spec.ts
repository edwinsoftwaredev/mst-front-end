import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAuthenticationComponent } from './spotify-authentication.component';

describe('SpotifyAuthenticationComponent', () => {
  let component: SpotifyAuthenticationComponent;
  let fixture: ComponentFixture<SpotifyAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
