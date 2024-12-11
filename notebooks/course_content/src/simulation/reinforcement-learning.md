---
title: reinforcement-learning
---

# Reinforcement Learning


## unreal carla
## unity robotics
## three.js


## Json editor - 16 canvase - 16 possibilities
<iframe src="https://www.dynabot.dev/music_game/edit"></iframe>


<iframe src="https://nbviewer.org/github/adnanwahab/homelab/blob/main/notebooks/perception/diffusion-3d-policy.ipynb"></iframe>

	1.	UC Berkeley (CS 285: Deep Reinforcement Learning) by Sergey Levine

	2.	UCL/DeepMind Reinforcement Learning Course (Led by David Silver)

# CodeMirror

Here’s a basic editor powered by CodeMirror. Its value is exposed as `input`, and then the result of `eval`’ing `input` is shown below. Try editing the code and then running it with Shift-Enter or by clicking the Run button.

```js echo
const input = view(Editor({value: "1 + 2"}));
```

```js echo
eval(input)
```

The editor is implemented in a component:

```js echo
import {Editor} from "../components/Editor.js";
```

The implementation looks like this:

```js run=false
import {javascript} from "npm:@codemirror/lang-javascript";
import {EditorView, keymap} from "npm:@codemirror/view";
import {button} from "npm:@observablehq/inputs";
import {basicSetup} from "npm:codemirror";

export function Editor({
  value = "",
  style = "font-size: 14px;"
} = {}) {
  const parent = document.createElement("div");
  parent.style = style;
  parent.value = value;

  const run = () => {
    parent.value = String(editor.state.doc);
    parent.dispatchEvent(new InputEvent("input", {bubbles: true}));
  };

  const editor = new EditorView({
    parent,
    doc: value,
    extensions: [
      basicSetup,
      javascript(),
      keymap.of([
        {key: "Shift-Enter", preventDefault: true, run},
        {key: "Mod-s", preventDefault: true, run}
      ])
    ]
  });

  parent.addEventListener("input", (event) => event.isTrusted && event.stopImmediatePropagation());
  parent.appendChild(button([["Run", run]]));

  return parent;
}
```
