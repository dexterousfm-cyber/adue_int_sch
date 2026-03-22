/* ═══════════════════════════════════════════════════════════
   ADUE INTERNATIONAL SCHOOLS — app.js
   No demo data. Fresh portal.
═══════════════════════════════════════════════════════════ */

/* ── STORAGE KEYS ────────────────────────────────────────── */
const KEYS = {
  students:   'adue_students',
  teachers:   'adue_teachers',
  grades:     'adue_grades',
  attendance: 'adue_attendance',
  fees:       'adue_fees',
  notices:    'adue_notices',
  classes:    'adue_classes',
  username:   'adue_username',
  password:   'adue_password',
  adminName:  'adue_admin_name',
  loggedIn:   'adue_logged_in',
  setupDone:  'adue_setup_done',
};

/* ── DATABASE ────────────────────────────────────────────── */
const DB = {
  get(key) {
    try {
      const raw = localStorage.getItem(KEYS[key]);
      return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
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
    const data = this.get(key).map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    this.set(key, data);
    return data;
  },
  remove(key, id) {
    const data = this.get(key).filter(item => item.id !== id);
    this.set(key, data);
    return data;
  },
  find(key, id) {
    return this.get(key).find(item => item.id === id) || null;
  },
};

/* ── AUTH ────────────────────────────────────────────────── */
function isSetupDone() {
  return localStorage.getItem(KEYS.setupDone) === 'true';
}
function isLoggedIn() {
  return localStorage.getItem(KEYS.loggedIn) === 'true';
}
function getAdminName() {
  return localStorage.getItem(KEYS.adminName) || 'Administrator';
}
function getUsername() {
  return localStorage.getItem(KEYS.username) || '';
}
function requireLogin() {
  if (!isSetupDone()) { window.location.href = 'index.html'; return false; }
  if (!isLoggedIn())  { window.location.href = 'index.html'; return false; }
  return true;
}
function doLogout() {
  localStorage.setItem(KEYS.loggedIn, 'false');
  window.location.href = 'index.html';
}

/* ── UNIQUE ID ───────────────────────────────────────────── */
function uid() {
  return Date.now() + Math.floor(Math.random() * 9999);
}

/* ── FORMATTING ──────────────────────────────────────────── */
function naira(n) {
  return '₦' + Number(n || 0).toLocaleString();
}
function scoreToGrade(s) {
  s = Number(s);
  if (s >= 80) return 'A';
  if (s >= 65) return 'B';
  if (s >= 50) return 'C';
  if (s >= 40) return 'D';
  return 'F';
}
function gradeBarColor(g) {
  return { A:'#28a745', B:'#007bff', C:'#ffc107', D:'#fd7e14', F:'#dc3545' }[g] || '#888';
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
  try {
    return new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
  } catch(e) { return d; }
}
function pillClass(s) {
  const map = {
    Active:'pill-green', Inactive:'pill-red', 'On Leave':'pill-yellow',
    Present:'pill-green', Absent:'pill-red', Late:'pill-yellow',
    Paid:'pill-green', Partial:'pill-yellow', Unpaid:'pill-red',
    High:'pill-red', Medium:'pill-yellow', Low:'pill-blue',
    Male:'pill-blue', Female:'pill-green', 'Full Time':'pill-green', 'Part Time':'pill-yellow',
  };
  return 'pill ' + (map[s] || 'pill-gray');
}
function pill(s) {
  return `<span class="${pillClass(s)}">${s}</span>`;
}
function gradeBadge(g) {
  return `<span class="grade-badge g-${g}">${g}</span>`;
}
function scoreBar(score, grade) {
  return `<div class="score-bar">
    <div class="bar-track"><div class="bar-fill" style="width:${score}%;background:${gradeBarColor(grade)}"></div></div>
    <span>${score}</span>
  </div>`;
}

/* ── TOAST ───────────────────────────────────────────────── */
function toast(msg, type = 'default') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.className = type === 'success' ? 'success' : type === 'error' ? 'error' : '';
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.display = 'none'; }, 3200);
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
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  }
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('modal-box').className = 'modal-box' + (wide ? ' wide' : '');
  overlay.classList.add('open');
}
function closeModal() {
  const o = document.getElementById('modal-overlay');
  if (o) o.classList.remove('open');
}

