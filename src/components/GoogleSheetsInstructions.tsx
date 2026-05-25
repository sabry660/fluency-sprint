import React, { useState } from 'react';
import { HelpCircle, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { GOOGLE_SHEETS_API_URL } from '../lib/submitEnrollment';

export default function GoogleSheetsInstructions() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const googleScriptCode = `/**
 * Fluency Sprint — append enrollments to your EXISTING sheet.
 * Deploy as Web App (Execute as: Me, Who has access: Anyone).
 * Website sends POST JSON: { name, email, phone, course }
 */

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Fluency Sprint enrollments API' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    lock.waitLock(30000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    var data = JSON.parse(e.postData.contents);
    var newRow = [];

    for (var i = 0; i < headers.length; i++) {
      var h = String(headers[i]).trim().toLowerCase();
      if (h === 'timestamp' || h === 'date') {
        newRow.push(new Date());
      } else if (h.indexOf('name') !== -1) {
        newRow.push(data.name || '');
      } else if (h.indexOf('email') !== -1) {
        newRow.push(data.email || '');
      } else if (h.indexOf('phone') !== -1) {
        newRow.push(data.phone || '');
      } else if (h.indexOf('course') !== -1) {
        newRow.push(data.course || '');
      } else {
        newRow.push('');
      }
    }

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
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
          <HelpCircle className="w-5 h-5" />
          <span className="font-accent font-semibold text-sm tracking-wide">
            GOOGLE SHEETS API (EXISTING SHEET)
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-white/5 bg-brand-dark-950/40 text-xs leading-relaxed text-gray-300 space-y-4">
          <p>
            Enrollments are sent to your deployed Web App and saved in your <strong className="text-white">existing</strong> Google Sheet.
          </p>

          <div className="p-3 rounded-lg bg-black/50 border border-brand-cyan/20 space-y-2">
            <span className="text-[10px] text-brand-cyan font-accent uppercase tracking-wider font-bold">
              Active API URL
            </span>
            <p className="font-mono text-[10px] text-gray-400 break-all">{GOOGLE_SHEETS_API_URL}</p>
            <button
              type="button"
              onClick={() => triggerCopy(GOOGLE_SHEETS_API_URL, 'url')}
              className="flex items-center gap-1 px-2 py-1 rounded bg-brand-cyan/10 hover:bg-brand-cyan/20 text-[10px] text-brand-cyan font-semibold"
            >
              {copied === 'url' ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy URL</>}
            </button>
          </div>

          <p className="text-gray-400">
            Row 1 of your sheet should include column headers (e.g. <strong className="text-white">Timestamp</strong>,{' '}
            <strong className="text-white">Full Name</strong>, <strong className="text-white">Email</strong>,{' '}
            <strong className="text-white">Phone</strong>, <strong className="text-white">Course</strong>). The script maps
            website fields <code className="text-brand-cyan">name, email, phone, course</code> automatically.
          </p>

          <div className="space-y-3">
            <h4 className="font-semibold text-white text-[13px] flex items-center justify-between">
              <span>Apps Script (paste into sheet-bound project)</span>
              <button
                type="button"
                onClick={() => triggerCopy(googleScriptCode, 'code')}
                className="flex items-center gap-1 px-2 py-1 rounded bg-brand-cyan/10 hover:bg-brand-cyan/20 text-[10px] text-brand-cyan font-semibold"
              >
                {copied === 'code' ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy Code</>}
              </button>
            </h4>
            <pre className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] overflow-x-auto max-h-[200px] text-gray-400">
              {googleScriptCode}
            </pre>
          </div>

          <p className="text-[11px] text-gray-500">
            After updating the script, redeploy the Web App (Manage deployments → Edit → New version → Deploy). Opening the URL in a browser should return JSON status, not &quot;doGet not found&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
