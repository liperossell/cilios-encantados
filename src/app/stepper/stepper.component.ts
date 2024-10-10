import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle, MatCardTitleGroup
} from '@angular/material/card';
import {
  MatCalendar,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {StepperService} from './stepper.service';
import {CalendarEvent} from '../model/CalendarEvent';
import {MatChipListbox, MatChipListboxChange, MatChipOption} from '@angular/material/chips';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatIcon,
    MatCard,
    MatCalendar,
    NgIf,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    NgForOf,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardFooter,
    MatChipListbox,
    MatChipOption,
    MatCardTitleGroup,
    MatCardActions,
    DatePipe,
  ],
})
export class StepperComponent {
  @Output() readonly isLoading = new EventEmitter<boolean>();
  private readonly _formBuilder = inject(FormBuilder);
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    // TODO Check for closed date?
    return day !== 0 && day !== 6;
  };

  availabilityResponse: CalendarEvent[] | undefined;

  constructor(private readonly _appStepperService: StepperService) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  getAvailability(event: MatDatepickerInputEvent<any, any>) {
    const date = event.value as Date;
    this.isLoading.emit(true);

    this._appStepperService.getAvailability(date.toISOString()).subscribe((availabilityResponse) => {
      this.availabilityResponse = availabilityResponse;

      this.isLoading.emit(false);
    })
  }

  onSelectionChange($event: MatChipListboxChange) {
    this.secondFormGroup.get('time')?.setValue(new Date($event.value.dateTime.value).toISOString());
  }
}