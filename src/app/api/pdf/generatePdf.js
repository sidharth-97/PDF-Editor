import generatePages from "./generatePages";
import { PDFDocument } from 'pdf-lib';

export default async function generatePdf(pdfBytes, value){
    const pdfDoc = await PDFDocument.create();
    const pages = pdfDoc.context.largestObjectNumber
    const numbers =generatePages(pages, value)
    for (const i in numbers) {
      const firstDonorPdfDoc = await PDFDocument.load(pdfBytes);
    const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [i]);
    pdfDoc.addPage(firstDonorPage);
    }
    const generatedPdfBytes = await pdfDoc.save();
    return generatedPdfBytes;
  };