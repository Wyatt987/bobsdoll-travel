// ===== AIRPLANE CURSOR =====
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
document.addEventListener('mousedown', () => { cursor.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1.3)'; });
document.addEventListener('mouseup', () => { cursor.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1)'; });

// ===== MOBILE NAV HAMBURGER =====
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
}

// Make vacation type cards clickable
document.querySelectorAll('.vtype-card').forEach(card => {
  card.addEventListener('click', () => showPage('destinations'));
});

// Contact form submit
document.querySelector('.btn-send')?.addEventListener('click', () => {
  alert('✈️ Message sent! Our travel experts will get back to you soon.');
});

// ===== DESTINATION VIEW BUTTONS =====
document.querySelectorAll('.btn-view').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.dest-card');
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    const vacation = card.dataset.vacation || 'More details coming soon!';
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = desc;
    document.getElementById('modal-vacation').textContent = vacation;
    document.getElementById('package-modal').style.display = 'block';
  });
});

// Modal close
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('package-modal').style.display = 'none';
});

// Modal contact button
document.querySelector('.btn-contact').addEventListener('click', () => {
  document.getElementById('package-modal').style.display = 'none';
  showPage('contact');
});

// Click outside modal to close
window.addEventListener('click', (event) => {
  const modal = document.getElementById('package-modal');
  if (event.target === modal) modal.style.display = 'none';
});

// ===== DESTINATIONS SEARCH + FILTER =====
let destActiveFilter = 'all';

function filterDestinations() {
  const query = document.querySelector('.dest-search input')?.value.toLowerCase().trim() || '';
  const cards = document.querySelectorAll('#dest-grid .dest-card');
  let visible = 0;

  cards.forEach(card => {
    const name = card.dataset.name?.toLowerCase() || '';
    const tag  = card.dataset.tag  || '';
    const keys = card.dataset.keywords?.toLowerCase() || '';
    const matchesSearch = !query || name.includes(query) || keys.includes(query);
    const matchesFilter = destActiveFilter === 'all' || tag === destActiveFilter;
    if (matchesSearch && matchesFilter) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  const noResults = document.getElementById('dest-no-results');
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

const destInput = document.querySelector('.dest-search input');
if (destInput) {
  destInput.addEventListener('input', filterDestinations);
  destInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') filterDestinations(); });
}

const destSearchBtn = document.querySelector('.dest-search button');
if (destSearchBtn) destSearchBtn.addEventListener('click', filterDestinations);

document.querySelectorAll('.dest-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dest-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    destActiveFilter = btn.dataset.filter;
    filterDestinations();
  });
});

// Fact card explore buttons
document.querySelectorAll('.fact-btn').forEach(btn => {
  btn.addEventListener('click', () => showPage('destinations'));
});

// Pin items
document.querySelectorAll('.pin-emoji').forEach(pin => {
  pin.addEventListener('click', () => {
    pin.style.transform = 'scale(1.3)';
    setTimeout(() => pin.style.transform = '', 300);
  });
});

// Newsletter subscribe
document.querySelector('.footer-newsletter button')?.addEventListener('click', () => {
  const input = document.querySelector('.footer-newsletter input');
  if (input && input.value) {
    alert("✈️ You're subscribed! Get ready for amazing travel deals.");
    input.value = '';
  } else {
    alert('Please enter your email address.');
  }
});

