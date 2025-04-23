import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeProgressComponent } from './theme-progress.component';

describe('ThemeProgressComponent', () => {
  let component: ThemeProgressComponent;
  let fixture: ComponentFixture<ThemeProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
