export class Item {
  name: string; id?: number; category?: string; related?: {}[]; desc?: string;
  image?: string; attribute?: {}[]; testing?: {}; batch?: number; classifier?: {}[];
  produce?: string; cost?: number; tax?: number; price?: {}[]; history?: {}[]; consumer?: {}[];

  constructor(
    name: string, id?: number, category?: string, related?: {}[], desc?: string,
    image?: string, attribute?: {}[], testing?: {}[], batch?: number, classifier?: {}[],
    produce?: string, cost?: number, tax?: number, price?: {}[], history?: {}[], consumer?: {}[]
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.related = related;
    this.desc = desc;
    this.image = image;
    this.attribute = attribute;
    this.testing = testing;
    this.batch = batch;
    this.classifier = classifier;
    this.produce = produce;
    this.cost = cost;
    this.tax = tax;
    this.price = price;
    this.history = history;
    this.consumer = consumer;
  }

  static readonly EMPTY_MODEL = {
    name: '', id: 0, category: '', related: [], desc: '',
    image: '', attribute: [], testing: [], batch: 0, classifier: [],
    produce: '', cost: 0, tax: 0, price: [], history: [], consumer: []
  };

}


