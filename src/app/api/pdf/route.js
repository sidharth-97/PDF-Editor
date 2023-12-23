import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

export const config = {
  api: { bodyParser: false }
};

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const fileName = (file).name;
  const fileBlob = file;
  const filePath = `public/images/uploads/${fileName}`;

  const buffer = Buffer.from(await fileBlob.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  
  const { secure_url } = await cloudinary.uploader.upload(filePath);
  fs.unlinkSync(filePath);
  return NextResponse.json({ secure_url });
}