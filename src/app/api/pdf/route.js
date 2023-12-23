import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import generatePdf from "./generatePdf";
import User from "../../../models/user";

cloudinary.config(process.env.CLOUDINARY_URL || "");

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  let cloudinaryResult;

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const value = formData.get("value");
    const id = formData.get("id");

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    const fileName = file.name;
    const filePath = `public/images/uploads/${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const generatedPdfBytes = await generatePdf(buffer, value);

    await fs.writeFile(filePath, generatedPdfBytes);

    [cloudinaryResult] = await Promise.all([
      new Promise((resolve, reject) => {
        const cloudinaryUpload = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
          },
          (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              reject(error);
            } else {
              console.log("Cloudinary upload result:", result);
              resolve(result);
            }
          }
        );

        cloudinaryUpload.end(generatedPdfBytes);
      }),
      User.findByIdAndUpdate(
        id,
        { $push: { pdf: cloudinaryResult?.secure_url } },
        { new: true }
      ),
    ]);

    if (!cloudinaryResult) {
      console.error("Cloudinary upload result is undefined");
      return new Response("Internal Server Error", { status: 500 });
    }

    return new Response(JSON.stringify(cloudinaryResult.secure_url), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing PDF generation:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
