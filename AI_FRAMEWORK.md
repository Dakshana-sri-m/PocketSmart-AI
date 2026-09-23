# PocketSmart AI — Cognitive Reasoning & Recommendation Framework
**Version:** 2.0 (Super Saiyan Architecture)  
**Author:** PocketSmart AI Core Architecture Team  
**Scope:** Home Interior Planner, Party Budget Planner, Jewelry & Fashion Stylist  

---

## 1. Executive Summary

Standard Large Language Models (LLMs) operate on token probability distributions without domain grounding. When prompted naively (e.g., *"give me products for ₹27 Lakhs"*), they suffer from:
1. **Hallucinated Price Scaling:** Blindly multiplying prices of cheap catalog items (e.g., pricing a ₹9,990 IKEA bed at ₹1,20,000) rather than recommending comprehensive high-end suites or turnkey architectural carpentry.
2. **Platform Conflation:** Combining distinct e-commerce stores into fictional hybrids (e.g., "Flipkart Pepperfry").
3. **Robotic Clichés:** Repeating generic filler ("*Space-saving design with sturdy construction*", "*Warm illumination creates a cozy ambience*").
4. **Capital Under-Allocation:** Leaving huge portions of a user's budget unaccounted for without explaining the surplus or reserve.

The **PocketSmart AI Reasoning Framework** wraps the underlying model in an **Architectural Cognitive Protocol** inspired by the systems running behind Claude Design, v0, and Lovable. It enforces domain personas, catalog grounding, budget tier heuristics, and negative constraint filters.

---

## 2. The 6-Stage Cognitive Reasoning Chain

Every recommendation engine run must execute the following 6 reasoning phases prior to emitting structured data:

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

### Phase 1: Budget Tier Calibration
The AI must first classify the user's spending power into an exact Indian market tier:
- **Micro / Starter (< ₹30,000 per room):** High-utility flat-pack (IKEA LACK, Amazon Solimo, Wakefit engineered wood). Prioritize absolute essentials and multi-functional storage.
- **Smart Middle-Class (₹30,000 – ₹1,50,000 per room):** Modular systems (IKEA KALLAX, Urban Ladder study desks, Pepperfry solid wood coffee tables, Green Soul ergonomic seating).
- **Premium Urban (₹1,50,000 – ₹6,00,000 per room):** Hardwood anchors (Sheesham/Teak from Pepperfry Woodsworth), IKEA PAX customizable modular wardrobes, Philips Hue smart lighting setups, high-density memory foam or natural latex mattresses.
- **Luxury Turnkey Fit-Out (> ₹6,00,000 per room):** Architectural-grade transformations. Full-room custom modular suites, motorized sit-stand workstations, acoustic wall paneling, imported designer fixtures, multi-zone layered architectural lighting, air filtration systems, and custom thematic carpentry reserves.

### Phase 2: Spatial Zoning & Functional Architecture
A room is never treated as a random basket of furniture. It is split into 4 critical spatial zones:
1. **Sleep / Rest Sanctuary:** Bedframe, mattress, acoustic buffer, soft dimmable illumination.
2. **Focus / Cognitive Hub:** Ergonomic desk, adjustable lumbar task chair, 4000K glare-free task lighting, cable management.
3. **Storage & Organization:** Built-in or modular vertical storage, toy bins, seasonal wardrobe.
4. **Active Play / Relaxation:** Soft non-toxic floor textiles, accent seating, biophilic or thematic decor.

### Phase 3: Curated Design Philosophy & Color Theory
Never output generic "modern style". Require a defined architectural concept:
- *Examples:* "Nordic Montessori Biophilic", "Japandi Warm Minimalist", "Industrial Loft Contemporary", "Mid-Century Modern Earthy".
- Specify an exact 4-color palette with precise shade descriptions (e.g., Warm Birch, Nordic Sage Green, Matte Terracotta, Brushed Champagne Brass).

### Phase 4: Multi-Platform Procurement Strategy
Each retailer in India has distinct logistical and manufacturing advantages:
- **IKEA India:** Best for modular storage (TROFAST, KALLAX, PAX), children's adaptive furniture (KURA, SMÅSTAD), and minimalist lighting.
- **Pepperfry:** Best for solid Sheesham and Mango wood (Woodsworth, Amberville series), statement dining, and Indian craftsmanship.
- **Urban Ladder:** Best for refined urban upholstery, mid-century sofas, and ergonomic study desks (Derry, Yorkshire).
- **Amazon India:** Best for tech integration, smart lighting (Philips Hue, Wipro), mattress-in-a-box brands (Wakefit, Sleepyhead), and rapid-delivery accessories.
- **Flipkart:** Best for budget-conscious value electronics and certified affordable home utility.

