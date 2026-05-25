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
      sent: false
    }; 
  };

  return {
    create: ({ roomId, content, timestamp }): Message | null => {
      if (!roomId) throw new Error('roomId is required');
      if (timestamp instanceof Date) timestamp = timestamp.getTime();

      const result = db.prepare(`
        INSERT INTO messages (room_id, content, timestamp)
        VALUES (?, ?, ?)
      `).run(roomId, content, timestamp);
      
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
        ORDER BY timestamp ASC 
        LIMIT ?
      `).all(roomId, limit) as RawMessageRow[];
      return rows.map(deserializeMessage).filter((msg): msg is Message => msg !== null);
    }
  }
};
