import sharedb from "sharedb/lib/client";
import StringBinding from "sharedb-string-binding";
import ReconnectingWebSocket from "reconnecting-websocket";
import showdown from "showdown";

const socket = new ReconnectingWebSocket("ws://" + window.location.host);
const connection = new sharedb.Connection(socket);
const converter = new showdown.Converter();

const pad = document.getElementById("pad") as HTMLTextAreaElement | null;
const markdownDiv = document.getElementById("markdown") as HTMLElement | null;

pad.addEventListener("input", convert);

const doc = connection.get("docs", "markdown");
doc.subscribe(function (err) {
  if (err) throw err;

  var binding = new StringBinding(pad, doc, ["content"]);
  binding.setup();

  convert();

  doc.on("op", function () {
    convert();
  });
});

function convert() {
  const markdownText = pad.value;
  const html = converter.makeHtml(markdownText);
  markdownDiv.innerHTML = html;
}
