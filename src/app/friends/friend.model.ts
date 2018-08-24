export class Friend {
  id: number; name: string; username: string;
  avatar?: string;

  constructor(
    id: number, name: string, username: string,
    avatar?: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.avatar = avatar;
  }

  static readonly EMPTY_MODEL = {
    id: 0,
    name: '',
    username: '',
    avatar: ''
  };

}


