import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

console.log("hello the imports worked");

const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("my server is running");
});
