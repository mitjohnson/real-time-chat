import type { DatabaseSync } from "node:sqlite";
import type { User } from "@sharedTypes";
import { RawUserRow, UserModel } from "@types";

export function UserModelFactory(db: DatabaseSync): UserModel {
  function deSerializeUser(row: RawUserRow, raw: true): RawUserRow | null;
  function deSerializeUser(row: RawUserRow, raw: false): User | null;
  function deSerializeUser(row: RawUserRow, raw: boolean): User | RawUserRow | null {
    if (!row) return null;
    if (raw) return row;
    return {
      id: row.id,
      name: row.name,
      email: row.email
    };
}
  return {
    create({ name, email, password }: { name: string | null, email: string, password: string }): User | null {
      if (!email || !password) throw new Error("Username, Email, and password are required");
      
      const result = db.prepare(`
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `).run(name, email, password);

      if (result.changes === 0) throw new Error("Failed to create user");
      
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as RawUserRow;
      return deSerializeUser(row, false);
    },
    findById({ id, raw = false }: { id: number, raw?: boolean}) {
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as RawUserRow;
      return deSerializeUser(row, raw as any)
    },
    findByEmail({ email, raw = false }: { email: string, raw?: boolean }) {
      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as RawUserRow;
      return deSerializeUser(row, raw as any);
    },
  };
}
