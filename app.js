const COLORS = ['#c8ff57','#57b4ff','#ff9d57','#b057ff','#57ff85','#ff5757','#57ffe0'];

const ROLES = {
  developer:  { label: 'Developer',         icon: '💻', color: '#b057ff' },
  designer:   { label: 'Designer',           icon: '🎨', color: '#ff5757' },
  musician:   { label: 'Musician',           icon: '🎵', color: '#ff9d57' },
  visual:     { label: 'Visual / 3D',        icon: '🖼️', color: '#c8ff57' },
  writer:     { label: 'Writer',             icon: '✍️', color: '#57b4ff' },
  strategist: { label: 'Strategist',         icon: '📊', color: '#e0e0e0' },
  director:   { label: 'Director',           icon: '🎬', color: '#57ffe0' },
  scientist:  { label: 'Scientist',          icon: '🔬', color: '#ff57b4' },
  finance:    { label: 'Finance / Business', icon: '📈', color: '#57ffb4' },
  architect:  { label: 'Architect / Engineer', icon: '🏛️', color: '#ffd557' },
  other:      { label: 'Altro',              icon: '✦',  color: '#9896a0' },
};

function getRoleColor(roleKey) {
  return ROLES[roleKey]?.color || null;
}

function getRoleTag(roleKey) {
  const r = ROLES[roleKey];
  if (!r) return '';
  return `<span class="role-tag" style="color:${r.color};border-color:${r.color}33;">${r.icon} ${r.label}</span>`;
}

function getRolePrimaryBadge(roleKey) {
  const r = ROLES[roleKey];
  if (!r) return '';
  return `<span class="role-primary-name" style="color:${r.color};">${r.icon} ${r.label}</span>`;
}

function sanitize(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function formatProjectFromDB(p, roleMap = {}) {
  const name = p.author_name || 'Anonimo';
  const roleColor = getRoleColor(roleMap[p.author_id]) || getColorForString(name);
  return {
    id: p.id, featured: false,
    title: p.title, author: name,
    initials: name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
    color: roleColor,
    date: new Date(p.created_at).toLocaleDateString('it-IT', {day:'numeric',month:'short',year:'numeric'}),
    category: p.category, status: p.status,
    desc: p.description || '', tags: p.tags || [],
    views: p.views||0, proposals: p.proposals||0, likes: p.likes||0, collabs: [],
    collab_type: p.collab_type || '', isReal: true, author_id: p.author_id, created_at: p.created_at,
    cover_image: p.cover_image || null, project_hash: p.project_hash || null
  };
}

function getColorForString(str) {
  if (!str) return COLORS[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

const projects = [
  { id:'0', featured:true, title:"EchoVerse — RPG Open World", author:"Marco Ferretti", initials:"MF", color:"#c8ff57", date:"Oggi, 09:41", category:"game", status:"open",
    desc:"Un RPG open-world post-quantistico dove la realtà si frammenta in echi paralleli. I giocatori navigano linee temporali ramificate con conseguenze permanenti sul mondo di gioco. Sviluppato in Unity. Cerco narrative designer, sound designer e 3D artist.",
    tags:["Unity","C#","Open World","RPG","Narrativa"], views:128, proposals:4, likes:31,
    collabs:[{n:"Sofia R.",r:"Narrative Designer",s:"accepted"},{n:"Luca V.",r:"Sound Designer",s:"pending"}] },
  { id:'1', featured:false, title:"NeuroScan AI — Diagnosi Precoce Alzheimer", author:"Dr. Elena Conti", initials:"EC", color:"#57b4ff", date:"Ieri, 14:23", category:"science", status:"open",
    desc:"Modello ML che analizza immagini MRI per rilevare segnali precoci di Alzheimer con 3-5 anni di anticipo rispetto ai metodi attuali. Ricerca ad accesso aperto. Cerco neurologi, data scientist e sviluppatori Python.",
    tags:["Machine Learning","Python","MRI","Healthcare","Open Source"], views:71, proposals:2, likes:44,
    collabs:[{n:"Pietro M.",r:"Data Scientist",s:"pending"}] },
  { id:'2', featured:false, title:"Palazzo a Vouta Verde — Residenza Sostenibile", author:"Arch. Giulia Mancini", initials:"GM", color:"#57ff85", date:"26 Mar 2026", category:"arch", status:"progress",
    desc:"Residenza privata di 400mq con struttura a volta ribassata in legno lamellare e copertura verde. L'edificio produce più energia di quanta ne consuma. In fase esecutiva — cerco ingegnere strutturista e paesaggista.",
    tags:["Legno Lamellare","Green Roof","Sostenibilità","Residenziale","AutoCAD"], views:95, proposals:3, likes:27,
    collabs:[{n:"Franco B.",r:"Ingegnere Strutturista",s:"accepted"},{n:"Anna P.",r:"Paesaggista",s:"pending"},{n:"Matteo L.",r:"BIM Specialist",s:"accepted"}] },
  { id:'3', featured:false, title:"SynthWave Composer — Generatore di Colonne Sonore", author:"Diego Riva", initials:"DR", color:"#b057ff", date:"25 Mar 2026", category:"music", status:"open",
    desc:"Strumento web che genera colonne sonore synthwave in tempo reale in base ai parametri visivi dell'utente (immagini, palette, mood). Modello MIDI addestrato su 10.000 tracce anni '80. Cerco web developer e musicisti.",
    tags:["Web Audio API","JavaScript","MIDI","Synthwave","IA Generativa"], views:84, proposals:5, likes:38, collabs:[] },
  { id:'4', featured:false, title:"FoldBot — Micro-robot Chirurgico Origami", author:"Sara Kim", initials:"SK", color:"#ff9d57", date:"24 Mar 2026", category:"hardware", status:"open",
    desc:"Micro-robot in lega a memoria di forma ispirato all'origami, progettato per procedure chirurgiche mininvasive. Il robot si piega per passare attraverso piccole incisioni e si dispiega internamente. Cerco ingegneri biomedici e robotici.",
    tags:["Robotica","Biomedico","SMA","Origami Engineering","CAD"], views:62, proposals:1, likes:19, collabs:[] },
  { id:'5', featured:false, title:"Cartoline dall'Assente — Cortometraggio", author:"Valentina Greco", initials:"VG", color:"#ff5757", date:"23 Mar 2026", category:"film", status:"closed",
    desc:"Cortometraggio di 18 minuti sul lutto raccontato attraverso oggetti lasciati indietro. Girato in super-8 digitale, estetica anni '70. Il team è al completo — progetto in post-produzione. Non accetta più proposte.",
    tags:["Super-8","Cortometraggio","Post-produzione","Indie","Drama"], views:56, proposals:7, likes:52,
    collabs:[{n:"Carlo F.",r:"Colorist",s:"accepted"},{n:"Irene T.",r:"Sound Mix",s:"accepted"}] }
];

let filtered = [...projects];
let activeCategory = 'all';
let currentProject = null;

let realProjects = [];
let likedProjectIds = []; 
let currentUser = null;
let editingProjectId = null;
let authMode = 'login';
let _pendingSimilarProject = null;
let messageSubscription = null; // FASE 9: Realtime subscription
let notificationSubscription = null;
let _snProjectId = null, _snOtherId = null, _snOtherName = null, _snProjectTitle = null, _snCurrentNote = null;

// Variabili per Paginazione (FASE 5)
let currentProjPage = 0;
const PROJ_PER_PAGE = 5; // Quanti progetti caricare alla volta
let hasMoreProjects = true;

let currentTalentsPage = 0;
const TALENTS_PER_PAGE = 9;
let hasMoreTalents = true;

function renderProjects(list, containerId='projectsList') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const t = i18n[currentLang];
  const meta = document.getElementById('pMeta');
  if (meta && containerId==='projectsList') meta.textContent = `${projects.length} ${t.demo_projects_meta}`;
  el.innerHTML = '';

  if (!list.length) {
    if (containerId === 'projectsList' || containerId === 'realProjectsList') {
      el.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--text3)">${t.no_projects_found}</div>`;
    } else {
      el.innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:10px;">${t.no_projects_show}</div>`;
    }
    return;
  }

  list.forEach((p,i) => {
    const sMap = {open:'s-open',progress:'s-progress',closed:'s-closed',completed:'s-completed'};
    const sLabel = {open: t.status_open, progress: t.status_progress, closed: t.status_closed, completed: t.status_completed};
    const isOwner = currentUser && p.author_id === currentUser.id;

    const isLiked = likedProjectIds.includes(p.id);
    const isReal = p.isReal === true;
    const likeBtnHtml = currentUser && !isOwner && isReal ?
        `<button class="btn-save ${isLiked?'saved':''}" style="${isLiked ? 'color: var(--red); border-color: rgba(255,87,87,0.3); background: rgba(255,87,87,0.1);' : ''}" onclick="event.stopPropagation(); toggleLikeProject('${p.id}')">${isLiked ? t.liked_btn : t.like_btn}</button>` : '';

    const d = document.createElement('div');
    d.className = `pcard${p.featured?' featured':''}`;
    d.style.animationDelay = `${i*.07}s`;
    d.onclick = () => openProjectById(p.id);

    d.innerHTML = `
      ${p.cover_image?`<img class="pcard-cover" src="${sanitize(p.cover_image)}" alt="" loading="lazy" onerror="this.style.display='none'">`:''}
      ${p.featured?`<div class="featured-label">${t.featured_label}</div>`:''}
      <div class="pcard-top">
        <div class="pcard-author">
          <div class="avatar" style="background:${p.color}">${sanitize(p.initials)}</div>
          <div><div class="author-name">${sanitize(p.author)}</div><div class="author-date">📅 ${sanitize(p.date)}</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${likeBtnHtml}
          <span class="status-badge ${sMap[p.status]}">${sLabel[p.status]}</span>
          ${isOwner ? `
            <button style="background:rgba(200,255,87,0.1);border:1px solid rgba(200,255,87,0.2);color:var(--accent);font-size:11px;padding:4px 8px;border-radius:6px;cursor:pointer;font-family:'Instrument Sans',sans-serif" onclick="event.stopPropagation();openEditProject('${sanitize(p.id)}')">${t.edit_btn}</button>
            <button style="background:rgba(255,87,87,0.1);border:1px solid rgba(255,87,87,0.2);color:var(--red);font-size:11px;padding:4px 8px;border-radius:6px;cursor:pointer;font-family:'Instrument Sans',sans-serif" onclick="event.stopPropagation();deleteProject('${sanitize(p.id)}')">${t.delete_btn}</button>
          ` : ''}
        </div>
      </div>
      <div class="pcard-title">${sanitize(p.title)}</div>
      <div class="pcard-desc">${sanitize(p.desc.slice(0,185))}${p.desc.length>185?'…':''}</div>
      <div class="pcard-tags">${p.tags.map(tag=>`<span class="tag">${sanitize(tag)}</span>`).join('')}</div>
      <div class="pcard-footer">
        <div class="pcard-stats">
          <span class="pstat">👁 ${p.views}</span>
          <span class="pstat">♥️ ${p.likes || 0}</span>
        </div>
        <div class="pcard-action">
          ${(p.status!=='closed' && p.status!=='completed')?`<button class="btn btn-accent btn-sm" onclick="event.stopPropagation();openProjectById('${sanitize(p.id)}')">${t.propose_card_btn}</button>`:`<span style="font-size:11px;color:var(--text3)">${t.team_full}</span>`}
        </div>
      </div>`;
    el.appendChild(d);
  });
}

async function fetchLikedProjects() {
  if(!currentUser) return;
  const { data } = await _supabase.from('saved_projects').select('project_id').eq('user_id', currentUser.id);
  if(data) likedProjectIds = data.map(d => d.project_id);
}

// FASE 6: URL Hash on load
async function checkHash() {
  if (window.location.hash.startsWith('#project/')) {
    const pid = window.location.hash.replace('#project/', '');
    if (pid) openProjectById(pid);
  }
}

async function loadRealProjects(isAppend = false) {
  if (!isAppend) {
    currentProjPage = 0;
    realProjects = [];
    hasMoreProjects = true;
  }
  
  const from = currentProjPage * PROJ_PER_PAGE;
  const to = from + PROJ_PER_PAGE - 1;

  const { data, error } = await _supabase.from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error || !data || data.length === 0) {
    hasMoreProjects = false;
    updateLoadMoreBtn();
    return;
  }
  
  if (data.length < PROJ_PER_PAGE) hasMoreProjects = false;

  const authorIds = [...new Set(data.map(p => p.author_id).filter(Boolean))];
  const { data: profilesData } = await _supabase.from('profiles').select('id, primary_role').in('id', authorIds);
  const roleMap = {};
  (profilesData || []).forEach(pr => { roleMap[pr.id] = pr.primary_role; });

  const formatted = data.map(p => formatProjectFromDB(p, roleMap));

  realProjects = isAppend ? [...realProjects, ...formatted] : formatted;
  
  const section = document.getElementById('realProjectsSection');
  if (section && realProjects.length > 0) {
    section.style.display = 'block';
    if (isAppend) {
      applyFilters(); // Ridisegna mantenendo attivi eventuali filtri
    } else {
      renderProjects(realProjects, 'realProjectsList');
    }
  }
  
  updateLoadMoreBtn();
  if (!isAppend) {
      checkHash();
      loadTrendingSidebar(); // FASE 4: Carica i top progetti nella sidebar
  }
}

function updateLoadMoreBtn() {
  const btn = document.getElementById('loadMoreBtn');
  if (btn) btn.style.display = hasMoreProjects ? 'inline-flex' : 'none';
}

function loadMoreProjects() {
  if (!hasMoreProjects) return;
  currentProjPage++;
  const btn = document.getElementById('loadMoreBtn');
  if(btn) btn.textContent = i18n[currentLang].loading;
  loadRealProjects(true).then(() => {
      if(btn) btn.textContent = i18n[currentLang].load_more;
  });
}

async function loadTrendingSidebar() {
  const listEl = document.getElementById('trendingList');
  if (!listEl) return;
  
  // Prendi i 4 progetti più visti
  const { data, error } = await _supabase.from('projects')
    .select('id, title, category, views')
    .order('views', { ascending: false })
    .limit(4);
    
  if (error || !data || data.length === 0) {
    listEl.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:8px">Nessuna tendenza al momento.</div>';
    return;
  }
  
  const catIcons = { game:'🎮', arch:'🏛', app:'📱', art:'🎨', music:'🎵', science:'🔬', film:'🎬', hardware:'🔧', other:'✦' };
  
  listEl.innerHTML = data.map((p, i) => `
    <div class="titem" onclick="openProjectById('${p.id}')">
      <div class="trank">0${i+1}</div>
      <div>
        <div class="ttitle">${sanitize(p.title)}</div>
        <div class="tmeta">${catIcons[p.category] || '✦'} Categoria · ${p.views || 0} viste</div>
      </div>
    </div>
  `).join('');
}

loadRealProjects();

async function deleteProject(id) {
  if (!currentUser) { showToast('❌ Devi essere loggato.'); return; }
  const project = realProjects.find(p => String(p.id) === String(id));
  if (project && project.author_id !== currentUser.id) { showToast('❌ Non sei il proprietario di questo progetto.'); return; }
  if (!confirm('Sei sicuro di voler eliminare questo progetto?')) return;
  await _supabase.from('messages').delete().eq('project_id', id);
  await _supabase.from('proposals').delete().eq('project_id', id);
  await _supabase.from('saved_projects').delete().eq('project_id', id);
  const { error } = await _supabase.from('projects').delete().eq('id', id);
  if (error) { showToast('❌ Errore durante l\'eliminazione'); return; }
  showToast('✅ Progetto eliminato');
  await loadRealProjects();
  if(document.getElementById('page-profile').classList.contains('active')) loadUserProfile();
}

