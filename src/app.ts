import express from "express";
import { Database } from "bun:sqlite";

const db = new Database("app.db", { create: true });

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

const app = express();

app.use(express.json());

app.get("/users", (_req, res) => {
  res.json(db.query("SELECT * FROM users").all());
});

app.post("/users", (req, res) => {
  const { name } = req.body;

  const result = db.query("INSERT INTO users (name) VALUES (?)").run(name);

  res.status(201).json({ id: result.lastInsertRowid, name });
});

export default app;
