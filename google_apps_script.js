/**
 * GOOGLE APPS SCRIPT FOR ROBIN & ANJALI WEDDING RSVP
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Name your sheet (e.g. "Wedding RSVPs")
 * 3. In Row 1, add these column headers:
 *    A1: Timestamp | B1: Guest Name | C1: Attending | D1: Number of Guests
 * 4. Click: Extensions -> Apps Script
 * 5. Delete any code in the editor, and paste the code below:
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "Anonymous";
    var attending = data.attending || "Attending";
    var guests = data.guests || 1;

    // Append new row to the sheet
    sheet.appendRow([timestamp, name, attending, guests]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "RSVP recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 6. Click 'Deploy' (top-right blue button) -> 'New deployment'
 * 7. Click the gear icon next to 'Select type' -> choose 'Web app'
 * 8. Set:
 *    - Description: "RSVP API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"  <-- IMPORTANT!
 * 9. Click 'Deploy', authorize permissions if prompted.
 * 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into script.js:
 *     const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/.../exec';
 * 12. Commit and push to GitHub:
 *     git commit -am "Connect Google Sheet RSVP" && git push
 */
