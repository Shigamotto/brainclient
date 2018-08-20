export class Kanban {
  name: string;
  cards: string[];
  tag: string;
}

export class Card {
  id: string;
  title: string;
  desc: string;
  update: string;
  confirming?: boolean;
}
