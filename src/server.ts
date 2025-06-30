import express from "express";
import path from "path";
import http from "http";
import WebSocket from "ws";
import WebSocketJSONStream from "@teamwork/websocket-json-stream";
import ShareDB from "sharedb";

const port = process.env.PORT || 3000;
const backend = new ShareDB();

const connection = backend.connect();
const doc = connection.get("docs", "markdown");
doc.fetch(function (err) {
  if (err) throw err;
  if (doc.type === null) {
    doc.create({ content: "" }, init);
    return;
  }
  init();
});

function init() {
  const app = express();
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.get("/", (req, res) => {
    res.render("pad");
  });

  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server: server });
  wss.on("connection", (ws: WebSocket) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(port);
  console.log(`Server running at ${port}`);
}
