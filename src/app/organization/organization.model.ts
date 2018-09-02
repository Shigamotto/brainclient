export class Organization {
  id: number; name: string; identifier?: string; parent: string; requisites?: {}[];
  geo?: string; item_receive?: {}[]; item_produce?: {}[]; price?: {}[]; group?: {id?; name?}[];

  constructor(
    id: number, name: string, identifier?: string, parent?: string,  requisites?: {}[],
    geo?: string, item_receive?: {}[], item_produce?: {}[], price?: {}[], group?: {id?; name?}[]
  ) {
    this.id = id;
    this.name = name;
    this.identifier = identifier;
    this.parent = parent;
    this.requisites = requisites;
    this.geo = geo;
    this.item_receive = item_receive;
    this.item_produce = item_produce;
    this.price = price;
    this.group = group
  }

  static readonly EMPTY_MODEL = {
    id: 0, name: '', identifier: '', parent: '', requisites: [],
    geo: '', item_receive: [], item_produce: [], price: [], group: []
  };

}


