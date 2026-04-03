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

function formatProjectFromDB(p) {
  const name = p.author_name || 'Anonimo';
  return {
    id: p.id, featured: false,
    title: p.title, author: name,
    initials: name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(),
    color: getColorForString(name),
    date: new Date(p.created_at).toLocaleDateString('it-IT', {day:'numeric',month:'short',year:'numeric'}),
    category: p.category, status: p.status,
    desc: p.description || '', tags: p.tags || [],
    views: p.views||0, proposals: p.proposals||0, likes: p.likes||0, collabs: [],
    isReal: true, author_id: p.author_id, created_at: p.created_at
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

const chatData = [
  { name:"Sofia Russo", initials:"SR", color:"#c8ff57", project:"EchoVerse RPG — Narrative Designer" },
  { name:"Luca Verdi", initials:"LV", color:"#57b4ff", project:"EchoVerse RPG — Sound Designer" },
  { name:"Anna Pellegrini", initials:"AP", color:"#57ff85", project:"Palazzo Vouta Verde — Paesaggista" },
  { name:"Pietro Mori", initials:"PM", color:"#b057ff", project:"NeuroScan AI — Data Scientist" }
];

let realProjects = [];
let likedProjectIds = []; 
let currentUser = null;
let editingProjectId = null;
let authMode = 'login';
let messageSubscription = null; // FASE 9: Realtime subscription

// Variabili per Paginazione (FASE 5)
let currentProjPage = 0;
const PROJ_PER_PAGE = 5; // Quanti progetti caricare alla volta
let hasMoreProjects = true;

function renderProjects(list, containerId='projectsList') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const meta = document.getElementById('pMeta');
  if (meta && containerId==='projectsList') meta.textContent = `${projects.length} progetti di esempio`;
  el.innerHTML = '';
  
  if (!list.length) {
    if (containerId === 'projectsList' || containerId === 'realProjectsList') {
      el.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--text3)">Nessun progetto trovato.</div>`;
    } else {
      el.innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:10px;">Nessun progetto da mostrare.</div>`;
    }
    return;
  }
  
  list.forEach((p,i) => {
    const sMap = {open:'s-open',progress:'s-progress',closed:'s-closed'};
    const sLabel = {open:'Aperto',progress:'In corso',closed:'Chiuso'};
    const isOwner = currentUser && p.author_id === currentUser.id;
    
    const isLiked = likedProjectIds.includes(p.id);
    const isReal = p.isReal === true;
    const likeBtnHtml = currentUser && !isOwner && isReal ? 
        `<button class="btn-save ${isLiked?'saved':''}" style="${isLiked ? 'color: var(--red); border-color: rgba(255,87,87,0.3); background: rgba(255,87,87,0.1);' : ''}" onclick="event.stopPropagation(); toggleLikeProject('${p.id}')">${isLiked ? '♥️ Piace' : '♡ Mi piace'}</button>` : '';

    const d = document.createElement('div');
    d.className = `pcard${p.featured?' featured':''}`;
    d.style.animationDelay = `${i*.07}s`;
    d.onclick = () => openProjectById(p.id);
    
    d.innerHTML = `
      ${p.featured?'<div class="featured-label">✦ In evidenza</div>':''}
      <div class="pcard-top">
        <div class="pcard-author">
          <div class="avatar" style="background:${p.color}">${sanitize(p.initials)}</div>
          <div><div class="author-name">${sanitize(p.author)}</div><div class="author-date">📅 ${sanitize(p.date)}</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${likeBtnHtml}
          <span class="status-badge ${sMap[p.status]}">${sLabel[p.status]}</span>
          ${isOwner ? `
            <button style="background:rgba(200,255,87,0.1);border:1px solid rgba(200,255,87,0.2);color:var(--accent);font-size:11px;padding:4px 8px;border-radius:6px;cursor:pointer;font-family:'Instrument Sans',sans-serif" onclick="event.stopPropagation();openEditProject('${sanitize(p.id)}')">Modifica</button>
            <button style="background:rgba(255,87,87,0.1);border:1px solid rgba(255,87,87,0.2);color:var(--red);font-size:11px;padding:4px 8px;border-radius:6px;cursor:pointer;font-family:'Instrument Sans',sans-serif" onclick="event.stopPropagation();deleteProject('${sanitize(p.id)}')">Elimina</button>
          ` : ''}
        </div>
      </div>
      <div class="pcard-title">${sanitize(p.title)}</div>
      <div class="pcard-desc">${sanitize(p.desc.slice(0,185))}${p.desc.length>185?'…':''}</div>
      <div class="pcard-tags">${p.tags.map(t=>`<span class="tag">${sanitize(t)}</span>`).join('')}</div>
      <div class="pcard-footer">
        <div class="pcard-stats">
          <span class="pstat">👁 ${p.views}</span>
          <span class="pstat">♥️ ${p.likes || 0}</span>
        </div>
        <div class="pcard-action">
          ${p.status!=='closed'?`<button class="btn btn-accent btn-sm" onclick="event.stopPropagation();openProjectById('${sanitize(p.id)}')">Proponi →</button>`:'<span style="font-size:11px;color:var(--text3)">Team al completo</span>'}
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
  
  const formatted = data.map(p => formatProjectFromDB(p));

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
  if(btn) btn.textContent = 'Caricamento...';
  loadRealProjects(true).then(() => {
      if(btn) btn.textContent = 'Carica altri ↓';
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

async function openProjectById(id) {
  currentProject = realProjects.find(p=> String(p.id) === String(id)) || projects.find(p=> String(p.id) === String(id));
  if (!currentProject) return;
  const p = currentProject;
  
  // FASE 6: Aggiornamento URL Hash
  window.history.pushState(null, '', '#project/' + id);

  // Incrementa views reali in modo sicuro
  if (p && p.isReal && currentUser && p.author_id !== currentUser.id) {
    try {
      _supabase.rpc('increment_views', { project_id: p.id });
      p.views++; 
    } catch (e) { console.error("Errore incremento views:", e); }
  }

  // Assicuriamoci che l'overlay sia pulito prima di aprirlo
  const modalOverlay = document.getElementById('projectModal');
  modalOverlay.classList.remove('open'); 
  setTimeout(() => modalOverlay.classList.add('open'), 10);
  const sMap = {open:'s-open',progress:'s-progress',closed:'s-closed'};
  const sLabel = {open:'Aperto a collaborazioni',progress:'In corso',closed:'Chiuso'};
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
  cl.innerHTML = '<div style="font-size:12px;color:var(--text3);padding:8px 0">Caricamento team...</div>';
  
  // Se è un progetto reale, peschiamo le proposte accettate
  if (p.isReal) {
    const { data: acceptedProps } = await _supabase.from('proposals')
        .select('applicant_name, role')
        .eq('project_id', p.id)
        .eq('status', 'accepted');
        
    p.collabs = (acceptedProps || []).map(pr => ({
        n: pr.applicant_name || 'Utente',
        r: pr.role || 'Collaboratore',
        s: 'accepted'
    }));
  }

  // Stampiamo i collaboratori (sia quelli veri appena pescati, sia quelli finti delle demo)
  cl.innerHTML = p.collabs.length ? p.collabs.map(c=>`
    <div class="citem">
      <div class="citem-left">
        <div class="avatar" style="width:30px;height:30px;border-radius:7px;font-size:10px;background:${getColorForString(c.n)}">${sanitize(c.n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase())}</div>
        <div><div class="cname">${sanitize(c.n)}</div><div class="crole">${sanitize(c.r)}</div></div>
      </div>
      <span class="cstatus cs-accepted">✓ Ruolo Assegnato</span>
    </div>`).join('') : '<div style="font-size:12px;color:var(--text3);padding:8px 0">Nessun collaboratore ancora — sii il primo a proporti!</div>';
  
  const ps = document.getElementById('mProposeSection');
  const demoNotice = document.getElementById('proposeDemoNotice');
  const proposeForm = document.getElementById('proposeForm');
  const t = i18n[currentLang];
  
  if (p.status==='closed') {
    demoNotice.style.display = 'none';
    proposeForm.style.display = 'none';
    document.getElementById('mProposeSection').innerHTML = `<div style="padding:14px;background:var(--surface2);border-radius:8px;font-size:13px;color:var(--text3);text-align:center">${currentLang==='it'?'Questo progetto non accetta più proposte.':'This project is no longer accepting proposals.'}</div>`;
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
            <label class="form-label" data-i18n="propose_role">Il tuo ruolo</label>
            <input class="form-input" id="propRole" placeholder="es. Dev backend, 3D artist, compositore…">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="propose_type">Tipo di collaborazione</label>
            <select class="form-select" id="propType">
              <option>Volontaria</option>
              <option>Retribuita — da discutere</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="propose_msg">Messaggio per il creatore</label>
            <textarea class="form-textarea" id="propMsg" placeholder="Racconta cosa puoi portare al progetto…"></textarea>
          </div>
          <button class="btn btn-accent" onclick="submitProposal()" data-i18n="propose_btn">Invia proposta →</button>
        `;
        proposeForm.style.display = 'block';
    }
  } else {
    demoNotice.style.display = 'block';
    proposeForm.style.display = 'none';
    document.getElementById('proposeDemoText').textContent = t.propose_demo;
    document.getElementById('proposeDemoBtn').textContent = t.propose_demo_btn;
  }
  document.getElementById('projectModal').classList.add('open');
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
  document.getElementById('newProjectModal').classList.add('open');
}

