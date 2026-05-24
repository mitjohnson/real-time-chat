CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    room_id TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL
);
