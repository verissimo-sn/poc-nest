import { v4 as uuid } from 'uuid';

export class Task {
  readonly id?: string;

  readonly name: string;

  readonly description: string;

  readonly done: boolean;

  readonly user_id: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.done = false;
    }
  }
}
