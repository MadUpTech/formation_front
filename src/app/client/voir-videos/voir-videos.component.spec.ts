import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirVideosComponent } from './voir-videos.component';

describe('VoirVideosComponent', () => {
  let component: VoirVideosComponent;
  let fixture: ComponentFixture<VoirVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