async function submitNewProject() {
  if (!currentUser) { openAuth('login'); return; }
  const title = document.getElementById('nTitle').value;
  const cat = document.getElementById('nCat').value;
  const desc = document.getElementById('nDesc').value;
  if (!title||!cat||!desc) { showToast('⚠️ Compila i campi obbligatori'); return; }
  const tags = document.getElementById('nTags').value.split(',').map(t=>t.trim()).filter(Boolean);
  const name = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
  const btn = document.querySelector('#newProjectModal .btn-accent');
  btn.disabled = true; btn.textContent = 'Pubblicazione…';
  const { data, error } = await _supabase.from('projects').insert({
    title, description: desc, category: cat,
    status: document.getElementById('nStatus').value,
    tags: tags.length ? tags : ['Nuovo'],
    author_id: currentUser.id,
    author_name: name,
    collab_type: document.getElementById('nCollab').value
  }).select().single();
  btn.disabled = false; btn.textContent = 'Pubblica e registra ✦';
  if (error) { showToast('❌ Errore: ' + error.message); return; }
  closeModal('newProjectModal');
  showToast('🎉 Progetto pubblicato e registrato!');
  ['nTitle','nDesc','nTags'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  await loadRealProjects();
}

function selectChat(i) {
  document.querySelectorAll('.msg-item').forEach((el,idx)=>el.classList.toggle('active',idx===i));
  const c = chatData[i];
  document.getElementById('chatAvatar').textContent = c.initials;
  document.getElementById('chatAvatar').style.background = c.color;
  document.getElementById('chatName').textContent = c.name;
  document.getElementById('chatProject').textContent = 'Re: '+c.project;
  document.getElementById('chatMessages').innerHTML = `<div class="cmsg them"><div class="cmsg-bubble">Ciao! Sono molto interessato al tuo progetto e mi piacerebbe collaborare.</div><div class="cmsg-time">2 giorni fa</div></div><div class="cmsg me"><div class="cmsg-bubble">Grazie per esserti fatto vivo! Raccontami della tua esperienza.</div><div class="cmsg-time">2 giorni fa</div></div>`;
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
    contactsContainer.innerHTML = `
      <div style="padding:40px 20px; text-align:center; color:var(--text3);">
        <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">💬</div>
        <div style="font-size:14px; font-weight:500; color:var(--text); margin-bottom:6px;">Nessuna chat attiva</div>
        <div style="font-size:12px; line-height:1.5;">Le conversazioni appariranno qui quando una tua proposta verrà accettata o quando accetterai un collaboratore.</div>
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
        <div class="msg-item-preview">Progetto: ${sanitize(projectTitle)}</div>
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
  
  // Evidenziamo il contatto attivo nella lista
  document.querySelectorAll('.msg-item').forEach(el => el.classList.remove('active'));
  loadMessages(); // Aggiorna la lista contatti per mostrare l'active

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

async function loadTalents() {
  const container = document.getElementById('talentsList');
  container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text3);">Caricamento talenti...</div>';
  
  const { data, error } = await _supabase.from('profiles').select('*').order('full_name', { ascending: true });
  if (error || !data || data.length === 0) {
    allTalents = demoTalents;
    container.innerHTML = `
      <div style="grid-column: 1/-1; background:var(--accent-dim);border:1px solid rgba(200,255,87,0.2);border-radius:10px;padding:12px 16px;margin-bottom:20px;display:flex;align-items:center;gap:10px">
        <span style="font-size:16px">✦</span>
        <span style="font-size:13px;color:var(--text2)">Questi sono <strong style="color:var(--text)">profili di esempio</strong>. <span style="color:var(--accent);cursor:pointer;font-weight:500" onclick="openAuth('register')">Registrati per creare il tuo →</span></span>
      </div>
      <div id="talentsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; width: 100%; grid-column: 1/-1;"></div>
    `;
    renderTalents(allTalents, 'talentsGrid');
    return;
  }
  
  allTalents = data;
  container.innerHTML = `<div id="talentsGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; width: 100%; grid-column: 1/-1;"></div>`;
  renderTalents(allTalents, 'talentsGrid');
}

function renderTalents(list, targetId = 'talentsList') {
  const container = document.getElementById(targetId);
  if (!container) return;
  container.innerHTML = '';
  
  if (!list.length) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text3);">Nessun talento corrisponde alla ricerca.</div>';
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
      document.getElementById('tModName').textContent = name;
      document.getElementById('tModRole').innerHTML = roleLabel;
      document.getElementById('tModBio').textContent = t.bio || 'Nessuna bio inserita.';
      document.getElementById('tModSkills').innerHTML = (t.skills || []).map(s => `<span class="tag">${sanitize(s)}</span>`).join('');
      
      const btn = document.getElementById('tModContactBtn');
      if (currentUser && t.id && t.id !== currentUser.id) {
         btn.style.display = 'flex';
         btn.textContent = 'Invita in un progetto ✦';
         btn.onclick = () => {
             closeModal('talentModal');
             showToast('Funzionalità in arrivo! Presto potrai inviare messaggi diretti ai talenti.');
         };
      } else if (!currentUser) {
         btn.style.display = 'flex';
         btn.textContent = 'Accedi per contattare';
         btn.onclick = () => { closeModal('talentModal'); openAuth('login'); };
      } else {
         btn.style.display = 'none'; // È il proprio profilo
      }
      document.getElementById('talentModal').classList.add('open');
    };

    d.innerHTML = `
      <div style="display:flex; gap:14px; align-items:center; margin-bottom:16px;">
        <div class="avatar" style="width:48px; height:48px; border-radius:14px; font-size:16px; background:${color}; color:#0a0a0f;">${sanitize(initials)}</div>
        <div>
          <div style="font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:var(--text);">${sanitize(name)}</div>
          <div style="font-size:13px; margin-top:2px;">${roleLabel}</div>
        </div>
      </div>
      <div style="font-size:13px; color:var(--text2); line-height:1.6; margin-bottom:16px; font-weight:300;">
        ${t.bio ? sanitize(t.bio.length > 120 ? t.bio.slice(0, 120) + '...' : t.bio) : 'Nessuna bio inserita.'}
      </div>
      <div class="pcard-tags" style="margin-bottom:0;">
        ${(t.skills || []).map(s => `<span class="tag">${sanitize(s)}</span>`).join('')}
      </div>
    `;
    container.appendChild(d);
  });
}

function applyTalentFilters() {
  const q = (document.getElementById('searchTalentInput')?.value || '').toLowerCase();
  const filtered = allTalents.filter(t => {
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

  document.getElementById('dashTotalViews').textContent = countProj || 0;
  document.getElementById('dashProposalsReceived').textContent = countRecv || 0;
  document.getElementById('dashProposalsSent').textContent = countSent || 0;

const { data: props } = await _supabase.from('proposals').select('*, projects(title)').eq('owner_id', currentUser.id).in('status', ['pending', 'accepted']);
  const propList = document.getElementById('proposalList');
  if(props && props.length > 0) {
      propList.innerHTML = props.map(pr => `
          <div class="prop-item">
              <div class="prop-avatar" style="background:${getColorForString(pr.applicant_name)}">${pr.applicant_name ? pr.applicant_name.slice(0,2).toUpperCase() : 'AN'}</div>
              <div style="flex:1">
                  <div class="prop-name">${pr.applicant_name || 'Utente'}</div>
                  <div class="prop-role">${pr.role} · per <strong>${pr.projects?.title || 'Progetto'}</strong></div>
                  ${pr.status === 'pending' ? `
                  <div class="prop-msg">"${pr.message}"</div>
                  <div class="prop-actions">
                      <button class="btn-accept" onclick="respondProposal('${pr.id}', 'accepted', '${pr.applicant_name}')">✓ Accetta</button>
                      <button class="btn-decline" onclick="respondProposal('${pr.id}', 'declined', '${pr.applicant_name}')">✕ Rifiuta</button>
                  </div>` : `
                  <div style="margin-top:10px; display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                      <span style="font-size:11px; font-weight:600; color:#57ff85;">✓ Nel team</span>
                      <button class="btn btn-accent btn-sm" onclick="openChat('${pr.applicant_id}', '${pr.applicant_name}', '${pr.projects?.id}')">💬 Apri Chat</button>
                      <button class="btn btn-ghost btn-sm" style="color:var(--red); border-color:rgba(255,87,87,0.3);" onclick="updateProposalStatus('${pr.id}', 'terminated', 'Collaboratore rimosso')">Rimuovi</button>
                  </div>`}
              </div>
          </div>
      `).join('');
  } else {
      propList.innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:10px;">Nessuna notifica al momento.</div>`;
  }

const { data: sentProps } = await _supabase.from('proposals').select('*, projects(id, title, author_id, author_name)').eq('applicant_id', currentUser.id);
  const sentPropList = document.getElementById('sentProposalList');
  if(sentProps && sentProps.length > 0) {
      sentPropList.innerHTML = sentProps.map(pr => {
          const statusColors = { pending: 'var(--orange)', accepted: '#57ff85', declined: 'var(--red)', withdrawn: 'var(--text3)', terminated: 'var(--text3)' };
          const statusLabels = { pending: 'In attesa', accepted: 'Accettata', declined: 'Rifiutata', withdrawn: 'Ritirata', terminated: 'Interrotta' };
          const projId = pr.projects?.id;
          const ownerId = pr.projects?.author_id;
          const ownerName = pr.projects?.author_name || 'Autore';
          
          const onClickAttr = projId ? `onclick="openProjectById('${projId}')" style="cursor:pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'"` : '';
          
          let actionBtns = '';
          if (pr.status === 'pending') {
              actionBtns = `<button class="btn btn-ghost btn-sm" style="margin-top:8px; color:var(--red); border-color:rgba(255,87,87,0.3);" onclick="event.stopPropagation(); updateProposalStatus('${pr.id}', 'withdrawn', 'Candidatura ritirata')">Ritira</button>`;
          } else if (pr.status === 'accepted' && ownerId) {
              actionBtns = `
                <button class="btn btn-accent btn-sm" style="margin-top:8px;" onclick="event.stopPropagation(); openChat('${ownerId}', '${ownerName}', '${projId}')">💬 Apri Chat</button>
                <button class="btn btn-ghost btn-sm" style="margin-top:8px; color:var(--red); border-color:rgba(255,87,87,0.3);" onclick="event.stopPropagation(); updateProposalStatus('${pr.id}', 'terminated', 'Collaborazione interrotta')">Interrompi</button>
              `;
          }

          return `
          <div class="prop-item" ${onClickAttr}>
              <div style="flex:1">
                  <div class="prop-role" style="font-size:13px; color:var(--text);">Ruolo: <strong>${sanitize(pr.role)}</strong></div>
                  <div style="font-size:11px; color:var(--text3); margin-top:2px;">per il progetto <strong style="color:var(--text2); text-decoration:underline;">${sanitize(pr.projects?.title || 'Progetto eliminato')}</strong></div>
                  <div style="display:flex; align-items:center; gap:10px; margin-top:8px; flex-wrap:wrap;">
                      <div style="font-size:11px; font-weight:600; color:${statusColors[pr.status] || 'var(--text3)'}; display:inline-block; padding:3px 8px; background:rgba(255,255,255,0.05); border-radius:4px;">Stato: ${statusLabels[pr.status] || pr.status}</div>
                      ${actionBtns}
                  </div>
              </div>
              ${projId ? `<div style="font-size:18px; color:var(--text3); align-self:center; padding-left:10px;">→</div>` : ''}
          </div>`;
      }).join('');
  } else {
      sentPropList.innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px; background:var(--surface); border:1px solid var(--border); border-radius:10px;">Non ti sei ancora candidato a nessun progetto.</div>`;
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
          document.getElementById('dashSavedProjectsList').innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px;">Non è stato possibile caricare i progetti salvati.</div>`;
      }
  } else {
      document.getElementById('dashSavedProjectsList').innerHTML = `<div style="color:var(--text3); font-size:13px; padding:14px;">Non hai ancora salvato nessun progetto.</div>`;
  }
}

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
  document.getElementById('editProjectModal').classList.add('open');
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
  const btn = document.querySelector('#editProjectModal .btn-accent');
  btn.disabled = true; btn.textContent = 'Salvataggio…';
  
  const { error } = await _supabase.from('projects').update({ title, status, description: desc, tags }).eq('id', editingProjectId);
  
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
    document.querySelectorAll('.ep-sec-role').forEach(cb => {
      cb.checked = secRoles.includes(cb.value);
    });
  }
  if (btn) { btn.disabled = false; btn.textContent = '✏️ Modifica Profilo'; }
  document.getElementById('editProfileModal').classList.add('open');
}

