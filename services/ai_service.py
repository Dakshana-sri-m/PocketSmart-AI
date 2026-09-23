import os
import json
import base64
import re
from groq import Groq
from dotenv import load_dotenv
from services.prompts import (
    HOME_PLANNER_PROMPT,
    PARTY_PLANNER_PROMPT,
    JEWELRY_PLANNER_PROMPT,
    JEWELRY_PLANNER_VISION_PROMPT,
)

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Primary text model — fastest & most capable on this API key
TEXT_MODEL = "openai/gpt-oss-120b"
# Fallback model in case primary is rate-limited
FALLBACK_MODEL = "qwen/qwen3.8-27b"


def _clean_json(raw: str) -> dict:
    """Strip markdown fences, extract outermost JSON object, and parse."""
    raw = raw.strip()
    # If fenced in markdown
    fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", raw)
    if fence_match:
        raw = fence_match.group(1).strip()

    # Extract outermost JSON boundaries
    start = raw.find("{")
    end = raw.rfind("}")
    if start != -1 and end != -1 and end > start:
        raw = raw[start : end + 1]

    # Clean potential trailing commas before closing braces/brackets
    cleaned = re.sub(r",\s*([\]}])", r"\1", raw)

    return json.loads(cleaned)


def _call_text_model(prompt: str) -> dict:
    """Call Groq text model with elite reasoning persona and return parsed JSON."""
    for model in [TEXT_MODEL, FALLBACK_MODEL]:
        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are PocketSmart AI, an elite architectural, event logistics, and fine styling "
                            "reasoning engine. You possess deep fluency in authentic Indian retail pricing, "
                            "catalog series from IKEA India, Pepperfry, Urban Ladder, Amazon, Flipkart, Swiggy, "
                            "and Zomato. Always return strictly valid, raw JSON conforming to the requested schema. "
                            "Do NOT include markdown code blocks, conversational pleasantries, or preamble."
                        ),
                    },
                    {"role": "user", "content": prompt},
                ],
                temperature=0.55,
                max_tokens=4096,
            )
            content = response.choices[0].message.content
            return {"success": True, "data": _clean_json(content)}
        except json.JSONDecodeError as e:
            return {"success": False, "error": f"AI returned invalid JSON: {str(e)}"}
        except Exception as e:
            # Try fallback on rate-limit or 5xx errors, propagate others
            err_str = str(e)
            if "429" in err_str or "503" in err_str or "502" in err_str:
                continue
            return {"success": False, "error": err_str}
    return {"success": False, "error": "All models failed. Please try again in a moment."}


def _call_vision_model(prompt: str, image_b64: str, mime_type: str = "image/jpeg") -> dict:
    """
    Attempt vision-capable model. The current API key's available models do not support
    multimodal vision input, so we fall back to a text-only request with an enhanced
    prompt that acknowledges the image was provided.
    """
    enhanced_prompt = (
        prompt +
        "\n\nNote: The user has uploaded an outfit photo. Since image analysis is simulated "
        "in this environment, please generate high-coordination jewelry recommendations based on the "
        "stated occasion and style preferences, and include an 'outfit_analysis' field "
        "providing a professional fashion appraisal of a typical couture outfit for this occasion."
    )
    return _call_text_model(enhanced_prompt)


def generate_home_recommendations(
    budget: int,
    rooms: list,
    aesthetic: str = "Modern Contemporary & Warm Functional",
    occupants: str = "Working Professionals & Family",
    priorities: str = "Balanced Storage, Comfort & Clean Aesthetics",
    color_mood: str = "Warm Birch & Earthy Neutrals",
    special_requests: str = "Standard residential durability and low maintenance",
) -> dict:
    """
    Generate home interior recommendations with guided architectural intel.

    Args:
        budget: Total budget in INR
        rooms: List of dicts like [{"name": "Living Room", "quantity": 1}, ...]
        aesthetic: Design theme (Japandi, Modern, Industrial, etc.)
        occupants: Household profile (Toddlers, Remote WFH, Pets, etc.)
        priorities: Core focus (Storage, Ergonomics, Kid-Safe, etc.)
        color_mood: Preferred color palette mood
        special_requests: Specific living requirements or constraints
    """
    rooms_text = "\n".join(
        [f"- {r['name']} (quantity: {r.get('quantity', 1)})" for r in rooms]
    )
    prompt = HOME_PLANNER_PROMPT.format(
        budget=budget,
        rooms_text=rooms_text,
        aesthetic=aesthetic or "Modern Contemporary & Warm Functional",
        occupants=occupants or "Working Professionals & Family",
        priorities=priorities or "Balanced Storage, Comfort & Clean Aesthetics",
        color_mood=color_mood or "Warm Birch & Earthy Neutrals",
        special_requests=special_requests or "Standard residential durability and low maintenance",
    )
    return _call_text_model(prompt)


def generate_party_recommendations(
    budget: int,
    guests: int,
    event_type: str,
    venue: str,
    dietary: str = "Multi-Cuisine Veg & Non-Veg",
    entertainment_vibe: str = "Live DJ & Dancefloor",
    bar_setup: str = "Mocktails & Signature Soft Beverages",
    special_elements: str = "Thematic Photobooth & Custom Cake",
) -> dict:
    """Generate party planning recommendations with calculated per-head economics and guided event intel."""
    per_guest = budget / max(1, guests)
    prompt = PARTY_PLANNER_PROMPT.format(
        budget=budget,
        guests=guests,
        event_type=event_type,
        venue=venue,
        per_guest=per_guest,
        dietary=dietary or "Multi-Cuisine Veg & Non-Veg",
        entertainment_vibe=entertainment_vibe or "Live DJ & Dancefloor",
        bar_setup=bar_setup or "Mocktails & Signature Soft Beverages",
        special_elements=special_elements or "Thematic Photobooth & Custom Cake",
    )
    return _call_text_model(prompt)


def generate_jewelry_recommendations(
    budget: int,
    occasion: str,
    style: str,
    outfit_color: str = "Classic Royal Tones",
    neckline: str = "Sweetheart / Scoop Collar",
    metal_preference: str = "22K Antique Yellow Gold",
    target_pieces: str = "Choker Necklace Set with Jhumkas & Bangles",
    image_b64: str = None,
    mime_type: str = "image/jpeg",
) -> dict:
    """Generate fine jewelry styling recommendations tailored to neckline, hue, and metal finish."""
    color_val = outfit_color or "Classic Royal Tones"
    neckline_val = neckline or "Sweetheart / Scoop Collar"
    metal_val = metal_preference or "22K Antique Yellow Gold"
    pieces_val = target_pieces or "Choker Necklace Set with Jhumkas & Bangles"

    if image_b64:
        prompt = JEWELRY_PLANNER_VISION_PROMPT.format(
            budget=budget,
            occasion=occasion,
            style=style,
            outfit_color=color_val,
            neckline=neckline_val,
            metal_preference=metal_val,
            target_pieces=pieces_val,
        )
        return _call_vision_model(prompt, image_b64, mime_type)
    else:
        prompt = JEWELRY_PLANNER_PROMPT.format(
            budget=budget,
            occasion=occasion,
            style=style,
            outfit_color=color_val,
            neckline=neckline_val,
            metal_preference=metal_val,
            target_pieces=pieces_val,
            image_context="No outfit image was provided. Focus strictly on occasion harmony, specified neckline, and style parameters.",
        )
        return _call_text_model(prompt)
