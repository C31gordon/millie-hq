// ===== THEME =====
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
let themeMode = localStorage.getItem('millie-theme') || 'auto'; // auto|light|dark

function applyTheme() {
  let t;
  if (themeMode === 'auto') {
    const h = new Date().getHours();
    t = (h >= 19 || h < 7) ? 'dark' : 'light';
  } else { t = themeMode; }
  html.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
themeBtn.addEventListener('click', () => {
  const cur = html.getAttribute('data-theme');
  themeMode = cur === 'dark' ? 'light' : 'dark';
  localStorage.setItem('millie-theme', themeMode);
  applyTheme();
});
applyTheme();

// ===== SIDEBAR =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('show'); });
overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); });

// ===== ROUTING =====
const content = document.getElementById('content');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('.sidebar nav a');
let currentPage = 'dashboard';
let usageChart = null;

navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const page = a.dataset.page;
  navigateTo(page);
  sidebar.classList.remove('open'); overlay.classList.remove('show');
}));

function navigateTo(page) {
  currentPage = page;
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.page === page));
  const titles = { dashboard:'Dashboard', tasks:'Tasks', activity:'Activity', usage:'Usage', jobs:'Jobs', agents:'Agents', settings:'Settings' };
  pageTitle.textContent = titles[page] || page;
  if (usageChart) { usageChart.destroy(); usageChart = null; }
  content.innerHTML = pages[page]();
  if (page === 'usage') initUsageChart('month');
}

// ===== HELPERS =====
const fmt = n => n.toLocaleString();
const fmtCost = n => '$' + n.toFixed(2);
const typeIcon = t => ({email:'✉️',task:'📋',cron:'⏰',search:'🔍'}[t]||'•');
const typeClass = t => ({email:'email',task:'task',cron:'cron',search:'search'}[t]||'');
const shortTime = s => { const d=new Date(s); return d.toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}); };

// ===== PAGES =====
const pages = {};

