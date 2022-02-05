import { v4 as uuid } from 'uuid';

export class User {
  readonly id?: string;

  readonly name: string;

  readonly email: string;

  readonly password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
