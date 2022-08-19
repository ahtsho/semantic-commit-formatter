interface Scope {
  open: "(";
  word: string;
  close: ")";
}
interface Footer {
  name: string;
  colon_space: ": ";
  description: string;
}
export interface Commit {
  type: "fix" | "feat";
  scope?: Scope;
  breaking_change_danger?: "!";
  description: string;
  body?: string[];
  footer?: Footer[];
}

const commitBasic: Commit = {
  type: "fix",
  description: "some simple fix has been performed",
};
const commitWithScope: Commit = {
  type: "fix",
  scope: {
    open: "(",
    word: "api",
    close: ")",
  },
  description: "some simple fix has been performed",
};
const commitWithBang: Commit = {
  type: "feat",
  breaking_change_danger: "!",
  description: "some simple fix has been performed",
};
const commitWithBody: Commit = {
  type: "feat",
  description: "some simple fix has been performed",
  body: [
    "This is a structured description of the commit.",
    'conventionalcommits.org puts it like this: "A longer commit body MAY be provided after the short description, providing additional contextual information about the code changes.',
    "The body MUST begin one blank line after the description",
  ],
};
export const samples = {
  commit_basic: commitBasic,
  commit_with_scope: commitWithScope,
  commit_with_warning: commitWithBang,
  commit_with_body: commitWithBody,
};
