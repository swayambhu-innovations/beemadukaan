import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRenewalComponent } from './insurance-renewal.component';

describe('InsuranceRenewalComponent', () => {
  let component: InsuranceRenewalComponent;
  let fixture: ComponentFixture<InsuranceRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceRenewalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
