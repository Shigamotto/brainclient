export class MaterialBOM {
  id: number; name: string; value:number; cost:number;
  amount?:number; desc?: string; image?:string; child?:MaterialBOM[]

  constructor(
    id: number, name: string, value:number, cost:number,
    amount?:number, desc?: string, image?:string, child?:MaterialBOM[]
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.cost = cost;
    this.amount = amount?amount:0;
    this.desc = desc?desc:'';
    this.image = image?image:'';
    this.child = child?child:[];
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
  name: string; id?: number;
  parent?: string; path?: string;
  draft?: boolean; org?: string;
  bill?: {}; bill_extra?: {};

  constructor(
    name: string, id?: number,
    parent?: string, path?: string,
    draft?: boolean, org?: string,
    bill?: MaterialBOM[], bill_extra?: MaterialBOM[]
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.path = path;
    this.draft = draft;
    this.org = org;
    this.bill = bill;
    this.bill_extra = bill_extra;
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    name: '',
    parent: '',
    path: '',
    draft: true,
    org: '',
    bill: [],
    bill_extra: []
  };
}
