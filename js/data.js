// Mock Data for Millie HQ

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
    skills: ['Email Management', 'Calendar Ops', 'Web Search', 'File Management', 'GitHub', 'Supabase', 'Microsoft 365', 'Google Workspace', 'Egnyte', 'TTS/STT'],
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
    { id: 1, name: 'Doro Budget Review', agent: 'Millie', status: 'in-progress', priority: 'high', date: '2026-02-17 10:00', due: '2026-02-18' },
    { id: 2, name: "Jac's 90-Day Review", agent: 'Millie', status: 'scheduled', priority: 'high', date: '2026-02-18 09:00', due: '2026-02-19' },
    { id: 3, name: 'Onboarding Feedback Survey', agent: 'Millie', status: 'queue', priority: 'medium', date: '2026-02-17 14:00', due: '2026-02-20' },
    { id: 4, name: 'Student Housing COO Build', agent: 'Millie', status: 'in-progress', priority: 'high', date: '2026-02-16 11:00', due: '2026-02-21' },
    { id: 5, name: 'AWS Billing Audit', agent: 'Millie', status: 'queue', priority: 'medium', date: '2026-02-17 15:00', due: '2026-02-19' },
    { id: 6, name: 'Weekly Trend Report', agent: 'Millie', status: 'done', priority: 'low', date: '2026-02-16 08:00', due: '2026-02-16' },
    { id: 7, name: 'DLR Filing — January', agent: 'Millie', status: 'done', priority: 'high', date: '2026-02-15 09:00', due: '2026-02-15' },
    { id: 8, name: 'Email Inbox Zero Sprint', agent: 'Millie', status: 'done', priority: 'medium', date: '2026-02-14 07:30', due: '2026-02-14' },
    { id: 9, name: 'Security Review Follow-up', agent: 'Millie', status: 'scheduled', priority: 'low', date: '2026-02-19 10:00', due: '2026-02-20' },
    { id: 10, name: 'Gumroad Product Listing', agent: 'Millie', status: 'queue', priority: 'medium', date: '2026-02-17 16:00', due: '2026-02-22' },
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
      id: 2, name: 'Email Cleanup', schedule: 'Daily at 7:30 AM', cron: '30 7 * * *', model: 'Claude Sonnet 4',
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
      id: 3, name: 'Weekly Trend Analysis', schedule: 'Sundays at 8:00 AM', cron: '0 8 * * 0', model: 'Claude Opus 4',
      lastStatus: 'success', lastRun: '2026-02-16 08:00', nextRun: '2026-02-23 08:00',
      history: [
        { time: '2026-02-16 08:00', status: 'success', duration: '2m 15s', summary: 'Report generated, sent via Telegram' },
        { time: '2026-02-09 08:00', status: 'success', duration: '2m 30s', summary: 'Report generated, sent via Telegram' },
        { time: '2026-02-02 08:00', status: 'success', duration: '1m 58s', summary: 'Report generated, sent via Telegram' },
      ]
    },
    {
      id: 4, name: 'Gumroad Review', schedule: 'Daily at 8:00 PM', cron: '0 20 * * *', model: 'Claude Sonnet 4',
      lastStatus: 'success', lastRun: '2026-02-16 20:00', nextRun: '2026-02-17 20:00',
      history: [
        { time: '2026-02-16 20:00', status: 'success', duration: '15s', summary: '0 new sales' },
        { time: '2026-02-15 20:00', status: 'success', duration: '18s', summary: '1 new sale ($24)' },
        { time: '2026-02-14 20:00', status: 'success', duration: '14s', summary: '0 new sales' },
        { time: '2026-02-13 20:00', status: 'success', duration: '16s', summary: '2 new sales ($47)' },
      ]
    },
    {
      id: 5, name: 'Security Review', schedule: 'Fridays at 3:00 PM', cron: '0 15 * * 5', model: 'Claude Opus 4',
      lastStatus: 'success', lastRun: '2026-02-14 15:00', nextRun: '2026-02-21 15:00',
      history: [
        { time: '2026-02-14 15:00', status: 'success', duration: '1m 10s', summary: 'No vulnerabilities found' },
        { time: '2026-02-07 15:00', status: 'success', duration: '1m 22s', summary: '1 warning: unused API key' },
      ]
    },
    {
      id: 6, name: 'Memory Audit', schedule: 'Daily at 9:00 PM', cron: '0 21 * * *', model: 'Claude Sonnet 4',
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
      { name: 'Claude Opus 4', cost: 42.15, pct: 62.6, tokens: 1_480_000 },
      { name: 'Claude Sonnet 4', cost: 18.70, pct: 27.8, tokens: 1_310_000 },
      { name: 'Claude Haiku 3.5', cost: 6.50, pct: 9.6, tokens: 630_000 },
    ],
    byJob: [
      { name: 'Morning Brief', runs: 17, cost: 7.65, tokens: 264_000 },
      { name: 'Email Cleanup', runs: 16, cost: 1.12, tokens: 39_200 },
      { name: 'Weekly Trend Analysis', runs: 3, cost: 1.56, tokens: 54_600 },
      { name: 'Gumroad Review', runs: 17, cost: 1.19, tokens: 41_600 },
      { name: 'GitHub Backup', runs: 204, cost: 0.82, tokens: 28_700 },
      { name: 'Security Review', runs: 2, cost: 0.18, tokens: 6_400 },
      { name: 'Memory Audit', runs: 17, cost: 2.55, tokens: 89_200 },
    ]
  },

  settings: {
    model: 'Claude Opus 4 (anthropic/claude-opus-4-6)',
    timezone: 'America/New_York (EST)',
    channels: ['Telegram', 'Email (courtney.assistant@risere.com)'],
  }
};
