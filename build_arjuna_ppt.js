// Build the Arjuna Pratyaya AI for Bharat hackathon submission deck.
// Run:  node build_arjuna_ppt.js
//
// Style: tight 3-color palette · institutional · no rainbow.

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";   // 13.333 x 7.5
pres.title  = "Pratyaya — AI for 1092 Helpline";
pres.author = "Team Arjuna";

// ─── Tight palette · only these 3 + neutrals ────────────────
const C = {
  bg:        "FEF6E4",  // cream background
  navy:      "0A2540",  // primary
  saffron:   "FF9F1C",  // accent / title bars
  jade:      "0D6B5E",  // secondary accent
  body:      "1F2937",
  muted:     "6B7280",
  cardLine:  "E2D3A8",
  cardFill:  "FFFCF3",
  white:     "FFFFFF",
  // Lighter / darker tones of the three canonical colors only
  navyDk:    "081D33",
  saffronLt: "FFB94A",
  jadeLt:    "2A8A7A",
};

const W = 13.333, H = 7.5;

// ─── Helpers ────────────────────────────────────────────────
function addBackground(slide) {
  slide.background = { color: C.bg };
}

function addHeader(slide, slideKicker) {
  // Team badge top-left
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.25, y: 0.25, w: 1.6, h: 0.55,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  slide.addText("TEAM ARJUNA", {
    x: 0.25, y: 0.25, w: 1.6, h: 0.55,
    fontFace: "Calibri", fontSize: 13, bold: true,
    color: C.saffron, align: "center", valign: "middle",
    charSpacing: 2, margin: 0,
  });

  // Hackathon brand top-right
  slide.addShape(pres.shapes.RECTANGLE, {
    x: W - 2.85, y: 0.25, w: 2.6, h: 0.55,
    fill: { color: C.saffron }, line: { color: C.saffron },
  });
  slide.addText("AI FOR BHARAT · 2026", {
    x: W - 2.85, y: 0.25, w: 2.6, h: 0.55,
    fontFace: "Calibri", fontSize: 12, bold: true,
    color: C.navy, align: "center", valign: "middle",
    charSpacing: 2, margin: 0,
  });

  if (slideKicker) {
    slide.addText(slideKicker, {
      x: 1.95, y: 0.32, w: W - 5, h: 0.4,
      fontFace: "Calibri", fontSize: 11, italic: true,
      color: C.muted, align: "center", valign: "middle",
      charSpacing: 1, margin: 0,
    });
  }
}

function addBigTitle(slide, text) {
  slide.addText(text, {
    x: 0.25, y: 0.95, w: W - 0.5, h: 0.7,
    fontFace: "Georgia", fontSize: 32, bold: true,
    color: C.navy, align: "center", valign: "middle",
    margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: W / 2 - 0.7, y: 1.62, w: 1.4, h: 0,
    line: { color: C.saffron, width: 3 },
  });
}

function addFooter(slide) {
  slide.addText(
    "@AI for Bharat · Theme 12: AI for 1092 Helpline · Team Arjuna",
    {
      x: 0.25, y: H - 0.32, w: W - 0.5, h: 0.25,
      fontFace: "Calibri", fontSize: 10, italic: true,
      color: C.muted, align: "center", valign: "middle",
      margin: 0,
    }
  );
}

// Section box with bigger title-bar font
function addSectionBox(slide, x, y, w, h, title) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.50,
    fill: { color: C.saffron }, line: { color: C.saffron },
  });
  slide.addText(title, {
    x, y, w, h: 0.50,
    fontFace: "Calibri", fontSize: 16, bold: true,
    color: C.navy, align: "center", valign: "middle",
    charSpacing: 1.5, margin: 0,
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y: y + 0.50, w, h: h - 0.50,
    fill: { color: C.cardFill }, line: { color: C.cardLine, width: 1 },
  });
}

