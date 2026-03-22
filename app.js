/* ═══════════════════════════════════════════════════════════
   ADUE INTERNATIONAL SCHOOLS — app.js
   Shared logic used by every page
═══════════════════════════════════════════════════════════ */

/* ── STORAGE KEYS ────────────────────────────────────────── */
const KEYS = {
  students:   'adue_students',
  teachers:   'adue_teachers',
  grades:     'adue_grades',
  attendance: 'adue_attendance',
  fees:       'adue_fees',
  notices:    'adue_notices',
  username:   'adue_username',
  password:   'adue_password',
  loggedIn:   'adue_logged_in',
  loginUser:  'adue_login_user',
};

/* ── SEED DATA ───────────────────────────────────────────── */
const SEED = {
  students: [
    { id:1, name:"Amara Osei",   admNo:"AIS/001", cls:"JSS 3A", gender:"Female", age:16, status:"Active" },
    { id:2, name:"Kweku Mensah", admNo:"AIS/002", cls:"JSS 2B", gender:"Male",   age:15, status:"Active" },
    { id:3, name:"Abena Asante", admNo:"AIS/003", cls:"JSS 1C", gender:"Female", age:14, status:"Active" },
    { id:4, name:"Kofi Boateng", admNo:"AIS/004", cls:"SSS 1A", gender:"Male",   age:16, status:"Inactive" },
    { id:5, name:"Esi Darko",    admNo:"AIS/005", cls:"SSS 2B", gender:"Female", age:17, status:"Active" },
    { id:6, name:"Yaw Frimpong", admNo:"AIS/006", cls:"SSS 3C", gender:"Male",   age:18, status:"Active" },
  ],
  teachers: [
    { id:1, name:"Mr. Daniel Adu",   staffId:"TCH/001", subject:"Mathematics",      gender:"Male",   exp:"8 yrs",  status:"Active" },
    { id:2, name:"Mrs. Grace Owusu", staffId:"TCH/002", subject:"English Language", gender:"Female", exp:"12 yrs", status:"Active" },
    { id:3, name:"Mr. Isaac Tetteh", staffId:"TCH/003", subject:"Sciences",         gender:"Male",   exp:"5 yrs",  status:"Active" },
    { id:4, name:"Ms. Nana Akosua",  staffId:"TCH/004", subject:"Social Studies",   gender:"Female", exp:"3 yrs",  status:"On Leave" },
    { id:5, name:"Mr. Femi Bello",   staffId:"TCH/005", subject:"ICT",              gender:"Male",   exp:"6 yrs",  status:"Active" },
  ],
  grades: [
    { id:1, student:"Amara Osei",   admNo:"AIS/001", subject:"Mathematics",      score:88, grade:"A", term:"Term 1", session:"2024/2025" },
    { id:2, student:"Amara Osei",   admNo:"AIS/001", subject:"English Language", score:74, grade:"B", term:"Term 1", session:"2024/2025" },
    { id:3, student:"Kweku Mensah", admNo:"AIS/002", subject:"Mathematics",      score:61, grade:"C", term:"Term 1", session:"2024/2025" },
    { id:4, student:"Kweku Mensah", admNo:"AIS/002", subject:"Sciences",         score:79, grade:"B", term:"Term 1", session:"2024/2025" },
    { id:5, student:"Abena Asante", admNo:"AIS/003", subject:"English Language", score:93, grade:"A", term:"Term 1", session:"2024/2025" },
    { id:6, student:"Kofi Boateng", admNo:"AIS/004", subject:"Sciences",         score:55, grade:"D", term:"Term 1", session:"2024/2025" },
    { id:7, student:"Esi Darko",    admNo:"AIS/005", subject:"Mathematics",      score:82, grade:"A", term:"Term 1", session:"2024/2025" },
    { id:8, student:"Yaw Frimpong", admNo:"AIS/006", subject:"ICT",              score:91, grade:"A", term:"Term 1", session:"2024/2025" },
  ],
  attendance: [
    { id:1, student:"Amara Osei",   admNo:"AIS/001", date:"2025-01-20", status:"Present" },
    { id:2, student:"Kweku Mensah", admNo:"AIS/002", date:"2025-01-20", status:"Absent"  },
    { id:3, student:"Abena Asante", admNo:"AIS/003", date:"2025-01-20", status:"Present" },
    { id:4, student:"Esi Darko",    admNo:"AIS/005", date:"2025-01-20", status:"Late"    },
    { id:5, student:"Yaw Frimpong", admNo:"AIS/006", date:"2025-01-20", status:"Present" },
  ],
  fees: [
    { id:1, student:"Amara Osei",   admNo:"AIS/001", term:"Term 1", amount:150000, paid:150000, session:"2024/2025", date:"2025-01-05" },
    { id:2, student:"Kweku Mensah", admNo:"AIS/002", term:"Term 1", amount:150000, paid:75000,  session:"2024/2025", date:"2025-01-08" },
    { id:3, student:"Abena Asante", admNo:"AIS/003", term:"Term 1", amount:150000, paid:150000, session:"2024/2025", date:"2025-01-03" },
    { id:4, student:"Kofi Boateng", admNo:"AIS/004", term:"Term 1", amount:150000, paid:0,      session:"2024/2025", date:"—" },
    { id:5, student:"Esi Darko",    admNo:"AIS/005", term:"Term 1", amount:150000, paid:150000, session:"2024/2025", date:"2025-01-06" },
  ],
  notices: [
    { id:1, title:"Mid-Term Break",     body:"School closes Friday 14th February. Resumption Monday 24th February 2025.",           date:"2025-02-10", priority:"High",   author:"Admin" },
    { id:2, title:"Inter-House Sports", body:"Annual inter-house sports competition holds Saturday 8th March. All students must participate.", date:"2025-02-28", priority:"Medium", author:"Admin" },
    { id:3, title:"PTA Meeting",        body:"PTA meeting scheduled Saturday 15th March at 10:00 AM in the school hall.",           date:"2025-03-05", priority:"Medium", author:"Admin" },
    { id:4, title:"WAEC Registration",  body:"SSS 3 students should submit WAEC registration forms by March 20th.",                date:"2025-03-10", priority:"High",   author:"Admin" },
  ],
};

