import {DateTime} from './DateTime';

export class End {
  dateTime: DateTime;
  timeZone: string;

  constructor(dateTime: DateTime, timeZone: string) {
    this.dateTime = dateTime;
    this.timeZone = timeZone;
  }
}