function getFilteredProjects(list) {
  const q = (document.getElementById('searchInput')?.value||'').toLowerCase();
  return list.filter(p => {
    const mc = activeCategory==='all' || p.category===activeCategory;
    const mq = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.some(t=>t.toLowerCase().includes(q)) || p.author.toLowerCase().includes(q);
    return mc && mq;
  });
}

function setCategory(cat, el) {
  activeCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

function applyFilters() {
  filtered = getFilteredProjects(projects);
  renderProjects(filtered, 'projectsList');
  if (realProjects.length > 0) {
    renderProjects(getFilteredProjects(realProjects), 'realProjectsList');
  }
}

function sortProjects(val) {
  if (val==='popular') filtered.sort((a,b)=>b.likes-a.likes);
  else if (val==='recent') filtered.sort((a,b)=> String(b.id).localeCompare(String(a.id)));
  else if (val==='open') filtered.sort((a,b)=>(b.status==='open'?1:0)-(a.status==='open'?1:0));
  renderProjects(filtered, 'projectsList');

  if (realProjects.length > 0) {
    let realFiltered = getFilteredProjects(realProjects);
    if (val==='popular') realFiltered.sort((a,b)=>b.likes-a.likes);
    else if (val==='recent') realFiltered.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
    else if (val==='open') realFiltered.sort((a,b)=>(b.status==='open'?1:0)-(a.status==='open'?1:0));
    renderProjects(realFiltered, 'realProjectsList');
  }
}

function updateMetaTags(p) {
  document.title = `${p.title} — Crewtiv`;
  const setMeta = (prop, content) => {
    const el = document.querySelector(`meta[property="${prop}"]`);
    if (el) el.setAttribute('content', content);
  };
  const desc = p.desc ? p.desc.slice(0, 160) : 'Scopri questo progetto su Crewtiv.';
  setMeta('og:title', p.title + ' — Crewtiv');
  setMeta('og:description', desc);
  setMeta('og:url', window.location.href);
  setMeta('og:image', p.cover_image || 'https://crewtiv.com/og-image.jpg');
}

function resetMetaTags() {
  const isIT = currentLang === 'it';
  document.title = isIT
    ? 'Crewtiv — Condividi la tua visione. Costruisci il tuo team.'
    : 'Crewtiv — Share your vision. Build your team.';
  const setMeta = (prop, content) => {
    const el = document.querySelector(`meta[property="${prop}"]`);
    if (el) el.setAttribute('content', content);
  };
  setMeta('og:title', isIT ? 'Crewtiv — Condividi la tua visione.' : 'Crewtiv — Share your vision.');
  setMeta('og:description', isIT
    ? 'Trova i creativi giusti per il tuo progetto. Unisciti alla piattaforma in beta.'
    : 'Find the right creatives for your project. Join the platform in beta.');
  setMeta('og:url', window.location.origin + window.location.pathname);
  setMeta('og:image', 'https://crewtiv.com/og-image.jpg');
}

async function openProjectById(id) {
  currentProject = realProjects.find(p=> String(p.id) === String(id)) || projects.find(p=> String(p.id) === String(id));
  if (!currentProject) return;
  if (!currentUser) {
    openAuth('register');
    document.getElementById('authSubtitle').textContent = i18n[currentLang].gate_project_msg;
    return;
  }
  const p = currentProject;
  
  // FASE 6: Aggiornamento URL Hash
  window.history.pushState(null, '', '#project/' + id);
  updateMetaTags(p);

  // Incrementa views reali in modo sicuro
  if (p && p.isReal && currentUser && p.author_id !== currentUser.id) {
    try {
      _supabase.rpc('increment_views', { project_id: p.id });
      p.views++; 
    } catch (e) { console.error("Errore incremento views:", e); }
  }

  const sMap = {open:'s-open',progress:'s-progress',closed:'s-closed',completed:'s-completed'};
  const sLabel = {open: i18n[currentLang].status_open, progress: i18n[currentLang].status_progress, closed: i18n[currentLang].status_closed, completed: i18n[currentLang].status_completed};
  document.getElementById('mStatus').className = `status-badge ${sMap[p.status]}`;
  document.getElementById('mStatus').textContent = sLabel[p.status];
  document.getElementById('mTitle').textContent = p.title;
  document.getElementById('mAvatar').style.background = p.color;
  document.getElementById('mAvatar').textContent = p.initials;
  document.getElementById('mAuthor').textContent = p.author;
  document.getElementById('mDate').textContent = '· '+p.date;
  document.getElementById('mDesc').textContent = p.desc;
  document.getElementById('mTags').innerHTML = p.tags.map(t=>`<span class="tag">${sanitize(t)}</span>`).join('');
  const cl = document.getElementById('mCollabs');
  
  // Mostra "Caricamento" finché non arrivano i dati veri dal DB
  cl.innerHTML = `<div style="font-size:12px;color:var(--text3);padding:8px 0">${i18n[currentLang].loading_team}</div>`;
  
  // Se è un progetto reale, peschiamo le proposte accettate
  let projectReviews = [];
  if (p.isReal) {
    const { data: acceptedProps } = await _supabase.from('proposals')
        .select('applicant_name, applicant_id, role')
        .eq('project_id', p.id)
        .eq('status', 'accepted');

    p.collabs = (acceptedProps || []).map(pr => ({
        n: pr.applicant_name || 'Utente',
        r: pr.role || 'Collaboratore',
        s: 'accepted',
        aid: pr.applicant_id
    }));

    // Carica recensioni esistenti se il progetto è in corso o completato
    if (p.status === 'progress' || p.status === 'completed') {
      const { data: reviewsData } = await _supabase.from('reviews').select('*').eq('project_id', p.id);
      projectReviews = reviewsData || [];
    }
  }

  const canReview = p.isReal && currentUser && (p.status === 'progress' || p.status === 'completed');
  const isOwner = currentUser && p.author_id === currentUser.id;
  const isCollaborator = p.collabs.some(c => c.aid === currentUser?.id);

  // Stampiamo i collaboratori (sia quelli veri appena pescati, sia quelli finti delle demo)
  cl.innerHTML = p.collabs.length ? p.collabs.map(c => {
    const initials = sanitize(c.n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase());
    const alreadyReviewed = projectReviews.some(r => r.reviewer_id === currentUser?.id && r.reviewee_id === c.aid);
    let reviewHtml = '';
    if (canReview && isOwner && c.aid) {
      reviewHtml = alreadyReviewed
        ? `<span style="font-size:11px;color:#57ff85;margin-left:6px">✓ Recensito</span>`
        : `<button onclick="openReviewForm('${sanitize(p.id)}','${sanitize(c.aid)}','${sanitize(c.n)}','rev-${sanitize(c.aid)}')" style="font-size:11px;padding:3px 8px;border-radius:6px;background:rgba(200,255,87,0.1);border:1px solid rgba(200,255,87,0.2);color:var(--accent);cursor:pointer;font-family:'Instrument Sans',sans-serif">★ Recensisci</button>`;
    }
    return `<div class="citem" style="flex-wrap:wrap;">
      <div class="citem-left">
        <div class="avatar" style="width:30px;height:30px;border-radius:7px;font-size:10px;background:${getColorForString(c.n)}">${initials}</div>
        <div><div class="cname">${sanitize(c.n)}</div><div class="crole">${sanitize(c.r)}</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
        <span class="cstatus cs-accepted">✓ Ruolo Assegnato</span>
        ${reviewHtml}
      </div>
      <div id="rev-${sanitize(c.aid)}" style="width:100%"></div>
    </div>`;
  }).join('') : '<div style="font-size:12px;color:var(--text3);padding:8px 0">Nessun collaboratore ancora — sii il primo a proporti!</div>';

  // Sezione recensione autore (visibile al collaboratore accettato)
  const reviewsSection = document.getElementById('mReviewsSection');
  reviewsSection.style.display = 'none';
  reviewsSection.innerHTML = '';
  if (canReview && isCollaborator && !isOwner) {
    const alreadyReviewedOwner = projectReviews.some(r => r.reviewer_id === currentUser?.id && r.reviewee_id === p.author_id);
    let ownerReviewHtml = alreadyReviewedOwner
      ? `<span style="font-size:12px;color:#57ff85">✓ Hai già recensito l'autore</span>`
      : `<button onclick="openReviewForm('${sanitize(p.id)}','${sanitize(p.author_id)}','${sanitize(p.author)}','rev-owner')" style="font-size:12px;padding:4px 10px;border-radius:6px;background:rgba(200,255,87,0.1);border:1px solid rgba(200,255,87,0.2);color:var(--accent);cursor:pointer;font-family:'Instrument Sans',sans-serif">★ Recensisci l'autore</button>`;
    reviewsSection.style.display = 'block';
    reviewsSection.innerHTML = `
      <div class="msec-title">RECENSIONE</div>
      ${ownerReviewHtml}
      <div id="rev-owner" style="margin-top:8px"></div>
    `;
  }

  // Mostra recensioni esistenti se ce ne sono
  if (projectReviews.length > 0) {
    const reviewsHtml = projectReviews.map(r => {
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      return `<div style="padding:10px 12px;background:var(--surface2);border-radius:8px;margin-bottom:8px;">
        <div style="font-size:13px;color:var(--accent);letter-spacing:1px;margin-bottom:4px">${stars}</div>
        ${r.text ? `<div style="font-size:12px;color:var(--text2);line-height:1.5">${sanitize(r.text)}</div>` : ''}
      </div>`;
    }).join('');
    reviewsSection.style.display = 'block';
    reviewsSection.innerHTML += `<div class="msec-title" style="margin-top:16px">RECENSIONI</div>${reviewsHtml}`;
  }
  
  const ps = document.getElementById('mProposeSection');
  const demoNotice = document.getElementById('proposeDemoNotice');
  const proposeForm = document.getElementById('proposeForm');
  const t = i18n[currentLang];
  
  if (p.status==='closed' || p.status==='completed') {
    demoNotice.style.display = 'none';
    proposeForm.style.display = 'block';
    proposeForm.innerHTML = `<div style="padding:14px;background:var(--surface2);border-radius:8px;font-size:13px;color:var(--text3);text-align:center">${i18n[currentLang].proj_no_proposals}</div>`;
  } else if (p.isReal) {
    demoNotice.style.display = 'none';
    
    if(!currentUser) {
        proposeForm.innerHTML = `<button class="btn btn-accent" onclick="closeModal('projectModal');openAuth('login')" style="margin-top:10px;">Accedi per proporti →</button>`;
        proposeForm.style.display = 'block';
    } else if (p.author_id === currentUser.id) {
        proposeForm.innerHTML = `<div style="color:var(--text3); font-size:12px; margin-top:10px;">Questo è un tuo progetto.</div>`;
        proposeForm.style.display = 'block';
    } else {
        proposeForm.innerHTML = `
          <div class="form-group">
            <label class="form-label">${t.propose_role}</label>
            <input class="form-input" id="propRole" placeholder="${t.propose_role_ph}">
          </div>
          <div class="form-group">
            <label class="form-label">${t.propose_type}</label>
            <select class="form-select" id="propType">
              <option>Volontaria</option>
              <option>Retribuita — da discutere</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${t.propose_msg}</label>
            <textarea class="form-textarea" id="propMsg" placeholder="${t.propose_msg_ph}"></textarea>
          </div>
          <button class="btn btn-accent" onclick="submitProposal()">${t.propose_btn}</button>
        `;
        proposeForm.style.display = 'block';
    }
  } else {
    demoNotice.style.display = 'block';
    proposeForm.style.display = 'none';
    document.getElementById('proposeDemoText').textContent = t.propose_demo;
    document.getElementById('proposeDemoBtn').textContent = t.propose_demo_btn;
  }
  const printBtn = document.getElementById('mPrintBtn');
  if (printBtn) printBtn.style.display = (currentUser && p.project_hash) ? 'block' : 'none';

  const pModal = document.getElementById('projectModal');
pModal.classList.add('open');
trapFocus(pModal);
}

function printReceipt() {
  const p = currentProject;
  if (!p || !p.project_hash) return;
  const t = i18n[currentLang];
  const win = window.open('', '_blank');
  if (!win) { showToast('⚠️ Abilita i popup per stampare la ricevuta'); return; }
  win.document.write(`<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><title>Ricevuta Crewtiv — ${p.title}</title><style>
    body{font-family:'Georgia',serif;max-width:680px;margin:60px auto;padding:0 32px;color:#111;line-height:1.7}
    .logo{font-family:'Arial Black',sans-serif;font-size:28px;font-weight:900;letter-spacing:-1px;margin-bottom:4px}
    .logo span{color:#b8ff1a}
    .label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#888;margin-top:28px;margin-bottom:4px}
    .hash{font-family:'Courier New',monospace;font-size:13px;background:#f4f4f4;padding:12px;border-radius:6px;word-break:break-all;border-left:3px solid #b8ff1a}
    .disclaimer{font-size:11px;color:#888;border-top:1px solid #ddd;margin-top:40px;padding-top:16px;line-height:1.6}
    h1{font-size:22px;margin:8px 0 4px}
    @media print{body{margin:40px}}
  </style></head><body>
    <div class="logo">Crewtiv<span>.</span></div>
    <div style="font-size:12px;color:#888;margin-bottom:32px">Ricevuta di Registrazione Progetto</div>
    <div class="label">Titolo</div><h1>${p.title}</h1>
    <div class="label">Autore</div><p style="margin:0">${p.author}</p>
    <div class="label">Categoria</div><p style="margin:0">${p.category || '—'}</p>
    <div class="label">Data di pubblicazione</div><p style="margin:0">${p.date}</p>
    <div class="label">Descrizione</div><p style="margin:0">${p.desc}</p>
    <div class="label">Codice Hash SHA-256</div>
    <div class="hash">${p.project_hash}</div>
    <div class="disclaimer">
      Questo documento attesta che il progetto è stato pubblicato su Crewtiv alla data indicata. Il Codice Hash certifica l'anteriorità della pubblicazione — non costituisce tutela legale né equivale a un deposito brevettuale.<br>
      Per proteggere la tua idea rivolgiti a un professionista.
    </div>
  </body></html>`);
  win.document.close();
  win.print();
}

let currentReviewRating = 0;

function setReviewStars(rating) {
  currentReviewRating = rating;
  for (let i = 1; i <= 5; i++) {
    const star = document.getElementById(`rStar${i}`);
    if (star) star.style.color = i <= rating ? 'var(--accent)' : 'var(--text3)';
  }
}

function openReviewForm(projectId, revieweeId, revieweeName, targetDivId) {
  currentReviewRating = 0;
  const container = document.getElementById(targetDivId);
  if (!container) return;
  container.innerHTML = `
    <div style="margin-top:10px;padding:12px;background:var(--surface2);border-radius:10px;border:1px solid var(--border2);">
      <div style="font-size:12px;color:var(--text2);margin-bottom:8px;">Recensisci <strong style="color:var(--text)">${sanitize(revieweeName)}</strong></div>
      <div style="display:flex;gap:6px;font-size:24px;cursor:pointer;margin-bottom:10px;">
        ${[1,2,3,4,5].map(i => `<span id="rStar${i}" style="color:var(--text3);transition:color .15s;" onmouseover="setReviewStars(${i})" onclick="setReviewStars(${i})">★</span>`).join('')}
      </div>
      <textarea class="form-textarea" id="rText" placeholder="Scrivi una breve recensione (opzionale)…" style="min-height:70px;margin-bottom:10px;font-size:13px;"></textarea>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-accent btn-sm" onclick="submitReview('${sanitize(projectId)}','${sanitize(revieweeId)}','${sanitize(targetDivId)}')">Invia ✦</button>
        <button onclick="document.getElementById('${sanitize(targetDivId)}').innerHTML=''" style="font-size:12px;padding:4px 10px;border-radius:6px;background:transparent;border:1px solid var(--border2);color:var(--text2);cursor:pointer;font-family:'Instrument Sans',sans-serif;">Annulla</button>
      </div>
    </div>
  `;
}

async function submitReview(projectId, revieweeId, targetDivId) {
  if (!currentUser) return;
  if (!currentReviewRating) { showToast('⚠️ Seleziona almeno una stella'); return; }
  const text = document.getElementById('rText')?.value.trim() || '';

  const { error } = await _supabase.from('reviews').insert({
    project_id: projectId,
    reviewer_id: currentUser.id,
    reviewee_id: revieweeId,
    rating: currentReviewRating,
    text: text || null
  });
  if (error) { showToast('❌ ' + error.message); return; }

  // Ricalcola avg_rating e review_count nel profilo del recensito
  const { data: allReviews } = await _supabase.from('reviews').select('rating').eq('reviewee_id', revieweeId);
  if (allReviews && allReviews.length > 0) {
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await _supabase.from('profiles').upsert({
      id: revieweeId,
      avg_rating: Math.round(avg * 100) / 100,
      review_count: allReviews.length
    }, { onConflict: 'id' });
  }

  const container = document.getElementById(targetDivId);
  if (container) container.innerHTML = `<div style="padding:8px 0;font-size:12px;color:#57ff85;">✓ Recensione inviata!</div>`;
  showToast('✅ Recensione inviata!');
}

async function submitProposal() {
  const role = document.getElementById('propRole')?.value;
  const msg = document.getElementById('propMsg')?.value;
  if (!role||!msg) { showToast('⚠️ Compila tutti i campi'); return; }
  
  if (currentProject.isReal) {
      // Usa l'email se l'utente non ha impostato un nome
      const appName = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
      
      const { error } = await _supabase.from('proposals').insert({
          project_id: currentProject.id,
          owner_id: currentProject.author_id,
          applicant_id: currentUser.id,
          applicant_name: appName,
          role: role,
          message: msg
      });
      if(error) return showToast('❌ Errore invio proposta');
      showToast('✅ Proposta inviata con successo!');
  } else {
      showToast(`✅ Proposta inviata a ${currentProject.author} (Demo)!`);
  }
  
  closeModal('projectModal');
  if(document.getElementById('page-profile').classList.contains('active')) loadUserProfile();
}

let likeInFlight = false;
async function toggleLikeProject(projectId) {
  if (likeInFlight) return;
  if(!currentUser) return openAuth('login');
  likeInFlight = true;
  const isLiked = likedProjectIds.includes(projectId);
  try {
  
  // Troviamo il progetto per aggiornare il numero di like in tempo reale nell'interfaccia
  const project = realProjects.find(p => String(p.id) === String(projectId));
  
  if (isLiked) {
    await _supabase.from('saved_projects').delete().match({ user_id: currentUser.id, project_id: projectId });
    likedProjectIds = likedProjectIds.filter(id => id !== projectId);
    
    if(project) {
        project.likes = Math.max(0, (project.likes || 1) - 1);
        await _supabase.from('projects').update({ likes: project.likes }).eq('id', projectId);
    }
    showToast('Like rimosso');
  } else {
    await _supabase.from('saved_projects').insert({ user_id: currentUser.id, project_id: projectId });
    likedProjectIds.push(projectId);
    
    if(project) {
        project.likes = (project.likes || 0) + 1;
        await _supabase.from('projects').update({ likes: project.likes }).eq('id', projectId);
    }
    showToast('Hai messo Like! ♥️');
  }
  
  if(document.getElementById('page-profile').classList.contains('active')) {
        loadUserProfile();
    } else {
        applyFilters();
    }
  } finally {
    likeInFlight = false;
  }
}

function openNewProject() {
  if (!currentUser) { openAuth('register'); return; }
  const npModal = document.getElementById('newProjectModal');
  const legalCheck = document.getElementById('legalProjectCheck');
  if (legalCheck) { legalCheck.checked = false; document.getElementById('nPublishBtn').disabled = true; }
npModal.classList.add('open');
trapFocus(npModal);
}

function toggleLegalCheck() {
  const checked = document.getElementById('legalProjectCheck').checked;
  document.getElementById('nPublishBtn').disabled = !checked;
}

function _similarityScore(titleA, tagsA, titleB, tagsB) {
  const tokenize = str => String(str||'').toLowerCase().split(/[\s,]+/).filter(w=>w.length>3);
  const jaccard = (setA, setB) => {
    const a = new Set(setA), b = new Set(setB);
    if (!a.size && !b.size) return 1;
    const inter = [...a].filter(x=>b.has(x)).length;
    const union = new Set([...a,...b]).size;
    return union ? inter/union : 0;
  };
  const titleScore = jaccard(tokenize(titleA), tokenize(titleB));
  const tagsANorm = (tagsA||[]).map(t=>t.toLowerCase().trim()).filter(Boolean);
  const tagsBNorm = (tagsB||[]).map(t=>t.toLowerCase().trim()).filter(Boolean);
  if (!tagsANorm.length && !tagsBNorm.length) return titleScore;
  const tagsScore = jaccard(tagsANorm, tagsBNorm);
  return 0.4 * titleScore + 0.6 * tagsScore;
}

function _openSimilarityModal(similarProject, onProceed) {
  const t = i18n[currentLang];
  _pendingSimilarProject = similarProject;
  document.getElementById('simAttentionLabel').textContent = t.sim_attention_label;
  document.getElementById('simModalTitle').textContent = t.similarity_title;
  document.getElementById('simModalMsg').textContent = t.similarity_msg;
  document.getElementById('simModalFoundLabel').textContent = t.sim_found_label;
  document.getElementById('simProjectTitle').textContent = similarProject.title;
  const btnView = document.getElementById('btnViewExisting');
  btnView.textContent = t.btn_view_existing;
  btnView.onclick = () => { closeModal('similarityModal'); closeModal('newProjectModal'); openProjectById(_pendingSimilarProject.id); };
  const btnProceed = document.getElementById('btnProceedAnyway');
  btnProceed.textContent = t.btn_proceed_anyway;
  btnProceed.onclick = () => { closeModal('similarityModal'); _openFinalWarningModal(onProceed); };
  document.getElementById('similarityModal').classList.add('open');
  trapFocus(document.getElementById('similarityModal'));
}

function _openFinalWarningModal(onConfirm) {
  const t = i18n[currentLang];
  document.getElementById('finalWarnLabel').textContent = t.warn_label;
  document.getElementById('finalWarnTitle').textContent = t.warning_final_title;
  document.getElementById('finalWarnMsg').textContent = t.warning_final_msg;
  document.getElementById('btnCancelFinal').textContent = t.btn_cancel;
  const btnConfirm = document.getElementById('btnFinalConfirm');
  btnConfirm.textContent = t.btn_final_confirm;
  btnConfirm.onclick = () => { closeModal('finalWarningModal'); onConfirm(); };
  document.getElementById('finalWarningModal').classList.add('open');
  trapFocus(document.getElementById('finalWarningModal'));
}

async function _doInsertProject(title, desc, cat, tags, cover_image, name) {
  const btn = document.querySelector('#newProjectModal .btn-accent');
  btn.disabled = true; btn.textContent = 'Pubblicazione…';
  const hashInput = `${title}|${desc}|${new Date().toISOString()}|${currentUser.id}`;
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(hashInput));
  const project_hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  const { data, error } = await _supabase.from('projects').insert({
    title, description: desc, category: cat,
    status: document.getElementById('nStatus').value,
    tags: tags.length ? tags : ['Nuovo'],
    author_id: currentUser.id,
    author_name: name,
    collab_type: document.getElementById('nCollab').value,
    cover_image,
    project_hash
  }).select().single();
  btn.disabled = false; btn.textContent = 'Pubblica e registra ✦';
  if (error) { showToast('❌ Errore: ' + error.message); return; }
  closeModal('newProjectModal');
  showToast('🎉 Progetto pubblicato e registrato!');
  // TODO EMAIL: invia a currentUser.email con subject "Ricevuta progetto: ${data.title}"
  // Body: titolo, descrizione, data (data.created_at), project_hash (data.project_hash), disclaimer non-responsabilità
  // Implementare via Supabase Edge Function o servizio Resend (resend.com)
  ['nTitle','nDesc','nTags','nImage'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  await loadRealProjects();
}

async function submitNewProject() {
  if (!currentUser) { openAuth('login'); return; }
  if (!document.getElementById('legalProjectCheck').checked) { showToast(i18n[currentLang].legal_check_toast); return; }
  const title = document.getElementById('nTitle').value;
  const cat = document.getElementById('nCat').value;
  const desc = document.getElementById('nDesc').value;
  if (!title||!cat||!desc) { showToast('⚠️ Compila i campi obbligatori'); return; }
  const tags = document.getElementById('nTags').value.split(',').map(t=>t.trim()).filter(Boolean);
  const cover_image = document.getElementById('nImage').value.trim() || null;
  const name = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];

  // Controllo similarità contro i progetti reali
  const similarProject = realProjects.find(p =>
    p.author_id !== currentUser.id &&
    _similarityScore(title, tags, p.title, p.tags) > 0.7
  );

  if (similarProject) {
    _openSimilarityModal(similarProject, () => _doInsertProject(title, desc, cat, tags, cover_image, name));
    return;
  }

  await _doInsertProject(title, desc, cat, tags, cover_image, name);
}



