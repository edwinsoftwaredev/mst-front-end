import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPlaylistComponent } from './suggested-playlist.component';

describe('SuggestedPlaylistComponent', () => {
  let component: SuggestedPlaylistComponent;
  let fixture: ComponentFixture<SuggestedPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
