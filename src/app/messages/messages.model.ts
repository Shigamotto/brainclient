import * as moment from 'moment';

export class Message {
  id: number;
  date: string;
  body: string;
  from: string;
  to?: string;
  subject?: string;
  flags?: string;
  unseen?: boolean;

  constructor(
    id: number,
    date: string,
    body: string,
    from: string,
    to?: string,
    subject?: string,
    flags?: string,
    unseen?: boolean
  ) {
    this.id = id;
    this.date = moment(date).format('HH:mm / DD MMM YY');
    this.body = body;
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.flags = flags;
    this.unseen = unseen;
  }
  static readonly EMPTY_MODEL = {
    id: 0,
    date: '',
    body: '',
    from: '',
    to: '',
    subject: '',
    flags: '',
    unseen: false
  };
}

export class Dialog {
  id: number;
  update: string;
  users: {username}[];
  messages: Message[];
  unseen?: boolean;

  constructor(
    id: number,
    update: string,
    users: {username}[],
    messages: Message[],
    unseen?: boolean
  ) {
    this.id = id;
    this.update = moment(update).format('HH:mm / DD MMM YY');
    this.users = users;
    this.messages = messages;
    this.unseen = unseen;
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    update: '',
    users: [],
    messages: [],
    unseen: false,
  };
}
