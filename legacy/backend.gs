function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const id = data.id || "-";
    const task = data.task || "Unknown";
    const status = data.status || "Pending";
    const priority = data.priority || "Medium";
    const createdAt = data.createdAt || new Date().toISOString();
    const completedAt = data.completedAt || "";
    const userId = data.userId || "Unknown";
    const type = data.type || "daily";
    const streak = data.streak !== undefined ? data.streak : 0;
    const history = data.history ? JSON.stringify(data.history) : "{}";
    const currentDate = data.currentDate || "";
    const lastCompletedDate = data.lastCompletedDate || "";
    
    // Find existing row by id
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    // columns: 0:id, 1:task, 2:status, 3:priority, 4:createdAt, 5:completedAt, 6:userId, 7:type, 8:streak, 9:history, 10:currentDate, 11:lastCompletedDate
    for (let i = values.length - 1; i >= 0; i--) {
      if (values[i][0] == id) {
        rowIndex = i + 1; // 1-indexed for Sheets
        break;
      }
    }
    
    if (rowIndex > -1) {
      // Update existing row
      sheet.getRange(rowIndex, 1, 1, 12).setValues([[
        id, task, status, priority, createdAt, completedAt, userId, type, streak, history, currentDate, lastCompletedDate
      ]]);
    } else {
      // Add new row
      sheet.appendRow([
        id, task, status, priority, createdAt, completedAt, userId, type, streak, history, currentDate, lastCompletedDate
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({"success": true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"success": false, "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const values = sheet.getDataRange().getValues();
    const userId = e.parameter.userId;
    
    let startIndex = 0;
    if (values.length > 0 && values[0][0] === 'id') {
      startIndex = 1;
    }
    
    let tasks = [];
    for (let i = startIndex; i < values.length; i++) {
      const row = values[i];
      if (!userId || row[6] === userId) {
        tasks.push({
          id: row[0],
          task: row[1],
          status: row[2],
          priority: row[3],
          createdAt: row[4],
          completedAt: row[5],
          userId: row[6],
          type: row[7],
          streak: row[8],
          history: row[9] ? JSON.parse(row[9]) : {},
          currentDate: row[10],
          lastCompletedDate: row[11]
        });
      }
    }
    return ContentService.createTextOutput(JSON.stringify({"success": true, "tasks": tasks}))
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
