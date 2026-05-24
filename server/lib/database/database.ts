import { DatabaseSync } from 'node:sqlite';

export function createDatabase(migrations: Array<string>): DatabaseSync {
  const db = new DatabaseSync('./chat.db');

  if (migrations) migrations.forEach(migration => db.exec(migration));
    
  return db;
}