// ===== MAP =====
const destinations = [
  { name:"Cancún", country:"Mexico", flag:"🇲🇽", tag:"Beach", coords:[-86.85,21.17], best:"Dec–Apr", currency:"MXN Peso", lang:"Spanish", visa:"180 days free", desc:"Crystal-clear Caribbean waters, ancient Mayan ruins, and vibrant nightlife." },
  { name:"Paris", country:"France", flag:"🇫🇷", tag:"City", coords:[2.35,48.85], best:"Apr–Jun", currency:"Euro", lang:"French", visa:"Schengen (90 days)", desc:"The City of Light — romance, the Eiffel Tower, world-class cuisine and art." },
  { name:"Bali", country:"Indonesia", flag:"🇮🇩", tag:"Adventure", coords:[115.19,-8.41], best:"May–Sep", currency:"IDR Rupiah", lang:"Indonesian", visa:"30-day VOA", desc:"Ancient temples, lush rice terraces, and serene spiritual retreats." },
  { name:"Swiss Alps", country:"Switzerland", flag:"🇨🇭", tag:"Mountain", coords:[8.23,46.82], best:"Dec–Mar", currency:"CHF Franc", lang:"German/French", visa:"Schengen (90 days)", desc:"World-class skiing and charming alpine villages in the heart of Europe." },
  { name:"Dubai", country:"UAE", flag:"🇦🇪", tag:"Exotic", coords:[55.27,25.20], best:"Nov–Mar", currency:"AED Dirham", lang:"Arabic/English", visa:"30 days on arrival", desc:"Futuristic skylines, golden deserts, and luxury beyond imagination." },
  { name:"New York", country:"USA", flag:"🇺🇸", tag:"City", coords:[-74.01,40.71], best:"Sep–Nov", currency:"USD Dollar", lang:"English", visa:"ESTA required", desc:"The city that never sleeps — art, fashion, food, and iconic landmarks." },
  { name:"Tokyo", country:"Japan", flag:"🇯🇵", tag:"Cultural", coords:[139.69,35.69], best:"Mar–May", currency:"JPY Yen", lang:"Japanese", visa:"90 days free", desc:"Ultra-modern city meets ancient tradition — shrines, sushi, and neon lights." },
  { name:"Santorini", country:"Greece", flag:"🇬🇷", tag:"Island", coords:[25.43,36.39], best:"Jun–Sep", currency:"Euro", lang:"Greek", visa:"Schengen (90 days)", desc:"White-washed cliffs, iconic blue domes, and breathtaking Aegean sunsets." },
  { name:"Machu Picchu", country:"Peru", flag:"🇵🇪", tag:"Adventure", coords:[-72.54,-13.16], best:"May–Oct", currency:"PEN Sol", lang:"Spanish", visa:"183 days free", desc:"Lost Incan citadel high in the Andes — one of the world's greatest wonders." },
  { name:"Maldives", country:"Maldives", flag:"🇲🇻", tag:"Island", coords:[73.50,4.17], best:"Nov–Apr", currency:"MVR Rufiyaa", lang:"Dhivehi/English", visa:"30 days on arrival", desc:"Overwater bungalows, crystal lagoons, and the world's most pristine coral reefs." },
  { name:"Rome", country:"Italy", flag:"🇮🇹", tag:"Cultural", coords:[12.48,41.90], best:"Apr–Jun", currency:"Euro", lang:"Italian", visa:"Schengen (90 days)", desc:"The Eternal City — ancient ruins, Renaissance art, and incredible Italian food." },
  { name:"Nairobi", country:"Kenya", flag:"🇰🇪", tag:"Adventure", coords:[36.82,-1.29], best:"Jul–Oct", currency:"KES Shilling", lang:"Swahili/English", visa:"E-visa required", desc:"Gateway to the Big Five and the Great Migration across the Maasai Mara." },
  { name:"Barcelona", country:"Spain", flag:"🇪🇸", tag:"City", coords:[2.15,41.39], best:"May–Jun", currency:"Euro", lang:"Spanish/Catalan", visa:"Schengen (90 days)", desc:"Gaudí masterpieces, golden beaches, and legendary tapas bars at every corner." },
  { name:"Patagonia", country:"Argentina", flag:"🇦🇷", tag:"Mountain", coords:[-72.70,-51.72], best:"Nov–Mar", currency:"ARS Peso", lang:"Spanish", visa:"90 days free", desc:"Dramatic glaciers, jagged peaks, and untouched wilderness at the end of the world." },
  { name:"Sydney", country:"Australia", flag:"🇦🇺", tag:"City", coords:[151.21,-33.87], best:"Sep–Nov", currency:"AUD Dollar", lang:"English", visa:"ETA required", desc:"Iconic Opera House, stunning harbour, golden beaches, and outdoor adventure." },
  { name:"Kyoto", country:"Japan", flag:"🇯🇵", tag:"Cultural", coords:[135.77,35.01], best:"Mar–May", currency:"JPY Yen", lang:"Japanese", visa:"90 days free", desc:"Timeless temples, bamboo groves, geisha culture, and stunning autumn foliage." },
  { name:"Iceland", country:"Iceland", flag:"🇮🇸", tag:"Adventure", coords:[-19.02,64.96], best:"Jun–Aug", currency:"ISK Króna", lang:"Icelandic/English", visa:"Schengen (90 days)", desc:"Chase the Northern Lights, hike volcanoes, and bathe in geothermal hot springs." },
  { name:"Marrakech", country:"Morocco", flag:"🇲🇦", tag:"Exotic", coords:[-7.99,31.63], best:"Mar–May", currency:"MAD Dirham", lang:"Arabic/French", visa:"90 days free", desc:"Labyrinthine souks, fragrant spice markets, and gateway to the Sahara Desert." },
  { name:"Bangkok", country:"Thailand", flag:"🇹🇭", tag:"Exotic", coords:[100.50,13.75], best:"Nov–Feb", currency:"THB Baht", lang:"Thai", visa:"30 days free", desc:"Glittering temples, legendary street food, and electric energy around every corner." },
  { name:"Queenstown", country:"New Zealand", flag:"🇳🇿", tag:"Adventure", coords:[168.66,-45.03], best:"Dec–Feb", currency:"NZD Dollar", lang:"English/Māori", visa:"NZeTA required", desc:"The adventure capital of the world — bungee jumping, skiing, and stunning fjords." },
];

