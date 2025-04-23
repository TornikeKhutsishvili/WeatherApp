import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeProgressComponent } from "../theme-progress/theme-progress.component";
import { RouterLink, RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-navigation',
  imports: [
    CommonModule,
    ThemeProgressComponent,
    RouterLink,
    RouterModule,
    FormsModule
],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isCollapse = true;
  isDarkMode: boolean;

  isblack:string = '';
  islight:string = '';

  sun = '☀';
  moon = '🌙';

  constructor(private themeService:ThemeService){
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.isblack = '#343a40';
    this.islight = '#f8f9fa';
  }

  ngOnInit() {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

}