pages.dashboard = () => {
  const s = MOCK.summary;
  const a = MOCK.agent;
  const topTasks = MOCK.tasks.filter(t=>t.status!=='done').slice(0,3);
  const recentAct = MOCK.activity.slice(0,5);
  return `
    <div class="summary-row">
      <div class="card summary-card"><div class="label">Today's Cost</div><div class="value cost">${fmtCost(s.todayCost)}</div></div>
      <div class="card summary-card"><div class="label">MTD Cost</div><div class="value cost">${fmtCost(s.mtdCost)}</div></div>
      <div class="card summary-card"><div class="label">Tokens (MTD)</div><div class="value amber">${(s.mtdTokens/1e6).toFixed(1)}M</div></div>
      <div class="card summary-card"><div class="label">Active Crons</div><div class="value green">${s.activeCrons}</div></div>
      <div class="card summary-card"><div class="label">Conversations</div><div class="value">${s.conversations}</div></div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="section-title">Agent Status</div>
        <div class="agent-card">
          <div class="agent-avatar">${a.emoji}</div>
          <div class="agent-info">
            <div class="name"><span class="status-dot online"></span>${a.name}</div>
            <div class="meta">${a.model} · Last active ${a.lastActive}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">Top Tasks</div>
        <ul class="feed">
          ${topTasks.map(t=>`<li><div class="feed-icon task">${typeIcon('task')}</div><div class="feed-desc"><div>${t.name}</div><div class="time"><span class="priority ${t.priority}"></span> ${t.priority} · Due ${t.due}</div></div></li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="section-title">Recent Activity</div>
      <ul class="feed">
        ${recentAct.map(a=>`<li><div class="feed-icon ${typeClass(a.type)}">${typeIcon(a.type)}</div><div class="feed-desc"><div>${a.desc}</div><div class="time">${shortTime(a.time)}</div></div><div class="feed-cost">${fmtCost(a.cost)} · ${fmt(a.tokens)} tok</div></li>`).join('')}
      </ul>
    </div>`;
};

pages.tasks = () => {
  const cols = ['scheduled','queue','in-progress','done'];
  const labels = { scheduled:'Scheduled', queue:'Queue', 'in-progress':'In Progress', done:'Done' };
  return `
    <div class="kanban-toolbar">
      <select id="agent-filter"><option value="">All Agents</option><option>Millie</option></select>
      <button class="primary">+ New Task</button>
    </div>
    <div class="kanban">
      ${cols.map(col => {
        const tasks = MOCK.tasks.filter(t=>t.status===col);
        return `<div class="kanban-col"><div class="kanban-col-header">${labels[col]} <span class="count">${tasks.length}</span></div>${tasks.map(t=>`
          <div class="task-card"><div class="task-name"><span class="priority ${t.priority}"></span> ${t.name}</div><div class="task-meta"><span>${t.agent}</span><span>${shortTime(t.date)}</span></div></div>`).join('')}</div>`;
      }).join('')}
    </div>`;
};

pages.activity = () => {
  return `
    <div class="filter-bar">
      <select id="act-type-filter" onchange="filterActivity()"><option value="">All Types</option><option value="email">Email</option><option value="task">Task</option><option value="cron">Cron</option><option value="search">Search</option></select>
    </div>
    <div class="card">
      <ul class="feed" id="activity-feed">
        ${MOCK.activity.map(a=>`<li data-type="${a.type}"><div class="feed-icon ${typeClass(a.type)}">${typeIcon(a.type)}</div><div class="feed-desc"><div>${a.desc}</div><div class="time">${shortTime(a.time)}</div></div><div class="feed-cost">${fmtCost(a.cost)} · ${fmt(a.tokens)} tok</div></li>`).join('')}
      </ul>
    </div>`;
};

pages.usage = () => {
  const u = MOCK.usage;
  const totCost = u.daily.reduce((s,d)=>s+d.cost,0);
  const totTok = u.daily.reduce((s,d)=>s+d.tokens,0);
  const totConv = u.daily.reduce((s,d)=>s+d.conversations,0);
  return `
    <div class="tabs">
      <button class="tab" onclick="switchUsage('today')">Today</button>
      <button class="tab" onclick="switchUsage('week')">This Week</button>
      <button class="tab active" onclick="switchUsage('month')">This Month</button>
    </div>
    <div class="summary-row">
      <div class="card summary-card"><div class="label">Total Cost</div><div class="value cost">${fmtCost(totCost)}</div></div>
      <div class="card summary-card"><div class="label">Total Tokens</div><div class="value amber">${(totTok/1e6).toFixed(2)}M</div></div>
      <div class="card summary-card"><div class="label">Conversations</div><div class="value">${totConv}</div></div>
    </div>
    <div class="card" style="margin-bottom:20px"><div class="section-title">Tokens & Cost Over Time</div><div class="chart-container"><canvas id="usage-chart"></canvas></div></div>
    <div class="grid-2">
      <div class="card">
        <div class="section-title">By Model</div>
        <div class="table-wrap"><table><thead><tr><th>Model</th><th>Cost</th><th>Share</th><th>Tokens</th></tr></thead><tbody>
          ${u.byModel.map(m=>`<tr><td>${m.name}</td><td>${fmtCost(m.cost)}</td><td><div class="pct-bar"><div class="pct-bar-fill" style="width:${m.pct}%"></div></div> ${m.pct}%</td><td>${fmt(m.tokens)}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="card">
        <div class="section-title">By Job</div>
        <div class="table-wrap"><table><thead><tr><th>Job</th><th>Runs</th><th>Cost</th><th>Tokens</th></tr></thead><tbody>
          ${u.byJob.map(j=>`<tr><td>${j.name}</td><td>${j.runs}</td><td>${fmtCost(j.cost)}</td><td>${fmt(j.tokens)}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
    </div>`;
};

pages.jobs = () => {
  return `<div>${MOCK.jobs.map(j=>`
    <div class="card job-card" onclick="this.classList.toggle('expanded')">
      <div class="job-header">
        <div><div class="job-name">${j.name}</div><div class="job-schedule">${j.schedule} · ${j.model}</div></div>
        <span class="expand-icon">▼</span>
      </div>
      <div class="job-meta">
        <span class="job-status ${j.lastStatus}">● ${j.lastStatus === 'success' ? 'OK' : 'Failed'}</span>
        <span>Last: ${shortTime(j.lastRun)}</span>
        <span>Next: ${shortTime(j.nextRun)}</span>
      </div>
      <div class="job-history">
        <div class="section-title" style="font-size:.85rem">Run History</div>
        <div class="table-wrap"><table><thead><tr><th>Time</th><th>Status</th><th>Duration</th><th>Summary</th></tr></thead><tbody>
          ${j.history.map(h=>`<tr><td>${shortTime(h.time)}</td><td class="job-status ${h.status}">${h.status==='success'?'✓':'✗'}</td><td>${h.duration}</td><td>${h.summary}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
    </div>`).join('')}</div>`;
};

pages.agents = () => {
  const a = MOCK.agent;
  return `
    <div class="agent-detail">
      <div class="card" style="margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
          <div class="agent-large-avatar">${a.emoji}</div>
          <div>
            <div style="font-size:1.2rem;font-weight:700"><span class="status-dot online"></span>${a.name}</div>
            <div style="color:var(--text-secondary)">${a.role} · ${a.model}</div>
          </div>
        </div>
        <div class="summary-row" style="margin-bottom:0">
          <div class="summary-card"><div class="label">Total Tokens</div><div class="value amber">${(a.totalTokens/1e6).toFixed(1)}M</div></div>
          <div class="summary-card"><div class="label">Total Cost</div><div class="value cost">${fmtCost(a.totalCost)}</div></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:20px">
        <div class="expandable-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ei').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">Skills <span class="ei">▼</span></div>
        <div class="expandable-content">${a.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
      </div>
      <div class="card" style="margin-bottom:20px">
        <div class="expandable-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ei').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">Active Jobs <span class="ei">▼</span></div>
        <div class="expandable-content"><ul class="feed">${a.activeJobs.map(j=>`<li><div class="feed-icon cron">⏰</div><div class="feed-desc">${j}</div></li>`).join('')}</ul></div>
      </div>
      <div class="card" style="opacity:.5;text-align:center;padding:40px">
        <div style="font-size:1.5rem;margin-bottom:8px">+</div>
        <div style="color:var(--text-secondary)">Add Agent (coming soon)</div>
      </div>
    </div>`;
};

pages.settings = () => {
  const s = MOCK.settings;
  const modes = {auto:'Auto',light:'Light',dark:'Dark'};
  return `
    <div style="max-width:600px">
      <div class="card setting-group">
        <h3>Configuration</h3>
        <div class="setting-row"><span class="label">Model</span><span>${s.model}</span></div>
        <div class="setting-row"><span class="label">Timezone</span><span>${s.timezone}</span></div>
        <div class="setting-row"><span class="label">Channels</span><span>${s.channels.join(', ')}</span></div>
      </div>
      <div class="card setting-group">
        <h3>Theme</h3>
        <div class="tabs" style="margin-bottom:0">
          ${['auto','light','dark'].map(m=>`<button class="tab ${themeMode===m?'active':''}" onclick="themeMode='${m}';localStorage.setItem('millie-theme','${m}');applyTheme();navigateTo('settings')">${modes[m]}</button>`).join('')}
        </div>
      </div>
      <div class="card setting-group">
        <h3>API Keys</h3>
        <button class="placeholder-btn">Configure API Keys</button>
      </div>
      <div class="card setting-group">
        <h3>Notifications</h3>
        <button class="placeholder-btn">Notification Preferences</button>
      </div>
    </div>`;
};

// ===== USAGE CHART =====
function initUsageChart(period) {
  const canvas = document.getElementById('usage-chart');
  if (!canvas) return;
  let data = MOCK.usage.daily;
  if (period === 'today') data = data.slice(-1);
  else if (period === 'week') data = data.slice(-7);
  const isDark = html.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const textColor = isDark ? '#A1A1AA' : '#71717A';
  usageChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.map(d => { const dt=new Date(d.date); return dt.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }),
      datasets: [
        { label: 'Cost ($)', data: data.map(d=>d.cost), backgroundColor: '#559CB5', borderRadius: 4, yAxisID: 'y' },
        { label: 'Tokens (K)', data: data.map(d=>d.tokens/1000), backgroundColor: 'rgba(252,181,59,.55)', borderRadius: 4, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor, font: { family: 'Inter' } } } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { position: 'left', grid: { color: gridColor }, ticks: { color: textColor, callback: v=>'$'+v } },
        y1: { position: 'right', grid: { display: false }, ticks: { color: textColor, callback: v=>v+'K' } }
      }
    }
  });
}

function switchUsage(period) {
  document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  if (usageChart) { usageChart.destroy(); usageChart = null; }
  initUsageChart(period);
}

function filterActivity() {
  const v = document.getElementById('act-type-filter').value;
  document.querySelectorAll('#activity-feed li').forEach(li => {
    li.style.display = (!v || li.dataset.type === v) ? '' : 'none';
  });
}

// Init
navigateTo('dashboard');
