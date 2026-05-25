import React, { useState } from 'react';
import { HelpCircle, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function GoogleSheetsInstructions() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const googleScriptCode = `/* Google Apps Script code to handle "Fluency Sprint" course registration POST requests. */

function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(30000); // Wait 30 seconds for lock
    
    // Open standard active Spreadsheet
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0]; // Use first sheet
    
    // Get headers to write data to correct columns
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    
    var data = JSON.parse(e.postData.contents);
    var newRow = [];
    
    // Auto-create headers if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      headers = ["Timestamp", "Full Name", "Email Address", "Phone Number", "Selected Course", "Payment Screenshot"];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#0f172a").setFontColor("#f8fafc");
      nextRow = 2;
    }
    
    // Match payload fields with header names
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header === "Timestamp") {
        newRow.push(new Date());
      } else if (header === "Full Name") {
        newRow.push(data.name || data.fullName || "");
      } else if (header === "Email Address") {
        newRow.push(data.email || "");
      } else if (header === "Phone Number") {
        newRow.push(data.phone || "");
      } else if (header === "Selected Course") {
        newRow.push(data.course || data.courseId || "");
      } else if (header === "Payment Screenshot") {
        newRow.push(data.paymentScreenshotRef || data.paymentScreenshot || "");
      } else {
        newRow.push("");
      }
    }
    
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
  } finally {
    lock.releaseLock();
  }
}`;

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="border border-white/10 rounded-xl bg-black/40 overflow-hidden w-full transition-all duration-300">
      <button
        id="toggle-instructions-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2.5 text-brand-cyan">
          <HelpCircle className="w-5 height-5 h-5" />
          <span className="font-accent font-semibold text-sm tracking-wide">
            SETUP GOOGLE SHEETS SYNC (OPTIONAL)
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-white/5 bg-brand-dark-950/40 text-xs leading-relaxed text-gray-300 space-y-4">
          <p>
            You can automatically push physical signups into a real Google Spreadsheet. No database or expensive SaaS servers needed!
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-[13px] flex items-center gap-1.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[11px] font-bold font-mono">1</span>
              Create your Sheet
            </h4>
            <p className="pl-6 text-gray-400">
              Go to <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-brand-cyan underline hover:text-brand-cyan/80">sheets.new</a> and create a fresh spreadsheet.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-[13px] flex items-center gap-1.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[11px] font-bold font-mono">2</span>
              Open Apps Script editor
            </h4>
            <p className="pl-6 text-gray-400">
              Click on <strong className="text-white">Extensions</strong> in the upper menu bar, then click <strong className="text-white">Apps Script</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-[13px] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[11px] font-bold font-mono">3</span>
                Paste Script Code
              </span>
              <button
                id="copy-script-btn"
                onClick={() => triggerCopy(googleScriptCode, 'code')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-brand-cyan/10 hover:bg-brand-cyan/20 text-[10px] text-brand-cyan font-semibold transition-all"
              >
                {copied === 'code' ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy Code
                  </>
                )}
              </button>
            </h4>
            <p className="pl-6 text-gray-400">
              Delete any default template code inside the editor, paste the script code below, and press save.
            </p>
            <div className="pl-6 relative">
              <pre className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] overflow-x-auto max-h-[160px] text-gray-400">
                {googleScriptCode}
              </pre>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-[13px] flex items-center gap-1.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[11px] font-bold font-mono">4</span>
              Deploy as Web App
            </h4>
            <ul className="pl-6 list-disc list-inside space-y-1 text-gray-400">
              <li>Click <strong className="text-white">Deploy</strong> (top-right) &gt; <strong className="text-white">New deployment</strong>.</li>
              <li>Select gear icon &gt; <strong className="text-white">Web app</strong>.</li>
              <li>Set Description to <strong className="text-white">Fluency Signups API</strong>.</li>
              <li>Set Execute as to <strong className="text-white">Me (your email)</strong>.</li>
              <li>Set Who has access to <strong className="text-white">Anyone</strong> (crucial for form posts).</li>
              <li>Click Deploy, approve permissions popups, and copy the <strong className="text-brand-cyan">Web App URL</strong>.</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-brand-cyan/5 border border-brand-cyan/15 space-y-1 text-[11px]">
            <p className="text-brand-cyan font-semibold">Ready to test?</p>
            <p className="text-gray-400">
              When registering you can input your deployed Web App URL in the <strong className="text-white">Apps Script Endpoint</strong> config field to test direct, live transmission!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
