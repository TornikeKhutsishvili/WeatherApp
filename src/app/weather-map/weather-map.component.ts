import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-weather-map',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements AfterViewInit, OnChanges {
  @Input() cityName!: string;

  private map!: L.Map;
  private apiKey = '62f76f7cea70bfb2a2f32587a893ecd9';
  private marker!: L.Marker;

  @Output() mapReady = new EventEmitter<L.Map>();

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    if (this.cityName) {
      this.initMap();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityName'] && this.cityName) {
      if (!this.map) {
        this.initMap();
      } else {
        this.updateMap();  // Update map with new city data
      }
    }
  }

  private initMap(): void {
    // Remove existing map if already present
    if (this.map) {
      return;
    }

    // Get the city coordinates using the OpenWeather API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<any>(url).subscribe((data: any) => {
      const coords = {
        lat: data.coord.lat,
        lon: data.coord.lon
      };

      // Initialize the map with the city's coordinates
      this.map = L.map('map', {
        center: [coords.lat, coords.lon],
        zoom: 8,
        zoomControl: true,
      });

      // Default layer (OSM)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      // Overlay weather layers
      const overlays = {
        Temperature: L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${this.apiKey}`),
        Clouds: L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${this.apiKey}`),
        Pressure: L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${this.apiKey}`),
        Wind: L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${this.apiKey}`),
      };

      // Layer controls
      L.control.layers({}, overlays).addTo(this.map);
      overlays.Temperature.addTo(this.map);

      // Custom marker icon
      const customIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Display weather info
      const popupText = `
        <b>${data.name}</b><br>
        🌡️ Temp: ${data.main.temp}°C<br>
        ☁️ Clouds: ${data.clouds.all}%<br>
        💨 Wind: ${data.wind.speed} m/s<br>
        🌀 Pressure: ${data.main.pressure} hPa<br>
        📃 ${data.weather[0].description}
      `;
      this.marker?.remove();  // Remove previous marker if exists
      this.marker = L.marker([coords.lat, coords.lon], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(popupText)
        .openPopup();
    });

    // Emit the map object after it has been initialized
    this.mapReady.emit(this.map);
  }

  private updateMap(): void {
    // Fetch new city data and update the map's center and weather info
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=metric`;

    this.http.get<any>(url).subscribe((data: any) => {
      const coords = {
        lat: data.coord.lat,
        lon: data.coord.lon
      };

      // Update map center
      this.map.setView([coords.lat, coords.lon], 8);

      // Custom marker icon
      const customIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Update weather info
      const popupText = `
        <b>${data.name}</b><br>
        🌡️ Temp: ${data.main.temp}°C<br>
        ☁️ Clouds: ${data.clouds.all}%<br>
        💨 Wind: ${data.wind.speed} m/s<br>
        🌀 Pressure: ${data.main.pressure} hPa<br>
        📃 ${data.weather[0].description}
      `;
      this.marker?.remove();  // Remove previous marker if exists
      this.marker = L.marker([coords.lat, coords.lon], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(popupText)
        .openPopup();
    });
  }
}
