/* ----- Third Party Imports ----- */
import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

/* ----- Server Setup ----- */
const db = new Database("database.db");
const app = express();
app.use(express.json());
app.use(cors());

/* ----- Root Message ----- */
const rootMessage = {
  from: "Darth Vader",
  to: "You",
  message: "I am your Father"
}

/* ----- Endpoints ----- */
app.get("/", (req,res) => {
  response.json(rootMessage);
});

app.get("/treadstone_messages", function (request, response) {
  let messages = [];
  if (request.query.id) {
    messages = db.prepare(`SELECT * FROM treadstone_agent_messages WHERE id=${request.query.id}`).all();
  } else {
    messages = db.prepare("SELECT * FROM treadstone_agent_messages").all();
  }
  response.json(messages);
});

app.post("/treadstone_messages", function (request, response) {
  console.log(request.body);
  const agentName = request.body.agentName;
  const secretMessage = request.body.secretMessage;
  const reaction = request.body.reaction;
  if(agentName=='' || secretMessage=='') {
    response.json("stop sending empty messages to the server")
  } else {
    const newMessage = db.prepare(`INSERT INTO treadstone_agent_messages (agentName, secretMessage, reaction, likes) VALUES (?, ?, ?, ?)`).run(agentName, secretMessage, reaction, 0);
    response.json(newMessage);
  }
});

app.post("/treadstone_deletemsg", function (request, response) {
  const deleteMsg = db.prepare(`DELETE FROM treadstone_agent_messages WHERE id=${request.body.id}`).run();
  response.status(200).send("Message Successfully Deleted");
});

app.post("/treadstone_likemsg", function (request, response) {
  let numLikes = db.prepare(`SELECT likes FROM treadstone_agent_messages WHERE id=${request.body.id}`).all();
  let newLikes = numLikes[0].likes + 1;
  const incrementLikes = db.prepare(`UPDATE treadstone_agent_messages SET likes=${newLikes} WHERE id=${request.body.id}`).run();
  response.status(200).send("Message Successfully Liked");
});

app.get("/treadstone_announcements", function (request, response) {
  let announcements = db.prepare("SELECT * FROM treadstone_supervisor_message").all();
  response.json(announcements);
});

/* ----- Run Server ----- */
app.listen(9000, () => {
  console.log("CIA server is running");
});