import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepperModule, StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {
  MatCalendar, MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent, MatDatepickerToggle
} from '@angular/material/datepicker';
import {StepperService} from './stepper.service';
import {CalendarEvent} from '../model/CalendarEvent';
import {MatChipListbox, MatChipListboxChange, MatChipOption} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  standalone: true,
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe, MatIcon, MatCard, MatCalendar, NgIf, MatDatepickerToggle, MatDatepicker, MatDatepickerInput, NgForOf, MatCardContent, MatCardTitle, MatCardSubtitle, MatCardHeader, MatCardFooter, MatChipListbox, MatChipOption, MatCardTitleGroup, MatCardActions, DatePipe,],
})
export class StepperComponent {
  @Output() readonly isLoading = new EventEmitter<boolean>();
  stepperOrientation: Observable<StepperOrientation>;
  availabilityResponse: CalendarEvent[] | undefined;
  private readonly _formBuilder = inject(FormBuilder);
  firstFormGroup = this._formBuilder.group({
    name: [undefined, Validators.required], email: [undefined, Validators.required], phone: [undefined, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    date: [undefined, Validators.required], time: ['', Validators.required],
  });

  constructor(private readonly _appStepperService: StepperService, private readonly _snackBar: MatSnackBar) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    // TODO Check for closed date?
    return day !== 0 && day !== 6;
  };

  getAvailability(event: MatDatepickerInputEvent<any, any>) {

    const date = event.value as Date;

    this.isLoading.emit(true);

    this._appStepperService.getAvailability(date.toISOString()).subscribe({
      next: (availabilityResponse) => {
        this.availabilityResponse = availabilityResponse;
      }, error: (err) => {
        this.showError(err);
      }, complete: () => {
        this.isLoading.emit(false);
      }
    })
  }

  onSelectionChange($event: MatChipListboxChange) {
    this.secondFormGroup.get('time')?.setValue(new Date($event.value).toISOString());
  }

  onSave() {

    const event = {
      name: this.firstFormGroup.get('name')?.value,
      phone: this.firstFormGroup.get('phone')?.value,
      email: this.firstFormGroup.get('email')?.value,
      time: this.secondFormGroup.get('time')?.value,
    };

    this.isLoading.emit(true);

    this._appStepperService.createEvent(event).subscribe({
      next: (response) => {
        const ics = this.eventToICS(response);
        this.downloadICSFile(ics);
        this.isLoading.emit(false);
      }, error: (err) => {
        this.openSnackBar(`Ocorreu um erro ${err.status}`, "OK")
      }, complete: () => {
        this.isLoading.emit(false);
      }
    });
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 1450
    });
  }

  downloadICSFile(icsContent: string) {
    const blob = new Blob([icsContent], {type: 'text/calendar'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ciliosEncantados.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  protected openWhatsAppLink() {
    const name = this.firstFormGroup.get('name')?.value;
    if (name) window.open(`https://wa.me/5548988410133?text=Oi, meu nome é ${name} e fiz um agendamento. Gostaria de mais informações.`, '_blank'); else window.open('https://wa.me/5548988076922?', '_blank');

  }

  protected eventToICS(event: any): string {
    const pad = (num: number): string => (num < 10 ? '0' + num : num.toString());

    const formatDate = (date: Date): string => {
      return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
    };

    const startDate = new Date(event.start.dateTime?.value || event.start?.date?.value);
    const endDate = new Date(event.end.dateTime?.value || event.end?.date?.value);
    const description = 'Seu agendamento em Cílios Encantados'
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Your Organization//Your Product//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:${event.id}`, `DTSTAMP:${formatDate(new Date())}`, `DTSTART:${formatDate(startDate)}`, `DTEND:${formatDate(endDate)}`, `SUMMARY:${event.summary}`, `DESCRIPTION:${description}`, `LOCATION:${event.location}`, `STATUS:${event.status}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  }

  private showError(err: any) {
    this.openSnackBar(`Ocorreu um erro (${err.status})`, "OK")
  }
}