// ── MOTORE MESSAGGI REALI ──────────────────────────────────────────
let activeChatId = null; // ID dell'altro utente

async function loadMessages() {
  if (!currentUser) return;
  const contactsContainer = document.getElementById('contactsList');
  
  // 1. Carichiamo le proposte ACCETTATE (i nostri contatti)
  // Cerchiamo sia dove io sono il proprietario, sia dove io sono il candidato
  const { data: matches, error } = await _supabase.from('proposals')
    .select('*, projects(id, title, author_id, author_name)')
    .eq('status', 'accepted')
    .or(`owner_id.eq.${currentUser.id},applicant_id.eq.${currentUser.id}`);

  if (error || !matches || matches.length === 0) {
    const t = i18n[currentLang];
    contactsContainer.innerHTML = `
      <div style="padding:40px 20px; text-align:center; color:var(--text3);">
        <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">💬</div>
        <div style="font-size:14px; font-weight:500; color:var(--text); margin-bottom:6px;">${t.no_chat_active}</div>
        <div style="font-size:12px; line-height:1.5;">${t.no_chat_sub}</div>
      </div>`;
    return;
  }

  // Creiamo la lista contatti a sinistra
  contactsContainer.innerHTML = matches.map(m => {
    // Capiamo chi è "l'altro" nella conversazione
    const isOwner = m.owner_id === currentUser.id;
    const otherId = isOwner ? m.applicant_id : m.owner_id;
    const otherName = isOwner ? m.applicant_name : m.projects.author_name;
    const projectTitle = m.projects.title;
    const initials = otherName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    
    return `
      <div class="msg-item ${activeChatId === otherId ? 'active' : ''}" onclick="selectRealChat('${otherId}', '${sanitize(otherName)}', '${sanitize(projectTitle)}', '${m.project_id}')">
        <div class="msg-item-name">${sanitize(otherName)}</div>
        <div class="msg-item-preview">${i18n[currentLang].project_prefix} ${sanitize(projectTitle)}</div>
      </div>
    `;
  }).join('');

  // Se abbiamo una chat attiva (veniamo dal profilo), carichiamo i messaggi
  if (currentChatUserId) {
    selectRealChat(currentChatUserId, currentChatUserName, "Progetto", currentChatProjectId);
    currentChatUserId = null; // Puliamo per la prossima volta
  }
}

async function selectRealChat(otherId, otherName, projectTitle, projectId) {
  activeChatId = otherId;
  currentChatProjectId = projectId;
  
  document.getElementById('noChatSelected').style.display = 'none';
  document.getElementById('activeChatArea').style.display = 'flex';
  document.getElementById('chatName').textContent = otherName;
  document.getElementById('chatProject').textContent = projectTitle;
  document.getElementById('chatAvatar').textContent = otherName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  document.getElementById('chatAvatar').style.background = getColorForString(otherName);
  
  // Evidenziamo il contatto attivo nella lista
document.querySelectorAll('.msg-item').forEach(el => {
  el.classList.remove('active');
  if (el.getAttribute('onclick') && el.getAttribute('onclick').includes(otherId)) {
    el.classList.add('active');
  }
});

  // Carichiamo i messaggi dal DB
  const { data: msgs, error } = await _supabase.from('messages')
    .select('*')
    .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${currentUser.id})`)
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });

  const msgContainer = document.getElementById('chatMessages');
  msgContainer.innerHTML = (msgs && msgs.length > 0) ? msgs.map(m => `
    <div class="cmsg ${m.sender_id === currentUser.id ? 'me' : 'them'}">
      <div class="cmsg-bubble">${sanitize(m.content)}</div>
      <div class="cmsg-time">${new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    </div>
  `).join('') : `<div style="text-align:center; padding:20px; color:var(--text3); font-size:12px;">Inizia la conversazione!</div>`;
  
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // FASE 9: Realtime Messages 🟡
  if (messageSubscription) {
      _supabase.removeChannel(messageSubscription);
  }
  messageSubscription = _supabase.channel('chat_' + projectId)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `project_id=eq.${projectId}` }, payload => {
          const m = payload.new;
          // Mostriamo il messaggio se è stato ricevuto e appartiene alla chat attiva (evitiamo di ricaricare il nostro che carichiamo in modo ottimistico)
          if (m.sender_id !== currentUser.id && m.receiver_id === currentUser.id) {
              const div = document.createElement('div');
              div.className = 'cmsg them';
              div.innerHTML = `
                <div class="cmsg-bubble">${sanitize(m.content)}</div>
                <div class="cmsg-time">${new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
              `;
              msgContainer.appendChild(div);
              msgContainer.scrollTop = msgContainer.scrollHeight;
          }
      })
      .subscribe();
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const content = input.value.trim();
  if (!content || !activeChatId || !currentChatProjectId) return;

  // FASE 9: Optimistic UI (Aggiungiamo subito il messaggio per far sembrare l'app fulminea)
  input.value = '';
  const msgContainer = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'cmsg me';
  div.innerHTML = `
    <div class="cmsg-bubble">${sanitize(content)}</div>
    <div class="cmsg-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
  `;
  msgContainer.appendChild(div);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  const { error } = await _supabase.from('messages').insert({
    sender_id: currentUser.id,
    receiver_id: activeChatId,
    project_id: currentChatProjectId,
    content: content
  });

  if (error) {
    showToast('❌ Errore invio messaggio');
  }
}

let allTalents = [];

const demoTalents = [
  { full_name: "Sofia Russo", title: "Narrative Designer", bio: "Scrivo mondi e dialoghi ramificati. Appassionata di RPG e sci-fi.", skills: ["Twine", "Scrittura Creativa", "Lore"] },
  { full_name: "Luca Verdi", title: "Sound Designer", bio: "Creo atmosfere sonore immersive per videogiochi e cortometraggi.", skills: ["FMOD", "Ableton", "Foley"] },
  { full_name: "Anna Pellegrini", title: "Paesaggista", bio: "Progettazione di spazi verdi sostenibili e integrazione architettonica.", skills: ["AutoCAD", "Botanica", "Sostenibilità"] }
];

async function loadTalents(reset = true) {
  const container = document.getElementById('talentsList');
  const t = i18n[currentLang];
  if (reset) {
    currentTalentsPage = 0;
    hasMoreTalents = true;
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text3);">${t.loading_talents}</div>`;
  }

  const from = currentTalentsPage * TALENTS_PER_PAGE;
  const to = from + TALENTS_PER_PAGE - 1;

  const { data, error } = await _supabase.from('profiles').select('*').order('full_name', { ascending: true }).range(from, to);

  if (reset && (error || !data || data.length === 0)) {
    allTalents = demoTalents;
    container.innerHTML = `
      <div style="grid-column: 1/-1; background:var(--accent-dim);border:1px solid rgba(200,255,87,0.2);border-radius:10px;padding:12px 16px;margin-bottom:20px;display:flex;align-items:center;gap:10px">
        <span style="font-size:16px">✦</span>
        <span style="font-size:13px;color:var(--text2)" id="talentsDemoBanner">${t.talents_demo_text} <span style="color:var(--accent);cursor:pointer;font-weight:500" onclick="openAuth('register')">${t.talents_demo_cta}</span></span>
      </div>
      <div id="talentsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; width: 100%; grid-column: 1/-1;"></div>
    `;
    renderTalents(allTalents, 'talentsGrid');
    document.getElementById('loadMoreTalentsBtn').style.display = 'none';
    return;
  }

  if (data && data.length > 0) {
    if (reset) {
      allTalents = data;
      container.innerHTML = `<div id="talentsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; width: 100%; grid-column: 1/-1;"></div>`;
    } else {
      allTalents = [...allTalents, ...data];
    }
    renderTalents(data, 'talentsGrid', !reset);
    hasMoreTalents = data.length === TALENTS_PER_PAGE;
    currentTalentsPage++;
  } else {
    hasMoreTalents = false;
  }

  const btn = document.getElementById('loadMoreTalentsBtn');
  if (btn) btn.style.display = hasMoreTalents ? 'block' : 'none';
}

