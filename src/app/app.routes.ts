import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'weather', component: WeatherComponent }
];
