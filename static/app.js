/* ============================================================
   PocketSmart AI — Shared Frontend Logic
   ============================================================ */

'use strict';

// ── Loading Overlay ──────────────────────────────────────────
const loadingOverlay = document.getElementById('loading-overlay');

function showLoading(message = 'AI is thinking...') {
  if (!loadingOverlay) return;
  const msg = loadingOverlay.querySelector('.loading-text');
  if (msg) msg.textContent = message;
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  if (!loadingOverlay) return;
  loadingOverlay.classList.remove('active');
}

// ── Platform Badge Helper ─────────────────────────────────────
function getPlatformClass(platform = '') {
  const p = platform.toLowerCase();
  if (p.includes('amazon'))    return 'platform-amazon';
  if (p.includes('flipkart'))  return 'platform-flipkart';
  if (p.includes('ikea'))      return 'platform-ikea';
  if (p.includes('swiggy'))    return 'platform-swiggy';
  if (p.includes('zomato'))    return 'platform-zomato';
  if (p.includes('oyo'))       return 'platform-oyo';
  if (p.includes('pepperfry')) return 'platform-pepperfry';
  return 'platform-default';
}

function getPlatformIcon(platform = '') {
  const p = platform.toLowerCase();
  if (p.includes('amazon'))   return '🛒';
  if (p.includes('flipkart')) return '🛍️';
  if (p.includes('ikea'))     return '🏪';
  if (p.includes('swiggy'))   return '🛵';
  if (p.includes('zomato'))   return '🍽️';
  if (p.includes('oyo'))      return '🏨';
  return '🏬';
}

// ── Stars renderer ────────────────────────────────────────────
function renderStars(rating) {
  if (!rating) return '';
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty) + ` <span style="color:var(--text-muted)">${rating}</span>`;
}

