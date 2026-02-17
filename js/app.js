// ===== THEME =====
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
let themeMode = localStorage.getItem('millie-theme') || 'auto';

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
  const titles = { dashboard:'Dashboard', tasks:'Tasks', activity:'Activity', usage:'Usage', jobs:'Cron Jobs', agents:'Agents', settings:'Settings' };
  pageTitle.textContent = titles[page] || page;
  if (usageChart) { usageChart.destroy(); usageChart = null; }
  content.innerHTML = pages[page]();
  if (page === 'usage') initUsageChart('month');
  if (page === 'tasks') initDragAndDrop();
}

// ===== HELPERS =====
const fmt = n => n.toLocaleString();
const fmtCost = n => '$' + n.toFixed(2);
const typeIcon = t => ({email:'✉️',task:'📋',cron:'⏰',search:'🔍'}[t]||'•');
const typeClass = t => ({email:'email',task:'task',cron:'cron',search:'search'}[t]||'');
const shortTime = s => { const d=new Date(s); return d.toLocaleString('en-US',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}); };
const statusLabels = { scheduled:'Scheduled', queue:'Queue', 'in-progress':'In Progress', done:'Done' };

// ===== NEW TASK MODAL =====
function openNewTaskModal() {
  document.getElementById('new-task-modal').classList.add('show');
}
function closeNewTaskModal() {
  document.getElementById('new-task-modal').classList.remove('show');
  document.getElementById('new-task-form').reset();
}
document.getElementById('new-task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nt-name').value.trim();
  if (!name) return;
  const newTask = {
    id: Date.now(),
    name: name,
    description: document.getElementById('nt-desc').value.trim(),
    agent: document.getElementById('nt-agent').value,
    status: document.getElementById('nt-status').value,
    priority: document.getElementById('nt-priority').value,
    date: new Date().toISOString().slice(0,16).replace('T',' '),
    due: document.getElementById('nt-due').value || ''
  };
  MOCK.tasks.push(newTask);
  closeNewTaskModal();
  navigateTo('tasks');
});

