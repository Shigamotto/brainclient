import {Friend} from '../friends/friend.model';

export class Profile {
  username: string;
  ltdmode: boolean;
  first_name: string;
  last_name: string;
  friends: Friend[];
  image?: string;
  password?: string;
  active?: boolean;
  organization?: {name?: string; id?: string; groups?}[];
  chose_organization?: string;
  mailboxes?: {boxuser?; boxtype?; boxpass?; boxserv?; boxfetch?}[];

  constructor(
    username: string,
    ltdmode: boolean,
    first_name: string,
    last_name: string,
    friends: Friend[],
    image?: string,
    password?: string,
    active?: boolean,
    organization?: {}[],
    chose_organization?: string,
    mailboxes?: {boxuser?; boxtype?; boxpass?; boxserv?; boxfetch?}[]
    ) {
    this.username = username;
    this.ltdmode = ltdmode;
    this.first_name = first_name;
    this.last_name = last_name;
    this.friends = friends;
    this.image = image;
    this.password = password;
    this.active = active;
    this.organization = organization;
    this.chose_organization = chose_organization;
    this.mailboxes = mailboxes;
  }

  static readonly EMPTY_MODEL = {
    username: '',
    ltdmode: false,
    first_name: '',
    last_name: '',
    friends: [],
    image: '',
    password: '',
    active: true,
    organization: [],
    mailboxes: []
  };

}
