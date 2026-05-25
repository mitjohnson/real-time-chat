import type { DatabaseSync } from "node:sqlite";
import type { User, RawUserRow, UserModel } from "../../../types";

export function UserModelFactory(db: DatabaseSync): UserModel {
  function deSerializeUser(row: RawUserRow): User | null {
    if (!row) return null;

    return {
      id: row.id,
      name: row?.name ?? null,
      email: row.email,
      password: row.password,
    };
  };

  return {
    create({ name, email, password }: { name: string | null, email: string, password: string }): User | null {
      if (!email || !password) throw new Error("Username, Email, and password are required");
      
      const result = db.prepare(`
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `).run(name, email, password);

      if (result.changes === 0) throw new Error("Failed to create user");
      
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as RawUserRow;
      return deSerializeUser(row);
    },
    findById(id: number): User | null {
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as RawUserRow;
      return deSerializeUser(row);
    },
    findByEmail(email: string): User | null {
      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as RawUserRow;
      return deSerializeUser(row);
    },
  };
}
