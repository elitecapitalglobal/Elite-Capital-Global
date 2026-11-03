/**
 * Builds the letterheaded PDF of each legal document that has a `pdf` path,
 * from the same content object the web page renders. One source, so the web
 * page and the download can never disagree.
 *
 *   npm run legal:pdf
 *
 * Needs Node 22.18+ (imports the .ts content files directly) and a local
 * Chrome or Edge. Set CHROME_PATH to use a different browser binary.
 *
 * Letterhead follows the EliteFX MT5 branding kit: horizontal logo for white
 * backgrounds, #00C853 signal green, near-black panels. Like the site, it
 * carries no street address, phone number, registration number or regulator.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

import { withdrawalPolicy } from "../../src/content/legal/withdrawal-policy.ts";
import { refundPolicy } from "../../src/content/legal/refund-policy.ts";
import { riskDisclosure } from "../../src/content/legal/risk-disclosure.ts";
import { clientAgreement } from "../../src/content/legal/client-agreement.ts";
import { amlPolicy } from "../../src/content/legal/aml-policy.ts";
import { privacyPolicy } from "../../src/content/legal/privacy-policy.ts";
import { cookiePolicy } from "../../src/content/legal/cookie-policy.ts";

const DOCS = [
  clientAgreement,
  riskDisclosure,
  amlPolicy,
  withdrawalPolicy,
  refundPolicy,
  privacyPolicy,
  cookiePolicy,
].filter((d) => d.pdf);

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");

const GREEN = "#00C853";
const GREEN_TEXT = "#0c8753"; // passes contrast on white; the bright green is for rules only
const INK = "#141414";

const logo = `data:image/png;base64,${readFileSync(join(HERE, "logo-horizontal.png")).toString("base64")}`;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CLAUSE = /^(\d+\.\d+)\s+/;

function block(b) {
  if (typeof b === "string") {
    const m = b.match(CLAUSE);
    if (!m) return `<p>${esc(b)}</p>`;
    return `<p class="clause"><span class="no">${m[1]}</span><span>${esc(b.slice(m[0].length))}</span></p>`;
  }
  if ("list" in b) {
    const tag = b.ordered ? "ol" : "ul";
    return `<${tag}>${b.list.map((i) => `<li>${esc(i)}</li>`).join("")}</${tag}>`;
  }
  const { head, rows } = b.table;
  return `<table><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function html(doc) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(doc.title)} | Elite fx Capital</title>
<style>
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font: 10pt/1.55 "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: #2b2b2b; }

  .title { margin: 4pt 0 20pt; padding-bottom: 14pt; border-bottom: .6pt solid #d6d6d6; }
  .title h1 { margin: 0; font-size: 24pt; line-height: 1.15; font-weight: 700; color: ${INK}; letter-spacing: -.01em; }
  .title .meta { margin-top: 12pt; display: flex; gap: 22pt; font-size: 8pt; color: #777; }
  .title .meta b { display: block; color: ${INK}; font-weight: 600; font-size: 9pt; }

  h2 { font-size: 12.5pt; color: ${INK}; margin: 18pt 0 7pt; padding-top: 9pt; border-top: .6pt solid #dcdcdc;
       break-after: avoid; page-break-after: avoid; }
  section:first-of-type h2 { border-top: 0; padding-top: 0; margin-top: 0; }
  p { margin: 0 0 6pt; }
  /* A lead-in line ("The order below applies.") stays on the page of its table or list. */
  p:has(+ table), p:has(+ ul), p:has(+ ol) { break-after: avoid; page-break-after: avoid; }
  .clause { display: grid; grid-template-columns: 30pt 1fr; }
  .clause .no { color: ${GREEN_TEXT}; font-weight: 600; font-size: 9pt; padding-top: .7pt; font-variant-numeric: tabular-nums; }
  ul, ol { margin: 0 0 7pt 30pt; padding-left: 13pt; }
  li { margin-bottom: 3pt; }
  li::marker { color: ${GREEN_TEXT}; }

  table { width: 100%; border-collapse: collapse; margin: 3pt 0 9pt; font-size: 9pt; }
  table { break-inside: avoid; page-break-inside: avoid; } /* every table here is short */
  thead { display: table-header-group; }
  tr { break-inside: avoid; page-break-inside: avoid; }
  th { text-align: left; background: #f1f1ef; color: ${INK}; font-weight: 600; border-bottom: 1.2pt solid ${GREEN}; }
  th, td { padding: 5pt 7pt; vertical-align: top; }
  td { border-bottom: .6pt solid #e2e2e2; }

  .end { margin-top: 22pt; padding-top: 10pt; border-top: .6pt solid #dcdcdc; font-size: 8pt; color: #777; text-align: center;
         letter-spacing: .18em; text-transform: uppercase; }
</style></head><body>
  <div class="title">
    <h1>${esc(doc.title)}</h1>
    <div class="meta">${doc.meta
      .split(" · ")
      .map((m) => {
        // Label is everything before the value, which starts at the first
        // digit: "Next review 30 June 2027", "Last updated 23 October 2026".
        const at = m.search(/\s\d/);
        const [k, v] = at > 0 ? [m.slice(0, at), m.slice(at + 1)] : [m, ""];
        return `<div>${esc(k)}<b>${esc(v)}</b></div>`;
      })
      .join("")}<div>Issued by<b>Elite fx Capital Ltd.</b></div></div>
  </div>
  ${doc.sections.map((s) => `<section><h2>${esc(s.title)}</h2>${s.blocks.map(block).join("")}</section>`).join("")}
  <div class="end">Public document</div>
</body></html>`;
}

/* The company letterhead (EliteFX_MT5_Branding/letterhead), redrawn so it
   repeats on every page: logo left, contact right, green rule; grey rule and
   company line at the foot. The letterhead's phone number and street address
   are swapped for support@ and the registration line, per the site rules.

   Chrome's header/footer templates render in their own tiny document: every
   style must be inline, and images must be data URLs. */
const headerTemplate = () => `
<div style="width:100%;margin:9mm 20mm 0;padding:0 0 3.2mm;display:flex;align-items:flex-end;justify-content:space-between;border-bottom:2pt solid ${GREEN};font-family:'Segoe UI',Arial,sans-serif;-webkit-print-color-adjust:exact;">
  <img src="${logo}" style="height:13mm;display:block;">
  <div style="text-align:right;font-size:8.5pt;line-height:1.75;padding-bottom:.5mm;">
    <div style="color:#6b6b6b;">support@elitecapital.global</div>
    <div style="color:${GREEN_TEXT};">www.elitecapital.global</div>
  </div>
</div>`;

const footerTemplate = `
<div style="width:100%;margin:0 20mm 7mm;padding-top:3mm;border-top:.8pt solid #cfcfcf;font-family:'Segoe UI',Arial,sans-serif;font-size:7.5pt;line-height:1.6;color:#6b6b6b;display:grid;grid-template-columns:18mm 1fr 18mm;align-items:center;">
  <span></span>
  <div style="text-align:center;"><b style="color:${INK};">Elite FX Capital Ltd.</b> &nbsp;·&nbsp; Registered in Saint Lucia as an International Business Company</div>
  <div style="text-align:right;color:${INK};"><span class="pageNumber"></span> / <span class="totalPages"></span></div>
</div>`;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");
  return found;
}

/** Minimal DevTools Protocol client over Node's built-in WebSocket. */
async function connect(url) {
  const ws = new WebSocket(url);
  await new Promise((ok, fail) => {
    ws.onopen = ok;
    ws.onerror = fail;
  });
  let id = 0;
  const pending = new Map();
  const listeners = [];
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { ok, fail } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) fail(new Error(msg.error.message));
      else ok(msg.result);
    } else if (msg.method) {
      listeners.forEach((l) => l(msg));
    }
  };
  return {
    send: (method, params = {}, sessionId) =>
      new Promise((ok, fail) => {
        pending.set(++id, { ok, fail });
        ws.send(JSON.stringify({ id, method, params, sessionId }));
      }),
    once: (method) => new Promise((ok) => listeners.push((m) => m.method === method && ok(m))),
    close: () => ws.close(),
  };
}

async function main() {
  const work = mkdtempSync(join(tmpdir(), "legal-pdf-"));
  const chrome = spawn(findChrome(), [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--remote-debugging-port=0",
    `--user-data-dir=${join(work, "profile")}`,
    "about:blank",
  ]);

  try {
    const portFile = join(work, "profile", "DevToolsActivePort");
    // Chrome may still hold the file open (EBUSY on Windows) or not have
    // written both lines yet, so keep trying until it reads cleanly.
    let port, path;
    for (let i = 0; i < 100 && !path; i++) {
      try {
        [port, path] = readFileSync(portFile, "utf8").trim().split("\n");
      } catch {
        /* not there or locked yet */
      }
      if (!path) await sleep(100);
    }
    if (!path) throw new Error("Chrome did not start (no DevToolsActivePort).");
    const cdp = await connect(`ws://127.0.0.1:${port}${path}`);

    for (const doc of DOCS) {
      const page = join(work, "doc.html");
      writeFileSync(page, html(doc));

      const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
      const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
      await cdp.send("Page.enable", {}, sessionId);
      const loaded = cdp.once("Page.loadEventFired");
      await cdp.send("Page.navigate", { url: pathToFileURL(page).href }, sessionId);
      await loaded;

      const mm = 1 / 25.4;
      const { data } = await cdp.send(
        "Page.printToPDF",
        {
          paperWidth: 210 * mm,
          paperHeight: 297 * mm,
          marginTop: 36 * mm,
          marginBottom: 24 * mm,
          marginLeft: 20 * mm,
          marginRight: 20 * mm,
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: headerTemplate(),
          footerTemplate,
          preferCSSPageSize: false,
        },
        sessionId,
      );

      const out = join(ROOT, "public", doc.pdf);
      writeFileSync(out, Buffer.from(data, "base64"));
      console.log(`✓ ${doc.title} → public${doc.pdf}`);
      await cdp.send("Target.closeTarget", { targetId });
    }
    cdp.close();
  } finally {
    chrome.kill();
    await sleep(300);
    rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
