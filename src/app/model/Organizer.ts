export class Organizer {
  email: string;
  self: boolean;

  constructor(email: string, self: boolean) {
    this.email = email;
    this.self = self;
  }
}