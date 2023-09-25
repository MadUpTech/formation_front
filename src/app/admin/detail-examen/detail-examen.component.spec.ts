import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExamenComponent } from './detail-examen.component';

describe('DetailExamenComponent', () => {
  let component: DetailExamenComponent;
  let fixture: ComponentFixture<DetailExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
