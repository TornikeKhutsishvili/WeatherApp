import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-theme-progress',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './theme-progress.component.html',
  styleUrls: ['./theme-progress.component.css']
})
export class ThemeProgressComponent implements OnChanges{

  @Input() progress: number = 0;
  @Input() themeColor: string = '#ffffff'


  progresStyle: { width:string; background: string } = { width:'0%', background:'#ffffff' };


  ngOnChanges(changes: SimpleChanges): void {
  }
}
