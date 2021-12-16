import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwowheelerInsuranceComponent } from './twowheeler-insurance.component';

describe('TwowheelerInsuranceComponent', () => {
  let component: TwowheelerInsuranceComponent;
  let fixture: ComponentFixture<TwowheelerInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwowheelerInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwowheelerInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
