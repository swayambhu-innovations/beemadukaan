import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInsuranceComponent } from './other-insurance.component';

describe('OtherInsuranceComponent', () => {
  let component: OtherInsuranceComponent;
  let fixture: ComponentFixture<OtherInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
