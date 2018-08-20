export class Warehouse {
  id: number; name: string;
  owner?: {org?:string; user?:string;};
  list?: {id?:number;name?:string; value?:number; keep?:boolean;}[];

  constructor(
    id: number, name: string,
    owner?: {org?:string; user?:string;},
    list?: {id?:number;name?:string; value?:number; keep?:boolean;}[],
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.list = list;
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    name: '',
    owner: {},
    list: []
  };

}


