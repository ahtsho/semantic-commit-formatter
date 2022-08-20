"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitFormatReq = exports.samples = void 0;
const typebox_1 = require("@sinclair/typebox");
const commitBasic = {
    type: "fix",
    description: "some simple fix has been performed",
};
const commitWithScope = {
    type: "fix",
    scope: "(api)",
    description: "some simple fix has been performed",
};
const commitWithBang = {
    type: "feat",
    breaking_change_danger: "!",
    description: "some simple fix has been performed",
};
const commitWithBody = {
    type: "feat",
    description: "some simple fix has been performed",
    body: [
        "This is a structured description of the commit.",
        'conventionalcommits.org puts it like this: "A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes.',
        "The body MUST begin one blank line after the description",
    ],
};
exports.samples = {
    commit_basic: commitBasic,
    commit_with_scope: commitWithScope,
    commit_with_warning: commitWithBang,
    commit_with_body: commitWithBody,
};
exports.CommitFormatReq = {
    type: typebox_1.Type.String(),
    scope: typebox_1.Type.String(),
    breaking_change_danger: typebox_1.Type.String(),
    desctiprion: typebox_1.Type.String(),
    body: typebox_1.Type.Array(typebox_1.Type.Object({})),
    footer: typebox_1.Type.Array(typebox_1.Type.Object({})),
};
