import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelInsuraceComponent } from './travel-insurace.component';

describe('TravelInsuraceComponent', () => {
  let component: TravelInsuraceComponent;
  let fixture: ComponentFixture<TravelInsuraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelInsuraceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelInsuraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