/* ── CLASS OPTIONS ───────────────────────────────────────── */
function classOptions(selected = '') {
  const defaults = [
    'JSS 1A','JSS 1B','JSS 1C',
    'JSS 2A','JSS 2B','JSS 2C',
    'JSS 3A','JSS 3B','JSS 3C',
    'SSS 1A','SSS 1B','SSS 1C',
    'SSS 2A','SSS 2B','SSS 2C',
    'SSS 3A','SSS 3B','SSS 3C',
  ];
  const saved = DB.get('classes');
  const list  = saved.length ? saved.map(c => c.name) : defaults;
  return `<option value="">Select Class</option>` +
    list.map(c => `<option value="${c}"${c === selected ? ' selected' : ''}>${c}</option>`).join('');
}

/* ── SUBJECT OPTIONS ─────────────────────────────────────── */
function subjectOptions(selected = '') {
  const list = [
    'Mathematics','English Language','Sciences','Social Studies',
    'ICT','French','Fine Arts','Physical Education',
    'Economics','Literature','Government','Commerce',
    'Agricultural Science','Civic Education','Further Mathematics',
  ];
  return `<option value="">Select Subject</option>` +
    list.map(s => `<option value="${s}"${s === selected ? ' selected' : ''}>${s}</option>`).join('');
}

/* ── STUDENT OPTIONS ─────────────────────────────────────── */
function studentOptions(selected = '') {
  const students = DB.get('students');
  if (!students.length) return `<option value="">No students registered yet</option>`;
  return `<option value="">Select Student</option>` +
    students.map(s =>
      `<option value="${s.id}"${s.id === selected ? ' selected' : ''}>${s.firstName} ${s.lastName} (${s.studentId})</option>`
    ).join('');
}

/* ── DEPARTMENT OPTIONS ──────────────────────────────────── */
function deptOptions(selected = '') {
  const list = ['Mathematics','Sciences','Languages','Social Sciences','ICT','Arts','Physical Education','Administration'];
  return `<option value="">Select Department</option>` +
    list.map(d => `<option value="${d}"${d === selected ? ' selected' : ''}>${d}</option>`).join('');
}

/* ── EMPTY STATE ─────────────────────────────────────────── */
function emptyState(icon, msg) {
  return `<div class="empty-state"><div class="empty-icon">${icon}</div><p>${msg}</p></div>`;
}

/* ── TOPBAR HTML ─────────────────────────────────────────── */
function topbarHTML(pageTitle) {
  return `
    <header class="topbar" id="topbar">
      <div class="topbar-brand">
        <button class="menu-toggle" id="menu-toggle">☰</button>
        <img src="${typeof LOGO_SHIELD !== 'undefined' ? LOGO_SHIELD : ''}" style="width:36px;height:36px;object-fit:contain;border-radius:4px;background:#fff;padding:2px"/>
        <div class="brand-text">
          ADUE
          <div class="brand-sub">International Schools</div>
        </div>
      </div>
      <div class="topbar-center">${pageTitle}</div>
      <div class="topbar-right">
        <div class="topbar-admin">
          <div class="admin-name" id="topbar-admin-name">${getAdminName()}</div>
          <div class="admin-role">School Administrator</div>
        </div>
        <button class="btn-logout" onclick="doLogout()">Logout</button>
      </div>
    </header>`;
}

/* ── SIDEBAR HTML ────────────────────────────────────────── */
function sidebarHTML(activePage) {
  const links = [
    { id:'dashboard',   label:'Dashboard',    icon:'📊', href:'dashboard.html'         },
    { id:'students',    label:'Students',     icon:'🎓', href:'students.html'          },
    { id:'teachers',    label:'Teachers',     icon:'👨‍🏫', href:'teachers.html'          },
    { id:'classes',     label:'Classes',      icon:'📚', href:'classes.html'           },
    { id:'attendance',  label:'Attendance',   icon:'📋', href:'attendance.html'        },
    { id:'grades',      label:'Grades',       icon:'📝', href:'grades.html'            },
    { id:'fees',        label:'Finance',      icon:'💰', href:'fees.html'              },
    { id:'reports',     label:'Reports',      icon:'📄', href:'report-card.html'       },
    { id:'settings',    label:'Settings',     icon:'⚙️', href:'settings.html'          },
  ];
  return `
    <aside class="sidebar" id="sidebar">
      <nav>
        ${links.map(l => `
          <a href="${l.href}" class="nav-item${activePage === l.id ? ' active' : ''}">
            <span class="nav-icon">${l.icon}</span>${l.label}
          </a>`).join('')}
      </nav>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>`;
}

/* ── INJECT PAGE SHELL ───────────────────────────────────── */
function injectShell(activePage, pageTitle) {
  document.getElementById('topbar-container').innerHTML = topbarHTML(pageTitle);
  document.getElementById('sidebar-container').innerHTML = sidebarHTML(activePage);

  // Mobile toggle
  const toggle  = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Toast element
  if (!document.getElementById('toast')) {
    const t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
}
