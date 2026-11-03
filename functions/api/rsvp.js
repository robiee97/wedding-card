/**
 * Cloudflare Pages Function: /api/rsvp
 * Receives RSVP form submissions and forwards them directly to your Google Sheet.
 */

export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const { name, attending, guests, timestamp } = payload;

    // Validate required fields
    if (!name) {
      return new Response(JSON.stringify({ success: false, error: 'Name is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Google Apps Script Web App URL from Cloudflare Environment Variable OR Fallback
    // Set GOOGLE_SHEET_WEBAPP_URL in Cloudflare Pages -> Settings -> Environment Variables
    const googleSheetUrl = context.env.GOOGLE_SHEET_WEBAPP_URL || '';

    if (googleSheetUrl) {
      // Forward payload to Google Apps Script
      const sheetResponse = await fetch(googleSheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          attending: attending || 'Attending',
          guests: guests || 1,
          timestamp: timestamp || new Date().toISOString()
        })
      });

      const resultText = await sheetResponse.text();
      return new Response(JSON.stringify({ success: true, forwarded: true, response: resultText }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // If GOOGLE_SHEET_WEBAPP_URL is not set yet in Cloudflare settings
    return new Response(JSON.stringify({ 
      success: true, 
      forwarded: false, 
      note: 'Stored on client. Please add GOOGLE_SHEET_WEBAPP_URL in Cloudflare Pages environment variables.' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
