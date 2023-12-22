import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

console.log("hello the imports worked");

const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

/* ----- Endpoints ----- */

app.get("/messages", function (request, response) {
  let messages = [];

  // check if the user has provided a query in the URL (/jokes?id=2)
  if (request.query.id) {
    messages = db
      .prepare(`SELECT * FROM messages WHERE id=${request.query.id}`)
      .all();
  } else {
    // if the URL has no query, get ALL the jokes
    messages = db.prepare("SELECT * FROM messages").all();
  }

  // send either the array of all the jokes, or just the one we queried for
  response.json(messages);
});

app.post("/messages", function (request, response) {
  console.log(request.body);
  const agentName = request.body.agentName;
  const secretMessage = request.body.secretMessage;

  const newJoke = db
    .prepare(`INSERT INTO messages (agentName, secretMessage) VALUES (?, ?)`)
    .run(agentName, secretMessage);

  response.json(newJoke);
});

app.get("/announcements", function (request, response) {
  let announcements = db.prepare("SELECT * FROM announcements").all();
  response.json(announcements);
});

app.listen(8080, () => {
  console.log("my server is running");
});