// ===== TASK DETAIL MODAL =====
function openTaskDetail(taskId) {
  const task = MOCK.tasks.find(t => t.id === taskId);
  if (!task) return;
  document.getElementById('td-name').textContent = task.name;
  document.getElementById('td-desc').textContent = task.description || 'No description available.';
  document.getElementById('td-priority').innerHTML = `<span class="priority ${task.priority}"></span> ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;
  document.getElementById('td-status').textContent = statusLabels[task.status] || task.status;
  document.getElementById('td-agent').textContent = task.agent;
  document.getElementById('td-due').textContent = task.due || 'None';
  document.getElementById('task-detail-modal').classList.add('show');
}
function closeTaskDetail() {
  document.getElementById('task-detail-modal').classList.remove('show');
}
document.getElementById('task-detail-modal').addEventListener('click', function(e) {
  if (e.target === this) closeTaskDetail();
});

// ===== DRAG AND DROP (between columns + reorder within) =====
let draggedTaskId = null;

function initDragAndDrop() {
  document.querySelectorAll('.task-card[draggable]').forEach(card => {
    card.addEventListener('dragstart', e => {
      draggedTaskId = parseInt(e.target.dataset.taskId);
      e.target.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', e => {
      e.target.style.opacity = '1';
      document.querySelectorAll('.kanban-col').forEach(c => c.style.background = '');
      document.querySelectorAll('.task-card.drag-over').forEach(c => c.classList.remove('drag-over'));
    });
    // Allow dropping on other cards for reordering
    card.addEventListener('dragover', e => {
      e.preventDefault();
      e.stopPropagation();
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', e => {
      card.classList.remove('drag-over');
    });
    card.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation();
      card.classList.remove('drag-over');
      const targetId = parseInt(card.dataset.taskId);
      const targetTask = MOCK.tasks.find(t => t.id === targetId);
      const draggedTask = MOCK.tasks.find(t => t.id === draggedTaskId);
      if (!targetTask || !draggedTask) return;
      // Move dragged task to target's status
      draggedTask.status = targetTask.status;
      // Reorder: remove dragged, insert before target
      const dragIdx = MOCK.tasks.indexOf(draggedTask);
      MOCK.tasks.splice(dragIdx, 1);
      const targetIdx = MOCK.tasks.indexOf(targetTask);
      // Insert based on mouse position
      const rect = card.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const insertIdx = e.clientY < midY ? targetIdx : targetIdx + 1;
      MOCK.tasks.splice(insertIdx, 0, draggedTask);
      navigateTo('tasks');
    });
  });
  document.querySelectorAll('.kanban-col').forEach(col => {
    col.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      col.style.background = 'var(--bg-hover)';
    });
    col.addEventListener('dragleave', e => {
      col.style.background = '';
    });
    col.addEventListener('drop', e => {
      e.preventDefault();
      col.style.background = '';
      const newStatus = col.dataset.status;
      const task = MOCK.tasks.find(t => t.id === draggedTaskId);
      if (task && newStatus) {
        task.status = newStatus;
        navigateTo('tasks');
      }
    });
  });
}

// ===== NOTIFICATION PREFERENCES =====
function getNotifPrefs() {
  const defaults = {
    morningBrief: true,
    emailCleanup: true,
    cronFailures: true,
    weeklyDigests: true,
    birthdayReminders: true,
    taskDueReminders: true
  };
  try {
    const stored = JSON.parse(localStorage.getItem('millie-notif-prefs'));
    return stored ? { ...defaults, ...stored } : defaults;
  } catch { return defaults; }
}
function setNotifPref(key, val) {
  const prefs = getNotifPrefs();
  prefs[key] = val;
  localStorage.setItem('millie-notif-prefs', JSON.stringify(prefs));
}

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
          <div class="agent-avatar"><img src="img/millie-logo.jpg" alt="Millie" style="width:100%;height:100%;border-radius:12px;object-fit:cover"></div>
          <div class="agent-info">
            <div class="name"><span class="status-dot online"></span>${a.name}</div>
            <div class="meta">${a.model} · Last active ${a.lastActive}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">Top Tasks</div>
        <ul class="feed">
          ${topTasks.map(t=>`<li style="cursor:pointer" onclick="openTaskDetail(${t.id})"><div class="feed-icon task">${typeIcon('task')}</div><div class="feed-desc"><div>${t.name}</div><div class="time"><span class="priority ${t.priority}"></span> ${t.priority}${t.due ? ' · Due '+t.due : ''}</div></div></li>`).join('')}
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
      <button class="primary" onclick="openNewTaskModal()">+ New Task</button>
    </div>
    <div class="kanban">
      ${cols.map(col => {
        const tasks = MOCK.tasks.filter(t=>t.status===col);
        return `<div class="kanban-col" data-status="${col}"><div class="kanban-col-header">${labels[col]} <span class="count">${tasks.length}</span></div>${tasks.map(t=>`
          <div class="task-card" draggable="true" data-task-id="${t.id}" onclick="openTaskDetail(${t.id})"><div class="task-name"><span class="priority ${t.priority}"></span> ${t.name}</div><div class="task-meta"><span>${t.agent}</span>${t.due ? '<span>Due '+t.due+'</span>' : ''}</div></div>`).join('')}</div>`;
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
  const u = MOCK.usage.month;
  return `
    <div class="tabs" id="usage-tabs">
      <button class="tab" onclick="switchUsage('today')">Today</button>
      <button class="tab" onclick="switchUsage('week')">This Week</button>
      <button class="tab active" onclick="switchUsage('month')">This Month</button>
    </div>
    <div id="usage-content">${renderUsageContent(u)}</div>
    <div class="card" style="margin-top:20px">
      <div class="section-title">🧭 Model Routing</div>
      <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:12px">Smart routing sends each job to the most cost-effective model for the task complexity.</p>
      <div class="table-wrap"><table><thead><tr><th>Job/Task Type</th><th>Model Used</th><th>Cost/Run</th><th>Reason</th></tr></thead><tbody>
        ${MOCK.modelRouting.map(r=>`<tr><td>${r.job}</td><td>${r.model}</td><td>${r.costPerRun}</td><td>${r.reason}</td></tr>`).join('')}
      </tbody></table></div>
      <div style="margin-top:12px;padding:12px;background:var(--bg-input);border-radius:8px;font-size:.85rem">
        <strong>💰 Estimated Monthly Savings:</strong> ~$38/mo by routing routine tasks to GPT-4.1-mini instead of Claude Opus
      </div>
    </div>`;
};

function renderUsageContent(u) {
  return `
    <div class="summary-row">
      <div class="card summary-card"><div class="label">Total Cost</div><div class="value cost">${fmtCost(u.totCost)}</div></div>
      <div class="card summary-card"><div class="label">Total Tokens</div><div class="value amber">${(u.totTokens/1e6).toFixed(2)}M</div></div>
      <div class="card summary-card"><div class="label">Conversations</div><div class="value">${u.totConv}</div></div>
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
        <div class="section-title">By Cron Job</div>
        <div class="table-wrap"><table><thead><tr><th>Job</th><th>Runs</th><th>Cost</th><th>Tokens</th></tr></thead><tbody>
          ${u.byJob.map(j=>`<tr><td>${j.name}</td><td>${j.runs}</td><td>${fmtCost(j.cost)}</td><td>${fmt(j.tokens)}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
    </div>`;
}

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
  const statusIcon = s => s === 'connected' ? '✅' : s === 'limited' ? '⚠️' : s === 'pending' ? '❌' : '❌';
  const statusLabel = s => s === 'connected' ? 'Connected' : s === 'limited' ? 'Limited' : s === 'pending' ? 'Pending' : 'Deferred';
  return `
    <div style="margin-bottom:20px">
      <select style="padding:8px 16px;border-radius:8px;border:1px solid var(--border);background:var(--bg-input);color:var(--text);font-size:.9rem;font-weight:600">
        <option>◆ Millie</option>
        <option disabled>+ Add Agent (coming soon)</option>
      </select>
      <span style="color:var(--text-secondary);font-size:.8rem;margin-left:8px">Multi-agent ready</span>
    </div>
    <div class="agent-detail">
      <div class="card" style="margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
          <div class="agent-large-avatar"><img src="img/millie-logo.jpg" alt="Millie" style="width:100%;height:100%;border-radius:16px;object-fit:cover"></div>
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
        <div class="expandable-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ei').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">Skills (${a.skills.length}) <span class="ei">▼</span></div>
        <div class="expandable-content">${a.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('')}</div>
      </div>
      <div class="card" style="margin-bottom:20px">
        <div class="expandable-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ei').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">Connected Apps (${a.connectedApps.length}) <span class="ei">▼</span></div>
        <div class="expandable-content">
          <div class="table-wrap"><table><thead><tr><th>App</th><th>Details</th><th>Status</th></tr></thead><tbody>
            ${a.connectedApps.map(app=>`<tr><td><strong>${app.name}</strong></td><td style="color:var(--text-secondary)">${app.detail}</td><td>${statusIcon(app.status)} ${statusLabel(app.status)}</td></tr>`).join('')}
          </tbody></table></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:20px">
        <div class="expandable-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ei').textContent=this.nextElementSibling.classList.contains('open')?'▲':'▼'">Active Cron Jobs (${a.activeJobs.length}) <span class="ei">▼</span></div>
        <div class="expandable-content"><ul class="feed">${a.activeJobs.map(j=>`<li><div class="feed-icon cron">⏰</div><div class="feed-desc">${j}</div></li>`).join('')}</ul></div>
      </div>
    </div>`;
};

pages.settings = () => {
  const s = MOCK.settings;
  const modes = {auto:'Auto',light:'Light',dark:'Dark'};
  const prefs = getNotifPrefs();
  const toggle = (key, label, note) => {
    const checked = prefs[key] ? 'checked' : '';
    return `<div class="setting-row"><span><span class="label">${label}</span>${note ? '<br><span style="font-size:.75rem;color:var(--text-secondary)">'+note+'</span>' : ''}</span><label class="toggle-switch"><input type="checkbox" ${checked} onchange="setNotifPref('${key}',this.checked)"><span class="toggle-slider"></span></label></div>`;
  };
  const integrations = [
    { name: 'Microsoft 365', status: 'Connected' },
    { name: 'GitHub', status: 'Connected' },
    { name: 'Telegram', status: 'Connected' },
    { name: 'Brave Search', status: 'Connected' },
    { name: 'Deepgram', status: 'Connected' },
    { name: 'ElevenLabs', status: 'Connected' },
    { name: 'n8n', status: 'Connected' },
    { name: 'Egnyte', status: 'Connected' },
    { name: 'Google OAuth', status: 'Connected' },
    { name: 'Slack', status: 'Pending' },
    { name: 'Tesla API', status: 'Pending' },
    { name: 'Google Home', status: 'Pending' },
  ];
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
        <h3>🔒 API Keys & Secrets</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:16px;line-height:1.5">API keys and secrets are stored securely in environment variables on the host machine (<code>~/.openclaw/workspace/.env.m365</code>, <code>~/.bashrc</code>, etc.). They are never stored in the dashboard for security.</p>
        <div class="table-wrap"><table><thead><tr><th>Integration</th><th>Status</th></tr></thead><tbody>
          ${integrations.map(i=>`<tr><td>${i.name}</td><td><span style="color:${i.status==='Connected'?'var(--green)':'var(--amber)'}">${i.status==='Connected'?'✅':'⏳'} ${i.status}</span></td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="card setting-group">
        <h3>📬 Notification Preferences</h3>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:12px">All notifications delivered via Telegram. Preferences saved locally.</p>
        ${toggle('morningBrief', 'Morning Brief delivery', 'Daily summary at 7 AM weekdays')}
        ${toggle('emailCleanup', 'Email Cleanup reports', 'Only when 3+ emails processed')}
        ${toggle('cronFailures', 'Cron job failure alerts', 'Recommended: always on')}
        ${toggle('weeklyDigests', 'Weekly digests', 'Trend Analysis & Gumroad Review')}
        ${toggle('birthdayReminders', 'Birthday reminders', 'Elijah (Mar 14), Gabby (Apr 27)')}
        ${toggle('taskDueReminders', 'Task due date reminders', 'Alert when tasks are due')}
      </div>
    </div>`;
};

// ===== USAGE CHART =====
function initUsageChart(period) {
  const canvas = document.getElementById('usage-chart');
  if (!canvas) return;
  const data = MOCK.usage[period].daily;
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
  document.querySelectorAll('#usage-tabs .tab').forEach(t=>t.classList.remove('active'));
  event.target.classList.add('active');
  if (usageChart) { usageChart.destroy(); usageChart = null; }
  const u = MOCK.usage[period];
  document.getElementById('usage-content').innerHTML = renderUsageContent(u);
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
