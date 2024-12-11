import pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry.js";

// Set the workerSrc property to the imported worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

console.log(pdfjsLib);

let pagePickerInput = (startPage, pages) => {
  const options = Array.from({ length: pages }).map((_, i) => {
    const index = i + 1;
    return html`<option value="${index}" selected="${index === startPage}">${index}</option>`;
  });

  const input = html`<select>${options}</select>`;
  return input;
}


let renderPageToCanvas = async (canvas, pdf, pageNum, options) => {
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

let pdfView = async (url, opts) => {
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

export {pdfView};