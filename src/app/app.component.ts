import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StepperComponent} from './stepper/stepper.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StepperComponent, MatProgressBar, NgIf],
  providers: [{provide: DateAdapter, useClass: NativeDateAdapter}, {
    provide: MAT_DATE_FORMATS, useValue: {
      parse: {
        dateInput: 'DD.MM.YYYY',
      }, display: {
        dateInput: 'DD.MM.YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'LL', monthYearA11yLabel: 'MMMM-YYYY',
      }
    }
  }, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, // Optional: Set your locale
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cilios-encantados'
  _isLoading: boolean = false;

  isLoading(event: boolean) {
    this._isLoading = event;
  }
}
