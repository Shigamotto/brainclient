// import {Task} from '../projects.model';
import {Kanban, Card} from './kanban.model';
import {Task} from '../projects.model';

export class KanbanService {
  cards: Object = {};
  lastid = 0;
  _addCard(card: Card, id?: string ) {
    card.id = id ? id : String(++this.lastid);
    this.cards[card.id] = card;
    return (card.id);
  }

  getCard(cardId: string) {
    return this.cards[cardId];
  }

  newCard(title: string, description: string, update?: string, id?: string): string {
   const task = new Card();
   task.title = title;
   task.desc = description;
   task.update = update;
   return (this._addCard(task, id));
  }

}
