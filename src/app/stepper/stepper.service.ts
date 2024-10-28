import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CalendarEvent} from '../model/CalendarEvent';
import Evento from '../model/Evento';

@Injectable({providedIn: 'root'})
export class StepperService {
  constructor(private readonly _http: HttpClient) { }

  getAvailability(date: string): Observable<CalendarEvent[]> {
    const params: HttpParams = new HttpParams().set('dateTime', date);
    return this._http.get<any[]>('https://list-event-573455215188.southamerica-east1.run.app/', { params }).pipe(
      map(events => events.map(response => new CalendarEvent(
        response.colorId,
        response.created,
        response.creator,
        response.end,
        response.etag,
        response.eventType,
        response.guestsCanInviteOthers,
        response.guestsCanSeeOtherGuests,
        response.htmlLink,
        response.iCalUID,
        response.id,
        response.kind,
        response.organizer,
        response.reminders,
        response.sequence,
        response.start,
        response.status,
        response.summary,
        response.transparency,
        response.updated
      )))
    );
  }

  createEvent(event: Evento): Observable<CalendarEvent> {
    return this._http.post<any>('https://save-event-573455215188.southamerica-east1.run.app/', event).pipe(
      map(response => new CalendarEvent(
        response.colorId,
        response.created,
        response.creator,
        response.end,
        response.etag,
        response.eventType,
        response.guestsCanInviteOthers,
        response.guestsCanSeeOtherGuests,
        response.htmlLink,
        response.iCalUID,
        response.id,
        response.kind,
        response.organizer,
        response.reminders,
        response.sequence,
        response.start,
        response.status,
        response.summary,
        response.transparency,
        response.updated
      ))
    );
  }
}
