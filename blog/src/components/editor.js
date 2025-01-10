import { javascript } from "npm:@codemirror/lang-javascript";
import { EditorView, keymap } from "npm:@codemirror/view";
import { button } from "npm:@observablehq/inputs";
import { basicSetup } from "npm:codemirror";

import octokit from "@octokit/rest";

//  https://github.com/octokit/octokit.js`

# First get the SHA of the default branch (e.g., main)
curl -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
     "https://api.github.com/repos/forkOwner/OriginalRepo/git/refs/heads/main"

# Suppose it returns "object": { "sha": "ABC123..." }, use that in the next call
curl -X POST \
     -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
     -d '{"ref":"refs/heads/my-proposed-change","sha":"ABC123..."}' \
     "https://api.github.com/repos/forkOwner/OriginalRepo/git/refs"

     curl -X PUT \
          -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
          -d '{
                "message": "Propose changes to docs",
                "content": "'"$BASE64_CONTENT"'",
                "branch": "my-proposed-change"
              }' \
          "https://api.github.com/repos/forkOwner/OriginalRepo/contents/docs/README.md"

          curl -X POST \
               -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
               -d '{
                     "title": "Propose edits to the documentation",
                     "head": "forkOwner:my-proposed-change",
                     "base": "main",
                     "body": "Here is a summary of my changes..."
                   }' \
               "https://api.github.com/repos/OriginalOwner/OriginalRepo/pulls"





export function Editor({
  value = "",
  style = "font-size: 14px; position: absolute; top:0; right:0; border: 1px solid green;",
} = {}) {
  const parent = document.createElement("div");
  parent.style = style;
  parent.value = value;

  const run = () => {
    parent.value = String(editor.state.doc);
    parent.dispatchEvent(new InputEvent("input", { bubbles: true }));
  };

  const editor = new EditorView({
    parent,
    doc: value,
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        { key: "Shift-Enter", preventDefault: true, run },
        { key: "Mod-s", preventDefault: true, run },
      ]),
    ],
  });

  parent.addEventListener(
    "input",
    (event) => event.isTrusted && event.stopImmediatePropagation(),
  );
  parent.appendChild(button([["Run", run]]));

  return parent;
}



async function createBranch(forkOwner, forkName) {
  // First, get the SHA of the default branch (e.g., main)
  const defaultBranch = "main";
  const refs = await octokit.rest.git.getRef({
    owner: forkOwner,
    repo: forkName,
    ref: `heads/${defaultBranch}`,
  });
  const baseSha = refs.data.object.sha;

  // Next, create a new branch ref (e.g., "my-proposed-change")
  const newBranch = "my-proposed-change";
  await octokit.rest.git.createRef({
    owner: forkOwner,
    repo: forkName,
    ref: `refs/heads/${newBranch}`,
    sha: baseSha,
  });

  console.log(`Branch created: ${newBranch}`);
  return newBranch;
}


async function commitFileChange(forkOwner, forkName, branchName) {
  const path = "docs/README.md";
  const message = "Propose changes to docs";
  const newContent = "Hello, world!"; // Replace with whatever content
  const base64Content = Buffer.from(newContent).toString("base64");

  // PUT /repos/{owner}/{repo}/contents/{path}
  await octokit.rest.repos.createOrUpdateFileContents({
    owner: forkOwner,
    repo: forkName,
    path,
    message,
    content: base64Content,
    branch: branchName,
    // If updating an existing file, pass `sha` of the existing file
  });

  console.log(`File updated: ${path} on branch ${branchName}`);
}


async function openPullRequest(forkOwner, forkName, branchName) {
  const originalOwner = "OriginalOwner";
  const originalRepo = "OriginalRepo";
  const prTitle = "Propose edits to the documentation";
  const prBody = "Here is a summary of my changes...";

  // POST /repos/{owner}/{repo}/pulls
  const pr = await octokit.rest.pulls.create({
    owner: originalOwner,
    repo: originalRepo,
    title: prTitle,
    head: `${forkOwner}:${branchName}`, // The fork + branch from the user
    base: "main",                      // The branch in the original repo
    body: prBody,
  });

  console.log(`Pull request created: ${pr.data.html_url}`);
}


async function proposeEdit() {
  const { forkOwner, forkName } = await createFork();
  const branchName = await createBranch(forkOwner, forkName);
  await commitFileChange(forkOwner, forkName, branchName);
  await openPullRequest(forkOwner, forkName, branchName);
}

proposeEdit().catch(err => {
  console.error("Error proposing edit:", err);
});
