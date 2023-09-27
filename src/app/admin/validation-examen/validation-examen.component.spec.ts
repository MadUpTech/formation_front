import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationExamenComponent } from './validation-examen.component';

describe('ValidationExamenComponent', () => {
  let component: ValidationExamenComponent;
  let fixture: ComponentFixture<ValidationExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
