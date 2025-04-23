import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherMapComponent } from './weather-map.component';

describe('WeatherMapComponent', () => {
  let component: WeatherMapComponent;
  let fixture: ComponentFixture<WeatherMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
