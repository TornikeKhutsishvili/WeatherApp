import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-weather',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  getWeather(cityInput: HTMLInputElement) {
    this.city = cityInput.value;
    if (this.city.trim()) {
      this.weatherService.fetchWeather(this.city); // Fetch the weather data
      this.weatherService.weatherType$.subscribe(
        data => {
          this.weatherData = data;  // Assign data to weatherData variable
        },
        error => console.error('შეცდომა ამინდის მონაცემების მიღებისას', error)
      );
    }
  }

  getIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
