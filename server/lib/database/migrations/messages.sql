CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    room_id TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);
