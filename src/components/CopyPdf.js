import React, { useEffect, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

async function generatePdf(PdfBytes) {
  const pdfDoc = await PDFDocument.create();
  const pdf = await readFileAsArrayBuffer(PdfBytes);
  const firstDonorPdfDoc = await PDFDocument.load(pdf);
  const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0]);
  pdfDoc.addPage(firstDonorPage);
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

const CopyPdf = ({ PdfBytes }) => {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateAndSetPdf = async () => {
      try {
        setLoading(true);
        const result = await generatePdf(PdfBytes);
        setPdf(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    generateAndSetPdf();
  }, [PdfBytes]);

  const downloadPdf = () => {
    if (pdf) {
      const pdfBytes = pdf;
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_pdf.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={downloadPdf} disabled={!pdf}>
          Download PDF
        </button>
      )}
    </div>
  );
};

export default CopyPdf;
