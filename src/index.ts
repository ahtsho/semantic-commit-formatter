import fastify from "fastify";
import { samples, Commit } from "./commit";
import fs from "fs";
const server = fastify();

server.get("/commit/samples", async (request, reply) => {
  return [samples];
});

server.post("/commit/format", async (request, reply) => {
  const validComment: Commit = request.body as Commit;
  const scope = validComment.scope
    ? `(${validComment.scope.replace(/ /g, "-")})`
    : "";

  const body =
    validComment.body &&
    validComment.body.length &&
    validComment.body[0].length > 0
      ? "\n" + validComment.body.join("\n") + "\n"
      : "";
  const footer =
    validComment.footer && validComment.footer.length > 0
      ? "\n" +
        validComment.footer
          .filter((f) => {
            return f.name.length > 0 && f.description.length > 0;
          })
          .map((f) => {
            return `${f.name.replace(/ /g, "-")}: ${f.description}`;
          })
          .join("\n")
      : "";
  const formattedComment =
    `${validComment.type}${scope}${validComment.breaking_change_danger}: ${validComment.description}\n` +
    `${body}` +
    `${footer}`;
  reply.send(formattedComment);
});

server.get("/", async (request, reply) => {
  const file = fs.readFileSync("public/commit.html", "utf-8");
  reply.type("text/html").send(file);
});

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
