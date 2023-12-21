import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCallback, useMemo, useState } from "react";
import { Document, Page } from "react-pdf";
import FormPart from "./FormPart";
import React from "react";

function ViewPdf({ pdf }) {
  console.log("Rendering ViewPdf component with pdf:", pdf);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log("Document loaded with numPages:", numPages);
    setNumPages(numPages);
  }
  const handleNext = useCallback(() => {
    if (pageNumber < numPages) {
      console.log(
        "Incrementing pageNumber from",
        pageNumber,
        "to",
        pageNumber + 1
      );
      setPageNumber(pageNumber + 1);
    }
  }, [pageNumber, numPages]);
  const handlePrev = useCallback(() => {
    if (pageNumber > 1) {
      console.log(
        "Decrementing pageNumber from",
        pageNumber,
        "to",
        pageNumber - 1
      );
      setPageNumber(pageNumber - 1);
    }
  }, [pageNumber]);
  console.log("Rendering Document with pageNumber:", pageNumber);
  return (
    <div style={{ height: "700px", display: "flex" }}>
      <div className="flex flex-col">
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

      <div className="bg-gray-200 w-full flex flex-col p-10">
        <FormPart pdf={pdf} />
      </div>
    </div>
  );
}

export default ViewPdf;
