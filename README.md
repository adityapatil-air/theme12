# Pratyaya — Verified Voice-to-Voice for the 1092 Helpline

> **AI for Bharat 2026 · Theme 12: AI for the 1092 Helpline**
> **Team Arjuna**

An AI-assistive voice-to-voice layer for the **Karnataka 1092 Women & Child
Helpline**. Sits between the citizen and the human officer, ensuring every
issue is *heard, interpreted, and verified* before any response is committed.

> *In citizen services, the biggest failure is not lack of response — but the
> wrong response due to wrong understanding.*
> Pratyaya guarantees that the operator and the citizen mean exactly the same
> thing before any action is taken.

**Live deployment** · `https://12theme-production.up.railway.app`

---

## What it does

A complete government-grade voice-to-voice helpline assistant that:

1. **Listens** to a citizen speaking naturally in Kannada · Hindi · English ·
   code-mixed Hinglish — with awareness of Bangalore, Dharwad, Mangaluru, and
   Hyderabad-Karnataka Kannada dialects.
2. **Interprets** the issue with sentiment, urgency, location, and
   named-entity awareness.
3. **Restates** what it understood — in the citizen's own language — and asks
   them to confirm.
4. **Verifies** explicitly: *haudu / illa / partial*. **No action without confirmation.**
5. **Guides** directly with concrete operator-style advice for non-severe
   issues — neighborhood disturbance, suspicious activity, drunk on road,
   information requests.
6. **Escalates** gracefully to a human officer for severe issues (domestic
   violence, child safety, missing persons, sexual harassment, stalking,
   medical emergencies) — with full case context pre-populated on the agent
   dashboard and a Telegram phone notification to the on-duty officer.

---

## Test cases — what we actually demonstrated

These are the four example scenarios from the problem statement, all
walked end-to-end in this build. The behavior table reflects the actual
state machine output captured in the uvicorn logs during testing.

### Example 1 · Hindi · neighborhood fight, caller not personally involved

| Turn | Citizen | AI | Action / State |
|---|---|---|---|
| 1 | *गाव में जगडा हो रहा है* (fight in the village) | *क्या मैं समझ रही हूँ कि गाँव में लड़ाई हो रही है — सही है?* | `verify` / CLARIFY |
| 2 | *हाँ* | *जगड़ा कहाँ हो रहा है?* | `ask` / CLARIFY |
| 3 | *जयनगर में* | *क्या आप इस जगड़े में शामिल हैं?* | `ask` / CLARIFY |
| 4 | *नहीं* | *क्या आप अभी पुलिस सहायता चाहती हैं?* | `ask` / CLARIFY |
| 5 | *अभी नहीं* | *ठीक है। कृपया घर के अंदर रहें और दरवाज़ा बंद रखें। अगर मारपीट बढ़े या हथियार दिखे तो तुरंत 100 डायल करें। मैं आपके इलाक़े का नोट ले रही हूँ ताकि गश्ती दल वहाँ जा सके।* | `guide` / VERIFIED |

**Result · ✅ PASS.** AI gave concrete operator-style guidance, did NOT escalate
unnecessarily. Slot extraction captured `issue_type=neighborhood_disturbance`,
`location=Jayanagar`, `urgency=medium`. Logged for the agent dashboard for review.

### Example 2 · Hindi · misinterpretation + correction (the critical loop)

| Turn | Citizen | AI | Action / State |
|---|---|---|---|
| 1 | *यहाँ कुछ लोग घूम रहे हैं, शक हो रहा है* | *क्या आप कह रही हैं कि कुछ लोग आसपास इकट्ठा हुए हैं — सही है?* (soft interpretation) | `verify` / CLARIFY |
| 2 | *नहीं, चोरी का शक है* | *समझ गई — आप कह रही हैं कि वो लोग संदिग्ध हैं और चोरी का भय है, सही है?* (corrected) | `verify` / CLARIFY |
| 3 | *हाँ* + location + safe inside | *ठीक है। दरवाज़ा बंद रखिए। अगर वो आपके दरवाज़े के पास आएँ तो तुरंत 100 डायल करें। मैं इंदिरानगर गश्ती को सूचना दे रही हूँ।* | `guide` / VERIFIED |

**Result · ✅ PASS.** Correction loop closed cleanly — slots updated from
`casual_gathering` → `suspicious_activity`. The corrected pair was captured
in `services/learning.py` as a labeled training signal. This is the rubric's
"continuous learning" criterion made literal.

### Example 3 · English · woman in personal danger (handover money shot)

