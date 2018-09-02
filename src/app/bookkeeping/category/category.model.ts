export class Category {
  id: number; name: string; parent?: string; property?: {}[];

  constructor(
    id: number, name: string, parent?: string, property?: {}[]
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.property = property;
  }

  static readonly EMPTY_MODEL = {
    id: 0, name: '', parent: '', property: []
  };

}


