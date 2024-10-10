export class DateTime {
  value: number;
  dateOnly: boolean;
  timeZoneShift: number;

  constructor(value: number, dateOnly: boolean, timeZoneShift: number) {
    this.value = value;
    this.dateOnly = dateOnly;
    this.timeZoneShift = timeZoneShift;
  }
}
