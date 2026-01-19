
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

function App() {
  const [file, setFile] = useState(null);

  const splitPdf = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const totalPages = pdfDoc.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(page);

      const pdfBytes = await newPdf.save();

      // Native download (no file-saver)
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `page_${i + 1}.pdf`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>PDF Splitter</h2>

      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={splitPdf} disabled={!file} style={{ marginTop: 20 }}>
        Split PDF
      </button>
    </div>
  );
}

export default App;