async function loadMoreTalents() {
  const btn = document.getElementById('loadMoreTalentsBtn');
  if (btn) { btn.disabled = true; btn.textContent = i18n[currentLang].loading; }
  await loadTalents(false);
  if (btn) { btn.disabled = false; btn.textContent = i18n[currentLang].load_more; }
}

function renderSocialLinks(social_links) {
  if (!social_links) return '';
  const links = [
    {
      key: 'linkedin', label: 'LinkedIn',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
    },
    {
      key: 'github', label: 'GitHub',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    },
    {
      key: 'behance', label: 'Behance',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg>`
    },
    {
      key: 'portfolio', label: 'Portfolio',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/></svg>`
    }
  ];
  const html = links
    .filter(l => social_links[l.key])
    .map(l => `<a href="${sanitize(social_links[l.key])}" target="_blank" rel="noopener noreferrer" title="${l.label}" style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:8px; background:var(--card2); color:var(--text2); text-decoration:none; transition:color .2s, background .2s;" onmouseover="this.style.color='var(--accent)';this.style.background='var(--accent-dim)';" onmouseout="this.style.color='var(--text2)';this.style.background='var(--card2)';">${l.icon}</a>`)
    .join('');
  return html ? `<div style="display:flex; gap:8px; margin-top:10px;">${html}</div>` : '';
}

function renderTalents(list, targetId = 'talentsList', append = false) {
  const container = document.getElementById(targetId);
  if (!container) return;
  if (!append) container.innerHTML = '';
  
  if (!list.length) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text3);">${i18n[currentLang].no_talents_found}</div>`;
    return;
  }
  
  list.forEach((t, i) => {
    // Nascondiamo i profili completamente vuoti per tenere la vetrina pulita
    if(!t.title && !t.bio && (!t.skills || t.skills.length === 0)) return;
    
    const name = t.full_name || 'Creativo Anonimo';
    const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    
    // LOGICA COLORE E BADGE BLINDATA (gestione sicura maiuscole/minuscole e spazi)
    const roleKey = t.primary_role ? String(t.primary_role).trim().toLowerCase() : null;
    const color = (roleKey && getRoleColor(roleKey)) ? getRoleColor(roleKey) : getColorForString(name);
    
    const roleLabel = (roleKey && getRolePrimaryBadge(roleKey)) 
        ? getRolePrimaryBadge(roleKey) 
        : `<span style="color:var(--accent); font-weight:500;">${sanitize(t.title || 'Collaboratore')}</span>`;
    
    const d = document.createElement('div');
    d.className = 'pcard';
    d.style.animationDelay = `${i * 0.05}s`;
    d.style.cursor = 'pointer'; 
    
    // FASE 8: Talenti cliccabili
    d.onclick = () => {
      if (!currentUser) {
        openAuth('register');
        document.getElementById('authSubtitle').textContent = i18n[currentLang].gate_talent_msg;
        return;
      }
      document.getElementById('tModName').textContent = name;
      const modalAvgHtml = t.avg_rating
        ? `<div style="font-size:13px;margin-top:4px;color:var(--accent);letter-spacing:1px;">${'★'.repeat(Math.round(t.avg_rating))}${'☆'.repeat(5-Math.round(t.avg_rating))} <span style="color:var(--text3);font-size:11px;">${Number(t.avg_rating).toFixed(1)} (${t.review_count} recensioni)</span></div>`
        : '';
      document.getElementById('tModRole').innerHTML = roleLabel + modalAvgHtml + renderSocialLinks(t.social_links);
      document.getElementById('tModBio').textContent = t.bio || 'Nessuna bio inserita.';
      document.getElementById('tModSkills').innerHTML = (t.skills || []).map(s => `<span class="tag">${sanitize(s)}</span>`).join('');
      
      const btn = document.getElementById('tModContactBtn');
      if (currentUser && t.id && t.id !== currentUser.id) {
         btn.style.display = 'flex';
         btn.textContent = i18n[currentLang].talent_invite;
         btn.onclick = () => {
             closeModal('talentModal');
             showToast(i18n[currentLang].talent_coming_soon);
         };
      } else if (!currentUser) {
         btn.style.display = 'flex';
         btn.textContent = i18n[currentLang].talent_login_to_contact;
         btn.onclick = () => { closeModal('talentModal'); openAuth('login'); };
      } else {
         btn.style.display = 'none'; // È il proprio profilo
      }
      document.getElementById('talentModal').classList.add('open');
    };

    const avgRatingHtml = t.avg_rating
      ? `<div style="font-size:12px;margin-top:3px;color:var(--accent);letter-spacing:1px;">${'★'.repeat(Math.round(t.avg_rating))}${'☆'.repeat(5-Math.round(t.avg_rating))} <span style="color:var(--text3);font-size:11px;">${Number(t.avg_rating).toFixed(1)} (${t.review_count})</span></div>`
      : '';
    d.innerHTML = `
      <div style="display:flex; gap:14px; align-items:center; margin-bottom:16px;">
        <div class="avatar" style="width:48px; height:48px; border-radius:14px; font-size:16px; background:${color}; color:#0a0a0f;">${sanitize(initials)}</div>
        <div>
          <div style="font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:var(--text);">${sanitize(name)}</div>
          <div style="font-size:13px; margin-top:2px;">${roleLabel}</div>
          ${avgRatingHtml}
          ${renderSocialLinks(t.social_links)}
        </div>
      </div>
      <div style="font-size:13px; color:var(--text2); line-height:1.6; margin-bottom:16px; font-weight:300;">
        ${t.bio ? sanitize(t.bio.length > 120 ? t.bio.slice(0, 120) + '...' : t.bio) : i18n[currentLang].no_bio}
      </div>
      <div class="pcard-tags" style="margin-bottom:0;">
        ${(t.skills || []).map(s => `<span class="tag">${sanitize(s)}</span>`).join('')}
      </div>
    `;
    container.appendChild(d);
  });
}

async function applyTalentFilters() {
  const q = (document.getElementById('searchTalentInput')?.value || '').toLowerCase().trim();
  const btn = document.getElementById('loadMoreTalentsBtn');

  if (!q) {
    // Ricerca svuotata: ripristina vista paginata
    if (btn) btn.style.display = hasMoreTalents ? 'block' : 'none';
    renderTalents(allTalents, 'talentsGrid');
    return;
  }

  // Ricerca attiva: nasconde "Carica altri" (Bug 2) e interroga tutto il DB (Bug 1)
  if (btn) btn.style.display = 'none';
  const { data } = await _supabase.from('profiles').select('*').order('full_name', { ascending: true });
  const source = (data && data.length > 0) ? data : allTalents;
  const filtered = source.filter(t => {
    const name = (t.full_name || '').toLowerCase();
    const title = (t.title || '').toLowerCase();
    const bio = (t.bio || '').toLowerCase();
    const skills = (t.skills || []).join(' ').toLowerCase();
    return name.includes(q) || title.includes(q) || bio.includes(q) || skills.includes(q);
  });
  renderTalents(filtered, 'talentsGrid');
}

function showPage(page) {
  if (page !== 'messages' && messageSubscription) {
    _supabase.removeChannel(messageSubscription);
    messageSubscription = null;
  }
  localStorage.setItem('crewtiv_lastPage', page);
  document.documentElement.setAttribute('data-current-page', page); // Cambio pagina istantaneo e anti-sfarfallio
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pageEl = document.getElementById('page-'+page);
  if (pageEl) pageEl.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  const navEl = document.getElementById('nav-'+page);
  if (navEl) navEl.classList.add('active');
  
  if (page==='profile') loadUserProfile();
  if (page==='messages') loadMessages();
  if (page==='talents') loadTalents();
  
  if (page==='privacy') {
    document.getElementById('privacyIT').style.display = currentLang==='it' ? 'block' : 'none';
    document.getElementById('privacyEN').style.display = currentLang==='en' ? 'block' : 'none';
  }
  if (page==='tos') {
    document.getElementById('tosIT').style.display = currentLang==='it' ? 'block' : 'none';
    document.getElementById('tosEN').style.display = currentLang==='en' ? 'block' : 'none';
  }
  window.scrollTo(0,0);
}

