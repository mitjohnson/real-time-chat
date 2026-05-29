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
    create: ({ roomId, content }): Message | null => {
      if (!roomId) throw new Error('roomId is required');

      const result = db.prepare(`
        INSERT INTO messages (room_id, content)
        VALUES (?, ?)
      `).run(roomId, content);
      
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