// ============================================================
// SLIDE 1 — TITLE PAGE
// ============================================================
{
  const slide = pres.addSlide();
  addBackground(slide);

  slide.addText("AI FOR BHARAT", {
    x: 0.5, y: 0.7, w: W - 1, h: 0.95,
    fontFace: "Georgia", fontSize: 56, bold: true,
    color: C.navy, align: "center", valign: "middle",
    charSpacing: 4, margin: 0,
  });
  slide.addText("Hackathon · 2026", {
    x: 0.5, y: 1.7, w: W - 1, h: 0.4,
    fontFace: "Calibri", fontSize: 17, italic: true,
    color: C.saffron, align: "center", valign: "middle",
    charSpacing: 3, margin: 0,
  });

  // Saffron underline bar (single, not tricolor — cleaner)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: W / 2 - 1.5, y: 2.25, w: 3.0, h: 0.05,
    fill: { color: C.saffron }, line: { color: C.saffron },
  });

  slide.addText("TITLE PAGE", {
    x: 0.5, y: 2.6, w: W - 1, h: 0.55,
    fontFace: "Georgia", fontSize: 28, bold: true,
    color: C.navy, align: "center", valign: "middle",
    charSpacing: 6, margin: 0,
  });

  // Card panel for the bullets
  const px = 1.5, py = 3.4, pw = W - 3, ph = 3.5;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: pw, h: ph,
    fill: { color: C.cardFill }, line: { color: C.cardLine, width: 1.5 },
    shadow: { type: "outer", color: "000000", blur: 10, offset: 3,
              angle: 90, opacity: 0.10 },
  });
  // Saffron strip on the LEFT edge
  slide.addShape(pres.shapes.RECTANGLE, {
    x: px, y: py, w: 0.10, h: ph,
    fill: { color: C.saffron }, line: { color: C.saffron },
  });

  const bullets = [
    [
      { text: "Theme · ", options: { bold: true, color: C.navy } },
      { text: "Theme 12 — AI for the 1092 Helpline", options: { color: C.body } },
    ],
    [
      { text: "Problem Statement · ", options: { bold: true, color: C.navy } },
      { text: "AI-Assistive Voice-to-Voice Layer for the Karnataka 1092 Women & Child Helpline",
        options: { color: C.body } },
    ],
    [
      { text: "Domain · ", options: { bold: true, color: C.navy } },
      { text: "Citizen Services · Public Safety · e-Governance",
        options: { color: C.body } },
    ],
    [
      { text: "Category · ", options: { bold: true, color: C.navy } },
      { text: "Software · Voice AI · Accessibility",
        options: { color: C.body } },
    ],
    [
      { text: "Team Name · ", options: { bold: true, color: C.navy } },
      { text: "Arjuna",
        options: { color: C.saffron, bold: true } },
    ],
    [
      { text: "Project · ", options: { bold: true, color: C.navy } },
      { text: "Pratyaya — Verified Voice-to-Voice for 1092",
        options: { color: C.jade, italic: true } },
    ],
  ];
  const lines = bullets.map((runs, i) => {
    const isLast = i === bullets.length - 1;
    const last = runs[runs.length - 1];
    last.options = { ...(last.options || {}),
                     bullet: { code: "25A0" },
                     breakLine: !isLast,
                     paraSpaceAfter: 10 };
    return runs;
  }).flat();
  slide.addText(lines, {
    x: px + 0.5, y: py + 0.35, w: pw - 0.7, h: ph - 0.6,
    fontFace: "Calibri", fontSize: 17, color: C.body,
    valign: "middle", margin: 0,
  });

  addFooter(slide);
}

