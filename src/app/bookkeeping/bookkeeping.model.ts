export class BookSheet {
  id: number; title: string; simple: boolean;
  desc: string;
  date_pub: string;
  amount: number;
  created_by: string;
  status_pay: number;
  status_get: number;
  lines?: {name; price; count; amount}[];
  status_history?: { date?; status?; }[];
  from?: { organization?: any; user?: any;  };
  to?: { organization?: any; user?: any; };
  warehouse?: string;
  refers?: {}[];
  attach?: {}[];

  constructor(
    id: number,
    title: string,
    simple: boolean,
    desc: string,
    date_pub: string,
    amount: number,
    created_by: string,
    status_pay: number,
    status_get: number,
    lines?: [{name, price, count, amount}],
    status_history?: [{ date; status; }],
    from?: { organization?: any; user?: any; },
    to?: { organization?: any; user?: any; },
    warehouse?: string,
    refers?: [{}],
    attach?: [{}],
  ) {
    this.id = id;
    this.title = title;
    this.simple = simple;
    this.desc = desc;
    this.lines = lines;
    this.date_pub = date_pub;
    this.amount = amount;
    this.created_by = created_by;
    this.status_pay = status_pay;
    this.status_get = status_get;
    this.status_history = status_history;
    this.from = from;
    this.to = to;
    this.warehouse = warehouse;
    this.refers = refers;
    this.attach = attach;
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    title: '',
    simple: true,
    desc: '',
    lines: [],
    date_pub: '',
    amount: 0,
    created_by: '',
    status_pay: 0,
    status_get: 0,
    status_history: [],
    from: {},
    to: { },
    warehouse: '',
    refers: [],
    attach: [],
  };

}