async function submitEditProfile() {
  if (!currentUser) return;
  const title = document.getElementById('epTitle').value.trim();
  const bio = document.getElementById('epBio').value.trim();
  const skills = document.getElementById('epSkills').value.split(',').map(s=>s.trim()).filter(Boolean);
  
  const primaryRole = document.getElementById('epPrimaryRole').value;
  if (!primaryRole) { showToast('⚠️ Seleziona un ruolo primario'); return; }
  
  const secondaryRoles = Array.from(document.querySelectorAll('.ep-sec-role:checked')).map(cb => cb.value);
  if (secondaryRoles.length > 3) { showToast('⚠️ Puoi selezionare massimo 3 ruoli secondari'); return; }
  
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
    secondary_roles: secondaryRoles
  }, { onConflict: 'id' });
  btn.disabled = false; btn.textContent = 'Salva profilo ✦';
  if (error) { showToast('❌ Errore: ' + error.message); return; }
  closeModal('editProfileModal');
  showToast('✅ Profilo aggiornato!');
  await loadUserProfile();
}

// FASE 6: Chiusura modale e pulizia URL Hash
function closeModal(id) { 
  document.getElementById(id).classList.remove('open'); 
  if (id === 'projectModal') {
    window.history.pushState(null, '', window.location.pathname);
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
  
  loadMessages(); 
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
  document.getElementById('authOverlay').classList.add('open');
  setTimeout(() => document.getElementById('authEmail').focus(), 100);
}
function closeAuth() { document.getElementById('authOverlay').classList.remove('open'); }
function closeAuthIfBg(e) { if (e.target === document.getElementById('authOverlay')) closeAuth(); }

function switchTab(tab) {
  authMode = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('authName').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('authSubmitBtn').textContent = tab === 'login' ? 'Accedi' : 'Crea account';
  document.getElementById('authSubtitle').textContent = tab === 'login' ? 'Bentornato su Crewtiv!' : 'Crea il tuo account gratuito';
  document.getElementById('authError').textContent = '';
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
  });
  updateNavForUser(user);
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

