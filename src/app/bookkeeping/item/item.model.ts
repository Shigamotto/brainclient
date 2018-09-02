import * as moment from 'moment';
import { Organization } from '../../organization/organization.model';
import { Category } from '../category/category.model';

export class Item {
  id: number; name: string; article?: string; category?: Category; category_name?: string; desc?: string;  related?: {}[];
  images?: {id?, name?, desc?, image?, is_top?, to_send?}[]; attribute?: {id?, name?, value?}[]; testing?: {id?, name?, value?}[];
  batch?: number; classifier?: {name?, value?}[];
  produce?: Organization; produce_name?: string; cost?: number; tax?: number; price?: {id?, name?, type?, price?, value?, update?}[];
  history?: {source?, count?, value?, tax?, discount?, date?, geo?}[]; consumer?: {id?, date?, name?, type?, value?, repeat?}[];

  constructor(
    id: number, name: string, article?: string, category?: Category, category_name?: string, desc?: string, related?: {}[],
    images?: {id?, name?, desc?, image?, is_top?, to_send?}[], attribute?: {id?, name?, value?}[], testing?: {id?, name?, value?}[],
    batch?: number, classifier?: {name?, value?}[],
    produce?: Organization, produce_name?: string, cost?: number, tax?: number, price?: {id?, name?, type?, price?, value?, update?}[],
    history?: {source?, count?, value?, tax?, discount?, date?, geo?}[], consumer?: {id?, date?, name?, type?, value?, repeat?}[]
  ) {
    this.id = id;
    this.name = name;
    this.article = article;
    this.category = category;
    this.category_name = category_name;
    this.desc = desc;
    this.related = related;
    this.images = images;
    this.attribute = attribute;
    this.testing = testing;
    this.batch = batch;
    this.classifier = classifier;
    this.produce = produce;
    this.produce_name = produce_name;
    this.cost = cost;
    this.tax = tax;
    this.price = price ? price.map((data) => {
      const new_data = data;
      new_data['update'] = moment(data.update).format('HH:mm / DD MMM YY');
      return new_data;
    }) : undefined;
    this.history = history ? history.map((data) => {
      const new_data = data;
      new_data['date'] = moment(data.date).format('HH:mm / DD MMM YY');
      return new_data;
    }) : undefined;
    this.consumer = consumer ? consumer.map((data) => {
      const new_data = data;
      new_data['date'] = moment(data.date).format('HH:mm / DD MMM YY');
      return new_data;
    }) : undefined;
  }

  static readonly EMPTY_MODEL = {
    id: 0, name: '', article: '', category: Category.EMPTY_MODEL, category_name: '-', desc: '', related: [],
    images: [], attribute: [], testing: [], batch: 0, classifier: [],
    produce: Organization.EMPTY_MODEL, produce_name: '-', cost: 0, tax: 0, price: [], history: [], consumer: []
  };

}


