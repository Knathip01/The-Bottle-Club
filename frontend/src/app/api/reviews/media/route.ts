import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

/** POST /api/reviews/media → saves uploaded review image or video and returns public URL */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = (formData.get('file') || formData.get('media')) as File | null;

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine extension from original filename or MIME type
    const originalName = file.name || 'upload.jpg';
    let ext = path.extname(originalName).toLowerCase();
    if (!ext) {
      if (file.type?.includes('png')) ext = '.png';
      else if (file.type?.includes('webp')) ext = '.webp';
      else if (file.type?.includes('mp4')) ext = '.mp4';
      else if (file.type?.includes('quicktime') || file.type?.includes('mov')) ext = '.mov';
      else ext = '.jpg';
    }

    const safeFilename = `review_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'reviews');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, safeFilename);
    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/reviews/${safeFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      file_url: publicUrl,
      imageUrl: publicUrl,
      videoUrl: publicUrl,
      data: { url: publicUrl },
      filename: safeFilename,
      size: buffer.length,
      mimeType: file.type || 'application/octet-stream',
    });
  } catch (err: any) {
    console.error('[POST /api/reviews/media] upload error:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to process media upload' },
      { status: 500 }
    );
  }
}