| Turn | Citizen | AI | Action / State |
|---|---|---|---|
| 1 | *Please help, someone is following me, I'm scared* | *You're saying someone is following you and you feel unsafe — is that right?* | `verify` / CLARIFY |
| 2 | *Yes* | *I hear you. You're not alone — please stay on the line. I'm connecting you to our woman officer right now. They already know what's happening.* | **`handover` / HANDOVER** |

**Result · ✅ PASS.** State pill turns red. Telegram notification fired to the
on-duty officer's phone within 2.4 seconds with full case context (issue,
location, sentiment, transcript). Agent dashboard's three zones populated
automatically. Subsequent citizen audio is transcribed straight to the
dashboard for the officer (no AI re-trigger).

### Example 4 · Hinglish · drunk man causing trouble on road

| Turn | Citizen | AI | Action / State |
|---|---|---|---|
| 1 | *Sir idhar ek aadmi drunk hai aur road par problem kar raha hai* | *Aap keh rahe hain ki ek aadmi sharab ke nashe mein road par problem kar raha hai — sahi hai?* | `verify` / CLARIFY |
| 2 | *Haan* | *Aap kahaan par hain, aur kya aap khud safe hain?* | `ask` / CLARIFY |
| 3 | *Main shop ke andar hoon, safe hoon* | *Theek hai. Aap shop ke andar hi rahein, bahar mat aaiye. Agar wo aapki taraf aaye ya kisi ko maare, turant 100 dial karein. Main location ka note le rahi hoon, gasht ke liye bhej rahi hoon.* | `guide` / VERIFIED |

**Result · ✅ PASS.** Code-mixed Hinglish handled cleanly — Whisper detected
mixed Hindi/English, the LLM responded in the same register, and the AI
correctly stayed in `guide` mode (third-party disturbance, caller is safe,
no need to escalate).

### Example 5 · Kannada · ASR robustness probe

We tested *"ಇಲ್ಲಿ ಯಾರೋ ಜನ ಸುತ್ತಾಡ್ತಿದ್ದಾರೆ, ಸಂಶಯ ಬರ್ತಿದೆ"* (suspicious people loitering)
in Kannada. Whisper Large v3 sometimes mistranscribes regional Kannada at low
confidence (0.39 in our run). Our **low-ASR-confidence guard** fired:

```
[converse-low-asr] conf=0.39 text='Janashiridhare Somshaya Bharutir' → asking to repeat
```

The system politely asked the citizen to repeat *"ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮತ್ತೊಮ್ಮೆ ಹೇಳ್ತೀರಾ?"*
instead of bailing to a wrong handover. **Result · ✅ PASS** for the guardrail
behavior — the system stayed in CLARIFY rather than escalating on garbled audio.
Production swap to AI4Bharat IndicConformer is the noted long-term fix for
Kannada-specific ASR quality.

---

## How a turn flows

```
Citizen voice → ASR (with helpline-prompt prime) → PII redaction
                  ↓
        ┌────────┴────────┐
        ↓                 ↓
 Dialect classifier   Sentiment (lexical + prosodic)
        ↓                 ↓
        └─────────┬───────┘
                  ↓
       Conversation LLM (Llama 3.3 70B + 5-shot)
                  ↓
       3 Safety Guards
       • Distress fast-path
       • Trigger-happy handover sanity
       • Low-ASR-confidence
                  ↓
       State machine
       (VERIFIED / CLARIFY / HANDOVER)
                  ↓
   ┌──────────────┼──────────────┬──────────────┐
   ↓              ↓              ↓              ↓
 Verify       AI Guide       Bridge to       Audit chain
 paraphrase   3-beat advice  human officer   append (SHA-256)
 + TTS        + TTS          + Telegram ping
                  ↓
       Continuous-learning capture
       (confirmations + corrections)
```

Every turn is appended to a SHA-256 hash-chained audit ledger. Tampering
with any historical row breaks the verifier endpoint at `GET /api/audit/verify`.

---

## Run locally