// ── NUOVA FUNZIONE PROFILO FUSA ──────────────────────────────────────────
async function loadUserProfile() {
  if (!currentUser) return;
  
  const name = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileAvatar').textContent = initials;
  document.getElementById('profileAvatar').style.background = getColorForString(name); // Colore base se non c'è ruolo
  document.getElementById('editProfileBtn').style.display = 'inline-flex';
  document.getElementById('logoutBtn').style.display = 'inline-flex';

  let profileData = null;
  const { data: profileDataResult } = await _supabase.from('profiles').select('*').eq('id', currentUser.id).single();
  profileData = profileDataResult;
  if (profileData) {
    // FASE 10e: DNA Visivo Ruolo Primario
    if (profileData.primary_role) {
      const roleColor = getRoleColor(profileData.primary_role) || getColorForString(name);
      document.getElementById('profileAvatar').style.background = roleColor;
      document.getElementById('profileName').innerHTML = `${sanitize(name)} ${getRolePrimaryBadge(profileData.primary_role)}`;
      
      // Sincronizza anche l'avatar della navbar in tempo reale
      const navAv = document.getElementById('navAvatar');
      if (navAv) navAv.style.background = roleColor;
    }
    
    document.getElementById('profileProfTitle').textContent = profileData.title || '';
    document.getElementById('profileBio').textContent = profileData.bio || 'Aggiungi una bio per farti conoscere...';
    
    const skillsWrap = document.getElementById('profileSkillsWrap');
    let tagsHtml = '';
    
    // FASE 10e: DNA Visivo Ruoli Secondari
    if (profileData.secondary_roles && profileData.secondary_roles.length > 0) {
      tagsHtml += profileData.secondary_roles.map(r => getRoleTag(r)).join('');
    }
    // Aggiunta skills classiche di seguito
    if (profileData.skills && profileData.skills.length > 0) {
      tagsHtml += profileData.skills.map(s => `<span class="tag">${sanitize(s)}</span>`).join('');
    }
    
    if (tagsHtml !== '') {
      skillsWrap.style.display = 'flex';
      skillsWrap.innerHTML = tagsHtml;
    } else {
      skillsWrap.style.display = 'none';
    }
    
    const banner = document.getElementById('profileCompleteBanner');
    if (!profileData.bio) { banner.style.display = 'flex'; } else { banner.style.display = 'none'; }
  } else {
    document.getElementById('profileProfTitle').textContent = '';
    document.getElementById('profileBio').textContent = 'Aggiungi una bio per farti conoscere...';
    document.getElementById('profileCompleteBanner').style.display = 'flex';
  }

  const { count: countSent } = await _supabase.from('proposals').select('*', {count:'exact', head:true}).eq('applicant_id', currentUser.id);
  const { count: countRecv } = await _supabase.from('proposals').select('*', {count:'exact', head:true}).eq('owner_id', currentUser.id).eq('status', 'pending');
  const { count: countProj } = await _supabase.from('projects').select('*', {count:'exact', head:true}).eq('author_id', currentUser.id);

  document.getElementById('dashTotalProjects').textContent = countProj || 0;
  document.getElementById('dashProposalsReceived').textContent = countRecv || 0;
  document.getElementById('dashProposalsSent').textContent = countSent || 0;

  // NOTA CONDIVISA: badge pending — note in arrivo (sono il ricevente)
  const { data: _pendingForMe } = await _supabase.from('shared_notes').select('project_id, author_id').eq('status', 'pending').eq('receiver_id', currentUser.id);
  const _pendingNoteForMe = new Set((_pendingForMe || []).map(n => n.project_id + '_' + n.author_id));
  // NOTA CONDIVISA: badge pending — note inviate (sono l'autore)
  const { data: _pendingSentByMe } = await _supabase.from('shared_notes').select('project_id, receiver_id').eq('status', 'pending').eq('author_id', currentUser.id);
  const _pendingNoteSentByMe = new Set((_pendingSentByMe || []).map(n => n.project_id + '_' + n.receiver_id));

  const { data: props } = await _supabase.from('proposals').select('*, projects(title)').eq('owner_id', currentUser.id).in('status', ['pending', 'accepted']);
  const propList = document.getElementById('proposalList');
  const tProp = i18n[currentLang];
  if(props && props.length > 0) {
      propList.innerHTML = props.map(pr => `
          <div class="prop-item">
              <div class="prop-avatar" style="background:${getColorForString(pr.applicant_name)}">${pr.applicant_name ? pr.applicant_name.slice(0,2).toUpperCase() : 'AN'}</div>
              <div style="flex:1">
                  <div class="prop-name">${pr.applicant_name || 'Utente'}</div>
                  <div class="prop-role">${pr.role} · ${tProp.for_project} <strong>${pr.projects?.title || tProp.project_deleted}</strong></div>
                  ${pr.status === 'pending' ? `
                  <div class="prop-msg">"${pr.message}"</div>
                  <div class="prop-actions">
                      <button class="btn-accept" onclick="respondProposal('${pr.id}', 'accepted', '${pr.applicant_name}')">${tProp.accept_btn}</button>
                      <button class="btn-decline" onclick="respondProposal('${pr.id}', 'declined', '${pr.applicant_name}')">${tProp.decline_btn}</button>
                  </div>` : `
                  <div style="margin-top:10px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                      <span style="font-size:11px; font-weight:600; color:#57ff85;">${tProp.in_team}</span>
                      <button class="btn btn-accent btn-sm" onclick="openChat('${pr.applicant_id}', '${pr.applicant_name}', '${pr.projects?.id}')">${tProp.open_chat_btn}</button>
                      <button class="btn btn-ghost btn-sm" onclick="openSharedNote('${pr.project_id}', '${pr.applicant_id}', '${pr.applicant_name}', '${pr.projects?.title || ''}')">📝 Nota${_pendingNoteForMe.has(pr.project_id + '_' + pr.applicant_id) ? '<span class=\'note-pending-badge\'></span>' : (_pendingNoteSentByMe.has(pr.project_id + '_' + pr.applicant_id) ? ' ⏳' : '')}</button>
                      <button class="btn btn-ghost btn-sm" style="color:var(--red); border-color:rgba(255,87,87,0.3);" onclick="updateProposalStatus('${pr.id}', 'terminated', 'Collaboratore rimosso')">${tProp.remove_btn}</button>
                  </div>`}
              </div>
          </div>
      `).join('');
  } else {
      propList.innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:10px;">${tProp.no_notifications}</div>`;
  }

const { data: sentProps } = await _supabase.from('proposals').select('*, projects(id, title, author_id, author_name)').eq('applicant_id', currentUser.id);
  const sentPropList = document.getElementById('sentProposalList');
  const tSent = i18n[currentLang];
  if(sentProps && sentProps.length > 0) {
      sentPropList.innerHTML = sentProps.map(pr => {
          const statusColors = { pending: 'var(--orange)', accepted: '#57ff85', declined: 'var(--red)', withdrawn: 'var(--text3)', terminated: 'var(--text3)' };
          const statusLabels = { pending: tSent.status_pending_label, accepted: tSent.status_accepted_label, declined: tSent.status_declined_label, withdrawn: tSent.status_withdrawn_label, terminated: tSent.status_terminated_label };
          const projId = pr.projects?.id;
          const ownerId = pr.projects?.author_id;
          const ownerName = pr.projects?.author_name || 'Autore';

          const onClickAttr = projId ? `onclick="openProjectById('${projId}')" style="cursor:pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'"` : '';

          let actionBtns = '';
          if (pr.status === 'pending') {
              actionBtns = `<button class="btn btn-ghost btn-sm" style="margin-top:8px; color:var(--red); border-color:rgba(255,87,87,0.3);" onclick="event.stopPropagation(); updateProposalStatus('${pr.id}', 'withdrawn', 'Candidatura ritirata')">${tSent.withdraw_btn}</button>`;
          } else if (pr.status === 'accepted' && ownerId) {
              const _noteBadge = projId ? (_pendingNoteForMe.has(projId + '_' + ownerId) ? '<span class="note-pending-badge"></span>' : (_pendingNoteSentByMe.has(projId + '_' + ownerId) ? ' ⏳' : '')) : '';
              const _noteBtn = projId ? `<button class="btn btn-ghost btn-sm" style="margin-top:8px;" onclick="event.stopPropagation(); openSharedNote('${projId}', '${ownerId}', '${ownerName}', '${pr.projects?.title || ''}')">📝 Nota${_noteBadge}</button>` : '';
              actionBtns = `
                <button class="btn btn-accent btn-sm" style="margin-top:8px;" onclick="event.stopPropagation(); openChat('${ownerId}', '${ownerName}', '${projId}')">${tSent.open_chat_btn}</button>
                ${_noteBtn}
                <button class="btn btn-ghost btn-sm" style="margin-top:8px; color:var(--red); border-color:rgba(255,87,87,0.3);" onclick="event.stopPropagation(); updateProposalStatus('${pr.id}', 'terminated', 'Collaborazione interrotta')">${tSent.stop_collab_btn}</button>
              `;
          }

          return `
          <div class="prop-item" ${onClickAttr}>
              <div style="flex:1">
                  <div class="prop-role" style="font-size:13px; color:var(--text);">${tSent.role_label} <strong>${sanitize(pr.role)}</strong></div>
                  <div style="font-size:11px; color:var(--text3); margin-top:2px;">${tSent.for_project} <strong style="color:var(--text2); text-decoration:underline;">${sanitize(pr.projects?.title || tSent.project_deleted)}</strong></div>
                  <div style="display:flex; align-items:center; gap:10px; margin-top:8px; flex-wrap:wrap;">
                      <div style="font-size:11px; font-weight:600; color:${statusColors[pr.status] || 'var(--text3)'}; display:inline-block; padding:3px 8px; background:rgba(255,255,255,0.05); border-radius:4px;">${tSent.status_label} ${statusLabels[pr.status] || pr.status}</div>
                      ${actionBtns}
                  </div>
              </div>
              ${projId ? `<div style="font-size:18px; color:var(--text3); align-self:center; padding-left:10px;">→</div>` : ''}
          </div>`;
      }).join('');
  } else {
      sentPropList.innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:10px;">${tSent.not_applied}</div>`;
  }

  const { data } = await _supabase.from('projects').select('*').eq('author_id', currentUser.id).order('created_at', {ascending: false});
  const userProjects = (data||[]).map(p => ({
    id: p.id, featured: false, title: p.title, author: p.author_name || name,
    initials: (p.author_name||name).split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
    color: getRoleColor(profileData?.primary_role) || getColorForString(p.author_name || name),
    date: new Date(p.created_at).toLocaleDateString('it-IT'), category: p.category, status: p.status, desc: p.description || '', tags: p.tags || [],
    views: p.views||0, proposals: p.proposals||0, likes: p.likes||0, collabs: [], isReal: true, author_id: p.author_id
  }));
  
  if (userProjects.length === 0) {
    document.getElementById('profileEmpty').style.display = 'block';
    document.getElementById('profileProjectsList').innerHTML = '';
  } else {
    document.getElementById('profileEmpty').style.display = 'none';
    renderProjects(userProjects, 'profileProjectsList');
  }

  if(likedProjectIds.length > 0) {
      // Query sicura che non richiede Foreign Keys complesse su Supabase
      const { data: savedProjs, error } = await _supabase.from('projects').select('*').in('id', likedProjectIds);
      
      if(savedProjs && savedProjs.length > 0) {
          const formatted = savedProjs.map(p => {
              return {
                  id: p.id, featured: false,
                  title: p.title, author: p.author_name || 'Anonimo', author_id: p.author_id,
                  initials: (p.author_name||'AN').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(), 
                  color: getColorForString(p.author_name||'AN'),
                  date: new Date(p.created_at).toLocaleDateString('it-IT'), status: p.status, 
                  desc: p.description || '', views: p.views||0, tags: p.tags||[], likes: p.likes||0, isReal: true
              };
          });
          renderProjects(formatted, 'dashSavedProjectsList');
      } else {
          document.getElementById('dashSavedProjectsList').innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px;">${i18n[currentLang].no_saved}</div>`;
      }
  } else {
      document.getElementById('dashSavedProjectsList').innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px;">${i18n[currentLang].no_saved}</div>`;
  }

  // NOTA CONDIVISA: Archivio note confermate
  const { data: _confirmedNotes } = await _supabase
    .from('shared_notes')
    .select('*, projects(title)')
    .eq('status', 'confirmed')
    .or(`author_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`)
    .order('confirmed_at', { ascending: false });
  const _archiveEl = document.getElementById('profileNotesArchive');
  if (_confirmedNotes && _confirmedNotes.length > 0) {
    const _otherIds = [...new Set(_confirmedNotes.map(n => n.author_id === currentUser.id ? n.receiver_id : n.author_id).filter(Boolean))];
    let _profilesMap = {};
    if (_otherIds.length > 0) {
      const { data: _otherProfiles } = await _supabase.from('profiles').select('id, full_name').in('id', _otherIds);
      if (_otherProfiles) _otherProfiles.forEach(p => { _profilesMap[p.id] = p.full_name; });
    }
    _archiveEl.innerHTML = _confirmedNotes.map(n => {
      const _otherId = n.author_id === currentUser.id ? n.receiver_id : n.author_id;
      const _otherName = sanitize(_profilesMap[_otherId] || 'Utente');
      const _projTitle = sanitize(n.projects?.title || 'Progetto eliminato');
      const _confDate = n.confirmed_at ? new Date(n.confirmed_at).toLocaleDateString('it-IT') : '—';
      return `<div class="shared-note-card confirmed" style="margin-bottom:14px;">
        <div style="font-size:11px;color:var(--text3);margin-bottom:8px;font-weight:500;">📋 ${_projTitle} · con ${_otherName}</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7;white-space:pre-wrap;">${sanitize(n.content)}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:8px;">Confermata il ${_confDate}</div>
        <p class="note-disclaimer">⚠️ Nota Bene: Questa "Nota Condivisa" è uno strumento per appuntare privatamente i dettagli della collaborazione. Crewtiv NON è parte di alcuna trattativa, non garantisce l'adempimento delle promesse e declina ogni responsabilità legale o finanziaria. Le dispute vanno risolte privatamente.</p>
      </div>`;
    }).join('');
  } else {
    _archiveEl.innerHTML = `<div style="color:var(--text3);font-size:13px;padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;">Nessun promemoria confermato ancora.</div>`;
  }
}

// ── NOTA CONDIVISA ─────────────────────────────────────────────────────────

function _showSnView(view) {
  ['snCreateView','snPendingAuthorView','snPendingReceiverView','snConfirmedView','snRejectedView']
    .forEach(id => document.getElementById(id).style.display = 'none');
  if (view) document.getElementById(view).style.display = 'block';
}

function _renderSnCard(note) {
  const date = new Date(note.created_at).toLocaleDateString('it-IT');
  return `<div style="font-size:13px;color:var(--text2);line-height:1.7;white-space:pre-wrap;">${sanitize(note.content)}</div>
    <div style="font-size:10px;color:var(--text3);margin-top:8px;">Creata il ${date}</div>`;
}

async function openSharedNote(projectId, otherId, otherName, projectTitle) {
  _snProjectId = projectId;
  _snOtherId = otherId;
  _snOtherName = otherName;
  _snProjectTitle = projectTitle;
  _snCurrentNote = null;

  document.getElementById('snModalTitle').textContent = 'Nota con ' + otherName;
  document.getElementById('snProjectInfo').textContent = projectTitle ? 'Progetto: ' + projectTitle : '';
  _showSnView(null);

  // Cerca nota attiva (pending o confirmed)
  const { data: active } = await _supabase.from('shared_notes').select('*')
    .eq('project_id', projectId)
    .or(`and(author_id.eq.${currentUser.id},receiver_id.eq.${otherId}),and(author_id.eq.${otherId},receiver_id.eq.${currentUser.id})`)
    .in('status', ['pending','confirmed'])
    .order('created_at', { ascending: false }).limit(1);

  let note = active && active.length > 0 ? active[0] : null;

  // Se non c'è nota attiva, cerca l'ultima rifiutata
  if (!note) {
    const { data: rejected } = await _supabase.from('shared_notes').select('*')
      .eq('project_id', projectId)
      .or(`and(author_id.eq.${currentUser.id},receiver_id.eq.${otherId}),and(author_id.eq.${otherId},receiver_id.eq.${currentUser.id})`)
      .eq('status', 'rejected')
      .order('created_at', { ascending: false }).limit(1);
    note = rejected && rejected.length > 0 ? rejected[0] : null;
  }

  _snCurrentNote = note;

  if (!note) {
    document.getElementById('snContent').value = '';
    _showSnView('snCreateView');
  } else if (note.status === 'pending') {
    if (note.author_id === currentUser.id) {
      document.getElementById('snPendingAuthorCard').innerHTML = _renderSnCard(note);
      _showSnView('snPendingAuthorView');
    } else {
      document.getElementById('snPendingReceiverCard').innerHTML = _renderSnCard(note);
      _showSnView('snPendingReceiverView');
    }
  } else if (note.status === 'confirmed') {
    document.getElementById('snConfirmedCard').innerHTML = _renderSnCard(note);
    _showSnView('snConfirmedView');
  } else if (note.status === 'rejected') {
    document.getElementById('snRejectedCard').innerHTML = _renderSnCard(note);
    _showSnView('snRejectedView');
  }

  const modal = document.getElementById('sharedNoteModal');
  modal.classList.add('open');
  trapFocus(modal);
}

async function submitSharedNote() {
  const content = document.getElementById('snContent').value.trim();
  if (!content) return showToast('⚠️ Scrivi qualcosa prima di inviare');
  if (!_snProjectId || !_snOtherId) return;
  const { error } = await _supabase.from('shared_notes').insert({
    project_id: _snProjectId, author_id: currentUser.id,
    receiver_id: _snOtherId, content: content, status: 'pending'
  });
  if (error) return showToast('❌ Errore durante l\'invio');
  showToast('📝 Promemoria inviato!');
  closeModal('sharedNoteModal');
  loadUserProfile();
}

async function confirmNote() {
  if (!_snCurrentNote) return;
  const { error } = await _supabase.from('shared_notes')
    .update({ status: 'confirmed', confirmed_at: new Date().toISOString() })
    .eq('id', _snCurrentNote.id);
  if (error) return showToast('❌ Errore durante la conferma');
  showToast('✅ Promemoria confermato!');
  closeModal('sharedNoteModal');
  loadUserProfile();
}

async function rejectNote() {
  if (!_snCurrentNote) return;
  const { error } = await _supabase.from('shared_notes')
    .update({ status: 'rejected' })
    .eq('id', _snCurrentNote.id);
  if (error) return showToast('❌ Errore durante il rifiuto');
  showToast('Nota rifiutata.');
  closeModal('sharedNoteModal');
  loadUserProfile();
}

function resetSharedNoteToCreate() {
  document.getElementById('snContent').value = '';
  _showSnView('snCreateView');
}

// ───────────────────────────────────────────────────────────────────────────

async function respondProposal(proposalId, newStatus, name) {
  const { error } = await _supabase.from('proposals').update({ status: newStatus }).eq('id', proposalId);
  if(error) return showToast('Errore durante la risposta');
  showToast(newStatus === 'accepted' ? `✅ ${name} accettato!` : `❌ Proposta rifiutata.`);
  fetchNotifications(); 
  loadUserProfile(); 
}

async function updateProposalStatus(proposalId, newStatus, successMsg) {
  if(!confirm('Sei sicuro di voler procedere con questa azione?')) return;
  const { error } = await _supabase.from('proposals').update({ status: newStatus }).eq('id', proposalId);
  if(error) return showToast('❌ Errore durante l\'aggiornamento');
  showToast(`✅ ${successMsg}`);
  loadUserProfile();
}

function openEditProject(id) {
  const p = realProjects.find(p=> String(p.id) === String(id));
  if (!p) return;
  editingProjectId = id;
  document.getElementById('editProjectTitle').textContent = p.title;
  document.getElementById('eTitle').value = p.title;
  document.getElementById('eStatus').value = p.status;
  document.getElementById('eDesc').value = p.desc;
  document.getElementById('eTags').value = p.tags.join(', ');
  document.getElementById('eImage').value = p.cover_image || '';
  const epModal = document.getElementById('editProjectModal');
epModal.classList.add('open');
trapFocus(epModal);
}

async function submitEditProject() {
  if (!editingProjectId) return;
  if (!currentUser) { showToast('❌ Devi essere loggato.'); return; }
  const projectToEdit = realProjects.find(p => String(p.id) === String(editingProjectId));
  if (!projectToEdit || projectToEdit.author_id !== currentUser.id) { showToast('❌ Non sei il proprietario di questo progetto.'); return; }
  const title = document.getElementById('eTitle').value.trim();
  const status = document.getElementById('eStatus').value;
  const desc = document.getElementById('eDesc').value;
  const tags = document.getElementById('eTags').value.split(',').map(t=>t.trim()).filter(Boolean);
  const cover_image = document.getElementById('eImage').value.trim() || null;
  const btn = document.querySelector('#editProjectModal .btn-accent');
  btn.disabled = true; btn.textContent = 'Salvataggio…';

  const { error } = await _supabase.from('projects').update({ title, status, description: desc, tags, cover_image }).eq('id', editingProjectId);

  btn.disabled = false; btn.textContent = 'Salva modifiche ✦';
  if (error) { showToast('❌ Errore: ' + error.message); return; }

  closeModal('editProjectModal');
  showToast('✅ Progetto aggiornato!');

  const idx = realProjects.findIndex(x => String(x.id) === String(editingProjectId));
  if (idx !== -1) {
    if(title) realProjects[idx].title = title;
    realProjects[idx].status = status;
    realProjects[idx].desc = desc;
    realProjects[idx].tags = tags;
    realProjects[idx].cover_image = cover_image;
  }
  
  if(document.getElementById('page-profile').classList.contains('active')) {
      loadUserProfile();
  } else {
      renderProjects(realProjects, 'realProjectsList');
  }
}

