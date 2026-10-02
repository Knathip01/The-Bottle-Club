import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'bottleclub_api_complete.py');

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return new NextResponse(fileContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/x-python; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bottleclub_api_complete.py"',
      'Cache-Control': 'no-cache',
    },
  });
}
