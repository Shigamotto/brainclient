import * as moment from 'moment';

export class MaterialBOM {
  id: string; name: string; count: number; price: number; bom_id?: number;
  amount?: number; desc?: string; image?: string; over: boolean; child?: MaterialBOM[];
  bom_service_id?: string; bom_service_child?: string[]; bom_service_level?: number; bom_service_parent?: string; bom_service_over?: boolean;

  constructor(
    id: string, name: string, count: number, price: number, bom_id?: number,
    desc?: string, image?: string, child?: MaterialBOM[], amount?: number,
    bom_service_id?: string, bom_service_child?: string[], bom_service_level?: number, bom_service_parent?: string, bom_service_over?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.count = count;
    this.price = price;
    this.amount = amount ? amount : 0;
    this.desc = desc ? desc : '';
    this.image = image ? image : '';
    this.bom_id = bom_id ? bom_id : undefined;
    this.child = child ? child : [];
    this.over = false;
    this.bom_service_id = bom_service_id ? bom_service_id : undefined;
    this.bom_service_child = bom_service_child ? bom_service_child : [];1
    this.bom_service_level = bom_service_level ? bom_service_level : 0;
    this.bom_service_over = bom_service_over ? bom_service_over : false;
    if (bom_service_parent) {
      this.bom_service_parent = bom_service_parent;
    }
  }

  static readonly EMPTY_MODEL = {
    id: '',
    name: '',
    count: 0,
    price: 0,
    over: false,
    child: [],
    bom_service_level: -1,
  };
}

export class BOM {
  name: string; id?: number; date_pub?: string; desc?: string;  amount?: number; // item
  parent?: string; draft?: boolean; org?: string; bom_service_bill?: string[];
  // bill?: {id?, name?, count?, price?, bom_id?}[]; bill_extra?: {id?, name?, count?, price?}[];
  bill?: MaterialBOM[]; bill_extra?: MaterialBOM[];
  path?: string;

  constructor(
    name: string, id?: number, date_pub?: string, desc?: string, amount?: number,
    parent?: string, draft?: boolean, org?: string,
    // bill?: MaterialBOM[], bill_extra?: MaterialBOM[],
    bill?: MaterialBOM[], bill_extra?: MaterialBOM[],
    path?: string
  ) {
    this.id = id;
    this.name = name;
    this.date_pub = moment(date_pub).format('DD MMM YY');
    this.desc = desc;
    this.amount = amount;
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