/* ── DATABASE ────────────────────────────────────────────── */
const DB = {
  get(key) {
    try {
      const raw = localStorage.getItem(KEYS[key]);
      return raw ? JSON.parse(raw) : SEED[key] ? [...SEED[key]] : [];
    } catch(e) {
      return SEED[key] ? [...SEED[key]] : [];
    }
  },
  set(key, data) {
    try { localStorage.setItem(KEYS[key], JSON.stringify(data)); } catch(e) {}
  },
  push(key, item) {
    const data = this.get(key);
    data.push(item);
    this.set(key, data);
    return data;
  },
  update(key, id, updates) {
    const data = this.get(key).map(item => item.id === id ? { ...item, ...updates } : item);
    this.set(key, data);
    return data;
  },
  delete(key, id) {
    const data = this.get(key).filter(item => item.id !== id);
    this.set(key, data);
    return data;
  },
};

/* ── AUTH GUARD ──────────────────────────────────────────── */
function requireLogin() {
  if (localStorage.getItem(KEYS.loggedIn) !== 'true') {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function doLogout() {
  localStorage.removeItem(KEYS.loggedIn);
  localStorage.removeItem(KEYS.loginUser);
  window.location.href = 'index.html';
}

function getLoggedInUser() {
  return localStorage.getItem(KEYS.loginUser) || 'Admin';
}

/* ── UNIQUE ID ───────────────────────────────────────────── */
function uid() {
  return Date.now() + Math.floor(Math.random() * 10000);
}

/* ── FORMATTING ──────────────────────────────────────────── */
function naira(n) {
  return '₦' + Number(n).toLocaleString();
}

function scoreToGrade(s) {
  s = Number(s);
  if (s >= 80) return 'A';
  if (s >= 65) return 'B';
  if (s >= 50) return 'C';
  if (s >= 40) return 'D';
  return 'F';
}

function gradeColor(g) {
  const map = { A:'#27AE60', B:'#2980b9', C:'#d4ac0d', D:'#e67e22', F:'#c0392b' };
  return map[g] || '#888';
}

function feeStatus(f) {
  if (f.paid >= f.amount) return 'Paid';
  if (f.paid > 0) return 'Partial';
  return 'Unpaid';
}

function scoreRemark(s) {
  if (s >= 80) return 'Excellent';
  if (s >= 65) return 'Good';
  if (s >= 50) return 'Average';
  if (s >= 40) return 'Below Average';
  return 'Poor';
}

function todayDate() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(d) {
  if (!d || d === '—') return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}

/* ── PILL HTML ───────────────────────────────────────────── */
function pillClass(s) {
  const map = {
    Active:'pill-green', Inactive:'pill-red', 'On Leave':'pill-yellow',
    Present:'pill-green', Absent:'pill-red', Late:'pill-yellow',
    Paid:'pill-green', Partial:'pill-yellow', Unpaid:'pill-red',
    High:'pill-red', Medium:'pill-yellow', Low:'pill-blue',
    Male:'pill-blue', Female:'pill-green',
  };
  return 'pill ' + (map[s] || 'pill-gray');
}

function pill(s) {
  return `<span class="${pillClass(s)}">${s}</span>`;
}

function gradeBadge(g) {
  return `<span class="grade-badge g-${g}">${g}</span>`;
}

/* ── TOAST NOTIFICATION ──────────────────────────────────── */
function toast(msg, type = 'default') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  el.style.background = type === 'error' ? '#922b21' : 'var(--wine)';
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.style.display = 'none'; }, 3000);
}