// ── Format INR ────────────────────────────────────────────────
function formatINR(amount) {
  if (!amount && amount !== 0) return '';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// ── Render Master Blueprint (Design Philosophy, Color Palette, Reasoning) ──
function renderBlueprint(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const concept = data.design_philosophy || data.event_concept || data.curated_aesthetic;
  const reasoning = data.expert_reasoning || {};
  const palette = data.color_palette || data.theme_color_palette || data.metal_and_stone_palette || [];
  const reserve = data.turnkey_execution_reserve;

  if (!concept && palette.length === 0 && !reasoning.budget_tier) {
    container.innerHTML = '';
    return;
  }

  const tierText = reasoning.budget_tier || reasoning.event_tier || reasoning.aesthetic_profile || 'Turnkey Optimized';

  let paletteHtml = '';
  if (palette && palette.length > 0) {
    paletteHtml = `
      <div class="palette-container">
        <div class="palette-label">🎨 Curated Palette & Materials</div>
        <div class="palette-swatches">
          ${palette.map(c => `
            <div class="palette-chip" title="${escHtml(c.role || '')}">
              <span class="palette-dot" style="background-color: ${escHtml(c.hex || '#7c3aed')}"></span>
              <strong>${escHtml(c.name || 'Tone')}</strong>
              ${c.role ? `<em>(${escHtml(c.role)})</em>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  let reserveHtml = '';
  if (reserve && Number(reserve) > 0) {
    reserveHtml = `
      <div class="reserve-banner">
        <div class="reserve-banner-title">
          <span>🏗️</span> Turnkey Architectural Carpentry & Installation Reserve
        </div>
        <div class="reserve-banner-amount">${formatINR(reserve)}</div>
      </div>
    `;
  }

  let reasoningHtml = '';
  if (reasoning.tier_strategy || reasoning.spatial_allocation || reasoning.guest_experience_focus || reasoning.budget_distribution) {
    reasoningHtml = `
      <details class="reasoning-details">
        <summary>🧠 View Consultant's Strategic Reasoning</summary>
        <div class="reasoning-content">
          ${reasoning.tier_strategy ? `<p><strong>Execution Strategy:</strong> ${escHtml(reasoning.tier_strategy)}</p>` : ''}
          ${reasoning.spatial_allocation ? `<p style="margin-top:6px;"><strong>Capital Allocation:</strong> ${escHtml(reasoning.spatial_allocation)}</p>` : ''}
          ${reasoning.guest_experience_focus ? `<p><strong>Guest Experience Focus:</strong> ${escHtml(reasoning.guest_experience_focus)}</p>` : ''}
          ${reasoning.cost_per_head ? `<p style="margin-top:6px;"><strong>Economic Density:</strong> ${escHtml(reasoning.cost_per_head)}</p>` : ''}
          ${reasoning.budget_distribution ? `<p><strong>Capital Allocation:</strong> ${escHtml(reasoning.budget_distribution)}</p>` : ''}
        </div>
      </details>
    `;
  }

  container.innerHTML = `
    <div class="blueprint-card fade-in">
      <div class="blueprint-header">
        <div class="blueprint-title">
          <span>✨</span> ${escHtml(concept || 'Curated Strategy & Blueprint')}
        </div>
        <span class="tier-badge">🏛️ ${escHtml(tierText)}</span>
      </div>
      ${data.summary ? `<div class="concept-text">${escHtml(data.summary)}</div>` : ''}
      ${paletteHtml}
      ${reserveHtml}
      ${reasoningHtml}
    </div>
  `;
}

// ── Render Product Cards (Home / Jewelry) ─────────────────────
function renderProductCards(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  if (!products || products.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:32px">No products found. Try adjusting your inputs.</p>';
    return;
  }

  products.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.style.animationDelay = `${i * 0.06}s`;

    const platformClass = getPlatformClass(p.platform);
    const platformIcon  = getPlatformIcon(p.platform);

    const rationale = p.design_rationale || p.why || p.occasion_fit || '';
    const styleNote = p.style_note ? `<em>${escHtml(p.style_note)}</em>` : '';
    const colorNote = p.color_coordination ? `🎨 ${escHtml(p.color_coordination)}` : '';

    card.innerHTML = `
      <div class="product-header">
        <div class="product-name">${escHtml(p.name || 'Product')}</div>
        <div class="product-price">${formatINR(p.price)}</div>
      </div>
      <div class="product-meta">
        <span class="platform-badge ${platformClass}">${platformIcon} ${escHtml(p.platform || '')}</span>
        ${p.budget_tier ? `<span class="tier-tag">${escHtml(p.budget_tier)}</span>` : ''}
        ${p.category ? `<span class="category-tag">${escHtml(p.category)}</span>` : ''}
        ${p.material ? `<span class="category-tag">💎 ${escHtml(p.material)}</span>` : ''}
        ${p.type     ? `<span class="category-tag">${escHtml(p.type)}</span>` : ''}
        ${p.rating   ? `<span class="rating-stars">${renderStars(p.rating)}</span>` : ''}
      </div>

      ${p.specs ? `<div class="product-specs">📐 ${escHtml(p.specs)}</div>` : ''}

      ${(rationale || styleNote || colorNote) ? `
        <div class="product-reason">
          ${rationale ? escHtml(rationale) : ''}
          ${styleNote ? `<br>${styleNote}` : ''}
          ${colorNote ? `<br>${colorNote}` : ''}
        </div>
      ` : ''}

      ${p.pro_tip ? `
        <div class="pro-tip-box">
          <span>💡</span>
          <div><strong>Pro Tip:</strong> ${escHtml(p.pro_tip)}</div>
        </div>
      ` : ''}
    `;
    container.appendChild(card);
  });
}

// ── Render Vendor Cards (Party) ───────────────────────────────
function renderVendorCards(vendors, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  if (!vendors || vendors.length === 0) return;

  vendors.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'vendor-card fade-in';
    card.style.animationDelay = `${i * 0.06}s`;

    const platformClass = getPlatformClass(v.platform || '');
    const platformIcon  = getPlatformIcon(v.platform || '');

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
        <div class="vendor-name">${escHtml(v.name || 'Vendor')}</div>
        <div class="vendor-price">${escHtml(v.price_estimate || '')}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
        ${v.platform ? `<span class="platform-badge ${platformClass}">${platformIcon} ${escHtml(v.platform)}</span>` : ''}
        ${v.contact_hint ? `<span style="font-size:0.75rem;color:var(--text-muted)">📞 ${escHtml(v.contact_hint)}</span>` : ''}
      </div>
      ${v.specs ? `<div class="product-specs">📋 ${escHtml(v.specs)}</div>` : ''}
      ${v.highlights ? `<div class="vendor-highlights">${escHtml(v.highlights)}</div>` : ''}
      ${v.pro_tip ? `
        <div class="pro-tip-box">
          <span>💡</span>
          <div><strong>Pro Tip:</strong> ${escHtml(v.pro_tip)}</div>
        </div>
      ` : ''}
    `;
    container.appendChild(card);
  });
}

// ── Show / hide results section ───────────────────────────────
function showResults(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.style.display = 'block';
  requestAnimationFrame(() => {
    section.classList.add('visible');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ── Error display ─────────────────────────────────────────────
function showError(message, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="error-box">⚠️ ${escHtml(message)}</div>`;
  showResults(containerId.replace('-results', '-section') || containerId);
}

// ── XSS-safe text escaping ────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Drag & drop for upload zone ───────────────────────────────
function initUploadZone(zoneId, inputId, previewId) {
  const zone    = document.getElementById(zoneId);
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!zone || !input) return;

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Manually set the file to input (create DataTransfer)
      const dt = new DataTransfer();
      dt.items.add(file);
      input.files = dt.files;
      showPreview(file, preview, zone);
    }
  });

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) showPreview(file, preview, zone);
  });
}

function showPreview(file, preview, zone) {
  if (!preview) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = preview.querySelector('img');
    if (img) {
      img.src = e.target.result;
      preview.style.display = 'block';
      zone.querySelector('.upload-zone-content').style.display = 'none';
    }
  };
  reader.readAsDataURL(file);
}

function clearUpload(zoneId, inputId, previewId) {
  const zone    = document.getElementById(zoneId);
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!zone || !input || !preview) return;
  input.value = '';
  preview.style.display = 'none';
  const content = zone.querySelector('.upload-zone-content');
  if (content) content.style.display = 'block';
}
