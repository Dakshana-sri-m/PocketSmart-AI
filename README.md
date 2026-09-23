<div align="center">

# 💡 PocketSmart AI
### GenAI-Powered Budget & Intelligent Recommendation Assistant

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0%2B-black.svg?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Groq](https://img.shields.io/badge/AI%20Engine-Groq%20Cloud-f55036.svg)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

*An intelligent, budget-conscious recommendation assistant that transforms vague user inputs into comprehensive, expert-level architectural blueprints, event plans, and style capsules.*

</div>

---

## 🌟 Overview

Managing budgets across disparate life needs—furnishing a home, hosting an event, or styling for a grand occasion—is often overwhelming. **PocketSmart AI** solves this with an architectural-grade **Cognitive Reasoning Engine (v2.0)** that delivers tailored recommendations grounded in real Indian e-commerce catalogs.

Rather than returning generic product lists or hallucinated prices, PocketSmart AI calibrates budget tiers, enforces strict spatial zoning, calculates turnkey installation reserves, curates harmonized color palettes, and provides insider procurement hacks.

---

## 🚀 Key Modules

### 1. 🏠 Home Interior Planner
- **Multi-Room Budget Optimization:** Intelligently allocates funds across selected rooms (Living, Bedroom, Study, Kids, Balcony, etc.) with custom quantities.
- **Architectural Blueprint:** Formulates an overarching design philosophy (e.g., *Japandi Playful Sanctuary*, *Nordic Biophilic Montessori*).
- **Curated Color & Material Swatches:** Generates 4-tone palette swatches with hex codes and functional room roles.
- **Turnkey Carpentry Reserve:** Allocates surplus capital on luxury budgets to bespoke civil/modular carpentry reserves rather than inflating catalog prices.
- **Catalog Grounding:** Real product lines from **IKEA India** (PAX, KALLAX, TROFAST), **Pepperfry** (Woodsworth, Amberville), **Urban Ladder** (Derry), and **Amazon**.

### 2. 🎉 Party Budget Planner
- **Economic Density Calibration:** Automatically calculates per-head spend (₹/guest) to structure appropriate hospitality tiers.
- **Smart 4-Way Split:** Allocates budgets across Catering (~40%), Decoration (~25%), Entertainment (~20%), and Accommodation/Misc (~15%).
- **Vendor Attribution:** Specific service recommendations from **Swiggy Gourmet**, **Zomato Large Orders**, **OYO Townhouse / Weddingz.in**, and verified networks.

### 3. 💍 Jewelry & Fashion Stylist
- **Hierarchy & Occasion Harmony:** Matches silhouettes for Weddings, Festivals, Office capsules, or Evening Galas.
- **Gemological & Metal Rigor:** Specifies metal purities (925 Sterling Silver, 18K/22K Gold Vermeil) and stones (Kundan, Polki, Moissanite).
- **Outfit Photo Coordination:** Analyzes attire neckline geometry and fabric undertones for seamless pairing.

---

## 🧠 Cognitive Reasoning Architecture

PocketSmart AI wraps base LLMs in an architectural reasoning framework:

```
┌────────────────────────────────────────────────────────┐
│  Phase 1: Budget Tier Calibration & Capital Realism   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 2: Spatial Zoning & Functional Architecture     │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 3: Curated Design Philosophy & Color Theory     │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 4: Multi-Platform Procurement Strategy          │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 5: Real Catalog Grounding & Specification Audit │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 6: Value Optimization & Insider Procurement Tip │
└────────────────────────────────────────────────────────┘
```

See [`AI_FRAMEWORK.md`](AI_FRAMEWORK.md) for full architectural documentation.

---

## 🛠️ Project Structure

```
PocketSmart AI/
├── app.py                      # Flask entry point & blueprint registration
├── requirements.txt            # Project dependencies
├── .env.example                # Configuration template
├── AI_FRAMEWORK.md             # Master cognitive reasoning specification
├── .agents/skills/             # Antigravity agent reasoning skill
│   └── pocketsmart-reasoning-engine/
│       └── SKILL.md
├── routes/                     # Blueprint route handlers
│   ├── home_planner.py
│   ├── party_planner.py
│   └── jewelry_planner.py
├── services/                   # Backend AI & prompt pipeline
│   ├── ai_service.py           # Groq API client with resilient JSON recovery
│   └── prompts.py              # Master reasoning prompt templates
├── static/                     # Dark glassmorphism design system
│   ├── style.css
│   └── app.js
└── templates/                  # Frontend interfaces
    ├── index.html              # Landing portal
    ├── home_planner.html       # Home Interior UI
    ├── party_planner.html      # Party Budget UI
    └── jewelry_planner.html    # Jewelry Stylist UI
```

---

## ⚡ Quick Start

### 1. Clone & Set Up Virtual Environment
```bash
git clone https://github.com/Dakshana-sri-m/PocketSmart-AI.git
cd PocketSmart-AI

python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and insert your [Groq API Key](https://console.groq.com/keys):
```bash
cp .env.example .env
```
Edit `.env`:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
FLASK_SECRET_KEY=your_secret_key
```

### 4. Run the Application
```bash
python app.py
```
Open your browser to: **`http://localhost:5000`**

---

## 📄 License
Distributed under the MIT License.
