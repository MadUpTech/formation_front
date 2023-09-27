import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifierComponent } from './certifier.component';

describe('CertifierComponent', () => {
  let component: CertifierComponent;
  let fixture: ComponentFixture<CertifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