async function openEditProfile() {
  if (!currentUser) return;
  const btn = document.getElementById('editProfileBtn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Caricamento…'; }
  const { data } = await _supabase.from('profiles').select('*').eq('id', currentUser.id).single();
  if (data) {
    document.getElementById('epTitle').value = data.title || '';
    document.getElementById('epBio').value = data.bio || '';
    document.getElementById('epSkills').value = (data.skills||[]).join(', ');
    document.getElementById('epPrimaryRole').value = data.primary_role || '';
    const secRoles = data.secondary_roles || [];
    document.getElementById('epSecRole1').value = secRoles[0] || '';
    document.getElementById('epSecRole2').value = secRoles[1] || '';
    const sl = data.social_links || {};
    document.getElementById('epLinkedIn').value = sl.linkedin || '';
    document.getElementById('epGitHub').value = sl.github || '';
    document.getElementById('epBehance').value = sl.behance || '';
    document.getElementById('epPortfolio').value = sl.portfolio || '';
  }
  if (btn) { btn.disabled = false; btn.textContent = '✏️ Modifica Profilo'; }
  const eprModal = document.getElementById('editProfileModal');
eprModal.classList.add('open');
trapFocus(eprModal);
}

async function submitEditProfile() {
  if (!currentUser) return;
  const title = document.getElementById('epTitle').value.trim();
  const bio = document.getElementById('epBio').value.trim();
  const skills = document.getElementById('epSkills').value.split(',').map(s=>s.trim()).filter(Boolean);
  
  const primaryRole = document.getElementById('epPrimaryRole').value;
  if (!primaryRole) { showToast('⚠️ Seleziona un ruolo primario'); return; }
  
  const secondaryRoles = [
    document.getElementById('epSecRole1').value,
    document.getElementById('epSecRole2').value
  ].filter(Boolean);

  const social_links = {
    linkedin: document.getElementById('epLinkedIn').value.trim(),
    github: document.getElementById('epGitHub').value.trim(),
    behance: document.getElementById('epBehance').value.trim(),
    portfolio: document.getElementById('epPortfolio').value.trim()
  };
  
  // Peschiamo il nome dall'account di registrazione
  const fullName = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
  
  const btn = document.querySelector('#editProfileModal .btn-accent');
  btn.disabled = true; btn.textContent = 'Salvataggio…';
  
  // Salviamo anche il nome nella bacheca pubblica e i ruoli per il DNA visivo
  const { error } = await _supabase.from('profiles').upsert({
    id: currentUser.id,
    title,
    bio,
    skills,
    full_name: fullName,
    primary_role: primaryRole,
    secondary_roles: secondaryRoles,
    social_links
  }, { onConflict: 'id' });
  btn.disabled = false; btn.textContent = 'Salva profilo ✦';
  if (error) { showToast('❌ Errore: ' + error.message); return; }
  closeModal('editProfileModal');
  showToast('✅ Profilo aggiornato!');
  await loadUserProfile();
}

// FASE 6: Chiusura modale e pulizia URL Hash
function trapFocus(modalEl) {
  // Rimuove il listener precedente prima di aggiungerne uno nuovo (evita accumulo)
  if (modalEl._trapFocusHandler) {
    modalEl.removeEventListener('keydown', modalEl._trapFocusHandler);
  }
  const focusable = modalEl.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  modalEl._trapFocusHandler = handler;
  modalEl.addEventListener('keydown', handler);
  if (first) first.focus();
}

function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('open');
  if (el._trapFocusHandler) {
    el.removeEventListener('keydown', el._trapFocusHandler);
    el._trapFocusHandler = null;
  }
  if (id === 'projectModal') {
    window.history.pushState(null, '', window.location.pathname);
    resetMetaTags();
  }
}
function closeIfBg(e,id) { if(e.target===document.getElementById(id)) closeModal(id); }

  // ── FUNZIONE PONTE PER LA CHAT ──────────────────────────────────────────
let currentChatUserId = null;
let currentChatProjectId = null;
let currentChatUserName = null;

function openChat(otherUserId, otherUserName, projectId) {
  currentChatUserId = otherUserId;
  currentChatUserName = otherUserName;
  currentChatProjectId = projectId;
  
  // Cambia pagina per andare ai messaggi
  showPage('messages');
  showToast('Caricamento chat con ' + otherUserName + '...');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
}

// ── AUTH & NOTIFICHE ──────────────────────────────────────────

function openAuth(mode) {
  authMode = mode || 'login';
  switchTab(authMode);
  const authModal = document.getElementById('authOverlay');
authModal.classList.add('open');
trapFocus(authModal);
  setTimeout(() => document.getElementById('authEmail').focus(), 100);
}
function closeAuth() {
  const el = document.getElementById('authOverlay');
  el.classList.remove('open');
  if (el._trapFocusHandler) {
    el.removeEventListener('keydown', el._trapFocusHandler);
    el._trapFocusHandler = null;
  }
}
function closeAuthIfBg(e) { if (e.target === document.getElementById('authOverlay')) closeAuth(); }

function switchTab(tab) {
  authMode = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('authName').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('authSubmitBtn').textContent = tab === 'login' ? 'Accedi' : 'Crea account';
  document.getElementById('authSubtitle').textContent = tab === 'login' ? 'Bentornato su Crewtiv!' : 'Crea il tuo account gratuito';
  document.getElementById('authError').textContent = '';
  const forgotLink = document.getElementById('forgotPasswordLink');
  if (forgotLink) forgotLink.style.display = tab === 'login' ? 'block' : 'none';
  const betaWrap = document.getElementById('betaCheckWrapper');
  if (betaWrap) {
    if (tab === 'register') {
      betaWrap.style.display = 'block';
      document.getElementById('betaAcceptCheck').checked = false;
      document.getElementById('authSubmitBtn').disabled = true;
    } else {
      betaWrap.style.display = 'none';
      document.getElementById('authSubmitBtn').disabled = false;
    }
  }
}

function toggleBetaCheck() {
  const checked = document.getElementById('betaAcceptCheck').checked;
  document.getElementById('authSubmitBtn').disabled = !checked;
}

async function resetPassword() {
  const email = document.getElementById('authEmail').value.trim();
  if (!email) {
    document.getElementById('authError').textContent = 'Inserisci la tua email per recuperare la password.';
    return;
  }
  const { error } = await _supabase.auth.resetPasswordForEmail(email);
  if (error) {
    document.getElementById('authError').textContent = error.message;
    return;
  }
  document.getElementById('authError').textContent = '';
  showToast('✅ Email di recupero inviata! Controlla la tua casella.');
}

async function deleteAccount() {
  if (!currentUser) return;
  const section = document.getElementById('deleteAccountSection');
  if (!section) return;
  // Mostra conferma inline
  section.innerHTML = `
    <div style="padding:12px;background:rgba(255,87,87,0.08);border:1px solid rgba(255,87,87,0.2);border-radius:10px;">
      <div style="font-size:13px;color:var(--text2);margin-bottom:10px;">⚠️ Sei sicuro? Questa azione è <strong style="color:var(--red)">irreversibile</strong>. Tutti i tuoi dati verranno eliminati.</div>
      <div style="display:flex;gap:8px;">
        <button id="confirmDeleteBtn" onclick="confirmDeleteAccount()" style="font-size:12px;padding:5px 12px;border-radius:6px;background:var(--red);border:none;color:#fff;cursor:pointer;font-family:'Instrument Sans',sans-serif;font-weight:600;">Conferma eliminazione</button>
        <button onclick="resetDeleteSection()" style="font-size:12px;padding:5px 12px;border-radius:6px;background:transparent;border:1px solid var(--border2);color:var(--text2);cursor:pointer;font-family:'Instrument Sans',sans-serif;">Annulla</button>
      </div>
    </div>
  `;
}

function resetDeleteSection() {
  const section = document.getElementById('deleteAccountSection');
  if (section) section.innerHTML = `<a href="#" onclick="deleteAccount(); return false;" style="font-size:12px; color:var(--red); opacity:0.5; text-decoration:none;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">Elimina account</a>`;
}

async function confirmDeleteAccount() {
  if (!currentUser) return;
  const btn = document.getElementById('confirmDeleteBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Eliminazione…'; }

  const uid = currentUser.id;
  // Elimina dati dalle tabelle pubbliche
  await _supabase.from('reviews').delete().or(`reviewer_id.eq.${uid},reviewee_id.eq.${uid}`);
  await _supabase.from('proposals').delete().or(`applicant_id.eq.${uid},owner_id.eq.${uid}`);
  await _supabase.from('saved_projects').delete().eq('user_id', uid);
  await _supabase.from('projects').delete().eq('author_id', uid);
  await _supabase.from('profiles').delete().eq('id', uid);

  // Elimina utente da auth.users tramite funzione server-side
  const { error } = await _supabase.rpc('delete_user');
  if (error) { showToast('❌ Errore: ' + error.message); resetDeleteSection(); return; }

  await _supabase.auth.signOut();
  closeModal('editProfileModal');
  showToast('✅ Account eliminato.');
}

async function submitAuth() {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const name = document.getElementById('authName').value.trim();
  const btn = document.getElementById('authSubmitBtn');
  const errEl = document.getElementById('authError');
  errEl.textContent = '';
  if (!email || !password) { errEl.textContent = 'Inserisci email e password.'; return; }
  btn.disabled = true;
  btn.textContent = authMode === 'login' ? 'Accesso…' : 'Registrazione…';
  try {
    if (authMode === 'login') {
      const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onLogin(data.user, true); // <--- Aggiunto flag true
    } else {
      if (!name) { errEl.textContent = 'Inserisci il tuo nome.'; btn.disabled = false; btn.textContent = 'Crea account'; return; }
      if (!document.getElementById('betaAcceptCheck').checked) { errEl.textContent = '⚠️ Devi accettare la dichiarazione Beta per procedere.'; btn.disabled = false; btn.textContent = 'Crea account'; return; }
      const { data, error } = await _supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) throw error;
      if (data.user && !data.session) {
        document.getElementById('authSubtitle').innerHTML = '<span style="color:var(--accent)">✅ Registrazione completata!</span>';
        errEl.innerHTML = '<div style="background:rgba(200,255,87,0.1); border:1px solid rgba(200,255,87,0.3); color:var(--text); padding:16px; border-radius:10px; font-size:13px; margin-top:8px; line-height:1.6;">Ti abbiamo inviato un link di conferma.<br><strong>Controlla la tua email (anche nello spam)</strong> per attivare l\'account.</div>';
        btn.style.display = 'none'; 
        document.querySelectorAll('.auth-input').forEach(el => el.style.display = 'none');
        document.getElementById('authNote').style.display = 'none';
        return;
      }
      onLogin(data.user, true); // <--- Aggiunto flag true
    }
  } catch(err) {
    errEl.style.color = 'var(--red)';
    errEl.textContent = err.message === 'Invalid login credentials' ? 'Email o password errati.' : err.message;
    btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Accedi' : 'Crea account';
  }
}

function onLogin(user, isNewLogin = false) {
  currentUser = user;
  closeAuth();
  fetchLikedProjects().then(() => {
    // Dopo aver caricato i dati essenziali, ricarica l'ultima pagina visitata
    showPage(localStorage.getItem('crewtiv_lastPage') || 'home');
    applyFilters();
  });
  updateNavForUser(user);
  subscribeToNotifications();
  if (isNewLogin) showToast('✅ Benvenuto su Crewtiv!');
}

async function updateNavForUser(user) {
  const navRight = document.getElementById('navRight');
  if (user) {
    const name = user.user_metadata?.full_name || user.email.split('@')[0];
    const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    
    // Partiamo dal colore base
    let userColor = 'var(--accent)'; 

    try {
      // Peschiamo il ruolo primario PRIMA di disegnare la barra
      const { data } = await _supabase.from('profiles').select('primary_role').eq('id', user.id).maybeSingle();
      if (data && data.primary_role) {
        userColor = getRoleColor(data.primary_role) || getColorForString(name);
      }
    } catch (e) {
      // Se c'è un errore di connessione, usiamo comunque il colore base
    }

    // Disegniamo la barra iniettando direttamente il colore corretto nell'HTML
    navRight.innerHTML = `
      <button class="btn btn-accent btn-sm" onclick="openNewProject()">+ Nuovo Progetto</button>
      <div style="position:relative; cursor:pointer;" onclick="showPage('profile')">
        <div id="navAvatar" class="avatar" style="width:32px;height:32px;border-radius:9px;font-size:12px;background:${userColor};color:#0a0a0f">${initials}</div>
        <div id="navBadge" class="nav-badge" style="display:none;">0</div>
      </div>
    `;
    fetchNotifications();
  } else {
    navRight.innerHTML = `
      <button class="btn btn-ghost btn-sm" onclick="openAuth('login')">Accedi</button>
      <button class="btn btn-accent btn-sm" onclick="openAuth('register')">Registrati</button>
    `;
  }
}

async function fetchNotifications() {
  if(!currentUser) return;
  const { count, error } = await _supabase.from('proposals')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', currentUser.id)
      .eq('status', 'pending');
      
  const badge = document.getElementById('navBadge');
  if(badge) {
      if(count > 0) { badge.textContent = count; badge.style.display = 'flex'; } 
      else { badge.style.display = 'none'; }
  }
}

function subscribeToNotifications() {
  if (!currentUser) return;
  if (notificationSubscription) {
    _supabase.removeChannel(notificationSubscription);
    notificationSubscription = null;
  }
  notificationSubscription = _supabase
    .channel('notifications-' + currentUser.id)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'proposals',
      filter: `owner_id=eq.${currentUser.id}`
    }, () => fetchNotifications())
    .subscribe();
}

async function logout() {
  await _supabase.auth.signOut();
  if (notificationSubscription) {
    _supabase.removeChannel(notificationSubscription);
    notificationSubscription = null;
  }
  currentUser = null;
  likedProjectIds = [];
  updateNavForUser(null);
  showToast('Hai effettuato il logout.');
  showPage('home');
  loadRealProjects();
}

const hashParams = new URLSearchParams(window.location.hash.substring(1));
const isEmailConfirmation = hashParams.get('type') === 'signup' || !!hashParams.get('access_token');

_supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    onLogin(session.user, isEmailConfirmation);
    if (isEmailConfirmation) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  } else {
    showPage(localStorage.getItem('crewtiv_lastPage') || 'home');
  }
});

// ── I18N ──────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'it';

