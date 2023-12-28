import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCallback, useState } from "react";
import { Document, Page } from "react-pdf";
import FormPart from "./FormPart";
import React from "react";

function ViewPdf({ pdf }) {

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }
  const handleNext = useCallback(() => {
    if (pageNumber < numPages) {
      
      setPageNumber(pageNumber + 1);
    }
  }, [pageNumber, numPages]);
  const handlePrev = useCallback(() => {
    if (pageNumber > 1) {
    
      setPageNumber(pageNumber - 1);
    }
  }, [pageNumber]);
  return (
    <div className="flex flex-col h-1/2 sm:flex-row">
      <div className="flex flex-col h-1/2">
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div className="flex justify-center items-center">
          {" "}
          <button onClick={handlePrev}>
            <ArrowBackIosIcon />
          </button>{" "}
          <button onClick={handleNext}>
            <ArrowForwardIosIcon />
          </button>
        </div>

        <div className="flex h-3/4">
          <Document
            file={pdf}
            className="h-full overflow-hidden"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderMode="svg"
              width={1100}
              height={100}
              scale={0.6}
              className="custom-pdf-page"
            />
          </Document>
        </div>
      </div>

      <div className="bg-gray-100 w-full flex flex-col p-10">
        <FormPart pdf={pdf} pages={numPages} />
      </div>
    </div>
  );
}

export default ViewPdf;