async function logout() {
  await _supabase.auth.signOut();
  currentUser = null;
  likedProjectIds = [];
  updateNavForUser(null);
  showToast('Hai effettuato il logout.');
  showPage('home');
  loadRealProjects();
}

let sessionInitialized = false;

const hashParams = new URLSearchParams(window.location.hash.substring(1));
const isEmailConfirmation = hashParams.get('type') === 'signup' || !!hashParams.get('access_token');

_supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    onLogin(session.user, isEmailConfirmation);
    if (isEmailConfirmation) {
      showToast('✅ Email confermata!');
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
    status_open: 'Aperto a collaborazioni', status_progress: 'In corso', status_closed: 'Chiuso',
    sort_recent: 'Più recenti', sort_popular: 'Più popolari', sort_open: 'Cercano collaboratori',
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
    status_open: 'Open to collaborations', status_progress: 'In progress', status_closed: 'Closed',
    sort_recent: 'Most recent', sort_popular: 'Most popular', sort_open: 'Looking for collaborators',
  }
};

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
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
  const h1lines = document.querySelectorAll('.hero h1 .line1, .hero h1 .line2, .hero h1 .highlight');
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) heroH1.innerHTML = `${t.hero_h1_1}<br><span class="line2">${t.hero_h1_2}</span><br><span class="highlight">${t.hero_h1_3}</span>`;
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.textContent = t.hero_sub;
  const heroCta1 = document.querySelector('.hero-actions .btn-accent');
  if (heroCta1) heroCta1.textContent = t.hero_cta1;
  const heroCta2 = document.querySelector('.hero-actions .btn-ghost');
  if (heroCta2) heroCta2.textContent = t.hero_cta2;
  const statLabels = document.querySelectorAll('.stat-label');
  if (statLabels[0]) statLabels[0].textContent = t.stat1;
  if (statLabels[1]) statLabels[1].textContent = t.stat2;
  if (statLabels[2]) statLabels[2].textContent = t.stat3;
  if (statLabels[3]) statLabels[3].textContent = t.stat4;
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.search_placeholder;
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) searchBtn.textContent = t.search_btn;
  const catsLabel = document.querySelector('.cats-label');
  if (catsLabel) catsLabel.textContent = t.filter_label;
  const allPill = document.querySelector('.cat-pill');
  if (allPill) allPill.textContent = t.filter_all;
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
  const footerAbout = document.getElementById('footerAbout');
  if (footerAbout) footerAbout.textContent = currentLang === 'it' ? 'Chi siamo' : 'About';
  renderProjects(filtered, 'projectsList');
  if(realProjects.length > 0) renderProjects(realProjects, 'realProjectsList');
}

// Inizializza immediatamente la pagina corretta prima che il browser disegni lo schermo
const initialPage = localStorage.getItem('crewtiv_lastPage') || 'home';
showPage(initialPage);

applyLang();

function closeBeta() {
  document.getElementById('betaOverlay').classList.remove('open');
  sessionStorage.setItem('betaSeen', '1');
}
if (!sessionStorage.getItem('betaSeen')) {
  setTimeout(() => document.getElementById('betaOverlay').classList.add('open'), 500);
}

renderProjects(projects, 'projectsList');
