import * as moment from 'moment';

export class MaterialBOM {
  id: number; name: string; count: number; price: number;
  amount?: number; desc?: string; image?: string; child?: MaterialBOM[];

  constructor(
    id: number, name: string, count: number, price: number,
    amount?: number, desc?: string, image?: string, child?: MaterialBOM[]
  ) {
    this.id = id;
    this.name = name;
    this.count = count;
    this.price = price;
    this.amount = amount ? amount : 0;
    this.desc = desc ? desc : '';
    this.image = image ? image : '';
    this.child = child ? child : [];
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    name: '',
    value: 0,
    cost: 0,
    amount: 0,
    desc: '',
    image: '',
    child: []
  };
}

export class BOM {
  name: string; id?: number; date_pub?: string; desc?: string;
  parent?: string; draft?: boolean; org?: string;
  bill?: {id?, name?, count?, price?, bom_id?}[]; bill_extra?: {id?, name?, count?, price?}[];
  path?: string;

  constructor(
    name: string, id?: number, date_pub?: string, desc?: string,
    parent?: string, draft?: boolean, org?: string,
    // bill?: MaterialBOM[], bill_extra?: MaterialBOM[],
    bill?: {id?, name?, count?, price?, bom_id?}[], bill_extra?: {id?, name?, count?, price?}[],
    path?: string
  ) {
    this.id = id;
    this.name = name;
    this.date_pub = moment(date_pub).format('DD MMM YY');
    this.desc = desc;
    this.parent = parent;
    this.path = path;
    this.draft = draft;
    this.org = org;
    this.bill = bill;
    this.bill_extra = bill_extra;
  }

  static readonly EMPTY_MODEL = {
    name: '',
    id: 0,
    date_pub: '',
    desc: '',
    parent: '',
    path: '',
    draft: true,
    org: '',
    bill: [],
    bill_extra: []
  };
}
