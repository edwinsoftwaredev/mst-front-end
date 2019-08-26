import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePlaylistComponent } from './make-playlist.component';

describe('MakePlaylistComponent', () => {
  let component: MakePlaylistComponent;
  let fixture: ComponentFixture<MakePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
