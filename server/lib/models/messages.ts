import type { DatabaseSync } from 'node:sqlite'
import type { MessageModel, Message, RawMessageRow } from '../../../types/index.ts';

export function MessageModelFactory(db: DatabaseSync): MessageModel {
  function deserializeMessage(row: RawMessageRow): Message | null {
    if (!row) return null;
    return {
      id: row.id,
      roomId: row.room_id,
      content: row.content,
      timestamp: new Date(row.updated_at),
      sentBy: row.sent_by
    }; 
  };

  return {
    create: ({ roomId, content, sentBy }): Message | null => {
      if (!roomId || !content || !sentBy) throw new Error('Message Create: missing required fields');
      if (content.trim() === '') throw new Error('Message content cannot be empty');
      if (typeof sentBy !== 'number') throw new Error('sentBy must be a user ID (number)');

      const result = db.prepare(`
        INSERT INTO messages (room_id, content, sent_by)
        VALUES (?, ?, ?)
      `).run(roomId, content, sentBy);
      
      if (result.changes === 0) throw new Error('Failed to create message');
      return deserializeMessage(
        db.prepare('SELECT * FROM messages WHERE id = ?')
          .get(result.lastInsertRowid) as RawMessageRow
      );
    },
    findByRoomId: (roomId: string, limit = 50) => {
      const rows = db.prepare(`
        SELECT * FROM messages 
        WHERE room_id = ? 
        ORDER BY updated_at ASC 
        LIMIT ?
      `).all(roomId, limit) as RawMessageRow[];
      return rows.map(deserializeMessage).filter((msg): msg is Message => msg !== null);
    }
  }
};
