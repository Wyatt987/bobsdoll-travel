// ===== AIRPLANE CURSOR =====
  const cursor = document.getElementById('custom-cursor');
  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1.3)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) rotate(45deg) scale(1)';
  });

  // ===== PAGE NAVIGATION =====
  function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target
    document.getElementById('page-' + pageId).classList.add('active');
    // Update nav
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navEl = document.getElementById('nav-' + pageId);
    if (navEl) navEl.classList.add('active');
    // Scroll to top
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

  // Destination view buttons
  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', () => showPage('contact'));
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

  // Search input — live filtering
  const destInput = document.querySelector('.dest-search input');
  if (destInput) {
    destInput.addEventListener('input', filterDestinations);
    destInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') filterDestinations();
    });
  }

  // Search button
  const destSearchBtn = document.querySelector('.dest-search button');
  if (destSearchBtn) destSearchBtn.addEventListener('click', filterDestinations);

  // Filter pills
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

  // ===== LEARN WORLD MAP =====
  const destinations = {
    cancun:      { flag:'🇲🇽', name:'Cancún', country:'Mexico', desc:'Sun-drenched resort city on the Yucatán Peninsula with powdery white sand beaches, turquoise Caribbean waters, and one of the world's most vibrant nightlife scenes.', facts:[['Best Time','Dec – Apr'],['Currency','MXN Peso'],['Language','Spanish'],['Visa','180 days free'],['Flight','~4h from NYC'],['Timezone','EST (UTC-5)']], tags:['Beach','Family','Nightlife','All-Inclusive'] },
    newyork:     { flag:'🇺🇸', name:'New York City', country:'USA', desc:'The city that never sleeps — a global capital of art, finance, fashion and food packed into one electrifying island.', facts:[['Best Time','Apr – Jun'],['Currency','USD'],['Language','English'],['Visa','ESTA / Visa'],['Flight','Hub city'],['Timezone','EST (UTC-5)']], tags:['City','Culture','Food','Shopping'] },
    paris:       { flag:'🇫🇷', name:'Paris', country:'France', desc:'The City of Light enchants visitors with the Eiffel Tower, Louvre, world-class cuisine, and a romantic atmosphere unlike anywhere else on Earth.', facts:[['Best Time','Apr – Jun'],['Currency','Euro €'],['Language','French'],['Visa','Schengen'],['Flight','~7h from NYC'],['Timezone','CET (UTC+1)']], tags:['City','Romance','Culture','Food'] },
    barcelona:   { flag:'🇪🇸', name:'Barcelona', country:'Spain', desc:'Gaudí's fantastical architecture, golden Mediterranean beaches, world-famous tapas, and a nightlife scene that rivals anywhere in Europe.', facts:[['Best Time','May – Jun'],['Currency','Euro €'],['Language','Spanish/Catalan'],['Visa','Schengen'],['Flight','~8h from NYC'],['Timezone','CET (UTC+1)']], tags:['City','Beach','Culture','Nightlife'] },
    rome:        { flag:'🇮🇹', name:'Rome', country:'Italy', desc:'The Eternal City layers 2,800 years of history — from the Colosseum and Vatican to piazzas brimming with gelato, espresso, and la dolce vita.', facts:[['Best Time','Apr – May'],['Currency','Euro €'],['Language','Italian'],['Visa','Schengen'],['Flight','~9h from NYC'],['Timezone','CET (UTC+1)']], tags:['Cultural','History','Food','Romance'] },
    santorini:   { flag:'🇬🇷', name:'Santorini', country:'Greece', desc:'Dramatic volcanic cliffs draped in white-washed villages, iconic blue-domed churches, world-class wine, and sunsets that have inspired painters for centuries.', facts:[['Best Time','Jun – Sep'],['Currency','Euro €'],['Language','Greek'],['Visa','Schengen'],['Flight','~10h from NYC'],['Timezone','EET (UTC+2)']], tags:['Island','Romance','Beach','Scenic'] },
    prague:      { flag:'🇨🇿', name:'Prague', country:'Czech Republic', desc:'A perfectly preserved medieval city of fairy-tale castles, Gothic spires, cobblestone streets, world-renowned Bohemian beer, and vibrant arts scene.', facts:[['Best Time','May – Sep'],['Currency','CZK Koruna'],['Language','Czech'],['Visa','Schengen'],['Flight','~9h from NYC'],['Timezone','CET (UTC+1)']], tags:['Cultural','History','Beer','Architecture'] },
    marrakech:   { flag:'🇲🇦', name:'Marrakech', country:'Morocco', desc:'A sensory feast of labyrinthine souks, fragrant spice markets, ornate palaces, and the great Sahara Desert just beyond the city gates.', facts:[['Best Time','Mar – May'],['Currency','MAD Dirham'],['Language','Arabic/French'],['Visa','90 days free'],['Flight','~7h from NYC'],['Timezone','WET (UTC+0)']], tags:['Exotic','Culture','Desert','Shopping'] },
    dubai:       { flag:'🇦🇪', name:'Dubai', country:'UAE', desc:'A futuristic skyline rising from the desert — record-breaking skyscrapers, ultra-luxury shopping, desert dunes, and an audacious vision of the future.', facts:[['Best Time','Nov – Mar'],['Currency','AED Dirham'],['Language','Arabic/English'],['Visa','30 days on arrival'],['Flight','~13h from NYC'],['Timezone','GST (UTC+4)']], tags:['Exotic','Luxury','Shopping','Adventure'] },
    kenya:       { flag:'🇰🇪', name:'Nairobi Safari', country:'Kenya', desc:'Witness the Big Five roaming vast golden savannas in the birthplace of safari — one of the most profound wildlife encounters on the planet.', facts:[['Best Time','Jul – Oct'],['Currency','KES Shilling'],['Language','Swahili/English'],['Visa','eVisa required'],['Flight','~15h from NYC'],['Timezone','EAT (UTC+3)']], tags:['Safari','Wildlife','Adventure','Nature'] },
    serengeti:   { flag:'🇹🇿', name:'Serengeti', country:'Tanzania', desc:'Home to the Great Migration — millions of wildebeest and zebra thunder across endless plains in the greatest wildlife spectacle on Earth.', facts:[['Best Time','Jun – Sep'],['Currency','TZS Shilling'],['Language','Swahili/English'],['Visa','eVisa required'],['Flight','~16h from NYC'],['Timezone','EAT (UTC+3)']], tags:['Safari','Migration','Adventure','Wildlife'] },
    machupicchu: { flag:'🇵🇪', name:'Machu Picchu', country:'Peru', desc:'The Lost City of the Incas perches on a misty Andean ridge at 2,430m — a mystical UNESCO wonder reached by legendary Inca Trail hike.', facts:[['Best Time','May – Oct'],['Currency','PEN Sol'],['Language','Spanish/Quechua'],['Visa','183 days free'],['Flight','~8h from NYC'],['Timezone','PET (UTC-5)']], tags:['Adventure','History','Hiking','UNESCO'] },
    bangkok:     { flag:'🇹🇭', name:'Bangkok', country:'Thailand', desc:'A glittering, chaotic wonderland of golden temples, floating markets, legendary street food, and electric nightlife energy that never fades.', facts:[['Best Time','Nov – Apr'],['Currency','THB Baht'],['Language','Thai'],['Visa','30 days free'],['Flight','~18h from NYC'],['Timezone','ICT (UTC+7)']], tags:['Exotic','Food','Culture','Nightlife'] },
    bali:        { flag:'🇮🇩', name:'Bali', country:'Indonesia', desc:'The Island of the Gods — terraced rice paddies, ancient Hindu temples, world-class surf breaks, and a deep spiritual culture that soothes the soul.', facts:[['Best Time','May – Sep'],['Currency','IDR Rupiah'],['Language','Indonesian/Balinese'],['Visa','30-day VOA'],['Flight','~20h from NYC'],['Timezone','WITA (UTC+8)']], tags:['Beach','Spiritual','Surf','Culture'] },
    tokyo:       { flag:'🇯🇵', name:'Tokyo', country:'Japan', desc:'The world's largest city blends futuristic technology with centuries-old traditions — neon-lit Shibuya, serene shrines, world's best sushi, and kawaii culture.', facts:[['Best Time','Mar – May'],['Currency','JPY Yen'],['Language','Japanese'],['Visa','90 days free'],['Flight','~14h from NYC'],['Timezone','JST (UTC+9)']], tags:['City','Culture','Food','Technology'] },
    kyoto:       { flag:'🇯🇵', name:'Kyoto', country:'Japan', desc:'Japan's ancient imperial capital with over 1,600 Buddhist temples, geisha districts, bamboo forests, and the world's most serene Zen gardens.', facts:[['Best Time','Mar – May'],['Currency','JPY Yen'],['Language','Japanese'],['Visa','90 days free'],['Flight','~14h from NYC'],['Timezone','JST (UTC+9)']], tags:['Cultural','Temples','History','Scenic'] },
    sydney:      { flag:'🇦🇺', name:'Sydney', country:'Australia', desc:'Iconic Opera House, stunning harbour, golden Bondi Beach, and a vibrant outdoor café culture — Australia's most spectacular city.', facts:[['Best Time','Sep – Nov'],['Currency','AUD Dollar'],['Language','English'],['Visa','ETA required'],['Flight','~21h from NYC'],['Timezone','AEDT (UTC+11)']], tags:['City','Beach','Outdoor','Culture'] },
    queenstown:  { flag:'🇳🇿', name:'Queenstown', country:'New Zealand', desc:'The adventure capital of the world — bungee jumping over glacial canyons, skiing pristine snowfields, and surrounded by Lord of the Rings landscapes.', facts:[['Best Time','Dec – Feb'],['Currency','NZD Dollar'],['Language','English/Māori'],['Visa','NZeTA required'],['Flight','~20h from NYC'],['Timezone','NZDT (UTC+13)']], tags:['Adventure','Skiing','Bungee','Nature'] },
    maldives:    { flag:'🇲🇻', name:'Maldives', country:'Maldives', desc:'1,200 coral islands in the Indian Ocean with overwater bungalows, luminescent lagoons, the world's finest diving, and ultimate seclusion.', facts:[['Best Time','Nov – Apr'],['Currency','MVR Rufiyaa'],['Language','Dhivehi/English'],['Visa','30 days free'],['Flight','~18h from NYC'],['Timezone','MVT (UTC+5)']], tags:['Island','Honeymoon','Diving','Luxury'] },
    iceland:     { flag:'🇮🇸', name:'Iceland', country:'Iceland', desc:'Land of fire and ice — chase the Aurora Borealis, hike active volcanoes, soak in geothermal pools, and witness waterfalls thundering into black sand beaches.', facts:[['Best Time','Jun – Aug / Dec – Mar'],['Currency','ISK Krona'],['Language','Icelandic/English'],['Visa','Schengen'],['Flight','~6h from NYC'],['Timezone','GMT (UTC+0)']], tags:['Adventure','Northern Lights','Nature','Unique'] },
    swissalps:   { flag:'🇨🇭', name:'Swiss Alps', country:'Switzerland', desc:'Europe's premier mountain playground — world-class ski resorts, charming alpine villages, pristine lakes, and chocolate-box scenery year-round.', facts:[['Best Time','Dec – Mar (ski), Jun – Sep (hike)'],['Currency','CHF Franc'],['Language','German/French/Italian'],['Visa','Schengen'],['Flight','~8h from NYC'],['Timezone','CET (UTC+1)']], tags:['Mountain','Skiing','Scenic','Luxury'] },
    patagonia:   { flag:'🇦🇷', name:'Patagonia', country:'Argentina / Chile', desc:'The wild end of the world — jagged granite towers, vast Patagonian ice fields, condors soaring overhead, and wilderness that humbles every traveler.', facts:[['Best Time','Nov – Mar'],['Currency','ARS Peso / CLP Peso'],['Language','Spanish'],['Visa','Free for most'],['Flight','~12h from NYC'],['Timezone','ART (UTC-3)']], tags:['Adventure','Hiking','Wilderness','UNESCO'] },
  };

  const panel = document.getElementById('learn-panel');
  const tooltip = document.getElementById('map-tooltip');
  let activePin = null;

  document.querySelectorAll('.map-pin').forEach(pin => {
    const id = pin.dataset.id;
    const data = destinations[id];
    if (!data) return;

    // Hover tooltip
    pin.addEventListener('mouseenter', (e) => {
      tooltip.textContent = data.flag + ' ' + data.name + ', ' + data.country;
      tooltip.classList.add('visible');
    });

    pin.addEventListener('mousemove', (e) => {
      const rect = pin.closest('.learn-map-wrap').getBoundingClientRect();
      tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
      tooltip.style.top  = (e.clientY - rect.top  - 36) + 'px';
    });

    pin.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });

    // Click to open panel
    pin.addEventListener('click', () => {
      // Deactivate previous
      if (activePin) activePin.classList.remove('active');
      pin.classList.add('active');
      activePin = pin;

      // Populate panel
      document.getElementById('panel-flag').textContent    = data.flag;
      document.getElementById('panel-name').textContent    = data.name;
      document.getElementById('panel-country').textContent = data.country;
      document.getElementById('panel-desc').textContent    = data.desc;

      const factsEl = document.getElementById('panel-facts');
      factsEl.innerHTML = data.facts.map(([label, val]) =>
        '<div class="panel-fact"><span class="fact-label">' + label + '</span><span class="fact-val">' + val + '</span></div>'
      ).join('');

      const tagsEl = document.getElementById('panel-tags');
      tagsEl.innerHTML = data.tags.map(t =>
        '<span class="panel-tag">' + t + '</span>'
      ).join('');

      panel.classList.add('open');
      tooltip.classList.remove('visible');
    });
  });

  // Close panel
  document.getElementById('panel-close')?.addEventListener('click', () => {
    panel.classList.remove('open');
    if (activePin) { activePin.classList.remove('active'); activePin = null; }
  });

  // Newsletter subscribe
  document.querySelector('.footer-newsletter button')?.addEventListener('click', () => {
    const input = document.querySelector('.footer-newsletter input');
    if (input && input.value) {
      alert('✈️ You\'re subscribed! Get ready for amazing travel deals.');
      input.value = '';
    } else {
      alert('Please enter your email address.');
    }
  });