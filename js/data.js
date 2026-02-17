// Data for Millie HQ

const MOCK = {
  agent: {
    name: 'Millie',
    emoji: '🔷',
    role: 'Executive Assistant',
    model: 'Claude Opus 4',
    status: 'online',
    lastActive: '2 min ago',
    totalTokens: 12_840_000,
    totalCost: 187.42,
    skills: [
      '1password','apple-notes','apple-reminders','bear-notes','blogwatcher','blucli','camsnap','clawhub',
      'eightctl','gemini','gifgrep','github','gog','healthcheck','himalaya','imsg','mcporter',
      'nano-banana-pro','nano-pdf','obsidian','openai-image-gen','openai-whisper','openai-whisper-api',
      'openhue','oracle','ordercli','peekaboo','skill-creator','songsee','sonoscli','summarize',
      'things-mac','video-frames','wacli','weather','accounting','business-plan','cfo','cmo','figma',
      'finance','google-home','google-workspace','linkedin-writer','microsoft-excel',
      'n8n-workflow-automation','office','pricing','proposal-writer','real-estate','seo'
    ],
    connectedApps: [
      { name: 'Microsoft 365', detail: 'Mail, Calendar, Contacts, Tasks', status: 'connected' },
      { name: 'GitHub', detail: 'C31gordon repos', status: 'connected' },
      { name: 'Telegram', detail: 'primary channel', status: 'connected' },
      { name: 'Brave Search', detail: '', status: 'connected' },
      { name: 'Deepgram', detail: 'transcription', status: 'connected' },
      { name: 'ElevenLabs', detail: 'TTS', status: 'connected' },
      { name: 'n8n', detail: 'workflow automation', status: 'connected' },
      { name: 'Egnyte', detail: 'RISE file system', status: 'limited' },
      { name: 'Google OAuth', detail: 'Expires hourly', status: 'limited' },
      { name: 'Slack', detail: '', status: 'pending' },
      { name: 'Tesla API', detail: '', status: 'pending' },
      { name: 'Google Home', detail: '', status: 'deferred' },
    ],
    activeJobs: ['Morning Brief', 'Email Cleanup', 'GitHub Backup'],
    recentTasks: ['AWS Billing Audit', 'Student Housing COO Build', 'Doro Budget Review']
  },

  summary: {
    todayCost: 4.82,
    mtdCost: 67.35,
    mtdTokens: 3_420_000,
    activeCrons: 7,
    conversations: 142
  },

  tasks: [
    // Scheduled/Backlog
    { id: 1, name: 'Student Housing COO/C-Suite Build Out', agent: 'Millie', status: 'scheduled', priority: 'high', date: '2026-02-17 08:00', due: '2026-02-18' },
    { id: 2, name: 'Puzzle Financial', agent: 'Millie', status: 'scheduled', priority: 'high', date: '2026-02-17 08:00', due: '2026-02-18' },
    { id: 3, name: 'Taxes Update', agent: 'Millie', status: 'scheduled', priority: 'high', date: '2026-02-17 08:00', due: '2026-02-19' },
    { id: 4, name: 'Post-Transplant Housing Partnership', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 5, name: 'AWS Billing Audit ($276/mo — need console access)', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 6, name: 'Deontae Career Development', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 7, name: 'GKP Stairwell Doors', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 8, name: 'Matt on 55+', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 9, name: 'Finish MCP for Claude Desktop', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 10, name: 'Shopify Store Setup', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 11, name: 'Build Real-Time Voice UI (PWA)', agent: 'Millie', status: 'scheduled', priority: 'medium', date: '2026-02-17 08:00', due: '' },
    { id: 12, name: 'Gumroad Product #2 Draft', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 13, name: 'Gumroad Product #3 Draft', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 14, name: 'LinkedIn Content Strategy (5 posts)', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 15, name: 'Micro-Course Outline', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 16, name: 'Newsletter Pilot (Substack)', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 17, name: "Typeset.com Signup (needs Courtney's payment)", agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 18, name: 'Slack Personal Workspace Setup', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 19, name: 'n8n Webhook Build (replace disabled cron)', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    { id: 20, name: 'Skill Creation Walkthrough', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-17 08:00', due: '' },
    // In Progress
    { id: 21, name: 'Millie HQ Dashboard', agent: 'Millie', status: 'in-progress', priority: 'high', date: '2026-02-17 10:00', due: '2026-02-17' },
    { id: 22, name: 'Passive Income Week Plan', agent: 'Millie', status: 'in-progress', priority: 'high', date: '2026-02-17 09:00', due: '2026-02-21' },
    { id: 23, name: 'Email Cleanup Automation (v2 — improved)', agent: 'Millie', status: 'in-progress', priority: 'medium', date: '2026-02-17 07:30', due: '' },
    { id: 24, name: 'Morning Brief v2 (new sections added)', agent: 'Millie', status: 'in-progress', priority: 'medium', date: '2026-02-17 09:00', due: '' },
    { id: 25, name: 'Model Routing Optimization', agent: 'Millie', status: 'in-progress', priority: 'medium', date: '2026-02-17 11:00', due: '' },
    { id: 26, name: 'Weekly Trend Analysis Setup', agent: 'Millie', status: 'in-progress', priority: 'medium', date: '2026-02-16 08:00', due: '' },
    { id: 27, name: 'Gumroad Weekly Review Setup', agent: 'Millie', status: 'in-progress', priority: 'low', date: '2026-02-16 20:00', due: '' },
    // Done
    { id: 28, name: 'Cleared 20+ Outlook Article Tasks', agent: 'Millie', status: 'done', priority: 'medium', date: '2026-02-17 13:00', due: '' },
    { id: 29, name: 'Doro Budget Closed', agent: 'Millie', status: 'done', priority: 'high', date: '2026-02-16 15:00', due: '' },
    { id: 30, name: 'Invoice 2298 Closed', agent: 'Millie', status: 'done', priority: 'high', date: '2026-02-16 14:00', due: '' },
    { id: 31, name: 'Valley Bank Closed', agent: 'Millie', status: 'done', priority: 'medium', date: '2026-02-16 12:00', due: '' },
    { id: 32, name: 'GKP Utilities x2 Resolved', agent: 'Millie', status: 'done', priority: 'medium', date: '2026-02-15 16:00', due: '' },
    { id: 33, name: 'Construction Annual Review Completed', agent: 'Millie', status: 'done', priority: 'medium', date: '2026-02-15 14:00', due: '' },
    { id: 34, name: 'Financial Statement Auto-Filing Added', agent: 'Millie', status: 'done', priority: 'medium', date: '2026-02-15 10:00', due: '' },
    { id: 35, name: 'RISE Brand Colors Extracted', agent: 'Millie', status: 'done', priority: 'low', date: '2026-02-14 16:00', due: '' },
    { id: 36, name: 'YouTube Video Summaries (2 videos)', agent: 'Millie', status: 'done', priority: 'low', date: '2026-02-14 12:00', due: '' },
    { id: 37, name: 'Agent Architecture Permissions Saved', agent: 'Millie', status: 'done', priority: 'low', date: '2026-02-13 18:00', due: '' },
  ],

  activity: [
    { id: 1, time: '2026-02-17 14:05', type: 'task', desc: 'Started Doro Budget Review — pulling financials from Egnyte', cost: 0.12, tokens: 4200, status: 'success' },
    { id: 2, time: '2026-02-17 13:30', type: 'email', desc: 'Filed 23 emails — Operations inbox cleanup complete', cost: 0.08, tokens: 2800, status: 'success' },
    { id: 3, time: '2026-02-17 12:00', type: 'cron', desc: 'GitHub Backup — workspace pushed to millie-workspace repo', cost: 0.03, tokens: 1100, status: 'success' },
    { id: 4, time: '2026-02-17 09:00', type: 'cron', desc: 'Morning Brief delivered — 3 calendar events, 12 priority emails', cost: 0.45, tokens: 15600, status: 'success' },
    { id: 5, time: '2026-02-17 07:30', type: 'email', desc: 'Email Cleanup cron — moved 8 newsletters to archive', cost: 0.06, tokens: 2100, status: 'success' },
    { id: 6, time: '2026-02-16 21:00', type: 'cron', desc: 'Memory Audit — consolidated 3 daily files, updated MEMORY.md', cost: 0.15, tokens: 5200, status: 'success' },
    { id: 7, time: '2026-02-16 17:00', type: 'task', desc: 'Completed Weekly Trend Report — sent to Courtney via Telegram', cost: 0.52, tokens: 18400, status: 'success' },
    { id: 8, time: '2026-02-16 14:30', type: 'search', desc: 'Web research: Student housing market trends Q1 2026', cost: 0.22, tokens: 7600, status: 'success' },
    { id: 9, time: '2026-02-16 09:00', type: 'cron', desc: 'Morning Brief delivered — 5 calendar events, 8 priority emails', cost: 0.41, tokens: 14200, status: 'success' },
    { id: 10, time: '2026-02-15 16:00', type: 'task', desc: 'DLR Filing — January submitted to compliance portal', cost: 0.38, tokens: 13100, status: 'success' },
    { id: 11, time: '2026-02-15 10:00', type: 'email', desc: 'Financial statement filings — 4 documents uploaded to Egnyte', cost: 0.18, tokens: 6300, status: 'success' },
    { id: 12, time: '2026-02-15 09:00', type: 'cron', desc: 'Morning Brief delivered — 2 calendar events, 15 priority emails', cost: 0.48, tokens: 16800, status: 'success' },
    { id: 13, time: '2026-02-14 15:00', type: 'cron', desc: 'Security Review — no vulnerabilities found, all clear', cost: 0.09, tokens: 3200, status: 'success' },
    { id: 14, time: '2026-02-14 11:00', type: 'task', desc: 'Email Inbox Zero Sprint — cleared 47 emails in 12 minutes', cost: 0.31, tokens: 10800, status: 'success' },
    { id: 15, time: '2026-02-13 20:00', type: 'cron', desc: 'Gumroad Review — 2 new sales ($47), updated tracking sheet', cost: 0.07, tokens: 2400, status: 'success' },
  ],

  jobs: [
    {
      id: 1, name: 'Morning Brief', schedule: 'Daily at 9:00 AM', cron: '0 9 * * *', model: 'Claude Opus 4',
      lastStatus: 'success', lastRun: '2026-02-17 09:00', nextRun: '2026-02-18 09:00',
      history: [
        { time: '2026-02-17 09:00', status: 'success', duration: '45s', summary: '3 events, 12 priority emails' },
        { time: '2026-02-16 09:00', status: 'success', duration: '52s', summary: '5 events, 8 priority emails' },
        { time: '2026-02-15 09:00', status: 'success', duration: '38s', summary: '2 events, 15 priority emails' },
        { time: '2026-02-14 09:00', status: 'success', duration: '41s', summary: '4 events, 6 priority emails' },
        { time: '2026-02-13 09:00', status: 'success', duration: '47s', summary: '3 events, 11 priority emails' },
      ]
    },
    {
      id: 2, name: 'Email Cleanup', schedule: 'Daily at 7:30 AM', cron: '30 7 * * *', model: 'GPT-4.1-mini',
      lastStatus: 'success', lastRun: '2026-02-17 07:30', nextRun: '2026-02-18 07:30',
      history: [
        { time: '2026-02-17 07:30', status: 'success', duration: '22s', summary: '8 newsletters archived' },
        { time: '2026-02-16 07:30', status: 'success', duration: '18s', summary: '5 newsletters archived' },
        { time: '2026-02-15 07:30', status: 'success', duration: '25s', summary: '12 newsletters archived' },
        { time: '2026-02-14 07:30', status: 'failed', duration: '8s', summary: 'Graph API token expired' },
        { time: '2026-02-13 07:30', status: 'success', duration: '20s', summary: '7 newsletters archived' },
      ]
    },
    {
      id: 3, name: 'Weekly Trend Analysis', schedule: 'Sundays at 8:00 AM', cron: '0 8 * * 0', model: 'GPT-4.1',
      lastStatus: 'success', lastRun: '2026-02-16 08:00', nextRun: '2026-02-23 08:00',
      history: [
        { time: '2026-02-16 08:00', status: 'success', duration: '2m 15s', summary: 'Report generated, sent via Telegram' },
        { time: '2026-02-09 08:00', status: 'success', duration: '2m 30s', summary: 'Report generated, sent via Telegram' },
        { time: '2026-02-02 08:00', status: 'success', duration: '1m 58s', summary: 'Report generated, sent via Telegram' },
      ]
    },
    {
      id: 4, name: 'Gumroad Review', schedule: 'Daily at 8:00 PM', cron: '0 20 * * *', model: 'GPT-4.1',
      lastStatus: 'success', lastRun: '2026-02-16 20:00', nextRun: '2026-02-17 20:00',
      history: [
        { time: '2026-02-16 20:00', status: 'success', duration: '15s', summary: '0 new sales' },
        { time: '2026-02-15 20:00', status: 'success', duration: '18s', summary: '1 new sale ($24)' },
        { time: '2026-02-14 20:00', status: 'success', duration: '14s', summary: '0 new sales' },
        { time: '2026-02-13 20:00', status: 'success', duration: '16s', summary: '2 new sales ($47)' },
      ]
    },
    {
      id: 5, name: 'Security Review', schedule: 'Fridays at 3:00 PM', cron: '0 15 * * 5', model: 'GPT-4.1-mini',
      lastStatus: 'success', lastRun: '2026-02-14 15:00', nextRun: '2026-02-21 15:00',
      history: [
        { time: '2026-02-14 15:00', status: 'success', duration: '1m 10s', summary: 'No vulnerabilities found' },
        { time: '2026-02-07 15:00', status: 'success', duration: '1m 22s', summary: '1 warning: unused API key' },
      ]
    },
    {
      id: 6, name: 'Memory Audit', schedule: 'Daily at 9:00 PM', cron: '0 21 * * *', model: 'GPT-4.1',
      lastStatus: 'success', lastRun: '2026-02-16 21:00', nextRun: '2026-02-17 21:00',
      history: [
        { time: '2026-02-16 21:00', status: 'success', duration: '30s', summary: '3 files consolidated' },
        { time: '2026-02-15 21:00', status: 'success', duration: '25s', summary: '1 file consolidated' },
        { time: '2026-02-14 21:00', status: 'success', duration: '28s', summary: '2 files consolidated' },
      ]
    },
    {
      id: 7, name: 'GitHub Backup', schedule: 'Every 2 hours', cron: '0 */2 * * *', model: 'Claude Haiku 3.5',
      lastStatus: 'success', lastRun: '2026-02-17 12:00', nextRun: '2026-02-17 14:00',
      history: [
        { time: '2026-02-17 12:00', status: 'success', duration: '8s', summary: 'Pushed to millie-workspace' },
        { time: '2026-02-17 10:00', status: 'success', duration: '7s', summary: 'Pushed to millie-workspace' },
        { time: '2026-02-17 08:00', status: 'success', duration: '9s', summary: 'Pushed to millie-workspace' },
        { time: '2026-02-17 06:00', status: 'success', duration: '7s', summary: 'No changes to push' },
        { time: '2026-02-17 04:00', status: 'success', duration: '7s', summary: 'No changes to push' },
      ]
    },
  ],

  usage: {
    today: {
      daily: [{ date: '2026-02-17', cost: 4.82, tokens: 168000, conversations: 11 }],
      byModel: [
        { name: 'Claude Opus 4', cost: 3.20, pct: 66.4, tokens: 98_000 },
        { name: 'GPT-4.1-mini', cost: 0.42, pct: 8.7, tokens: 38_000 },
        { name: 'GPT-4.1', cost: 0.88, pct: 18.3, tokens: 24_000 },
        { name: 'Claude Haiku 3.5', cost: 0.32, pct: 6.6, tokens: 8_000 },
      ],
      byJob: [
        { name: 'Morning Brief', runs: 1, cost: 0.45, tokens: 15_600 },
        { name: 'Email Cleanup', runs: 1, cost: 0.06, tokens: 2_100 },
        { name: 'GitHub Backup', runs: 4, cost: 0.12, tokens: 4_400 },
        { name: 'Direct Chat', runs: 5, cost: 4.19, tokens: 145_900 },
      ],
      totCost: 4.82, totTokens: 168000, totConv: 11
    },
    week: {
      daily: [
        { date: '2026-02-11', cost: 3.20, tokens: 112000, conversations: 8 },
        { date: '2026-02-12', cost: 5.10, tokens: 178000, conversations: 14 },
        { date: '2026-02-13', cost: 4.80, tokens: 168000, conversations: 12 },
        { date: '2026-02-14', cost: 6.20, tokens: 217000, conversations: 18 },
        { date: '2026-02-15', cost: 5.50, tokens: 192000, conversations: 15 },
        { date: '2026-02-16', cost: 7.30, tokens: 255000, conversations: 22 },
        { date: '2026-02-17', cost: 4.82, tokens: 168000, conversations: 11 },
      ],
      byModel: [
        { name: 'Claude Opus 4', cost: 23.10, pct: 62.6, tokens: 812_000 },
        { name: 'GPT-4.1-mini', cost: 4.20, pct: 11.4, tokens: 294_000 },
        { name: 'GPT-4.1', cost: 7.52, pct: 20.4, tokens: 264_000 },
        { name: 'Claude Haiku 3.5', cost: 2.10, pct: 5.7, tokens: 120_000 },
      ],
      byJob: [
        { name: 'Morning Brief', runs: 7, cost: 3.15, tokens: 108_000 },
        { name: 'Email Cleanup', runs: 7, cost: 0.42, tokens: 14_700 },
        { name: 'Weekly Trend Analysis', runs: 1, cost: 0.52, tokens: 18_200 },
        { name: 'Gumroad Review', runs: 7, cost: 0.49, tokens: 17_150 },
        { name: 'GitHub Backup', runs: 84, cost: 0.34, tokens: 11_900 },
        { name: 'Security Review', runs: 1, cost: 0.09, tokens: 3_200 },
        { name: 'Memory Audit', runs: 7, cost: 1.05, tokens: 36_750 },
      ],
      totCost: 36.92, totTokens: 1_290_000, totConv: 100
    },
    month: {
      daily: [
        { date: '2026-02-01', cost: 4.10, tokens: 143000, conversations: 10 },
        { date: '2026-02-02', cost: 3.80, tokens: 133000, conversations: 9 },
        { date: '2026-02-03', cost: 5.40, tokens: 189000, conversations: 16 },
        { date: '2026-02-04', cost: 4.20, tokens: 147000, conversations: 11 },
        { date: '2026-02-05', cost: 3.60, tokens: 126000, conversations: 8 },
        { date: '2026-02-06', cost: 5.80, tokens: 203000, conversations: 17 },
        { date: '2026-02-07', cost: 4.50, tokens: 157000, conversations: 13 },
        { date: '2026-02-08', cost: 2.90, tokens: 101000, conversations: 7 },
        { date: '2026-02-09', cost: 3.10, tokens: 108000, conversations: 8 },
        { date: '2026-02-10', cost: 4.70, tokens: 164000, conversations: 14 },
        { date: '2026-02-11', cost: 3.20, tokens: 112000, conversations: 8 },
        { date: '2026-02-12', cost: 5.10, tokens: 178000, conversations: 14 },
        { date: '2026-02-13', cost: 4.80, tokens: 168000, conversations: 12 },
        { date: '2026-02-14', cost: 6.20, tokens: 217000, conversations: 18 },
        { date: '2026-02-15', cost: 5.50, tokens: 192000, conversations: 15 },
        { date: '2026-02-16', cost: 7.30, tokens: 255000, conversations: 22 },
        { date: '2026-02-17', cost: 4.82, tokens: 168000, conversations: 11 },
      ],
      byModel: [
        { name: 'Claude Opus 4', cost: 42.15, pct: 48.2, tokens: 1_480_000 },
        { name: 'GPT-4.1-mini', cost: 9.80, pct: 11.2, tokens: 686_000 },
        { name: 'GPT-4.1', cost: 22.40, pct: 25.6, tokens: 784_000 },
        { name: 'Claude Haiku 3.5', cost: 6.50, pct: 7.4, tokens: 630_000 },
        { name: 'Claude Sonnet 4', cost: 6.50, pct: 7.4, tokens: 455_000 },
      ],
      byJob: [
        { name: 'Morning Brief', runs: 17, cost: 7.65, tokens: 264_000 },
        { name: 'Email Cleanup', runs: 16, cost: 1.12, tokens: 39_200 },
        { name: 'Weekly Trend Analysis', runs: 3, cost: 1.56, tokens: 54_600 },
        { name: 'Gumroad Review', runs: 17, cost: 1.19, tokens: 41_600 },
        { name: 'GitHub Backup', runs: 204, cost: 0.82, tokens: 28_700 },
        { name: 'Security Review', runs: 2, cost: 0.18, tokens: 6_400 },
        { name: 'Memory Audit', runs: 17, cost: 2.55, tokens: 89_200 },
      ],
      totCost: 89.02, totTokens: 3_140_000, totConv: 213
    }
  },

  modelRouting: [
    { job: 'Morning Brief', model: 'Claude Opus', costPerRun: '$0.45', reason: 'Strategic — calendar + priority synthesis' },
    { job: 'Email Cleanup', model: 'GPT-4.1-mini', costPerRun: '$0.06', reason: 'Routine — pattern matching + archiving' },
    { job: 'Security Review', model: 'GPT-4.1-mini', costPerRun: '$0.09', reason: 'Routine — checklist-based scan' },
    { job: 'Memory Audit', model: 'GPT-4.1', costPerRun: '$0.15', reason: 'Moderate — file consolidation + summarization' },
    { job: 'Trend Analysis', model: 'GPT-4.1', costPerRun: '$0.52', reason: 'Research — multi-source analysis' },
    { job: 'Gumroad Review', model: 'GPT-4.1', costPerRun: '$0.07', reason: 'Research — sales data analysis' },
    { job: 'Direct Chat', model: 'Claude Opus', costPerRun: '$0.40', reason: 'Executive work — complex reasoning' },
  ],

  settings: {
    model: 'Claude Opus 4 (anthropic/claude-opus-4-6)',
    timezone: 'America/New_York (EST)',
    channels: ['Telegram', 'Email (courtney.assistant@risere.com)'],
  }
};
