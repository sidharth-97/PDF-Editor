import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import { Document, Page } from "react-pdf";

function ViewPdf({ pdf }) {
  console.log();

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const handleNext = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };
  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  return (
    <div style={{ height: "700px" }}>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="flex" style={{ height: "700px" }}>
        <button onClick={handlePrev}>
          <ArrowBackIosIcon />
        </button>
        <Document
          file={pdf}
          className="h-full overflow-hidden"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <button onClick={handleNext}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}

export default ViewPdf;
