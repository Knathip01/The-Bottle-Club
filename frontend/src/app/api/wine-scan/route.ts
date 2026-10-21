import { NextRequest, NextResponse } from 'next/server';
import { findMatchingWinery } from '@/data/allWineriesData';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const WINE_SCAN_PROMPT = `You are a certified master sommelier and wine authenticity verification specialist.
Analyze this wine bottle label image in detail.

CRITICAL AUTHENTICITY EVALUATION RULES:
1. Examine the image carefully. Determine if this is a GENUINE wine bottle (grape wine / sparkling wine / dessert wine / fortified wine).
2. If the image depicts any of the following:
   - Non-wine items (beer, soda, soft drinks, liquor/spirits without wine label, tea, water, household items, food, people, animals, random objects)
   - Fake, counterfeit, parody, comic, or novelty non-commercial wine labels
   - Image where a wine label is completely unreadable or absent
   Then you MUST return:
   {"error":"not_wine","is_authentic_wine":false,"reason":"ไม่ใช่ขวดไวน์แท้ หรือไม่พบฉลากไวน์ที่สามารถระบุได้"}

3. If it IS a genuine wine bottle/label, you must return a valid JSON object (no markdown, no backticks, no code fence, no surrounding text) with EXACTLY these fields:
{
  "is_authentic_wine": true,
  "authenticity_score": 96.5,
  "authenticity_notes_th": "ตรวจพบฉลากไวน์แท้ มีตราสัญลักษณ์โรงกลั่น, ข้อมูล Appellation/แหล่งกำเนิด, ปีวินเทจ และการจัดพิมพ์มาตรฐานสากล",
  "producer": "Estate / Winery / Domaine / Bodega name (e.g. \\"Château Margaux\\", \\"Viña Loriente\\", \\"Penfolds\\")",
  "name": "Full wine title as printed on the label",
  "vintage": "Year as string, e.g. \\"2018\\", or \\"NV\\" for non-vintage",
  "country": "Country of origin in English, e.g. \\"France\\"",
  "country_th": "Country of origin in Thai, e.g. \\"ฝรั่งเศส\\"",
  "region": "Wine region in English, e.g. \\"Bordeaux\\"",
  "region_th": "Wine region in Thai, e.g. \\"บอร์โดซ์\\"",
  "city": "Specific commune / valley / town in English, e.g. \\"Margaux\\"",
  "city_th": "Specific commune / valley / town in Thai, e.g. \\"มาร์โก\\"",
  "type": "Wine type in English, e.g. \\"Red Wine\\", \\"White Wine\\", \\"Sparkling Wine\\"",
  "type_th": "Wine type in Thai, e.g. \\"ไวน์แดง\\", \\"ไวน์ขาว\\", \\"ไวน์สปาร์กลิ้ง\\"",
  "grape": "Grape variety or blend, e.g. \\"Cabernet Sauvignon\\"",
  "alcohol": "Alcohol percentage, e.g. \\"13.5%\\"",
  "description_th": "2-3 sentence sommelier description in Thai about the wine's character and flavor notes",
  "price_estimate": 2500,
  "rating": 4.5,
  "confidence": 92.0,
  "notes": ["Tasting note 1", "Tasting note 2", "Tasting note 3", "Tasting note 4"],
  "city_image_query": "search query to find a landscape photo of the vineyard, e.g. \\"Margaux Bordeaux France vineyard\\""
}

Rules:
- authenticity_score: float between 0 and 100 representing confidence that this is a genuine authentic wine bottle.
- price_estimate: integer in Thai Baht (THB).
- rating: float between 1.0 and 5.0.
- confidence: float between 0 and 100.
- notes: array of exactly 4 strings in English.
- Output ONLY the raw JSON object, nothing else.`;

function extractJson(raw: string): string {
  return raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

export async function POST(request: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
  }

  let base64DataUrl: string;
  try {
    const body = (await request.json()) as { base64?: string };
    if (!body.base64) {
      return NextResponse.json({ error: 'base64 field is required' }, { status: 400 });
    }
    base64DataUrl = body.base64;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const dataUrlMatch = base64DataUrl.match(/^data:([^;]+);base64,([\s\S]+)$/);
  if (!dataUrlMatch) {
    return NextResponse.json({ error: 'Invalid base64 data URL format' }, { status: 400 });
  }
  const mimeType = dataUrlMatch[1];
  const base64Data = dataUrlMatch[2];

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
          temperature: 0.15,
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

    let parsed: Record<string, any>;
    try {
      parsed = JSON.parse(extractJson(rawText));
    } catch {
      console.error('[wine-scan] Failed to parse Gemini JSON:', rawText);
      return NextResponse.json(
        { error: 'parse_error', message: 'ไม่สามารถแปลงผลวิเคราะห์ AI ได้' },
        { status: 502 },
      );
    }

    // 1. Check if Gemini identified it as NOT wine or not authentic
    if (
      parsed.error === 'not_wine' ||
      parsed.is_authentic_wine === false ||
      (typeof parsed.authenticity_score === 'number' && parsed.authenticity_score < 60)
    ) {
      return NextResponse.json(
        {
          error: 'not_authentic_wine',
          is_authentic_wine: false,
          message: 'ไม่ใช่ขวดไวน์แท้ หรือภาพไม่สามารถระบุเป็นขวดไวน์แท้ได้',
          reason: parsed.reason || parsed.authenticity_notes_th || 'ไม่พบตราสัญลักษณ์หรือข้อมูลฉลากไวน์แท้ในภาพ',
        },
        { status: 422 },
      );
    }

    // 2. Perform winery match against /wineries data (WINERIES_EXPLORER_DATA)
    const match = findMatchingWinery(parsed.name || '', parsed.producer);

    const isWineryMatched = Boolean(match);

    return NextResponse.json({
      ...parsed,
      is_authentic_wine: true,
      is_winery_matched: isWineryMatched,
      matched_winery: match ? match.winery : null,
      winery_match_confidence: match ? match.confidence : 0,
      winery_matched_by: match ? match.matchedBy : null,
      winery_mismatch_message: isWineryMatched
        ? null
        : 'ตรวจพบขวดไวน์แท้ แต่ชื่อขวดไวน์ไม่ตรงกับโรงไวน์ใดในระบบ The Bottle Club (/wineries)',
    });
  } catch (e: unknown) {
    console.error('[wine-scan] Unexpected error:', e);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