const i18n = {
  it: {
    nav_home: 'Home', nav_messages: 'Messaggi', nav_profile: 'Profilo', nav_about: 'Chi siamo',
    nav_login: 'Accedi', nav_register: 'Registrati', nav_logout: 'Esci', nav_new: '+ Nuovo Progetto', nav_talents: 'Talenti',
    hero_eyebrow: 'La piattaforma per i creativi',
    hero_h1_1: 'Condividi la tua visione.', hero_h1_2: 'Trova chi la costruisce', hero_h1_3: 'insieme a te.',
    hero_sub: 'Dai videogiochi indie ai progetti architettonici. Ogni progetto è tuo — registrato con data e autore su Crewtiv. Apri le porte ai collaboratori giusti.',
    hero_cta1: 'Pubblica un progetto ✦', hero_cta2: 'Esplora i progetti',
    stat1: 'Progetti pubblicati', stat2: 'Creativi attivi', stat3: 'Proposte accettate', stat4: 'Categorie',
    search_placeholder: 'Cerca progetti, tecnologie, categorie…', search_btn: 'Cerca',
    filter_label: 'Filtra:', filter_all: 'Tutti',
    projects_title: 'Ultimi progetti',
    demo_banner: 'Questi sono <strong style="color:var(--text)">progetti di esempio</strong> — il sito è in beta.',
    demo_cta: 'Registrati per pubblicare il tuo →',
    how_title: '💡 Come funziona',
    how1_t: 'Pubblica il progetto', how1_d: 'Il tuo progetto viene registrato con data e nome. Prova di anteriorità sulla piattaforma.',
    how2_t: 'Ricevi proposte', how2_d: 'Gli interessati ti mandano richieste di collaborazione.',
    how3_t: 'Accetta o declina', how3_d: 'Scegli tu chi entra nel team.',
    how4_t: 'Costruite insieme', how4_d: 'Collaborazione trasparente, crediti condivisi.',
    how_btn: 'Pubblica ora ✦',
    trending_title: '🔥 In tendenza',
    beta_badge: '✦ Beta',
    beta_title: 'Sei tra i primi su Crewtiv ✦',
    beta_text: 'La piattaforma è appena nata. Per ora tutto è <strong>gratuito</strong> — esplora, pubblica, collabora.<br><br>Quando lanceremo ufficialmente ti avviseremo in anticipo sulle tariffe.',
    beta_btn: 'Entra nella beta →',
    auth_login_sub: 'Bentornato su Crewtiv!', auth_reg_sub: 'Crea il tuo account gratuito',
    auth_tab_login: 'Accedi', auth_tab_reg: 'Registrati',
    auth_email: 'Email', auth_password: 'Password', auth_name: 'Il tuo nome (es. Marco Ferretti)',
    auth_submit_login: 'Accedi', auth_submit_reg: 'Crea account',
    auth_note: 'Creando un account accetti la <a href="#" onclick="closeAuth(); showPage(\'privacy\')" style="color:var(--accent); text-decoration:none;">Privacy Policy</a>.',
    propose_title: 'PROPONI COLLABORAZIONE', propose_role: 'Il tuo ruolo', propose_role_ph: 'es. Dev backend, 3D artist, compositore…',
    propose_type: 'Tipo di collaborazione', propose_msg: 'Messaggio per il creatore', propose_msg_ph: 'Racconta cosa puoi portare al progetto…',
    propose_btn: 'Invia proposta →',
    propose_demo: '✦ Questo è un progetto di esempio. Registrati e pubblica il tuo per ricevere proposte reali!',
    propose_demo_btn: 'Registrati gratis →',
    new_proj_label: 'Nuovo progetto', new_proj_title: 'Pubblica il tuo progetto',
    new_proj_t: 'Titolo del progetto *', new_proj_t_ph: 'Un titolo chiaro e accattivante…',
    new_proj_cat: 'Categoria *', new_proj_status: 'Stato',
    new_proj_desc: 'Descrizione *', new_proj_desc_ph: 'Descrivi il tuo progetto — cosa stai costruendo, cosa ti ha ispirato, che collaboratori cerchi…',
    new_proj_tags: 'Tag', new_proj_tags_ph: 'Unity, C#, RPG, open-world…',
    new_proj_collab: 'Tipo di collaborazione', new_proj_btn: 'Pubblica e registra ✦',
    new_proj_note: '🔒 Data e autore vengono registrati automaticamente al momento della pubblicazione.',
    status_open: 'Aperto a collaborazioni', status_progress: 'In corso', status_closed: 'Chiuso', status_completed: 'Completato',
    sort_recent: 'Più recenti', sort_popular: 'Più popolari', sort_open: 'Cercano collaboratori',
    talents_title: 'Trova i collaboratori giusti', talents_subtitle: 'Esplora i talenti su Crewtiv e invitali nel tuo progetto.',
    edit_proj_label: 'Modifica progetto', edit_proj_t: 'Titolo del progetto', edit_proj_status: 'Stato', edit_proj_desc: 'Descrizione', edit_proj_btn: 'Salva modifiche ✦',
    edit_prof_label: 'Il tuo profilo', edit_prof_title: 'Modifica profilo', edit_prof_primary: 'Ruolo Primario *', edit_prof_prof_title: 'Titolo professionale', edit_prof_bio: 'Bio', edit_prof_btn: 'Salva profilo ✦',
    edit_prof_skills: 'Skills',
    stats_bar_1: 'Pubblica il tuo progetto.', stats_bar_2: 'Trova il tuo team.', stats_bar_3: 'Costruisci qualcosa di grande.',
    load_more: 'Carica altri ↓', loading: 'Caricamento...',
    collab_section: 'COLLABORATORI',
    talent_modal_label: 'Profilo Talento', talent_invite: 'Invita in un progetto ✦',
    kpi_projects: 'Progetti Creati', kpi_pending: 'In attesa', kpi_sent: 'Le tue Candidature',
    dash_sent_title: 'Le mie Candidature Inviate', dash_projects_title: 'I miei progetti pubblicati',
    dash_liked_title: '♥️ Progetti che ti piacciono', dash_requests_title: '🔔 Richieste di Collaborazione',
    profile_complete_text: '✦ <strong style="color:var(--text)">Completa il tuo profilo</strong> — aggiungi bio e skills per farti notare dai creatori!',
    profile_complete_btn: 'Completa ora →', edit_profile_btn: '✏️ Modifica Profilo', logout_btn: "Esci dall'account",
    profile_bio_default: 'Accedi per vedere il tuo profilo.',
    conversations_title: 'Conversazioni', chat_placeholder: 'Scrivi un messaggio…', chat_send: 'Invia ↑',
    no_chat_selected: 'Seleziona una conversazione per iniziare a messaggiare',
    no_projects_found: 'Nessun progetto trovato.', no_projects_show: 'Nessun progetto da mostrare.',
    featured_label: '✦ In evidenza', like_btn: '♡ Mi piace', liked_btn: '♥️ Piace',
    propose_card_btn: 'Proponi →', team_full: 'Team al completo', edit_btn: 'Modifica', delete_btn: 'Elimina',
    no_chat_active: 'Nessuna chat attiva',
    no_chat_sub: 'Le conversazioni appariranno qui quando una tua proposta verrà accettata o quando accetterai un collaboratore.',
    project_prefix: 'Progetto:', no_notifications: 'Nessuna notifica al momento.',
    not_applied: 'Non ti sei ancora candidato a nessun progetto.',
    no_saved: 'Non hai ancora salvato nessun progetto.',
    status_pending_label: 'In attesa', status_accepted_label: 'Accettata', status_declined_label: 'Rifiutata',
    status_withdrawn_label: 'Ritirata', status_terminated_label: 'Interrotta',
    role_label: 'Ruolo:', for_project: 'per il progetto', status_label: 'Stato:',
    in_team: '✓ Nel team', accept_btn: '✓ Accetta', decline_btn: '✕ Rifiuta',
    open_chat_btn: '💬 Apri Chat', remove_btn: 'Rimuovi', withdraw_btn: 'Ritira', stop_collab_btn: 'Interrompi',
    project_deleted: 'Progetto eliminato', loading_team: 'Caricamento team...', loading_talents: 'Caricamento talenti...',
    loading_conversations: 'Caricamento conversazioni...', demo_projects_meta: 'progetti di esempio',
    edit_cat_note: 'ℹ️ La categoria non è modificabile — fa parte della registrazione originale.',
    new_proj_modal_label: 'Nuovo progetto', new_proj_modal_title: 'Pubblica il tuo progetto',
    propose_opt1: 'Volontaria', propose_opt2: 'Retribuita — da discutere',
    collab_opt1: 'Volontaria', collab_opt2: 'Retribuita', collab_opt3: 'Entrambe accettate',
    proj_no_proposals: 'Questo progetto non accetta più proposte.',
    about_eyebrow: 'Chi siamo',
    about_title: 'Ogni progetto creativo merita di trovare le persone giuste.',
    about_p1: "Crewtiv nasce da un'idea semplice: ogni progetto creativo merita di trovare le persone giuste per prendere vita.",
    about_p2: 'Siamo una piattaforma dove artisti, sviluppatori, architetti, musicisti e creativi di ogni tipo possono pubblicare le loro idee, registrarle con data e autore e trovare collaboratori che condividono la stessa visione.',
    about_p3: 'Ogni progetto pubblicato su Crewtiv è tuo — registrato con data e autore. Perché le idee hanno un valore, e chi le ha avute merita il riconoscimento.',
    about_p4: 'Siamo appena nati. Stiamo costruendo qualcosa di grande, un progetto alla volta.',
    about_contact: 'Contatti',
    cat_game: '🎮 Videogiochi', cat_arch: '🏛 Architettura', cat_app: '📱 App',
    cat_art: '🎨 Arte & Design', cat_music: '🎵 Musica', cat_science: '🔬 Scienza',
    cat_film: '🎬 Film', cat_hardware: '🔧 Hardware', cat_other: '✦ Altro',
    no_talents_found: 'Nessun talento corrisponde alla ricerca.',
    no_bio: 'Nessuna bio inserita.',
    talent_coming_soon: 'Funzionalità in arrivo! Presto potrai inviare messaggi diretti ai talenti.',
    talent_login_to_contact: 'Accedi per contattare',
    talents_demo_text: 'Questi sono <strong style="color:var(--text)">profili di esempio</strong>.',
    talents_demo_cta: 'Registrati per creare il tuo →',
    tos_nav: 'Termini di Servizio',
    tos_title: 'Termini di Servizio e Regolamento',
    similarity_title: 'Idea simile rilevata!',
    similarity_msg: "Abbiamo trovato un progetto molto simile al tuo. Prima di procedere, che ne dici di dare un'occhiata e magari collaborare con l'autore originale?",
    btn_view_existing: 'Vedi Progetto Esistente',
    btn_proceed_anyway: 'Procedi comunque',
    warning_final_title: '⚠️ AVVISO FINALE',
    warning_final_msg: 'Attenzione: pubblicando un duplicato ti esponi a segnalazioni per plagio. Se il progetto verrà giudicato non originale, potrà essere rimosso definitivamente dal sistema senza preavviso. Confermi?',
    btn_final_confirm: 'Sì, pubblica ora',
    sim_attention_label: '⚠️ Attenzione',
    sim_found_label: 'Progetto simile trovato',
    warn_label: 'Avviso',
    btn_cancel: 'Annulla',
    gate_project_msg: 'Registrati per sbloccare i dettagli, i collaboratori e il Codice Hash che certifica la tua idea.',
    gate_talent_msg: 'Registrati per vedere il profilo completo e contattare questo creativo.',
    beta_check_label: 'Ho letto e accetto che Crewtiv è in versione Beta. Comprendo che il servizio è sperimentale e potrebbe subire modifiche o interruzioni.',
    legal_check_label: 'Capisco che pubblicare su Crewtiv registra la mia idea con data e nome tramite un Codice Hash. Questo non è una tutela legale, ma una prova di anteriorità. Per protezione reale devo rivolgermi a un professionista.',
    legal_check_toast: '⚠️ Spunta la casella legale prima di pubblicare.',
  },
  en: {
    nav_home: 'Home', nav_messages: 'Messages', nav_profile: 'Profile', nav_about: 'About',
    nav_login: 'Sign in', nav_register: 'Sign up', nav_logout: 'Sign out', nav_new: '+ New Project', nav_talents: 'Talents',
    hero_eyebrow: 'The platform for creatives',
    hero_h1_1: 'Share your vision.', hero_h1_2: 'Find who builds it', hero_h1_3: 'with you.',
    hero_sub: 'From indie games to architectural projects. Every project is yours — registered with date and author on Crewtiv. Open the doors to the right collaborators.',
    hero_cta1: 'Publish a project ✦', hero_cta2: 'Explore projects',
    stat1: 'Published projects', stat2: 'Active creatives', stat3: 'Accepted proposals', stat4: 'Categories',
    search_placeholder: 'Search projects, technologies, categories…', search_btn: 'Search',
    filter_label: 'Filter:', filter_all: 'All',
    projects_title: 'Latest projects',
    demo_banner: 'These are <strong style="color:var(--text)">example projects</strong> — the site is in beta.',
    demo_cta: 'Sign up to publish yours →',
    how_title: '💡 How it works',
    how1_t: 'Publish your project', how1_d: 'Your project is registered with date and name on Crewtiv. Proof of prior art on the platform.',
    how2_t: 'Receive proposals', how2_d: 'Interested people send you collaboration requests.',
    how3_t: 'Accept or decline', how3_d: 'You choose who joins the team.',
    how4_t: 'Build together', how4_d: 'Transparent collaboration, shared credits.',
    how_btn: 'Publish now ✦',
    trending_title: '🔥 Trending',
    beta_badge: '✦ Beta',
    beta_title: "You're among the first on Crewtiv ✦",
    beta_text: "The platform just launched. For now everything is <strong>free</strong> — explore, publish, collaborate.<br><br>When we officially launch, we'll let you know about pricing in advance.",
    beta_btn: 'Enter the beta →',
    auth_login_sub: 'Welcome back to Crewtiv!', auth_reg_sub: 'Create your free account',
    auth_tab_login: 'Sign in', auth_tab_reg: 'Sign up',
    auth_email: 'Email', auth_password: 'Password', auth_name: 'Your name (e.g. Marco Ferretti)',
    auth_submit_login: 'Sign in', auth_submit_reg: 'Create account',
    auth_note: 'By creating an account you agree to the <a href="#" onclick="closeAuth(); showPage(\'privacy\')" style="color:var(--accent); text-decoration:none;">Privacy Policy</a>.',
    propose_title: 'PROPOSE COLLABORATION', propose_role: 'Your role', propose_role_ph: 'e.g. Backend dev, 3D artist, composer…',
    propose_type: 'Collaboration type', propose_msg: 'Message to the creator', propose_msg_ph: 'Tell them what you can bring to the project…',
    propose_btn: 'Send proposal →',
    propose_demo: '✦ This is an example project. Sign up and publish yours to receive real proposals!',
    propose_demo_btn: 'Sign up for free →',
    new_proj_label: 'New project', new_proj_title: 'Publish your project',
    new_proj_t: 'Project title *', new_proj_t_ph: 'A clear and catchy title…',
    new_proj_cat: 'Category *', new_proj_status: 'Status',
    new_proj_desc: 'Description *', new_proj_desc_ph: 'Describe your project — what you\'re building, what inspired you, what collaborators you\'re looking for…',
    new_proj_tags: 'Tags', new_proj_tags_ph: 'Unity, C#, RPG, open-world…',
    new_proj_collab: 'Collaboration type', new_proj_btn: 'Publish & register ✦',
    new_proj_note: '🔒 Date and author are automatically registered at the time of publication.',
    status_open: 'Open to collaborations', status_progress: 'In progress', status_closed: 'Closed', status_completed: 'Completed',
    sort_recent: 'Most recent', sort_popular: 'Most popular', sort_open: 'Looking for collaborators',
    talents_title: 'Find the right collaborators', talents_subtitle: 'Explore talents on Crewtiv and invite them to your project.',
    edit_proj_label: 'Edit project', edit_proj_t: 'Project title', edit_proj_status: 'Status', edit_proj_desc: 'Description', edit_proj_btn: 'Save changes ✦',
    edit_prof_label: 'Your profile', edit_prof_title: 'Edit profile', edit_prof_primary: 'Primary Role *', edit_prof_prof_title: 'Professional title', edit_prof_bio: 'Bio', edit_prof_btn: 'Save profile ✦',
    edit_prof_skills: 'Skills',
    stats_bar_1: 'Publish your project.', stats_bar_2: 'Find your team.', stats_bar_3: 'Build something great.',
    load_more: 'Load more ↓', loading: 'Loading...',
    collab_section: 'COLLABORATORS',
    talent_modal_label: 'Talent Profile', talent_invite: 'Invite to a project ✦',
    kpi_projects: 'Projects Created', kpi_pending: 'Pending', kpi_sent: 'Your Applications',
    dash_sent_title: 'My Sent Applications', dash_projects_title: 'My Published Projects',
    dash_liked_title: '♥️ Projects you like', dash_requests_title: '🔔 Collaboration Requests',
    profile_complete_text: '✦ <strong style="color:var(--text)">Complete your profile</strong> — add bio and skills to get noticed by creators!',
    profile_complete_btn: 'Complete now →', edit_profile_btn: '✏️ Edit Profile', logout_btn: 'Sign out',
    profile_bio_default: 'Sign in to see your profile.',
    conversations_title: 'Conversations', chat_placeholder: 'Write a message…', chat_send: 'Send ↑',
    no_chat_selected: 'Select a conversation to start messaging',
    no_projects_found: 'No projects found.', no_projects_show: 'No projects to show.',
    featured_label: '✦ Featured', like_btn: '♡ Like', liked_btn: '♥️ Liked',
    propose_card_btn: 'Apply →', team_full: 'Team complete', edit_btn: 'Edit', delete_btn: 'Delete',
    no_chat_active: 'No active chats',
    no_chat_sub: 'Conversations will appear here when one of your proposals is accepted or when you accept a collaborator.',
    project_prefix: 'Project:', no_notifications: 'No notifications at the moment.',
    not_applied: "You haven't applied to any projects yet.",
    no_saved: "You haven't saved any projects yet.",
    status_pending_label: 'Pending', status_accepted_label: 'Accepted', status_declined_label: 'Declined',
    status_withdrawn_label: 'Withdrawn', status_terminated_label: 'Ended',
    role_label: 'Role:', for_project: 'for project', status_label: 'Status:',
    in_team: '✓ In the team', accept_btn: '✓ Accept', decline_btn: '✕ Decline',
    open_chat_btn: '💬 Open Chat', remove_btn: 'Remove', withdraw_btn: 'Withdraw', stop_collab_btn: 'End',
    project_deleted: 'Deleted project', loading_team: 'Loading team...', loading_talents: 'Loading talents...',
    loading_conversations: 'Loading conversations...', demo_projects_meta: 'example projects',
    edit_cat_note: "ℹ️ The category cannot be changed — it's part of the original registration.",
    new_proj_modal_label: 'New project', new_proj_modal_title: 'Publish your project',
    propose_opt1: 'Voluntary', propose_opt2: 'Paid — to discuss',
    collab_opt1: 'Voluntary', collab_opt2: 'Paid', collab_opt3: 'Both accepted',
    proj_no_proposals: 'This project is no longer accepting proposals.',
    about_eyebrow: 'About us',
    about_title: 'Every creative project deserves to find the right people.',
    about_p1: 'Crewtiv was born from a simple idea: every creative project deserves to find the right people to come to life.',
    about_p2: 'We are a platform where artists, developers, architects, musicians and creatives of all kinds can publish their ideas, register them with date and author, and find collaborators who share the same vision.',
    about_p3: 'Every project published on Crewtiv is yours — registered with date and author. Because ideas have value, and those who had them deserve recognition.',
    about_p4: "We just launched. We're building something great, one project at a time.",
    about_contact: 'Contact',
    cat_game: '🎮 Games', cat_arch: '🏛 Architecture', cat_app: '📱 App',
    cat_art: '🎨 Art & Design', cat_music: '🎵 Music', cat_science: '🔬 Science',
    cat_film: '🎬 Film', cat_hardware: '🔧 Hardware', cat_other: '✦ Other',
    no_talents_found: 'No talents match your search.',
    no_bio: 'No bio added.',
    talent_coming_soon: 'Coming soon! You will be able to send direct messages to talents.',
    talent_login_to_contact: 'Sign in to contact',
    talents_demo_text: 'These are <strong style="color:var(--text)">example profiles</strong>.',
    talents_demo_cta: 'Sign up to create yours →',
    tos_nav: 'Terms of Service',
    tos_title: 'Terms of Service & Rules',
    similarity_title: 'Similar idea detected!',
    similarity_msg: 'We found a project very similar to yours. Before proceeding, how about taking a look and maybe collaborating with the original author?',
    btn_view_existing: 'View Existing Project',
    btn_proceed_anyway: 'Proceed anyway',
    warning_final_title: '⚠️ FINAL WARNING',
    warning_final_msg: 'Warning: by publishing a duplicate you expose yourself to plagiarism reports. If the project is judged non-original, it may be permanently removed from the system without notice. Confirm?',
    btn_final_confirm: 'Yes, publish now',
    sim_attention_label: '⚠️ Attention',
    sim_found_label: 'Similar project found',
    warn_label: 'Warning',
    btn_cancel: 'Cancel',
    gate_project_msg: 'Sign up to unlock project details, collaborators and the Hash Certificate that certifies your idea.',
    gate_talent_msg: 'Sign up to view the full profile and contact this creative.',
    beta_check_label: 'I have read and accept that Crewtiv is in Beta. I understand the service is experimental and may undergo changes or interruptions.',
    legal_check_label: 'I understand that publishing on Crewtiv registers my idea with date and name via a Hash Code. This is not legal protection, but proof of prior art. For real protection I must consult a professional.',
    legal_check_toast: '⚠️ Please check the legal disclaimer before publishing.',
  }
};

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.getElementById('langToggle').textContent = lang === 'it' ? 'EN' : 'IT';
  applyLang();
}

