import Dexie from 'dexie';
import { populate } from './populate';

export class DB extends Dexie {
  constructor() {
    super('dc_db');
    this.version(1).stores({
        chat_history: '++id, role, content',
        conversations: '++id, title, chat_history',
        personas: '++id, name, system_message',
    });
  }
}

export const db = new DB();

//Populate Personas
db.on('populate', populate);