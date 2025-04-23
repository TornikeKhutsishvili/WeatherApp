import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NavigationComponent,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
  themeProgress = 70;
  constructor(){}

  ngOnInit() {
  }
}