### Phase 5: Real Catalog Grounding & Specification Audit
Every item must reference a **real, commercially available product line** with concrete specifications:
- **Dimensions & Footprint:** (e.g., `99 x 44 x 94 cm`)
- **Material Construction:** (e.g., `Solid Scandinavian Pine with water-based non-toxic lacquer`)
- **Realistic INR Pricing:** Prices must strictly match actual market pricing. If a room budget is ₹13.5 Lakhs, the AI does *not* inflate a ₹10,000 IKEA bed to ₹1,20,000; instead, it recommends either a genuine luxury solid wood loft workstation suite or specifies the exact set of 6–8 complementary items alongside a designated "Turnkey Modular Carpentry & Site-Execution Reserve".

### Phase 6: Value Optimization & Insider Pro-Tips
Each item must come with an insider buyer's tip:
- Assembly hints (e.g., *"Pair with IKEA FIXA 7.2V drill for seamless DIY assembly"*).
- Seasonal procurement hacks (e.g., *"Look out for Pepperfry's Big Freedom Sale for 20% instant bank cashback"*).
- Ergonomic/health recommendations (e.g., *"Ensure desk height matches 58cm for 6-10 age group to prevent slouching"*).

---

## 3. Negative Constraints (Anti-Generic Guardrails)

The engine enforces strict negative filtering:

| Forbidden Anti-Pattern | Enforced Standard |
| :--- | :--- |
| **Merged/Hybrid Platforms** (e.g., *"Flipkart Pepperfry"*) | Strictly ONE authorized platform per product (`Amazon`, `IKEA`, `Pepperfry`, `Urban Ladder`, `Flipkart`). |
| **Generic Filler Phrasing** (*"Space-saving design with sturdy construction"*) | Specific architectural rationale explaining ergonomics, materials, lighting temperature, or room zoning. |
| **Arbitrary Price Multiplication** | Strict price boundary adherence. If a high budget has surplus, allocate to turnkey architectural fit-out reserve, premium acoustics, or IoT air quality. |
| **Bland Product Names** (*"Kids Study Desk"*) | Exact series and model branding (*"Urban Ladder Derry Solid Wood Study Desk with Bookshelf"*). |
| **Missing Technical Specifications** | Must include concrete dimensions, materials, and finish specifications. |

---

## 4. Master Schemas

### 4.1 Home Planner Master Schema
```json
{
  "expert_reasoning": {
    "budget_tier": "Luxury Turnkey Fit-Out (₹27,00,000 total across 2 rooms)",
    "tier_strategy": "At ₹13,50,000 per room, flat-pack alone is inadequate. Strategy combines premium modular anchors with custom carpentry allocation and smart environment controls.",
    "spatial_distribution": "Sleep & Rest 35%, Cognitive Study 25%, Modular Wardrobe 25%, Smart Environment & Decor 15%"
  },
  "design_philosophy": "Nordic Biophilic Montessori — Focus on natural birch textures, low-VOC non-toxic finishes, and growth-adaptive modularity.",
  "color_palette": [
    {"name": "Nordic Birch", "hex": "#D8C5A8", "role": "Wood Base"},
    {"name": "Muted Sage", "hex": "#7A9A7B", "role": "Accent Wall"},
    {"name": "Warm Terracotta", "hex": "#C86D51", "role": "Textiles & Play"},
    {"name": "Cloud White", "hex": "#F5F5F7", "role": "Reflective Ceilings"}
  ],
  "total_budget": 2700000,
  "turnkey_execution_reserve": 1500000,
  "rooms": [
    {
      "room_name": "Kids' Room (Suite 1)",
      "allocated_budget": 1350000,
      "zone_summary": "High-altitude loft architecture maximizing floor space for play and deep study.",
      "products": [
        {
          "name": "IKEA KURA Reversible Bed with Custom Loft Tent",
          "price": 19990,
          "platform": "IKEA",
          "category": "Sleep Sanctuary",
          "rating": 4.7,
          "specs": "Solid Pine, 90x200 cm, Clear acrylic lacquer, Reversible to high loft",
          "design_rationale": "Elevates the sleep platform to free up 25 sq.ft. of ground space for an active study and reading nook underneath.",
          "pro_tip": "Pair with IKEA MOSHULT firm foam mattress (₹6,990) to stay within the recommended safety railing height.",
          "budget_tier": "Anchor Structural Piece"
        }
      ]
    }
  ],
  "summary": "Executive architectural overview..."
}
```

---

## 5. Deployment & Execution Integration

This framework is implemented through:
1. `.agents/skills/pocketsmart-reasoning-engine/SKILL.md` (Agent skill).
2. `services/prompts.py` (Embedded multi-stage reasoning templates).
3. `services/ai_service.py` (Resilient JSON extraction and persona injection).
4. `static/app.js` & `static/style.css` (Visual Blueprint, Color Palette Swatches, Specs & Pro-Tip Badging).
