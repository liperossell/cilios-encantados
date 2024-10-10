import {DateTime} from './DateTime';
import {Creator} from './Creator';
import {End} from './End';
import {Organizer} from './Organizer';
import {Reminders} from './Reminders';
import {Start} from './Start';
import {Updated} from './Updated';

export class CalendarEvent {
  colorId?: string;
  created: DateTime;
  creator: Creator;
  end: End;
  etag: string;
  eventType: string;
  guestsCanInviteOthers?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: string;
  organizer: Organizer;
  reminders: Reminders;
  sequence: number;
  start: Start;
  status: string;
  summary: string;
  transparency?: string;
  updated: Updated;

  constructor(
    colorId: string | undefined,
    created: DateTime,
    creator: Creator,
    end: End,
    etag: string,
    eventType: string,
    guestsCanInviteOthers: boolean | undefined,
    guestsCanSeeOtherGuests: boolean | undefined,
    htmlLink: string,
    iCalUID: string,
    id: string,
    kind: string,
    organizer: Organizer,
    reminders: Reminders,
    sequence: number,
    start: Start,
    status: string,
    summary: string,
    transparency: string | undefined,
    updated: Updated
  ) {
    this.colorId = colorId;
    this.created = created;
    this.creator = creator;
    this.end = end;
    this.etag = etag;
    this.eventType = eventType;
    this.guestsCanInviteOthers = guestsCanInviteOthers;
    this.guestsCanSeeOtherGuests = guestsCanSeeOtherGuests;
    this.htmlLink = htmlLink;
    this.iCalUID = iCalUID;
    this.id = id;
    this.kind = kind;
    this.organizer = organizer;
    this.reminders = reminders;
    this.sequence = sequence;
    this.start = start;
    this.status = status;
    this.summary = summary;
    this.transparency = transparency;
    this.updated = updated;
  }
}
