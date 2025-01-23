import { RemirrorManager } from 'remirror';
import { ReactEditor, useRemirror } from '@remirror/react';
import { MarkdownExtension } from 'remirror/extensions';

export function Editor({
  value = "",
  style = "font-size: 14px; position: absolute; top:0; right:0; border: 1px solid green;",
  github_url=""
} = {}) {
  const parent = document.createElement("div");
  parent.style = style;
  parent.value = value;

  // Create the Remirror manager with markdown support
  const manager = new RemirrorManager(() => [new MarkdownExtension()]);
  
  const editor = new ReactEditor({
    manager,
    initialContent: value,
    onChange: ({ state }) => {
      parent.value = state.doc.textContent;
      parent.dispatchEvent(new InputEvent("input", { bubbles: true }));
    }
  });

  // Create a wrapper for the editor
  const editorWrapper = document.createElement("div");
  editorWrapper.appendChild(editor.element);
  parent.appendChild(editorWrapper);

  // Add the run button
  const runButton = document.createElement("button");
  runButton.textContent = "Run";
  runButton.onclick = () => {
    parent.value = editor.getMarkdown();
    parent.dispatchEvent(new InputEvent("input", { bubbles: true }));
  };
  parent.appendChild(runButton);

  return parent;
}



async function getLatestCommitSha({owner, repo, token}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`;
  const response = await fetch(url, {
    headers: { Authorization: `token ${token}` }
  });
  if (!response.ok) throw new Error(`Could not get latest commit SHA`);
  
  const json = await response.json();
  return json.object.sha;  // This is the commit SHA
}


async function createBranch({owner, repo, newBranchName, baseSha, token}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/git/refs`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: `refs/heads/${newBranchName}`,
      sha: baseSha
    })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Could not create branch: ${text}`);
  }
  return response.json();
}


async function commitFile({owner, repo, branch, path, content, message, token}) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      content: btoa(content),       // base64 encoding the Markdown content
      branch
    })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Could not commit file: ${text}`);
  }
  return response.json();
}