const tagColors = {
  Beach:"#0084C8", City:"#7B5EA7", Mountain:"#4A7C59", Adventure:"#D06B00",
  Island:"#0098A6", Exotic:"#C0392B", Cultural:"#8E6B3E", Cruise:"#1A6EA8"
};

function buildPills() {
  const container = document.getElementById('dest-pills');
  if (!container) return;
  destinations.forEach(d => {
    const pill = document.createElement('button');
    pill.textContent = d.flag + ' ' + d.name;
    pill.style.cssText = `font-size:12px; padding:5px 12px; border-radius:20px; border:1px solid ${tagColors[d.tag]||'#888'}; color:${tagColors[d.tag]||'#888'}; background:transparent; cursor:pointer; font-family:var(--font-sans);`;
    pill.onmouseenter = () => pill.style.background = (tagColors[d.tag]||'#888') + '20';
    pill.onmouseleave = () => pill.style.background = 'transparent';
    pill.onclick = () => showInfo(d);
    container.appendChild(pill);
  });
}

function showInfo(d) {
  const panel = document.getElementById('info-panel');
  if (!panel) return;
  panel.style.display = 'block';
  document.getElementById('info-flag').textContent = d.flag;
  document.getElementById('info-name').textContent = d.name + ', ' + d.country;
  document.getElementById('info-tag').textContent = d.tag;
  document.getElementById('info-desc').textContent = d.desc;
  const grid = document.getElementById('info-grid');
  grid.innerHTML = '';
  [{l:'Best time', v:d.best},{l:'Currency', v:d.currency},{l:'Language', v:d.lang},{l:'Visa', v:d.visa}].forEach(item => {
    grid.innerHTML += `<div style="background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:8px 10px;"><div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:2px;">${item.l}</div><div style="font-size:13px;font-weight:500;color:var(--color-text-primary);">${item.v}</div></div>`;
  });
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}

async function initMap() {
  const resp = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
  const world = await resp.json();
  const countries = topojson.feature(world, world.objects.countries);

  const container = document.getElementById('map-container');
  if (!container) return;
  const W = container.clientWidth || 700;
  const H = Math.round(W * 0.52);
  const svg = d3.select('#world-map').attr('viewBox', `0 0 ${W} ${H}`).attr('height', H);

  const projection = d3.geoNaturalEarth1().scale(W/6.2).translate([W/2, H/2]);
  const path = d3.geoPath().projection(projection);

  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#c8e6f4');

  const g = svg.append('g');
  g.selectAll('path').data(countries.features).enter().append('path')
    .attr('d', path).attr('fill', '#e8f4e8').attr('stroke', '#a8c8a8')
    .attr('stroke-width', 0.4).style('cursor', 'default');

  const tooltip = document.getElementById('map-tooltip');

  destinations.forEach(d => {
    const [x, y] = projection(d.coords);
    if (!x || !y) return;
    const color = tagColors[d.tag] || '#888';
    const pinG = svg.append('g').style('cursor', 'pointer');

    pinG.append('circle').attr('cx', x).attr('cy', y).attr('r', 7)
      .attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 1.5).attr('opacity', 0.9);

    pinG.append('text').attr('x', x).attr('y', y + 4).attr('text-anchor', 'middle')
      .attr('font-size', 7).attr('fill', '#fff').attr('font-weight', 'bold').text(d.flag);

    pinG
      .on('mouseenter', function(event) {
        d3.select(this).select('circle').attr('r', 10).attr('opacity', 1);
        const rect = container.getBoundingClientRect();
        const cx = event.clientX - rect.left;
        const cy = event.clientY - rect.top;
        tooltip.style.display = 'block';
        tooltip.style.left = Math.min(cx + 12, W - 230) + 'px';
        tooltip.style.top = Math.max(cy - 60, 4) + 'px';
        document.getElementById('tt-name').textContent = d.flag + ' ' + d.name + ', ' + d.country;
        document.getElementById('tt-body').innerHTML = `<b>Type:</b> ${d.tag}<br><b>Best time:</b> ${d.best}<br><b>Currency:</b> ${d.currency}`;
      })
      .on('mousemove', function(event) {
        const rect = container.getBoundingClientRect();
        tooltip.style.left = Math.min(event.clientX - rect.left + 12, W - 230) + 'px';
        tooltip.style.top = Math.max(event.clientY - rect.top - 60, 4) + 'px';
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle').attr('r', 7).attr('opacity', 0.9);
        tooltip.style.display = 'none';
      })
      .on('click', () => showInfo(d));
  });
}

// Init map when on learn page
buildPills();
initMap().catch(() => {
  const svg = document.getElementById('world-map');
  if (svg) svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#888" font-size="14">Map failed to load</text>';
});
