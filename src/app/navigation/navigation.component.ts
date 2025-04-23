import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ThemeProgressComponent } from "../theme-progress/theme-progress.component";
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
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

  isblack: string = '#343a40';
  islight: string = '#f8f9fa';

  sun = '☀';
  moon = '🌙';

  constructor(private themeService: ThemeService, private router: Router) {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.collapseNavbar();
      }
    });
  }

  ngOnInit() {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

  collapseNavbar() {
    // თუ მენიუ გახსნილია, დავხუროთ
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  // ვუსმენ ნებისმიერ დაწკაპუნებას მენიუს ბმულზე
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'A' &&
      target.closest('.navbar-nav') // მხოლოდ ნავბარის ბმულებზე
    ) {
      this.collapseNavbar();
    }
  }

}
