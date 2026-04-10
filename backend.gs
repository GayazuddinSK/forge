function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const targetDate = data.Date || new Date().toISOString();
    const targetUser = data.User || "Unknown";
    const targetTaskID = data.TaskID || "-";
    const targetStatus = data.Status || "-";
    const targetStreak = data.Streak !== undefined ? data.Streak : 0;
    
    // Find existing row by Date + User + TaskID
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    // Check from bottom to top for efficiency (most recent rows first)
    for (let i = values.length - 1; i >= 0; i--) {
      // cols: 0=Date, 1=User, 2=TaskID
      if (values[i][0] == targetDate && values[i][1] == targetUser && values[i][2] == targetTaskID) {
        rowIndex = i + 1; // 1-indexed for Sheets
        break;
      }
    }
    
    if (rowIndex > -1) {
      // Update existing row
      // Status is col 5, Streak is col 6
      sheet.getRange(rowIndex, 5).setValue(targetStatus);
      sheet.getRange(rowIndex, 6).setValue(targetStreak);
    } else {
      // Add new row: Date | User | TaskID | Task | Status | Streak
      sheet.appendRow([
        targetDate,
        targetUser,
        targetTaskID,
        data.Task || "Unknown",
        targetStatus,
        targetStreak
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({"success": true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"success": false, "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// OPTIONS handler necessary for permissive CORS from frontends.
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}
