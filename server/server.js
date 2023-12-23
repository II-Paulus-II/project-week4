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

  // check if the user has provided a query in the URL 
  if (request.query.id) {
    messages = db.prepare(`SELECT * FROM messages WHERE id=${request.query.id}`).all();
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
  const reaction = request.body.reaction;

  const newMessage = db.prepare(`INSERT INTO messages (agentName, secretMessage, reaction) VALUES (?, ?, ?)`).run(agentName, secretMessage, reaction);

  response.json(newMessage);
});

app.post("/deletemsg", function (request, response) {
  console.log(request.body);
  const deleteMsg = db.prepare(`DELETE FROM messages WHERE id=${request.body.id}`).run();
  response.json("received delete request");
});

app.post("/likemsg", function (request, response) {
  let numLikes = db.prepare(`SELECT likes FROM messages WHERE id=${request.body.id}`).all();
  console.log("received like message")
  console.log(numLikes);
  console.log(numLikes[0].likes);
  let newLikes = numLikes[0].likes + 1;
  const incrementLikes = db.prepare(`UPDATE messages SET likes=${newLikes} WHERE id=${request.body.id}`).run();
});

app.get("/announcements", function (request, response) {
  let announcements = db.prepare("SELECT * FROM announcements").all();
  response.json(announcements);
});

app.listen(8080, () => {
  console.log("my server is running");
});
