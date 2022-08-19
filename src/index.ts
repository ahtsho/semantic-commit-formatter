import fastify from "fastify";
import { samples, Commit } from "./commit";
import fs from "fs";
const server = fastify();

server.get("/commit/samples", async (request, reply) => {
  return [samples];
});

server.post("/commit/format", async (request, reply) => {
  const validComment: Commit = request.body;
  const scope = validComment.scope ? `(${validComment.scope})` : "";
  const body = validComment.body ? validComment.body.join("\n") : "";
  const footer = validComment.footer
    ? validComment.footer
        .map((f) => {
          return `${f.name.replace(/ /g, "-")}: ${f.description}`;
        })
        .join("\n")
    : "";
  const formattedComment =
    `${validComment.type}${scope}${validComment.breaking_change_danger}:${validComment.description}\n` +
    `${body}\n
    ${footer}`;
  reply.send(formattedComment);
});
server.get("/commit/input", async (request, reply) => {
  /*const stream = fs.createReadStream("commit-input.html");
  reply.type("text/html").send(stream);*/
  reply.type("text/html").send(
    `<html><head>` +
      `<title>SEMITTER (the SEMantic gIt commit formaTTER)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />` +
      `</head>` +
      `<body><h1>Semitter</h1>` +
      `<h3>\${user}:"WHAT? You mean I can insert my git commit here and <b>semmitter</b>(the semantic git commit formatter) will give it back to ctl-c + ctl-v on my git repo? Word up!!!"</h2>` +
      `<h2>Conventional commits are a low hanging fruit now!!!</h3>` +
      `<form id="cmd-format">` +
      `<label for="cmt-type">Choose type (*) </label>` +
      `<select name="cmt-type" id="cmt-type">` +
      `<option value="fix">Fix</option>` +
      `<option value="feat">Feture</option>` +
      `</select> <br>` +
      `<label for="cmt-scope">Do you want to drop in a single word scope? </label>` +
      ` (<input type="text" id="cmt-scope" name="cmt-scope" size="15" placeholder="code-base-section">)<br>` +
      `<label for="cmt-breaking_change_danger">If you feel like this is potentially a breaking change this is a good time to say it with a "!" </label>` +
      `<input type="checkbox" id="breaking_change_danger" name="breaking_change_danger" value="!"><br>` +
      `<label for="cmt-description">You have to add a 1 line description of the commit (*) </label>` +
      `<input type="text" id="cmt-description" name="cmt-description" size="30" placeholder="brief commit summary one liner"><br>` +
      `<label for="cmt-body">If you're in the mood, you can be more specific and add as many lines of description as you want. Maybe not more than the codebase </label> <br>` +
      `<textarea id="cmt-body" name="cmt-body" rows="4" cols="100"placeholder="Introduce a request id and a reference to latest request. 
Dismissincoming responses other than from latest request. 
Remove timeouts which were used to mitigate the racing issue but are obsolete now."></textarea><br>` +
      `<label for="cmt-footer">You can also add footers </label>` +
      `<div id="cmt-footer">` +
      `<input type="text" id="cmt-footer-name-1" size="10" name="cmt-footer-name-1" placeholder="Reviewed-by"><input type="text" size="50" id="cmt-footer-description-1" name="cmt-footer-description-1" placeholder="Mr Abc"><br>` +
      `<input type="text" id="cmt-footer-name-2" size="10" name="cmt-footer-name-2" placeholder="Refs"><input type="text" size="50" id="cmt-footer-description-2" name="cmt-footer-description-2" placeholder="#jira_task"><br>` +
      `</div><br>` +
      `<button type="button" onclick="sendFormatReq()">Format please!</button>` +
      `</form><br>` +
      `<textarea id="formatted-comment"></textarea>` +
      `</body>
      <script>
        async function sendFormatReq(){
            const req = {
                type: document.getElementById("cmt-type").value,
                scope: document.getElementById("cmt-scope").value,
                breaking_change_danger: document.getElementById("breaking_change_danger").checked?"!":"",
                description: document.getElementById("cmt-description").value,
                body: document.getElementById("cmt-body").value.split("\\n"),
                footer: [{
                    name: document.getElementById("cmt-footer-name-1").value,
                    description: document.getElementById("cmt-footer-description-1").value
                },
                {
                    name: document.getElementById("cmt-footer-name-2").value,
                    description: document.getElementById("cmt-footer-description-2").value
                }]
            }
                
            let response = await fetch('http://localhost:8081/commit/format', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
            let text = await response.text(); 
            document.querySelector("#formatted-comment").innerHTML = text;

        }
    </script>
      </html>`
  );
});

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
