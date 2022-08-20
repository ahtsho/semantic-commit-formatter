"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const commit_1 = require("./commit");
const fs_1 = __importDefault(require("fs"));
const server = (0, fastify_1.default)();
server.get("/commit/samples", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return [commit_1.samples];
}));
server.post("/commit/format", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const validComment = request.body;
    const scope = validComment.scope ? `(${validComment.scope})` : "";
    const body = validComment.body &&
        validComment.body.length &&
        validComment.body[0].length > 0
        ? validComment.body.join("\n") + "\n\n"
        : "";
    const footer = validComment.footer && validComment.footer.length > 0
        ? validComment.footer
            .filter((f) => {
            return f.name.length > 0 && f.description.length > 0;
        })
            .map((f) => {
            return `${f.name.replace(/ /g, "-")}: ${f.description}`;
        })
            .join("\n")
        : "";
    const formattedComment = `${validComment.type}${scope}${validComment.breaking_change_danger}:${validComment.description}\n` +
        `${body}` +
        `${footer}`;
    reply.send(formattedComment);
}));
server.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const file = fs_1.default.readFileSync("public/commit.html", "utf-8");
    reply.type("text/html").send(file);
}));
server.listen({ port: 8081 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