// ============================================================
// SLIDE 2 — IDEA TITLE: Pratyaya
// ============================================================
{
  const slide = pres.addSlide();
  addBackground(slide);
  addHeader(slide, "Idea Submission");
  addBigTitle(slide, "IDEA TITLE — Pratyaya: Verified Voice-to-Voice for 1092");

  const top = 1.85, gap = 0.18;
  const sideMargin = 0.3;
  const usableW = W - 2 * sideMargin - 2 * gap;
  const colW = usableW / 3;
  const colH = 4.95;
  const c1x = sideMargin;
  const c2x = sideMargin + colW + gap;
  const c3x = sideMargin + 2 * (colW + gap);

  // ─── Column 1: Proposed Solution ────────────────────────────
  addSectionBox(slide, c1x, top, colW, colH, "PROPOSED SOLUTION");
  slide.addText(
    "The 1092 helpline receives calls in Kannada · Hindi · English · code-mixed Hinglish — often from callers in distress. Misunderstanding causes delayed or wrong action.",
    {
      x: c1x + 0.18, y: top + 0.6, w: colW - 0.32, h: 0.95,
      fontFace: "Calibri", fontSize: 11, italic: true,
      color: C.body, valign: "top", margin: 0,
    }
  );
  slide.addText("Our approach:", {
    x: c1x + 0.18, y: top + 1.55, w: colW - 0.32, h: 0.28,
    fontFace: "Calibri", fontSize: 12, bold: true,
    color: C.navy, valign: "top", margin: 0,
  });
  const c1Bullets = [
    [{ text: "Voice-to-Voice Pipeline · ", options: { bold: true, color: C.navy } },
     { text: "natural speech in 3 languages with 4-way Kannada dialect awareness." }],
    [{ text: "Verification-First Loop · ", options: { bold: true, color: C.navy } },
     { text: "AI paraphrases what it heard · asks yes/no/partial · never acts on assumption." }],
    [{ text: "6-D Sentiment · ", options: { bold: true, color: C.navy } },
     { text: "distress · urgency · anger · fear · confusion · calm — drives auto-handover." }],
    [{ text: "Graceful Human Takeover · ", options: { bold: true, color: C.navy } },
     { text: "severe cases escalate with full context + Telegram phone ping." }],
    [{ text: "Continuous Learning · ", options: { bold: true, color: C.navy } },
     { text: "every confirmation/correction captured as a labelled training pair." }],
    [{ text: "Tamper-Evident Audit · ", options: { bold: true, color: C.navy } },
     { text: "every state change appended to a SHA-256 hash chain." }],
  ];
  const c1Lines = c1Bullets.map((runs, i) => {
    const isLast = i === c1Bullets.length - 1;
    runs[0].options = { ...(runs[0].options || {}), bullet: { code: "25B8" }, color: C.saffron };
    runs[runs.length - 1].options = { ...(runs[runs.length - 1].options || {}),
                                       breakLine: !isLast, paraSpaceAfter: 6 };
    return runs;
  }).flat();
  slide.addText(c1Lines, {
    x: c1x + 0.18, y: top + 1.85, w: colW - 0.32, h: colH - 1.95,
    fontFace: "Calibri", fontSize: 11, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Column 2: User Flow Diagram ───────────────────────────
  addSectionBox(slide, c2x, top, colW, colH, "USER FLOW DIAGRAM");

  const fx = c2x + 0.25;
  const fw = colW - 0.5;
  let fy = top + 0.75;
  const stepH = 0.42;
  const stepGap = 0.13;

  function drawStep(label, color) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: fx, y: fy, w: fw, h: stepH,
      fill: { color }, line: { color, width: 1 },
    });
    slide.addText(label, {
      x: fx, y: fy, w: fw, h: stepH,
      fontFace: "Calibri", fontSize: 11, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0,
    });
    fy += stepH + stepGap;
  }
  function drawArrow() {
    slide.addText("▼", {
      x: fx, y: fy - stepGap - 0.04, w: fw, h: stepGap + 0.08,
      fontFace: "Calibri", fontSize: 12, bold: true,
      color: C.saffron, align: "center", valign: "middle", margin: 0,
    });
  }

  drawStep("Citizen speaks", C.navy);
  drawArrow();
  drawStep("VAD captures audio  /converse", C.navy);
  drawArrow();
  drawStep("Whisper ASR  +  PII redact", C.navy);
  drawArrow();
  drawStep("Dialect ∥ Sentiment (parallel)", C.jade);
  drawArrow();
  drawStep("LLM + few-shot · 3 Safety Guards", C.jade);
  drawArrow();

  // Three branches — only navy/saffron/jade, no rose
  const branchY = fy;
  const branchH = 0.55;
  const branchW = (fw - 0.20) / 3;
  // Verify
  slide.addShape(pres.shapes.RECTANGLE, {
    x: fx, y: branchY, w: branchW, h: branchH,
    fill: { color: C.saffron }, line: { color: C.saffron },
  });
  slide.addText("VERIFY\n(loop)", {
    x: fx, y: branchY, w: branchW, h: branchH,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: C.navy, align: "center", valign: "middle", margin: 0,
  });
  // Guide
  slide.addShape(pres.shapes.RECTANGLE, {
    x: fx + branchW + 0.10, y: branchY, w: branchW, h: branchH,
    fill: { color: C.jade }, line: { color: C.jade },
  });
  slide.addText("GUIDE\n(AI advice)", {
    x: fx + branchW + 0.10, y: branchY, w: branchW, h: branchH,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: C.white, align: "center", valign: "middle", margin: 0,
  });
  // Handover
  slide.addShape(pres.shapes.RECTANGLE, {
    x: fx + 2 * (branchW + 0.10), y: branchY, w: branchW, h: branchH,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  slide.addText("HANDOVER\n→ Officer", {
    x: fx + 2 * (branchW + 0.10), y: branchY, w: branchW, h: branchH,
    fontFace: "Calibri", fontSize: 10, bold: true,
    color: C.saffron, align: "center", valign: "middle", margin: 0,
  });

  // ─── Column 3 (split top/bottom): Uniqueness + How It Addresses ─
  const col3TopH = 2.75, col3BotH = colH - col3TopH - 0.15;
  addSectionBox(slide, c3x, top, colW, col3TopH, "UNIQUENESS");
  const c3Bullets = [
    [{ text: "Verification before action · ", options: { bold: true, color: C.navy } },
     { text: "3-state machine: VERIFIED · CLARIFY · HANDOVER." }],
    [{ text: "Dialect-aware · ", options: { bold: true, color: C.navy } },
     { text: "4-way Kannada (Bangalore · Dharwad · Mangaluru · HK)." }],
    [{ text: "India-native swap-points · ", options: { bold: true, color: C.navy } },
     { text: "Whisper → IndicConformer · Llama → Sarvam-1 · Edge → Bhashini." }],
    [{ text: "Privacy at the edge · ", options: { bold: true, color: C.navy } },
     { text: "phone / Aadhaar / email redacted before LLM or DB." }],
    [{ text: "Free officer channel · ", options: { bold: true, color: C.navy } },
     { text: "Telegram bot push · no Twilio cost · no SIM provisioning." }],
  ];
  const c3Lines = c3Bullets.map((runs, i) => {
    const isLast = i === c3Bullets.length - 1;
    runs[0].options = { ...(runs[0].options || {}), bullet: { code: "2713" }, color: C.jade };
    runs[runs.length - 1].options = { ...(runs[runs.length - 1].options || {}),
                                       breakLine: !isLast, paraSpaceAfter: 6 };
    return runs;
  }).flat();
  slide.addText(c3Lines, {
    x: c3x + 0.18, y: top + 0.6, w: colW - 0.32, h: col3TopH - 0.65,
    fontFace: "Calibri", fontSize: 11, color: C.body,
    valign: "top", margin: 0,
  });

  // ── How It Addresses the Problem ─
  const c3BotY = top + col3TopH + 0.15;
  addSectionBox(slide, c3x, c3BotY, colW, col3BotH, "HOW IT ADDRESSES THE PROBLEM");
  const qa = [
    ["Different languages between operator and caller?",
     "Citizen-side TTS plays operator's English in caller's language and dialect."],
    ["Caller mid-distress, soft voice?",
     "VAD silence detection · helpline-prompt-prime · low-ASR-confidence guard."],
    ["AI may misinterpret regional phrasing?",
     "Mandatory paraphrase-and-confirm loop. Never acts on unconfirmed input."],
    ["Severe case must reach human in seconds?",
     "Severity-aware auto-handover · Telegram in <3s · pre-populated dashboard."],
  ];
  const qaRuns = qa.flatMap(([q, a], i) => {
    const isLast = i === qa.length - 1;
    return [
      { text: "Q · ", options: { bold: true, color: C.saffron } },
      { text: q + " ", options: { bold: true, color: C.navy, breakLine: true } },
      { text: "A · ", options: { bold: true, color: C.jade } },
      { text: a, options: { color: C.body, breakLine: !isLast, paraSpaceAfter: 6 } },
    ];
  });
  slide.addText(qaRuns, {
    x: c3x + 0.18, y: c3BotY + 0.6, w: colW - 0.32, h: col3BotH - 0.65,
    fontFace: "Calibri", fontSize: 10, color: C.body,
    valign: "top", margin: 0,
  });

  addFooter(slide);
}

// ============================================================
// SLIDE 3 — TECHNICAL APPROACH
// ============================================================
{
  const slide = pres.addSlide();
  addBackground(slide);
  addHeader(slide, "Technical Approach");
  addBigTitle(slide, "TECHNICAL APPROACH");

  const top = 1.85, gap = 0.18;
  const sideMargin = 0.3;
  const usableW = W - 2 * sideMargin - 2 * gap;
  const colW = usableW / 3;
  const colH = 4.95;
  const c1x = sideMargin;
  const c2x = sideMargin + colW + gap;
  const c3x = sideMargin + 2 * (colW + gap);

  // ─── Tech Stack ────────────────────────────────────────────
  addSectionBox(slide, c1x, top, colW, colH, "TECH STACK");

  const chips = [
    "Python", "FastAPI", "Vanilla JS", "WebSocket",
    "Whisper v3", "Llama 3.3", "Edge TTS", "Telegram",
    "SQLite", "Supabase", "Groq LPU", "Async I/O",
  ];
  const chipW = (colW - 0.36) / 4 - 0.08;
  const chipH = 0.34;
  const chipStartX = c1x + 0.18;
  let chipY = top + 0.65;
  chips.forEach((ch, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const cx = chipStartX + col * (chipW + 0.08);
    const cy = chipY + row * (chipH + 0.08);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: chipW, h: chipH,
      fill: { color: C.navy }, line: { color: C.navy },
    });
    slide.addText(ch, {
      x: cx, y: cy, w: chipW, h: chipH,
      fontFace: "Calibri", fontSize: 10, bold: true,
      color: C.saffron, align: "center", valign: "middle",
      charSpacing: 1, margin: 0,
    });
  });

  const stackBullets = [
    [{ text: "Frontend · ", options: { bold: true, color: C.navy } },
     { text: "Vanilla JS + WebSocket · VAD voice loop · 3-zone agent dashboard." }],
    [{ text: "Backend · ", options: { bold: true, color: C.navy } },
     { text: "FastAPI · Python 3.11 · async parallel pipeline." }],
    [{ text: "ASR + NLU · ", options: { bold: true, color: C.navy } },
     { text: "Groq Whisper Large v3 + Llama 3.3 70B · few-shot prompt with worked examples." }],
    [{ text: "TTS · ", options: { bold: true, color: C.navy } },
     { text: "Edge Neural · Sapna · Swara · Neerja." }],
    [{ text: "Storage · ", options: { bold: true, color: C.navy } },
     { text: "pluggable SQLite ↔ Supabase Postgres · audit chain on both." }],
    [{ text: "Audit · ", options: { bold: true, color: C.navy } },
     { text: "SHA-256 hash chain · /api/audit/verify detects tampering." }],
    [{ text: "Production swap · ", options: { bold: true, color: C.navy } },
     { text: "IndicConformer · Sarvam-1 · Bhashini · MeghRaj / KSDC." }],
  ];
  const stackLines = stackBullets.map((runs, i) => {
    const isLast = i === stackBullets.length - 1;
    runs[0].options = { ...(runs[0].options || {}), bullet: { code: "25B8" }, color: C.saffron };
    runs[runs.length - 1].options = { ...(runs[runs.length - 1].options || {}),
                                       breakLine: !isLast, paraSpaceAfter: 5 };
    return runs;
  }).flat();
  slide.addText(stackLines, {
    x: c1x + 0.18, y: chipY + 3 * (chipH + 0.08) + 0.10, w: colW - 0.32,
    h: colH - (3 * (chipH + 0.08) + 0.85),
    fontFace: "Calibri", fontSize: 10.5, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Architecture Diagram ─────────────────────────────────
  addSectionBox(slide, c2x, top, colW, colH, "ARCHITECTURE DIAGRAM");

  // 5 layered bands · only navy/saffron/jade tones
  const layers = [
    { label: "CLIENT",      sub: "Citizen Web App · Agent Dashboard · Analytics", color: C.navy },
    { label: "APPLICATION", sub: "FastAPI Orchestrator · State Machine · 3 Safety Guards", color: C.jade },
    { label: "SERVICES",    sub: "ASR · PII · Dialect · Sentiment · LLM · Verify · TTS · Audit · Learning", color: C.saffron },
    { label: "STORAGE",     sub: "SQLite (default) · Supabase Postgres", color: C.jadeLt },
    { label: "EXTERNAL",    sub: "Groq · MS Edge TTS · Telegram", color: C.navyDk },
  ];
  const layerStartY = top + 0.7;
  const layerH = 0.62;
  const layerGap = 0.10;
  layers.forEach((l, idx) => {
    const ly = layerStartY + idx * (layerH + layerGap);
    // colored left tag
    slide.addShape(pres.shapes.RECTANGLE, {
      x: c2x + 0.15, y: ly, w: 1.25, h: layerH,
      fill: { color: l.color }, line: { color: l.color },
    });
    const tagTextColor = (l.color === C.saffron) ? C.navy : C.saffron;
    slide.addText(l.label, {
      x: c2x + 0.15, y: ly, w: 1.25, h: layerH,
      fontFace: "Calibri", fontSize: 11, bold: true,
      color: tagTextColor, align: "center", valign: "middle",
      charSpacing: 1, margin: 0,
    });
    // body
    slide.addShape(pres.shapes.RECTANGLE, {
      x: c2x + 1.42, y: ly, w: colW - 1.57, h: layerH,
      fill: { color: C.cardFill }, line: { color: C.cardLine, width: 0.75 },
    });
    slide.addText(l.sub, {
      x: c2x + 1.50, y: ly, w: colW - 1.65, h: layerH,
      fontFace: "Calibri", fontSize: 10.5,
      color: C.body, align: "left", valign: "middle", margin: 0,
    });
    if (idx < layers.length - 1) {
      slide.addText("▼", {
        x: c2x, y: ly + layerH, w: colW, h: layerGap,
        fontFace: "Calibri", fontSize: 10, bold: true,
        color: C.saffron, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  slide.addText("Every external box is a single-file swap.", {
    x: c2x + 0.18, y: top + colH - 0.45, w: colW - 0.32, h: 0.35,
    fontFace: "Calibri", fontSize: 10, italic: true,
    color: C.muted, align: "center", valign: "middle", margin: 0,
  });

  // ─── Voice Pipeline + links ───────────────────────────────
  const c3TopH = 3.55, c3BotH = colH - c3TopH - 0.15;
  addSectionBox(slide, c3x, top, colW, c3TopH, "VOICE PIPELINE");
  const steps = [
    "1.  Citizen speaks naturally",
    "2.  VAD captures audio · /converse",
    "3.  Whisper ASR · text + lang + conf",
    "4.  PII redact (privacy boundary)",
    "5.  Dialect ∥ Sentiment (parallel)",
    "6.  Llama 3.3 + few-shot examples",
    "7.  3 Safety Guards run",
    "8.  State: VERIFIED / CLARIFY / HANDOVER",
    "9.  Edge TTS → Citizen",
    "10. WebSocket → Agent Dashboard",
    "11. Telegram → Officer (handover only)",
  ];
  const sx = c3x + 0.22;
  const sw = colW - 0.44;
  const sStartY = top + 0.62;
  const sH = (c3TopH - 0.75) / steps.length;
  steps.forEach((s, i) => {
    const sy = sStartY + i * sH;
    if (i % 2 === 0) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: sx - 0.04, y: sy, w: sw + 0.08, h: sH,
        fill: { color: "F8EFD8" }, line: { color: "F8EFD8" },
      });
    }
    slide.addText(s, {
      x: sx, y: sy, w: sw, h: sH,
      fontFace: "Calibri", fontSize: 10.5,
      color: C.body, align: "left", valign: "middle", margin: 0,
    });
  });

  // Links box
  const lx = c3x, ly = top + c3TopH + 0.15;
  addSectionBox(slide, lx, ly, colW, c3BotH, "DEMO · CODE · DRIVE");
  const linksRuns = [
    { text: "🎥  Prototype Video · ",   options: { bold: true, color: C.navy } },
    { text: "[paste link]",              options: { color: C.jade, breakLine: true, paraSpaceAfter: 4 } },
    { text: "🐙  GitHub Repository · ",  options: { bold: true, color: C.navy } },
    { text: "[paste link]",              options: { color: C.jade, breakLine: true, paraSpaceAfter: 4 } },
    { text: "🔗  Drive (slides · doc) · ", options: { bold: true, color: C.navy } },
    { text: "[paste link]",              options: { color: C.jade } },
  ];
  slide.addText(linksRuns, {
    x: lx + 0.22, y: ly + 0.6, w: colW - 0.44, h: c3BotH - 0.65,
    fontFace: "Calibri", fontSize: 11, color: C.body,
    valign: "top", margin: 0,
  });

  addFooter(slide);
}

// ============================================================
// SLIDE 4 — FEASIBILITY AND VIABILITY
// ============================================================
{
  const slide = pres.addSlide();
  addBackground(slide);
  addHeader(slide, "Feasibility & Viability");
  addBigTitle(slide, "FEASIBILITY AND VIABILITY");

  const top = 1.85, gap = 0.18;
  const sideMargin = 0.3;
  const usableW = W - 2 * sideMargin - 2 * gap;
  const colW = usableW / 3;
  const topRowH = 2.55;
  const c1x = sideMargin;
  const c2x = sideMargin + colW + gap;
  const c3x = sideMargin + 2 * (colW + gap);

  // ─── Operational Feasibility ──────────────────────────────
  addSectionBox(slide, c1x, top, colW, topRowH, "OPERATIONAL FEASIBILITY");
  const opBul = [
    "Browser-based citizen UI · no app install · runs on any smartphone with mic.",
    "Free Telegram bot · works on any officer's existing phone · no SIM provisioning.",
    "Stateless app layer · sessions in memory · scales horizontally.",
    "SQLite ↔ Supabase Postgres · switch backends with one env variable.",
  ];
  const opLines = opBul.map((t, i) => ({
    text: t,
    options: { bullet: { code: "25B8" }, color: C.body,
               breakLine: i < opBul.length - 1, paraSpaceAfter: 6 },
  }));
  slide.addText(opLines, {
    x: c1x + 0.18, y: top + 0.6, w: colW - 0.32, h: topRowH - 0.65,
    fontFace: "Calibri", fontSize: 11, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Technical Feasibility ────────────────────────────────
  addSectionBox(slide, c2x, top, colW, topRowH, "TECHNICAL FEASIBILITY");
  const tfBul = [
    "Open-source critical path · Whisper · Llama · FastAPI · all swappable for IndicConformer · Sarvam-1 · Bhashini.",
    "PII redacted at edge BEFORE any LLM or DB exposure.",
    "Async parallel pipeline · sub-second turn latency on warm cache.",
    "SHA-256 hash-chained audit ledger with public verifier.",
    "3 safety guards · distress · trigger-happy handover · low-ASR.",
  ];
  const tfLines = tfBul.map((t, i) => ({
    text: t,
    options: { bullet: { code: "25B8" }, color: C.body,
               breakLine: i < tfBul.length - 1, paraSpaceAfter: 5 },
  }));
  slide.addText(tfLines, {
    x: c2x + 0.18, y: top + 0.6, w: colW - 0.32, h: topRowH - 0.65,
    fontFace: "Calibri", fontSize: 10.5, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Viability ────────────────────────────────────────────
  addSectionBox(slide, c3x, top, colW, topRowH, "VIABILITY");
  const viBul = [
    "Production target · every external API swapped for in-country open-source on MeghRaj / KSDC.",
    "Designed to plug into Twilio / Exotel TwiML <Stream> in front of existing 1092 PSTN line.",
    "Continuous-learning capture · system improves with every confirmed call.",
    "Multilingual call summary in KN/HI/EN · supervisors can search by issue.",
  ];
  const viLines = viBul.map((t, i) => ({
    text: t,
    options: { bullet: { code: "25B8" }, color: C.body,
               breakLine: i < viBul.length - 1, paraSpaceAfter: 5 },
  }));
  slide.addText(viLines, {
    x: c3x + 0.18, y: top + 0.6, w: colW - 0.32, h: topRowH - 0.65,
    fontFace: "Calibri", fontSize: 10.5, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Bottom: Challenges/Solutions table + Digital Transformation ─
  const botY = top + topRowH + 0.18;
  const botH = 7.5 - botY - 0.45;
  const tblW = (colW * 2) + gap;
  const dtW  = colW;
  const tblX = c1x;
  const dtX  = c3x;

  addSectionBox(slide, tblX, botY, tblW, botH, "CHALLENGES & SOLUTIONS");

  const tableRows = [
    [
      { text: "Challenge", options: { bold: true, color: C.white,
                                       fill: { color: C.navy },
                                       align: "center", valign: "middle",
                                       fontSize: 12 } },
      { text: "Solution",  options: { bold: true, color: C.white,
                                       fill: { color: C.navy },
                                       align: "center", valign: "middle",
                                       fontSize: 12 } },
    ],
    [
      "Heavy regional dialects Whisper hasn't seen",
      "4-way Kannada classifier + prompt-prime · production swap to IndicConformer + Wav2Vec2.",
    ],
    [
      "LLM may hallucinate or escalate unnecessarily",
      "Verification loop · 3 safety guards · auto-fallback model · DO-NOT-handover few-shot.",
    ],
    [
      "Low-confidence ASR on noisy mic",
      "Low-ASR-confidence guard skips LLM and asks the caller to repeat.",
    ],
    [
      "Sensitive PII in transcripts",
      "Edge redaction before LLM/DB · audit hash chain proves no tampering.",
    ],
    [
      "Officer not on duty needs phone notification",
      "Free Telegram bot push with full pre-populated case context in <3 seconds.",
    ],
  ];
  slide.addTable(tableRows, {
    x: tblX + 0.15, y: botY + 0.65, w: tblW - 0.3,
    colW: [(tblW - 0.3) * 0.40, (tblW - 0.3) * 0.60],
    border: { type: "solid", pt: 0.5, color: C.cardLine },
    fontFace: "Calibri", fontSize: 11, color: C.body,
    rowH: 0.45,
    fill: { color: C.cardFill },
  });

  addSectionBox(slide, dtX, botY, dtW, botH, "DIGITAL TRANSFORMATION");
  const dtBul = [
    "Converts every call into structured · searchable · multilingual records.",
    "Aligns with Digital India · Bhashini · Karnataka e-Governance.",
    "Auditable handovers + corrections give supervisors quality signals.",
    "Single-file model swap-points keep the system upgradable.",
  ];
  const dtLines = dtBul.map((t, i) => ({
    text: t,
    options: { bullet: { code: "25CF" }, color: C.body,
               breakLine: i < dtBul.length - 1, paraSpaceAfter: 6 },
  }));
  slide.addText(dtLines, {
    x: dtX + 0.18, y: botY + 0.6, w: dtW - 0.32, h: botH - 0.65,
    fontFace: "Calibri", fontSize: 11, color: C.body,
    valign: "top", margin: 0,
  });

  addFooter(slide);
}

// ============================================================
// SLIDE 5 — IMPACT AND BENEFITS  (advantages = clean bullet list)
// ============================================================
{
  const slide = pres.addSlide();
  addBackground(slide);
  addHeader(slide, "Impact & Benefits");
  addBigTitle(slide, "IMPACT AND BENEFITS");

  const top = 1.85, gap = 0.18;
  const sideMargin = 0.3;
  const usableW = W - 2 * sideMargin - 2 * gap;
  const colW = usableW / 3;
  const colH = 4.95;
  const c1x = sideMargin;
  const c2x = sideMargin + colW + gap;
  const c3x = sideMargin + 2 * (colW + gap);

  // ─── Benefits ─────────────────────────────────────────────
  const beH = colH * 0.55 - 0.05;
  addSectionBox(slide, c1x, top, colW, beH, "BENEFITS");
  const beBul = [
    [{ text: "Right Response, First Time · ", options: { bold: true, color: C.navy } },
     { text: "verification loop ensures the operator acts on the correct interpretation." }],
    [{ text: "Faster Severe-Case Response · ", options: { bold: true, color: C.navy } },
     { text: "pre-populated context cuts officer ramp-up from minutes to seconds." }],
    [{ text: "Zero Friction · ", options: { bold: true, color: C.navy } },
     { text: "natural speech in KN/HI/EN with dialect tolerance · no IVR maze." }],
    [{ text: "Officer Comfort · ", options: { bold: true, color: C.navy } },
     { text: "operator types in English · citizen hears Kannada via TTS." }],
    [{ text: "Searchable, Auditable Calls · ", options: { bold: true, color: C.navy } },
     { text: "every turn hash-chained for evidence integrity." }],
  ];
  const beLines = beBul.map((runs, i) => {
    const isLast = i === beBul.length - 1;
    runs[0].options = { ...(runs[0].options || {}), bullet: { code: "2605" }, color: C.saffron };
    runs[runs.length - 1].options = { ...(runs[runs.length - 1].options || {}),
                                       breakLine: !isLast, paraSpaceAfter: 5 };
    return runs;
  }).flat();
  slide.addText(beLines, {
    x: c1x + 0.18, y: top + 0.6, w: colW - 0.32, h: beH - 0.65,
    fontFace: "Calibri", fontSize: 10.5, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Future Scope (below benefits) ────────────────────────
  const fsY = top + beH + 0.10;
  const fsH = colH - beH - 0.10;
  addSectionBox(slide, c1x, fsY, colW, fsH, "FUTURE SCOPE");
  const fsBul = [
    "Production deployment on MeghRaj / KSDC with IndicConformer + Sarvam-1 + Bhashini.",
    "Telephony integration via Twilio / Exotel <Stream> in front of 1092 PSTN line.",
    "Extension to Karnataka helplines 112 · 1098 · 181 · 100.",
    "On-device ASR via IndicConformer in WASM for offline rural.",
    "Dialect coverage to Tulu · Konkani · Beary.",
  ];
  const fsLines = fsBul.map((t, i) => ({
    text: t,
    options: { bullet: { code: "25B8" }, color: C.body,
               breakLine: i < fsBul.length - 1, paraSpaceAfter: 4 },
  }));
  slide.addText(fsLines, {
    x: c1x + 0.18, y: fsY + 0.6, w: colW - 0.32, h: fsH - 0.65,
    fontFace: "Calibri", fontSize: 10, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Impacts ──────────────────────────────────────────────
  addSectionBox(slide, c2x, top, colW, colH, "IMPACTS");
  const imBul = [
    [{ text: "Reduces wrong-action rate · ", options: { bold: true, color: C.navy } },
     { text: "from caller misunderstanding — the largest quality failure in citizen helplines." }],
    [{ text: "Multilingual access · ", options: { bold: true, color: C.navy } },
     { text: "for 40 %+ of Karnataka callers more comfortable in a non-operator language." }],
    [{ text: "Audit-grade traceability · ", options: { bold: true, color: C.navy } },
     { text: "supervisors can prove who knew what when." }],
    [{ text: "Continuous-learning loop · ", options: { bold: true, color: C.navy } },
     { text: "every call becomes training data for region-specific Indian models." }],
    [{ text: "Reference architecture · ", options: { bold: true, color: C.navy } },
     { text: "other state helplines can adopt — Maharashtra 103 · Tamil Nadu 181." }],
  ];
  const imLines = imBul.map((runs, i) => {
    const isLast = i === imBul.length - 1;
    runs[0].options = { ...(runs[0].options || {}), bullet: { code: "27A4" }, color: C.jade };
    runs[runs.length - 1].options = { ...(runs[runs.length - 1].options || {}),
                                       breakLine: !isLast, paraSpaceAfter: 6 };
    return runs;
  }).flat();
  slide.addText(imLines, {
    x: c2x + 0.18, y: top + 0.6, w: colW - 0.32, h: colH - 0.65,
    fontFace: "Calibri", fontSize: 11, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Advantages — clean two-column point list ─────────────
  addSectionBox(slide, c3x, top, colW, colH, "ADVANTAGES");

  const advItems = [
    "Verified Understanding",
    "Faster Severe Response",
    "Multilingual Access",
    "Audit-Grade Traceability",
    "Officer Productivity",
    "Continuous Improvement",
  ];

  const advStartY = top + 0.7;
  const advH = 0.55;
  const advGap = 0.13;
  advItems.forEach((label, i) => {
    const ay = advStartY + i * (advH + advGap);
    // numbered circle
    slide.addShape(pres.shapes.OVAL, {
      x: c3x + 0.25, y: ay, w: advH, h: advH,
      fill: { color: C.saffron }, line: { color: C.saffron },
    });
    slide.addText(String(i + 1), {
      x: c3x + 0.25, y: ay, w: advH, h: advH,
      fontFace: "Calibri", fontSize: 16, bold: true,
      color: C.navy, align: "center", valign: "middle", margin: 0,
    });
    // label box
    slide.addShape(pres.shapes.RECTANGLE, {
      x: c3x + 0.25 + advH + 0.10, y: ay,
      w: colW - 0.5 - advH - 0.10, h: advH,
      fill: { color: C.navy }, line: { color: C.navy },
    });
    slide.addText(label, {
      x: c3x + 0.25 + advH + 0.10, y: ay,
      w: colW - 0.5 - advH - 0.10, h: advH,
      fontFace: "Calibri", fontSize: 13, bold: true,
      color: C.saffron, align: "center", valign: "middle",
      charSpacing: 0.5, margin: 0,
    });
  });

  addFooter(slide);
}

// ============================================================
// SLIDE 6 — RESEARCH AND REFERENCES
// ============================================================
{
  const slide = pres.addSlide();
  addBackground(slide);
  addHeader(slide, "Research & References");
  addBigTitle(slide, "RESEARCH AND REFERENCES");

  const top = 1.85;
  const sideMargin = 0.3;
  const leftW = 8.0, rightW = W - 2 * sideMargin - leftW - 0.18;
  const colH = 4.95;
  const c1x = sideMargin;
  const c2x = sideMargin + leftW + 0.18;

  // ─── References list (left) — bigger fonts, fewer items ──
  addSectionBox(slide, c1x, top, leftW, colH, "PRIOR ART · MODELS · DATASETS");
  const refs = [
    [{ text: "Whisper · ", options: { bold: true, color: C.navy } },
     { text: "Robust Speech Recognition via Large-Scale Weak Supervision (Radford et al., 2022)." }],
    [{ text: "AI4Bharat IndicConformer · ", options: { bold: true, color: C.navy } },
     { text: "Multilingual ASR for 22 Indian languages (2024) — ai4bharat.iitm.ac.in" }],
    [{ text: "AI4Bharat IndicVoices · ", options: { bold: true, color: C.navy } },
     { text: "Speech corpus across 22 Indian languages, used for fine-tuning regional acoustics." }],
    [{ text: "Sarvam AI · ", options: { bold: true, color: C.navy } },
     { text: "Sarvam-1, a 2 B-parameter India-native foundation model (2024) — sarvam.ai" }],
    [{ text: "Bhashini · ", options: { bold: true, color: C.navy } },
     { text: "National Language Translation Mission, MeitY, Government of India — bhashini.gov.in" }],
    [{ text: "Microsoft Edge Neural TTS · ", options: { bold: true, color: C.navy } },
     { text: "Indian-language voices Sapna · Swara · Neerja." }],
    [{ text: "Groq LPU · ", options: { bold: true, color: C.navy } },
     { text: "Sub-200 ms LLM inference for real-time voice agents — groq.com" }],
    [{ text: "Karnataka 1092 · ", options: { bold: true, color: C.navy } },
     { text: "Women & Child Helpline · DPAR (e-Governance), Government of Karnataka." }],
    [{ text: "Igo Kannada Samyukta Samputa · ", options: { bold: true, color: C.navy } },
     { text: "Venkatasubbaiah — referenced in the problem statement." }],
  ];
  const refLines = refs.map((runs, i) => {
    const isLast = i === refs.length - 1;
    runs[0].options = { ...(runs[0].options || {}), bullet: { code: "25CF" }, color: C.saffron };
    runs[runs.length - 1].options = { ...(runs[runs.length - 1].options || {}),
                                       breakLine: !isLast, paraSpaceAfter: 8 };
    return runs;
  }).flat();
  slide.addText(refLines, {
    x: c1x + 0.22, y: top + 0.6, w: leftW - 0.4, h: colH - 0.65,
    fontFace: "Calibri", fontSize: 11.5, color: C.body,
    valign: "top", margin: 0,
  });

  // ─── Ecosystem (right) ───────────────────────────────────
  addSectionBox(slide, c2x, top, rightW, colH, "ECOSYSTEM");
  const eco = [
    "OpenAI",     "AI4Bharat",
    "Sarvam-1",   "Bhashini",
    "Microsoft",  "Groq",
    "FastAPI",    "Python",
    "Karnataka",  "MeitY",
  ];
  const colsN = 2;
  const rowsN = 5;
  const tileW = (rightW - 0.36 - (colsN - 1) * 0.10) / colsN;
  const tileH = (colH - 0.85 - (rowsN - 1) * 0.10) / rowsN;
  eco.forEach((name, i) => {
    const r = Math.floor(i / colsN);
    const c = i % colsN;
    const tx = c2x + 0.18 + c * (tileW + 0.10);
    const ty = top + 0.65 + r * (tileH + 0.10);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: tx, y: ty, w: tileW, h: tileH,
      fill: { color: C.cardFill }, line: { color: C.cardLine, width: 1 },
    });
    slide.addText(name, {
      x: tx, y: ty, w: tileW, h: tileH,
      fontFace: "Calibri", fontSize: 13, bold: true,
      color: C.navy, align: "center", valign: "middle",
      charSpacing: 1, margin: 0,
    });
  });

  addFooter(slide);
}

// ────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "D:/theme12/Arjuna_Pratyaya_AI_for_Bharat.pptx" })
   .then((file) => console.log("Wrote " + file));
