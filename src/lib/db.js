import Database from 'better-sqlite3';
import path from 'path';

// Define the database path
const dbPath = path.resolve(process.cwd(), 'portfolio.db');

let db;

try {
  db = new Database(dbPath, { verbose: null });
  
  // Initialize tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      public_id TEXT NOT NULL UNIQUE,
      url TEXT NOT NULL,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      title TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
} catch (err) {
  console.error("Failed to connect to SQLite:", err);
}

export default db;

export function getAllPhotos() {
  const stmt = db.prepare('SELECT * FROM photos ORDER BY created_at DESC');
  return stmt.all();
}

export function addPhoto({ public_id, url, width, height, title }) {
  const stmt = db.prepare(`
    INSERT INTO photos (public_id, url, width, height, title)
    VALUES (@public_id, @url, @width, @height, @title)
  `);
  return stmt.run({ public_id, url, width, height, title });
}

export function deletePhoto(id) {
  const stmt = db.prepare('DELETE FROM photos WHERE id = ?');
  return stmt.run(id);
}

export function getPhotoById(id) {
  const stmt = db.prepare('SELECT * FROM photos WHERE id = ?');
  return stmt.get(id);
}
