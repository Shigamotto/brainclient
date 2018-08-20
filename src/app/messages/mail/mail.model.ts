export class Mail {
  id:number;
  subject: string;
  msg_from: string;
  msg_to: string;
  date: string;
  flags: string;
  user: string;
  body?:string;

  constructor(
    id:number,
    subject: string,
    msg_from: string,
    msg_to:string,
    date: string,
    flags: string,
    user: string,
    body?:string
  ) {
    this.id = id;
    this.subject = subject;
    this.msg_from = msg_from;
    this.msg_to = msg_to;
    this.date = date;
    this.flags = flags;
    this.user = user;
    this.body = body;
  };
}
