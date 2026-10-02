import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const WINE_SCAN_PROMPT = `You are a professional sommelier and wine expert. Analyze this wine bottle label image and extract information from it.

If the image does NOT show a wine bottle label, or you cannot identify it as wine, respond ONLY with this exact JSON:
{"error":"not_wine"}

If it IS a wine bottle, respond ONLY with a valid JSON object (no markdown, no code block, no explanation) with EXACTLY these fields:
{
  "name": "full wine name including producer and label",
  "vintage": "year as string, e.g. \\"2018\\"",
  "country": "country of origin in English, e.g. \\"France\\"",
  "country_th": "country of origin in Thai, e.g. \\"ฝรั่งเศส\\"",
  "region": "wine region in English, e.g. \\"Bordeaux\\"",
  "region_th": "wine region in Thai, e.g. \\"บอร์โดซ์\\"",
  "city": "specific city or commune in English, e.g. \\"Margaux\\"",
  "city_th": "specific city or commune in Thai",
  "type": "wine type in English, e.g. \\"Red Wine\\"",
  "type_th": "wine type in Thai, e.g. \\"ไวน์แดง\\"",
  "grape": "grape variety or blend, e.g. \\"Cabernet Sauvignon\\"",
  "alcohol": "alcohol percentage string, e.g. \\"13.5%\\"",
  "description_th": "2-3 sentence description of this wine in Thai",
  "price_estimate": 1500,
  "rating": 4.2,
  "confidence": 87.5,
  "notes": ["tasting note 1", "tasting note 2", "tasting note 3", "tasting note 4"],
  "city_image_query": "a search query to find a beautiful photo of the wine origin location, e.g. \\"Margaux Bordeaux France vineyard\\""
}

Rules:
- price_estimate is an integer in Thai Baht (THB)
- rating is a float between 1 and 5
- confidence is a float between 0 and 100 representing how confident you are in the identification
- notes must be an array of exactly 4 tasting note strings in English
- If a field cannot be determined from the label, use a reasonable estimate based on the wine's known profile
- Output ONLY the JSON object, nothing else`;

/** Strip markdown code fences that Gemini sometimes wraps around JSON */
function extractJson(raw: string): string {
  return raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not set' }, { status: 500 });
  }

  let base64DataUrl: string;
  try {
    const body = await request.json() as { base64?: string };
    if (!body.base64) {
      return NextResponse.json({ error: 'base64 field is required' }, { status: 400 });
    }
    base64DataUrl = body.base64;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Parse the data URL: "data:<mimeType>;base64,<data>"
  const dataUrlMatch = base64DataUrl.match(/^data:([^;]+);base64,([\s\S]+)$/);
  if (!dataUrlMatch) {
    return NextResponse.json({ error: 'Invalid base64 data URL format' }, { status: 400 });
  }
  const mimeType = dataUrlMatch[1];   // e.g. "image/jpeg"
  const base64Data = dataUrlMatch[2]; // raw base64 without prefix

  try {
    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              },
              {
                text: WINE_SCAN_PROMPT,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.85,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.json().catch(() => ({}));
      const msg: string = err?.error?.message ?? 'Gemini API error';
      console.error('[wine-scan] Gemini error:', msg);
      return NextResponse.json({ error: 'gemini_error', message: msg }, { status: 502 });
    }

    const geminiData = await geminiRes.json();
    const rawText: string = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(extractJson(rawText));
    } catch {
      console.error('[wine-scan] Failed to parse Gemini JSON:', rawText);
      return NextResponse.json(
        { error: 'parse_error', message: 'Could not parse Gemini response as JSON' },
        { status: 502 },
      );
    }

    // Gemini indicated it couldn't find a wine
    if (parsed.error === 'not_wine') {
      return NextResponse.json(
        { error: 'not_wine', message: 'ไม่พบข้อมูลไวน์จากรูปภาพนี้' },
        { status: 422 },
      );
    }

    return NextResponse.json(parsed);
  } catch (e: unknown) {
    console.error('[wine-scan] Unexpected error:', e);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