```bash
# Prerequisites: Python 3.11, a Groq API key (free tier works)

git clone https://github.com/kernel-46/12theme.git
cd 12theme

python -m venv .venv
.venv\Scripts\activate           # Windows
# source .venv/bin/activate      # Unix

pip install -r requirements.txt

cp .env.example .env             # then fill in GROQ_API_KEY (required)
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Open in your browser:

| URL | Purpose |
|---|---|
| http://localhost:8000/ | Citizen call interface (default landing for callers) |
| http://localhost:8000/agent | Agent dashboard (3-zone live view) |
| http://localhost:8000/analytics | Civic-sensor dashboard |
| http://localhost:8000/about | Marketing landing page |
| http://localhost:8000/healthz | JSON liveness probe |
| http://localhost:8000/api/audit/verify | Hash-chain integrity check |

For the live demo, open `/` and `/agent` in two tabs side by side. Pratyaya
broadcasts call events between them in real time over WebSocket.

---

## Deploy to Railway

The project ships with `Procfile`, `railpack.json`, `runtime.txt`, and
`.env.railway.example` — production-ready out of the box.

1. Push this repo to GitHub
2. Railway → **New Project** → **Deploy from GitHub** → pick the repo
3. Variables tab → paste the values from `.env.railway.example` (real values, not placeholders). Critical: set `DB_BACKEND=postgres` (Railway's filesystem is ephemeral; SQLite would be wiped on each redeploy).
4. Settings → Networking → enable **Outbound IPv6** (required for direct Supabase Postgres connections).
5. Deploy. After it goes green, hit `/healthz` — should return `{"ok": true, "db_backend": "postgres"}`.
6. Set `PUBLIC_BASE_URL` to the Railway URL so Telegram handover messages link correctly.

---

## Storage backends

Pratyaya supports two storage backends with an identical interface:

- **SQLite** (default) — local file at `data/pratyaya.db`. Zero-config, ideal for offline development.
- **Supabase Postgres** — cloud, multi-machine, persistent across redeploys. Set `DB_BACKEND=postgres` and the `SUPABASE_DB_*` env vars. Schema migrates automatically on first start.

The audit hash chain works identically across both backends.

---

## Production swap-points (every external dependency is a single-file replace)

| Service file | Demo-time | Production target |
|---|---|---|
| `services/asr.py` | Groq Whisper Large v3 | AI4Bharat **IndicConformer** + BharatGen **Shrutam2** in parallel |
| `services/conversation.py` | Groq Llama 3.3 70B | **Sarvam-1** (2 B-param India-native LLM) |
| `services/dialect.py` | Lexical + Llama LLM | **Wav2Vec2** fine-tuned on IndicVoices |
| `services/tts.py` | Microsoft Edge Neural | **Bhashini TTS** or **AI4Bharat Indic-TTS** |
| Storage | SQLite | Supabase Postgres / managed Postgres on **MeghRaj** or **Karnataka State Data Centre** |
| Telephony | Browser audio | **Twilio Voice** or **Exotel** with TwiML `<Stream>` to existing pipeline |

Once swapped, the deployment runs entirely on open-source models within
Indian jurisdiction with no closed-source critical path.

---

## Privacy & compliance posture

- **PII redaction at the edge** — phone numbers, Aadhaar, email, long digit blocks are redacted in `services/pii.py` *before* the transcript is logged or sent to the LLM.
- **Hash-chained audit ledger** — every action (turn committed, citizen confirmation, agent correction, handover) appends a SHA-256-chained row. Tampering with any historical row breaks the verifier at `GET /api/audit/verify`.
- **Indian-jurisdiction model story** — production target swaps Groq calls for in-country IndicConformer / Sarvam / Bhashini deployments.
- **Continuous-learning capture** — confirmed verifications and corrections are persisted as labelled training pairs for downstream model improvement.

---

## Stack

`Python 3.11` · `FastAPI` · `Vanilla JS + WebSocket` · `Whisper Large v3` ·
`Llama 3.3 70B` · `Microsoft Edge Neural TTS` · `Telegram Bot API` ·
`SQLite` ↔ `Supabase Postgres` · `Groq LPU Inference`

---

## Demo flow (4 minutes)

1. Open `/` and `/agent` side-by-side. Pick **Kannada** → **Start call**.
2. AI greets in Kannada (Sapna Neural). State banner: **LISTENING**. Two-tone "your turn" chime.
3. Speak: *"nanna ganda kudidu bandu hodeyutaane, Jayanagar-alli iddini."*
4. State banner: **PROCESSING** → **VERIFYING**. AI paraphrases in Kannada (with Roman line) and asks confirmation.
5. Say *"haudu"*. AI generates operator-style guidance and **escalates** because issue is severe.
6. State banner: **HANDOVER**. Telegram ping arrives on operator's phone with full case context within 3 seconds.
7. Switch to `/agent`. State pill is red. Operator types in Zone C: *"Don't worry, I'm Sangeetha. Where exactly in Jayanagar?"* — citizen hears it spoken in Kannada via Edge TTS.
8. Citizen replies via voice. Transcript appears on agent dashboard. Operator continues by typing or by clicking the operator-mic to speak (browser STT).
9. Click `/api/audit/verify` to confirm hash chain integrity (✓ intact, N rows).
10. Open `/analytics` to show the civic-sensor view: issue distribution, dialect mix, sentiment heat, recent calls.

---

> *"The citizen is heard. The understanding is verified. The agent always
> knows what the AI thinks before the AI ever speaks."*