/* ── MODAL ───────────────────────────────────────────────── */
function openModal(title, bodyHTML, wide = false) {
  let overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box" id="modal-box">
        <div class="modal-header">
          <h3 id="modal-title"></h3>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div id="modal-body"></div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-box').className = 'modal-box' + (wide ? ' wide' : '');
  overlay.classList.add('open');
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

/* ── CONFIRM DELETE ──────────────────────────────────────── */
function confirmDelete(message, onConfirm) {
  openModal('Confirm Delete', `
    <div style="text-align:center;padding:10px 0 20px">
      <div style="font-size:44px;margin-bottom:16px">🗑️</div>
      <p style="color:var(--text);font-size:15px;margin-bottom:24px">${message}</p>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn btn-danger-soft" onclick="(${onConfirm})();closeModal()">Yes, Delete</button>
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
      </div>
    </div>`);
}

/* ── SIDEBAR ACTIVE LINK ─────────────────────────────────── */
function setActiveNav(page) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.remove('active');
  });
  const active = document.getElementById('nav-' + page);
  if (active) active.classList.add('active');
}

/* ── MOBILE SIDEBAR TOGGLE ───────────────────────────────── */
function initMobileMenu() {
  const toggle  = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}

/* ── SET ADMIN NAME IN SIDEBAR ───────────────────────────── */
function initSidebar() {
  const nameEl = document.getElementById('admin-name');
  if (nameEl) nameEl.textContent = getLoggedInUser();
  initMobileMenu();
}

/* ── CLASS OPTIONS ───────────────────────────────────────── */
function classOptions(selected = '') {
  const classes = [
    'JSS 1A','JSS 1B','JSS 1C',
    'JSS 2A','JSS 2B','JSS 2C',
    'JSS 3A','JSS 3B','JSS 3C',
    'SSS 1A','SSS 1B','SSS 1C',
    'SSS 2A','SSS 2B','SSS 2C',
    'SSS 3A','SSS 3B','SSS 3C',
  ];
  return classes.map(c => `<option value="${c}"${c === selected ? ' selected' : ''}>${c}</option>`).join('');
}

/* ── SUBJECT OPTIONS ─────────────────────────────────────── */
function subjectOptions(selected = '') {
  const subjects = [
    'Mathematics', 'English Language', 'Sciences',
    'Social Studies', 'ICT', 'French',
    'Fine Arts', 'Physical Education', 'Economics',
    'Literature', 'Government', 'Commerce',
  ];
  return subjects.map(s => `<option value="${s}"${s === selected ? ' selected' : ''}>${s}</option>`).join('');
}

/* ── STUDENT OPTIONS (for dropdowns) ────────────────────── */
function studentOptions(selected = '') {
  const students = DB.get('students');
  return students.map(s =>
    `<option value="${s.admNo}"${s.admNo === selected ? ' selected' : ''}>${s.name} (${s.admNo})</option>`
  ).join('');
}

/* ── EMPTY STATE HTML ────────────────────────────────────── */
function emptyState(icon, message) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><p>${message}</p></div>`;
}

/* ── SCORE BAR HTML ──────────────────────────────────────── */
function scoreBar(score, grade) {
  return `
    <div class="score-bar">
      <div class="bar-track">
        <div class="bar-fill" style="width:${score}%;background:${gradeColor(grade)}"></div>
      </div>
      <span>${score}</span>
    </div>`;
}

/* ── SIDEBAR HTML (reused on every page) ─────────────────── */
function sidebarHTML(activePage) {
  const links = [
    { id:'dashboard',   label:'Dashboard',    icon:'🏠', href:'dashboard.html'  },
    { id:'students',    label:'Students',     icon:'🎓', href:'students.html'   },
    { id:'teachers',    label:'Staff',        icon:'👨‍🏫', href:'teachers.html'   },
    { id:'grades',      label:'Grades',       icon:'📊', href:'grades.html'     },
    { id:'attendance',  label:'Attendance',   icon:'📋', href:'attendance.html' },
    { id:'fees',        label:'Fees',         icon:'💰', href:'fees.html'       },
    { id:'reportcard',  label:'Report Cards', icon:'📄', href:'report-card.html'},
    { id:'notices',     label:'Notices',      icon:'📢', href:'notices.html'    },
    { id:'settings',    label:'Settings',     icon:'⚙️', href:'settings.html'   },
  ];

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-name">ADUE</div>
        <div class="brand-sub">International Schools</div>
      </div>
      <nav>
        ${links.map(l => `
          <a href="${l.href}" class="nav-item${activePage === l.id ? ' active' : ''}" id="nav-${l.id}">
            <span class="nav-icon">${l.icon}</span> ${l.label}
          </a>`).join('')}
      </nav>
      <div class="sidebar-footer">
        <div class="admin-name" id="admin-name">${getLoggedInUser()}</div>
        <div class="admin-role">Administrator</div>
        <button class="btn btn-danger-soft btn-block btn-sm" onclick="doLogout()">Sign Out</button>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <button class="menu-toggle" id="menu-toggle">☰</button>
    <div id="toast"></div>`;
}
