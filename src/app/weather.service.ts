import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherTypeSubject = new BehaviorSubject<any>(null);  // ჯერ ვაყენებ null როგორც საწყის მნიშვნელობას
  weatherType$ = this.weatherTypeSubject.asObservable();

  private apiKey = '62f76f7cea70bfb2a2f32587a893ecd9';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  gethourly(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`);
  }

  // Update the current weather info in the BehaviorSubject
  fetchWeather(city: string) {
    this.getCurrentWeather(city).subscribe(data => {
      this.weatherTypeSubject.next(data);  // Push the weather data to the subject
    });
  }
}