import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _isMenuOpen = false;

  constructor() { }

  toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
  }

  isMenuOpen(): boolean {
    return this._isMenuOpen;
  }
}