function applyLang() {
  const t = i18n[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) eyebrow.textContent = t.hero_eyebrow;
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) heroH1.innerHTML = `${t.hero_h1_1}<br><span class="line2">${t.hero_h1_2}</span><br><span class="highlight">${t.hero_h1_3}</span>`;
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.textContent = t.hero_sub;
  const heroCta1 = document.querySelector('.hero-actions .btn-accent');
  if (heroCta1) heroCta1.textContent = t.hero_cta1;
  const heroCta2 = document.querySelector('.hero-actions .btn-ghost');
  if (heroCta2) heroCta2.textContent = t.hero_cta2;
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.search_placeholder;
  document.querySelectorAll('.search-btn').forEach(btn => btn.textContent = t.search_btn);
  const catsLabel = document.querySelector('.cats-label');
  if (catsLabel) catsLabel.textContent = t.filter_label;
  const allPill = document.querySelector('.cat-pill');
  if (allPill) allPill.textContent = t.filter_all;
  const searchTalentInput = document.getElementById('searchTalentInput');
  if (searchTalentInput) searchTalentInput.placeholder = t.search_placeholder;
  const talentsTitle = document.getElementById('talentsTitle');
  if (talentsTitle) talentsTitle.textContent = t.talents_title;
  const talentsSubtitle = document.getElementById('talentsSubtitle');
  if (talentsSubtitle) talentsSubtitle.textContent = t.talents_subtitle;
  const projTitle = document.querySelector('.projects-title');
  if (projTitle) projTitle.textContent = t.projects_title;
  const demoBanner = document.getElementById('demoBannerText');
  if (demoBanner) demoBanner.innerHTML = t.demo_banner;
  const demoCta = document.getElementById('demoBannerCta');
  if (demoCta) demoCta.textContent = t.demo_cta;
  const betaBadge = document.querySelector('.beta-badge');
  if (betaBadge) betaBadge.textContent = t.beta_badge;
  const betaTitle = document.querySelector('.beta-title');
  if (betaTitle) betaTitle.textContent = t.beta_title;
  const betaText = document.querySelector('.beta-text');
  if (betaText) betaText.innerHTML = t.beta_text;
  const betaBtn = document.querySelector('.beta-btn');
  if (betaBtn) betaBtn.textContent = t.beta_btn;
  const proposeTitle = document.querySelector('[data-i18n-propose-title]');
  if (proposeTitle) proposeTitle.textContent = t.propose_title;
  document.getElementById('authSubtitle').textContent = authMode === 'login' ? t.auth_login_sub : t.auth_reg_sub;
  document.getElementById('tabLogin').textContent = t.auth_tab_login;
  document.getElementById('tabRegister').textContent = t.auth_tab_reg;
  document.getElementById('authEmail').placeholder = t.auth_email;
  document.getElementById('authPassword').placeholder = t.auth_password;
  document.getElementById('authName').placeholder = t.auth_name;
  document.getElementById('authSubmitBtn').textContent = authMode === 'login' ? t.auth_submit_login : t.auth_submit_reg;
  document.getElementById('authNote').innerHTML = t.auth_note;
  const howSteps = document.querySelectorAll('.hstep .htext');
  if (howSteps[0]) howSteps[0].innerHTML = `<strong>${t.how1_t}</strong><span>${t.how1_d}</span>`;
  if (howSteps[1]) howSteps[1].innerHTML = `<strong>${t.how2_t}</strong><span>${t.how2_d}</span>`;
  if (howSteps[2]) howSteps[2].innerHTML = `<strong>${t.how3_t}</strong><span>${t.how3_d}</span>`;
  if (howSteps[3]) howSteps[3].innerHTML = `<strong>${t.how4_t}</strong><span>${t.how4_d}</span>`;
  const privacyIT = document.getElementById('privacyIT');
  const privacyEN = document.getElementById('privacyEN');
  if (privacyIT) privacyIT.style.display = currentLang === 'it' ? 'block' : 'none';
  if (privacyEN) privacyEN.style.display = currentLang === 'en' ? 'block' : 'none';
  const tosIT = document.getElementById('tosIT');
  const tosEN = document.getElementById('tosEN');
  if (tosIT) tosIT.style.display = currentLang === 'it' ? 'block' : 'none';
  if (tosEN) tosEN.style.display = currentLang === 'en' ? 'block' : 'none';
  const footerTos = document.getElementById('footerTos');
  if (footerTos) footerTos.textContent = t.tos_nav;
  const sortOpts = document.querySelectorAll('.sort-select option');
  if (sortOpts[0]) sortOpts[0].textContent = t.sort_recent;
  if (sortOpts[1]) sortOpts[1].textContent = t.sort_popular;
  if (sortOpts[2]) sortOpts[2].textContent = t.sort_open;
  const footerAbout = document.getElementById('footerAbout');
  if (footerAbout) footerAbout.textContent = t.about_eyebrow;
  const footerPrivacy = document.getElementById('footerPrivacy');
  if (footerPrivacy) footerPrivacy.textContent = 'Privacy Policy';
  // Stats bar
  const statsBar1 = document.getElementById('statsBar1');
  if (statsBar1) statsBar1.textContent = t.stats_bar_1;
  const statsBar2 = document.getElementById('statsBar2');
  if (statsBar2) statsBar2.textContent = t.stats_bar_2;
  const statsBar3 = document.getElementById('statsBar3');
  if (statsBar3) statsBar3.textContent = t.stats_bar_3;
  // Load more
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn && loadMoreBtn.textContent !== t.loading) loadMoreBtn.textContent = t.load_more;
  // Project modal
  const mCollabTitle = document.getElementById('mCollabTitle');
  if (mCollabTitle) mCollabTitle.textContent = t.collab_section;
  // Talent modal
  const tModLabel = document.getElementById('tModLabel');
  if (tModLabel) tModLabel.textContent = t.talent_modal_label;
  const tModContactBtn = document.getElementById('tModContactBtn');
  if (tModContactBtn) tModContactBtn.textContent = t.talent_invite;
  // KPI labels
  const kpiLabelProjects = document.getElementById('kpiLabelProjects');
  if (kpiLabelProjects) kpiLabelProjects.textContent = t.kpi_projects;
  const kpiLabelPending = document.getElementById('kpiLabelPending');
  if (kpiLabelPending) kpiLabelPending.textContent = t.kpi_pending;
  const kpiLabelSent = document.getElementById('kpiLabelSent');
  if (kpiLabelSent) kpiLabelSent.textContent = t.kpi_sent;
  // Profile section titles
  const dashTitleSent = document.getElementById('dashTitleSent');
  if (dashTitleSent) dashTitleSent.textContent = t.dash_sent_title;
  const dashTitleProjects = document.getElementById('dashTitleProjects');
  if (dashTitleProjects) dashTitleProjects.textContent = t.dash_projects_title;
  const dashTitleLiked = document.getElementById('dashTitleLiked');
  if (dashTitleLiked) dashTitleLiked.textContent = t.dash_liked_title;
  const dashTitleRequests = document.getElementById('dashTitleRequests');
  if (dashTitleRequests) dashTitleRequests.textContent = t.dash_requests_title;
  // Profile complete banner
  const profileCompleteBannerText = document.getElementById('profileCompleteBannerText');
  if (profileCompleteBannerText) profileCompleteBannerText.innerHTML = t.profile_complete_text;
  const profileCompleteBtn = document.getElementById('profileCompleteBtn');
  if (profileCompleteBtn) profileCompleteBtn.textContent = t.profile_complete_btn;
  // Profile buttons
  const editProfileBtn = document.getElementById('editProfileBtn');
  if (editProfileBtn) editProfileBtn.textContent = t.edit_profile_btn;
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.textContent = t.logout_btn;
  // Profile bio default
  const profileBio = document.getElementById('profileBio');
  if (profileBio && !currentUser) profileBio.textContent = t.profile_bio_default;
  // Messages page
  const msgListHead = document.getElementById('msgListHead');
  if (msgListHead) msgListHead.textContent = t.conversations_title;
  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.placeholder = t.chat_placeholder;
  const chatSendBtn = document.getElementById('chatSendBtn');
  if (chatSendBtn) chatSendBtn.textContent = t.chat_send;
  const noChatSelected = document.getElementById('noChatSelected');
  if (noChatSelected) noChatSelected.textContent = t.no_chat_selected;
  // newProjectModal label + title
  const newProjLabel = document.querySelector('#newProjectModal .modal-label');
  if (newProjLabel) newProjLabel.textContent = t.new_proj_modal_label;
  const newProjModalTitle = document.querySelector('#newProjectModal .modal-title');
  if (newProjModalTitle) newProjModalTitle.textContent = t.new_proj_modal_title;
  // editProjectModal category note
  const editCatNote = document.getElementById('editCatNote');
  if (editCatNote) editCatNote.textContent = t.edit_cat_note;
  // propType options
  const propTypeOpts = document.querySelectorAll('#propType option');
  if (propTypeOpts[0]) propTypeOpts[0].textContent = t.propose_opt1;
  if (propTypeOpts[1]) propTypeOpts[1].textContent = t.propose_opt2;
  // nCollab options
  const nCollabOpts = document.querySelectorAll('#nCollab option');
  if (nCollabOpts[0]) nCollabOpts[0].textContent = t.collab_opt1;
  if (nCollabOpts[1]) nCollabOpts[1].textContent = t.collab_opt2;
  if (nCollabOpts[2]) nCollabOpts[2].textContent = t.collab_opt3;
  // About page visibility
  const aboutIT = document.getElementById('aboutIT');
  const aboutEN = document.getElementById('aboutEN');
  if (aboutIT) aboutIT.style.display = currentLang === 'it' ? 'block' : 'none';
  if (aboutEN) aboutEN.style.display = currentLang === 'en' ? 'block' : 'none';
  // Category filter pills
  const catPills = document.querySelectorAll('.cat-pill');
  const catLabels = [t.filter_all, t.cat_game, t.cat_arch, t.cat_app, t.cat_art, t.cat_music, t.cat_science, t.cat_film, t.cat_hardware, t.cat_other];
  catPills.forEach((pill, i) => { if (catLabels[i]) pill.textContent = catLabels[i]; });
  // Re-render projects (demo + real)
  renderProjects(getFilteredProjects(projects), 'projectsList');
  if (realProjects.length > 0) renderProjects(getFilteredProjects(realProjects), 'realProjectsList');
  // Re-render dynamic pages if currently active
  const activePage = document.querySelector('.page.active')?.id;
  if (activePage === 'page-profile' && currentUser) loadUserProfile();
  if (activePage === 'page-talents') loadTalents();
  if (activePage === 'page-messages' && currentUser) loadMessages();
}

// Inizializza immediatamente la pagina corretta prima che il browser disegni lo schermo
const initialPage = localStorage.getItem('crewtiv_lastPage') || 'home';
showPage(initialPage);

applyLang();

/* MOBILE MENU */
(function() {
  const toggle = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('menu-close');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !closeBtn || !nav) return;

  function openMenu() { nav.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { nav.classList.remove('active'); document.body.style.overflow = ''; }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  nav.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
})();

function closeBeta() {
  document.getElementById('betaOverlay').classList.remove('open');
  sessionStorage.setItem('betaSeen', '1');
}
if (!sessionStorage.getItem('betaSeen')) {
  setTimeout(() => document.getElementById('betaOverlay').classList.add('open'), 500);
}

renderProjects(projects, 'projectsList');
