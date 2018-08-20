import * as moment from 'moment';

export class Task {
  id: number; title: string; budget: number; desc: string;
  status: {};
  date: { pub; start; end; dead; };
  status_history?: { date; status; };
  from?: { organization?: any; user?: any;  };
  to?: { organization?: any; user?: any; };
  assigned_to?: {};
  attach?: {};
  kanban_tag?: string;

  constructor(
    id: number,
    title: string,
    date: { pub; start; end; dead; },
    budget: number = 0,
    status: {},
    status_history?: { date; status; },
    from?: { organization?: any; user?: any;  },
    to?: { organization?: any; user?: any; },
    desc?: string,
    assigned_to?: {},
    attach?: {},
    kanban_tag?: string
    ) {
    this.id = id;
    this.title = title;
    this.date = date; // moment(date).format('HH:mm / DD MMM YY');
    this.budget = budget;
    this.status = status;
    this.status_history = status_history;
    this.from = from;
    this.to = to;
    this.desc = desc;
    this.assigned_to = assigned_to;
    this.attach = attach;
    this.kanban_tag = kanban_tag;
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    title: '',
    date: {pub: '', start: '', end: '', dead: ''},
    budget: 0,
    status: {},
    status_history: {date: '', status: 0},
    from: {},
    to: {},
    desc: '',
    assigned_to: {},
    attach: {}
  };
}
/*
export class Task {
    pk: number;
    title: string;
    start:	string;
    end: string;
    allDay:	boolean;
  }
*/
