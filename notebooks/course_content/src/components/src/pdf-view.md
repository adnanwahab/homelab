# PDF View

```js
toc({
  headers: "h2,h3,h4,h5",
  hideStartingFrom: "Imports"
})
```

PDF View allows you to embed PDF files in Observable notebooks.

It uses Mozilla’s [PDF.js](https://github.com/mozilla/pdf.js) to render PDF files using HTML Canvas.

## Usage

Import PDF View:

~~~js
import {pdfView} from "@saneef/pdf-view"
~~~

...and, within any cell call `pdfView()` with URL to the PDF file:

~~~js
pdfView("<URL to the PDF file>")
~~~

```js
pdfView(
  "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
)
```

### Options

You can pass options as second argument in `pdfView()`.

```js
pdfView("<URL to the PDF file>", {
  // Sets the scale level of the PDF viewer.
  scale: 1, // (default: 1)
  // Page to show in the beginning.
  startPage: 1, // (default: 1),
  // Change background/frame color
  background: "#f4f4f4", // (Default: "#f4f4f4")
  // Change font color
  color: "#6e6e6e" // (Default: "#6e6e6e")
})
```



### Changing colors

```js echo
pdfView(await FileAttachment("sample.pdf").url(), {
  backgroundColor: "#776EA7",
  fontColor: "#BDC6FF",

  scale: 0.5
})
```

### Embedding PDF file attachments

~~~js
pdfView(await FileAttachment("sample.pdf").url())
~~~

```js
pdfView(await FileAttachment("sample.pdf").url(), {
  scale: 0.5
})
```

```js
pdfView(await FileAttachment("sample-single-page.pdf").url(), {
  scale: 0.5
})
```

## Implementation

```js echo
pdfView = async (url, opts) => {
  const options = Object.assign(
    {},
    {
      startPage: 1,
      scale: 1,
      backgroundColor: "#f4f4f4",
      fontColor: "#6e6e6e"
    },
    opts
  );
  const { startPage } = options;
  let rootEl;
  let prevButton;
  let nextButton;
  let currentPage = startPage || 1;
  let renderWidth;

  const uid = initializeStyles(options);
  const ns = uid.id;

  // Download PDF
  const pdfDoc = await pdfjsLib.getDocument(url).promise;
  const totalPages = pdfDoc.numPages;

  // Initialise canvas and context
  const canvas = html`<canvas class="canvas"></canvas>`;
  const pagePicker = pagePickerInput(currentPage, totalPages);

  // Scale width based on the device pixel ratio
  function scaleWidth(width) {
    return Math.floor(width / dpr);
  }

  function updateUI(width) {
    pagePicker.value = currentPage;

    if (rootEl && width) {
      rootEl.style.maxWidth = `${scaleWidth(width)}px`;
    }

    if (currentPage <= 1) {
      prevButton[0].disabled = true;
    } else {
      prevButton[0].disabled = false;
    }

    if (currentPage >= totalPages) {
      nextButton[0].disabled = true;
    } else {
      nextButton[0].disabled = false;
    }
  }

  async function renderCurrentPage() {
    return renderPageToCanvas(canvas, pdfDoc, currentPage, options);
  }

  async function showPage(num) {
    if (num >= 1 && num <= totalPages) {
      currentPage = num;
      const { width } = await renderCurrentPage();
      updateUI(width);
    }
  }

  function showNextPage() {
    const nextPage =
      currentPage + 1 > totalPages ? currentPage : currentPage + 1;
    showPage(nextPage);
  }

  function showPreviousPage() {
    const nextPage = currentPage - 1 < 1 ? currentPage : currentPage - 1;
    showPage(nextPage);
  }

  const pageChangeHander = (e) => {
    const target = e.currentTarget;
    const nextPage = +target.value;
    showPage(nextPage);
  };
  pagePicker.addEventListener("change", pageChangeHander);
  invalidation.then(() =>
    pagePicker.removeEventListener("change", pageChangeHander)
  );

  prevButton = Inputs.button("Previous", {
    reduce: () => showPreviousPage()
  });
  nextButton = Inputs.button("Next", {
    reduce: () => showNextPage()
  });

  const { width } = await renderCurrentPage();
  updateUI();

  const paginationEl =
    totalPages > 1
      ? html`<div class="${ns}__pagination">
    <div class="${ns}__actions">
      <div>${prevButton}</div>
      <div>${nextButton}</div>
    </div>
    <div class="${ns}__info">
      ${pagePicker} of <span>${totalPages}</span>
    </div>
  </div>`
      : null;

  rootEl = html`<div class="${ns}" style="max-width: ${scaleWidth(width)}px;">
  <div class="${ns}__canvas-wrapper">
    ${canvas}
  </div>
  ${paginationEl}
</div>`;

  return rootEl;
}
```

```js echo
pagePickerInput = (startPage, pages) => {
  const options = Array.from({ length: pages }).map((_, i) => {
    const index = i + 1;
    return html`<option value="${index}" selected="${index === startPage}">${index}</option>`;
  });

  const input = html`<select>${options}</select>`;
  return input;
}
```

```js echo
initializeStyles = (options) => {
  let initialized;
  const uid = DOM.uid("pdfView");
  const ns = uid.id;
  if (initialized) return uid;

  initialized = true;

  const { backgroundColor, fontColor } = options;
  const inputsNs = Inputs.text().classList[0];

  const styles = html`<style name="${ns}">
.${ns} form.${inputsNs} {
width: auto;
}

.${ns} {
--background-color: ${backgroundColor};
--font-color: ${fontColor};

padding: 0.5rem;
background-color: var(--background-color);
border-radius: 0.5rem;
overflow: hidden;
}

.${ns} > * + * {
margin-top: 0.5rem;
}

.${ns}__pagination {
display: flex;
justify-content: space-between;
align-items: center;
}

.${ns}__actions {
display: flex;
}

.${ns}__actions > * + * {
margin-left: 0.5rem;
}

.${ns}__info {
font-size: 0.875rem;
color: var(--font-color);
}

.${ns}__canvas-wrapper canvas {
max-width: 100%;
border-radius: 0.25rem;
}

.${ns} button[disabled] {
cursor: not-allowed;   
}
</style>`;

  document.querySelector("head").append(styles);

  invalidation.then(
    () => styles.parentNode && styles.parentNode.removeChild(styles)
  );
  return uid;
}
```

```js echo
renderPageToCanvas = async (canvas, pdf, pageNum, options) => {
  const { scale } = options;
  const ctx = canvas.getContext("2d");

  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: scale * dpr });
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: ctx,
    viewport
  });

  return {
    height: viewport.height,
    width: viewport.width
  };
}
```

```js echo
dpr = window.devicePixelRatio
```

## Changelog

- 2022-08-08: Hide pagination if the PDF file only has one page.
- 2023-02-19: New Options, `background` and `color` to change background and
  font colors respectively.


## Credits

- This notebook is based on [Aaron’s](https://observablehq.com/@aaronkyle)
  [PDF.js MultiPage Previous/Next](https://observablehq.com/@aaronkyle/pdf-js-multipage-previous-next-example)
  and [Fabian’s](https://observablehq.com/@mootari)
  [Hello PDF.js](https://observablehq.com/@mootari/hello-pdf-js)!
- Thanks to [Martien van Steenbergen](https://observablehq.com/@martien) for adding
  feature to change colors.


## Imports

```js
pdfjsLib = {
  const lib = await require("https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.min.js");
  lib.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js";
  return lib;
}
```

```js
html = htl.html
```

```js
import { toc } from "@nebrius/indented-toc"
```

```js
import { footer } from "@saneef/notebooks-footer"
```

---

```js
footer
```
