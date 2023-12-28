import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import generatePdf from "./generatePdf";
import User from "../../../models/user";

cloudinary.config(process.env.CLOUDINARY_URL || "");

export const dynamic = 'auto';

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
    console.log("Current Working Directory:", process.cwd());
    console.log("File Path:", filePath);
    
    const generatedPdfBytes = await generatePdf(buffer, value);



    const cloudinaryPromise = new Promise((resolve, reject) => {
      const cloudinaryUpload = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          format: 'pdf',
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
    });
    [cloudinaryResult] = await Promise.all([cloudinaryPromise]);

    const userPromise = User.findById(id).then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      user.pdf.push({ name: fileName, url: cloudinaryResult?.secure_url });

      return user.save();
    });


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
