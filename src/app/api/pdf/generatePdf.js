import generatePages from "./generatePages";
import { PDFDocument } from 'pdf-lib';

export default async function generatePdf(pdfBytes, value) {
  const pdfDocSample = await PDFDocument.load(pdfBytes);
  const pageCount = pdfDocSample.getPageCount();
console.log(pageCount); 
  const pdfDoc = await PDFDocument.create();
  const numbers = generatePages(pageCount, value)
  console.log(numbers);
    for (const i in numbers) {
      const firstDonorPdfDoc = await PDFDocument.load(pdfBytes);
    const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [i]);
    pdfDoc.addPage(firstDonorPage);
    }
    const generatedPdfBytes = await pdfDoc.save();
    return generatedPdfBytes;
  };