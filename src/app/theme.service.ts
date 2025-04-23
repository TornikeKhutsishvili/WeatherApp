import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'theme';
  private cityKey = 'city';
  // private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  // private apiKey = '62f76f7cea70bfb2a2f32587a893ecd9';

  constructor(private http:HttpClient) {
    this.loadTheme();
  }

  /** 🔹 თემის გადართვა (ხელით შეცვლა) */
  toggleTheme(): void {
    const currentTheme = localStorage.getItem(this.themeKey) || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.saveTheme(newTheme);
  }

  /** 🔹 თემის ჩატვირთვა (შენახული ან ამინდის მიხედვით) */
  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      document.body.setAttribute('data-bs-theme', savedTheme);
    }
  }

  /** 🔹 თემის შენახვა localStorage-ში */
  saveTheme(theme: string): void {
    localStorage.setItem(this.themeKey, theme);
    document.body.setAttribute('data-bs-theme', theme);
  }

  /** 🔹 თემის ფერის შეცვლა ტემპერატურის მიხედვით */
  private updateThemeColorByTemperature(temp: number): void {
    let themeColor = '#ffffff'; // Default color

    if (temp < 5) {
      themeColor = '#4a90e2'; // Cold - Blue
    } else if (temp >= 5 && temp < 20) {
      themeColor = '#ffc107'; // Normal - Yellow
    } else {
      themeColor = '#ff5722'; // Hot - Red
    }

    document.documentElement.style.setProperty('--theme-color', themeColor);
  }

  /** 🔹 მომხმარებლის ქალაქის შენახვა */
  setUserCity(city: string): void {
    localStorage.setItem(this.cityKey, city);
  }
}

