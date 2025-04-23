import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../weather.service';
import { HttpClient } from '@angular/common/http';
import { WeatherMapComponent } from "../weather-map/weather-map.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    WeatherMapComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  currentWeather1: any;
  currentWeather: any;
  hourlyForecast: any;
  daysForecast: any;
  mapInstance!: L.Map;

  cities: string[] = [
    'Tbilisi', 'Abasha', 'Adigeni', 'Akhalkalaki', 'Akhaltsikhe', 'Akhmeta', 'Ambrolauri', 'Aspindza', 'Baghdati',
    'Batumi', 'Bolnisi', 'Borjomi', 'Chiatura', 'Chokhatauri', 'Dedoplistskaro', 'Dmanisi', 'Dusheti', 'Gardabani',
    'Gori', 'Gurjaani', 'Kareli', 'Kaspi', 'Keda', 'Khashuri', 'Khelvachauri', 'Khobi', 'Khoni', 'Khulo', 'Kobuleti',
    'Kutaisi', 'Lagodekhi', 'Lanchkhuti', 'Lentekhi', 'Marneuli', 'Martvili', 'Mestia', 'Mtskheta', 'Ninotsminda', 'Oni',
    'Ozurgeti', 'Poti', 'Rustavi', 'Samtredia', 'Senaki', 'Sighnaghi', 'Sokhumi', 'Stepantsminda', 'Telavi', 'Terjola',
    'Tetritskaro', 'Tkibuli', 'Tsageri', 'Tsalenjikha', 'Tsalka', 'Tskaltubo', 'Tskhinvali', 'Vani', 'Zestafoni', 'Zugdidi'
  ];
  selectedCity: string = 'Tbilisi';

  constructor(private weatherService: WeatherService, private http:HttpClient) {
  }

  ngOnInit(): void {
    this.getWeatherData(this.selectedCity);
    this.gethourlyData(this.selectedCity);
    this.getdayData(this.selectedCity);
  }

  getWeatherData(city: string): void {
    this.weatherService.getWeather(city).subscribe((data: any) => {
      this.currentWeather = data.list[0];
      this.currentWeather1 = data;
    });
  }

  gethourlyData(city: string): void {
    this.weatherService.gethourly(city).subscribe((data: any) => {
      this.hourlyForecast = data.list.slice(0, 9); // პირველი 8 საათი (3სთ ინტერვალით)
    });
  }

  getdayData(city: string): void {
    this.weatherService.gethourly(city).subscribe((data: any) => {
      const groupedByDay: any[] = [];
      const usedDates = new Set();

      for (let item of data.list) {
        const dateStr = item.dt_txt.split(' ')[0]; // მხოლოდ yyyy-mm-dd
        if (!usedDates.has(dateStr)) {
          usedDates.add(dateStr);
          groupedByDay.push(item); // პირველი დრო იმ დღიდან
        }
      }

      this.daysForecast = groupedByDay.slice(0, 6); // 6 დღე
    });
  }

  onMapReady(map: L.Map): void {
    this.mapInstance = map;
    console.log('Map instance received in HomeComponent:', map);
  }

  getIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
