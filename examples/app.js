/* All fixtures are fictional. Demo actions change memory only. */
const requests = [
  { id: 'SUP-1043', subject: 'Shared inbox access for the design team', status: 'Open', priority: 'High', owner: 'Alex Morgan', date: 'Oct 23', organization: 'Cedar Studio' },
  { id: 'SUP-1042', subject: 'Replace the meeting-room display cable', status: 'In progress', priority: 'Normal', owner: 'Sam Patel', date: 'Oct 23', organization: 'Birch Workshop' },
  { id: 'SUP-1041', subject: 'Update billing contact for next month', status: 'Open', priority: 'Normal', owner: 'Jamie Reed', date: 'Oct 22', organization: 'Maple Collective' },
  { id: 'SUP-1040', subject: 'Review the onboarding checklist', status: 'In progress', priority: 'Normal', owner: 'Alex Morgan', date: 'Oct 22', organization: 'Cedar Studio' },
  { id: 'SUP-1039', subject: 'Restore access to the sample archive', status: 'Open', priority: 'High', owner: 'Unassigned', date: 'Oct 21', organization: 'Birch Workshop' },
  { id: 'SUP-1038', subject: 'Confirm delivery of replacement keyboards', status: 'Resolved', priority: 'Normal', owner: 'Sam Patel', date: 'Oct 21', organization: 'Maple Collective' },
  { id: 'SUP-1037', subject: 'Adjust the weekly report schedule', status: 'Resolved', priority: 'Normal', owner: 'Jamie Reed', date: 'Oct 20', organization: 'Cedar Studio' },
];
const orders = [
  { id: 'ORD-2086', subject: 'Desk organizer set', organization: 'Birch Workshop', amount: 248, status: 'Queued', owner: 'Jamie Reed', date: 'Oct 23' },
  { id: 'ORD-2085', subject: 'Meeting notebook bundle', organization: 'Maple Collective', amount: 1260, status: 'Processing', owner: 'Alex Morgan', date: 'Oct 23' },
  { id: 'ORD-2084', subject: 'Portable desk lamp', organization: 'Cedar Studio', amount: 475.5, status: 'Shipped', owner: 'Sam Patel', date: 'Oct 22' },
  { id: 'ORD-2083', subject: 'Cable management kit', organization: 'Birch Workshop', amount: 96, status: 'Queued', owner: 'Jamie Reed', date: 'Oct 22' },
  { id: 'ORD-2082', subject: 'Adjustable laptop stand', organization: 'Maple Collective', amount: 836, status: 'Processing', owner: 'Alex Morgan', date: 'Oct 21' },
  { id: 'ORD-2081', subject: 'Team stationery refill', organization: 'Cedar Studio', amount: 182.75, status: 'Shipped', owner: 'Sam Patel', date: 'Oct 20' },
];
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const className = value => value.toLowerCase().replaceAll(' ', '-');
const badge = value => `<span class="badge ${className(value)}">${escapeHTML(value)}</span>`;
const initials = name => name === 'Unassigned' ? '—' : name.split(' ').map(part => part[0]).join('');
const person = name => `<span class="person"><span class="avatar" aria-hidden="true">${initials(name)}</span>${escapeHTML(name)}</span>`;
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
let currentView = 'support';
let selected = new Set();
let detailComplete = false;
let toastTimer;
let dialogOpener;
let saveGeneration = 0;

function announce(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 4000);
}

function visibleRecords() {
  const query = $('#search').value.trim().toLowerCase();
  const status = $('#status-filter').value;
  return (currentView === 'support' ? requests : orders).filter(record =>
    Object.values(record).join(' ').toLowerCase().includes(query) && (!status || record.status === status));
}

function renderSummary() {
  let items;
  if (currentView === 'support') {
    items = [
      ['Open requests', requests.filter(r => r.status === 'Open').length, 'Ready for a next action'],
      ['In progress', requests.filter(r => r.status === 'In progress').length, 'Assigned and being handled'],
      ['High priority', requests.filter(r => r.priority === 'High' && r.status !== 'Resolved').length, 'Review these requests first'],
    ];
  } else {
    items = [
      ['Queued', orders.filter(r => r.status === 'Queued').length, 'Awaiting preparation'],
      ['Processing', orders.filter(r => r.status === 'Processing').length, 'Being prepared for delivery'],
      ['Shipped', orders.filter(r => r.status === 'Shipped').length, 'Handed over for delivery'],
    ];
  }
  $('#summary').innerHTML = items.map(([label, value, hint]) => `<div class="summary-item"><dl class="summary-top"><dt>${label}</dt><dd>${value}</dd></dl><p>${hint}</p></div>`).join('');
  $('[data-view="support"] span').textContent = String(requests.length).padStart(2, '0');
}

function renderTable() {
  const focused = document.activeElement;
  const focusSelector = focused?.dataset.select ? `[data-select="${focused.dataset.select}"]` : focused?.id === 'select-all' ? '#select-all' : null;
  const records = visibleRecords();
  const support = currentView === 'support';
  const mode = $('#state-preview').value;
  const state = mode !== 'normal' ? mode : records.length === 0 ? 'empty' : 'normal';
  const visibleIds = new Set(records.map(r => r.id));
  selected = new Set([...selected].filter(id => visibleIds.has(id)));
  $('#record-count').textContent = state === 'normal' ? `${records.length} ${support ? 'requests' : 'orders'}` : state === 'loading' ? 'Loading records' : state === 'error' ? 'Previewing an error' : 'No results';
  $('#selected-count').textContent = selected.size ? `${selected.size} selected` : '';
  $('#bulk-assign').disabled = selected.size === 0 || state !== 'normal';
  $('.bulk-actions').hidden = !support;
  $('#table-region').hidden = state !== 'normal';
  $('#table-state').hidden = state === 'normal';
  if (state !== 'normal') {
    $('#table-state').setAttribute('aria-busy', String(state === 'loading'));
    if (state === 'loading') {
      $('#table-state').innerHTML = '<span class="sr-only">Loading sample records</span><div class="skeleton-list" aria-hidden="true">' + Array.from({ length: 5 }, () => '<div class="skeleton-line"><span></span><span></span><span></span><span></span></div>').join('') + '</div>';
    } else if (state === 'error') {
      $('#table-state').innerHTML = '<h3>Records could not be loaded</h3><p>This is a simulated error. Your sample records are still available.</p><button class="button" type="button" data-reset>Try again</button>';
    } else {
      $('#table-state').innerHTML = '<h3>No matching records</h3><p>Try a different search or reset the current filters.</p><button class="button" type="button" data-reset>Clear filters</button>';
    }
    return;
  }
  const checkbox = support ? '<th scope="col" class="checkbox-cell"><label class="checkbox-wrap"><input id="select-all" type="checkbox" aria-label="Select all visible requests"></label></th>' : '';
  const columns = support ? ['Request', 'Subject', 'Status', 'Priority', 'Assignee', 'Updated'] : ['Order', 'Item / organization', 'Amount', 'Status', 'Owner', 'Created'];
  $('#table-head').innerHTML = `<tr>${checkbox}${columns.map(name => `<th scope="col"${name === 'Amount' ? ' class="amount"' : ''}>${name}</th>`).join('')}<th scope="col"><span class="sr-only">Actions</span></th></tr>`;
  $('#table-body').innerHTML = records.map(record => {
    const checked = selected.has(record.id);
    const first = support ? `<td class="checkbox-cell"><label class="checkbox-wrap"><input type="checkbox" data-select="${record.id}" aria-label="Select ${record.id}" ${checked ? 'checked' : ''}></label></td>` : '';
    const cells = support
      ? `<td class="subject">${escapeHTML(record.subject)}</td><td>${badge(record.status)}</td><td>${badge(record.priority)}</td>`
      : `<td class="subject">${escapeHTML(record.subject)}<span class="organization-name">${escapeHTML(record.organization)}</span></td><td class="amount">${money(record.amount)}</td><td>${badge(record.status)}</td>`;
    return `<tr data-selected="${checked}">${first}<td class="record-id">${record.id}</td>${cells}<td>${person(record.owner)}</td><td class="date">${record.date}</td><td><button type="button" class="button subtle row-action" data-inspect="${record.id}" aria-label="View details for ${record.id}">Details</button></td></tr>`;
  }).join('');
  if (support) {
    $('#select-all').checked = records.length > 0 && selected.size === records.length;
    $('#select-all').indeterminate = selected.size > 0 && selected.size < records.length;
  }
  if (focusSelector && !focused.isConnected) $(focusSelector)?.focus({ preventScroll: true });
}

function detailMarkup() {
  return `<section class="panel detail-card"><div class="detail-section"><h2>Request overview</h2><p class="detail-description">Prepare a shared meeting space for a fictional team workshop. Confirm equipment, seating, and the handover checklist before the scheduled session.</p></div><div class="detail-section"><h2>Current details</h2><dl class="detail-grid"><div><dt>Status</dt><dd>${badge(detailComplete ? 'Complete' : 'In progress')}</dd></div><div><dt>Request ID</dt><dd>REQ-3024</dd></div><div><dt>Owner</dt><dd>${person('Jamie Reed')}</dd></div><div><dt>Organization</dt><dd>Cedar Studio</dd></div><div><dt>Category</dt><dd>Facilities</dd></div><div><dt>Priority</dt><dd>Normal</dd></div><div><dt>Created</dt><dd>October 20, 2026</dd></div><div><dt>Due</dt><dd>October 26, 2026</dd></div></dl></div><div class="detail-section"><h2>Completion criteria</h2><p class="detail-description">Display and audio checked, six seats prepared, and the sample handover checklist reviewed by the assigned owner.</p></div></section><section class="panel detail-card"><div class="detail-section"><h2>Activity</h2><ol class="activity">${detailComplete ? '<li><span class="activity-dot" aria-hidden="true"></span><div><p>Request marked complete in this demo.</p><time>Just now</time></div></li>' : ''}<li><span class="activity-dot" aria-hidden="true"></span><div><p>Jamie Reed started the equipment check.</p><time datetime="2026-10-23T09:15:00">Oct 23, 9:15 AM</time></div></li><li><span class="activity-dot" aria-hidden="true"></span><div><p>Alex Morgan confirmed the workshop schedule.</p><time datetime="2026-10-22T14:30:00">Oct 22, 2:30 PM</time></div></li><li><span class="activity-dot" aria-hidden="true"></span><div><p>The sample request was created.</p><time datetime="2026-10-20T10:00:00">Oct 20, 10:00 AM</time></div></li></ol></div></section>`;
}

function setView(view) {
  currentView = view;
  selected.clear();
  $$('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
  $('#list-panel').hidden = view === 'detail';
  $('#summary').hidden = view === 'detail';
  $('#detail-panel').hidden = view !== 'detail';
  $('#refresh').hidden = view === 'detail';
  const titles = { support: ['Support desk', 'Team queue', 'New request'], orders: ['Order list', 'Recent orders', 'Export CSV'], detail: ['Meeting space preparation', 'REQ-3024', detailComplete ? 'Reopen request' : 'Mark complete'] };
  const [title, context, action] = titles[view];
  $('#page-title').textContent = title;
  $('#page-context').textContent = context;
  $('#primary-action').textContent = action;
  if (view === 'detail') {
    $('#detail-panel').innerHTML = detailMarkup();
    return;
  }
  $('#search').value = '';
  $('#search').placeholder = view === 'support' ? 'Search requests' : 'Search orders';
  $('#state-preview').value = 'normal';
  $('#list-heading').textContent = view === 'support' ? 'Requests' : 'Orders';
  const statuses = view === 'support' ? ['Open', 'In progress', 'Resolved'] : ['Queued', 'Processing', 'Shipped'];
  $('#status-filter').innerHTML = '<option value="">All statuses</option>' + statuses.map(status => `<option>${status}</option>`).join('');
  renderSummary();
  renderTable();
}

function showDialog(title, context, content, opener) {
  saveGeneration++;
  dialogOpener = opener;
  $('#dialog-title').textContent = title;
  $('#dialog-context').textContent = context;
  $('#dialog-body').innerHTML = content;
  $('#record-dialog').showModal();
}

function inspectRecord(id, opener) {
  const record = [...requests, ...orders].find(item => item.id === id);
  const isRequest = id.startsWith('SUP');
  showDialog(record.subject, `${record.id} — Fictional record`, `<dl class="detail-grid"><div><dt>Status</dt><dd>${badge(record.status)}</dd></div><div><dt>${isRequest ? 'Priority' : 'Amount'}</dt><dd>${isRequest ? badge(record.priority) : money(record.amount)}</dd></div><div><dt>Owner</dt><dd>${escapeHTML(record.owner)}</dd></div><div><dt>Organization</dt><dd>${escapeHTML(record.organization)}</dd></div><div><dt>Updated</dt><dd>${record.date}, 2026</dd></div><div><dt>Data source</dt><dd>Fictional fixture</dd></div></dl><div class="dialog-actions"><button type="button" class="button" data-close>Close</button>${isRequest && record.status !== 'Resolved' ? `<button type="button" class="button primary" data-resolve="${id}">Resolve request</button>` : ''}${!isRequest && record.status !== 'Shipped' ? `<button type="button" class="button primary" data-ship="${id}">Mark shipped</button>` : ''}</div>`, opener);
}

function newRequest(opener) {
  showDialog('New request', 'Fictional support desk', `<form id="request-form"><label class="form-field" for="request-subject">Subject <input id="request-subject" name="subject" required maxlength="100" autocomplete="off" autofocus></label><label class="form-field" for="request-priority">Priority<select id="request-priority" name="priority"><option>Normal</option><option>High</option></select></label><label class="demo-setting"><input id="simulate-failure" type="checkbox">Simulate a save failure</label><p class="form-error" id="save-error" role="alert" hidden></p><div class="dialog-actions"><button type="button" class="button" data-close>Cancel</button><button type="submit" class="button primary" id="save-request">Create request</button></div></form>`, opener);
}

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.density) {
    document.body.dataset.density = button.dataset.density;
    $$('.density-control button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  } else if (button.dataset.view) setView(button.dataset.view);
  else if (button.dataset.inspect) inspectRecord(button.dataset.inspect, button);
  else if (button.hasAttribute('data-close') || button.id === 'close-dialog') $('#record-dialog').close();
  else if (button.dataset.resolve || button.dataset.ship) {
    const id = button.dataset.resolve || button.dataset.ship;
    const collection = button.dataset.resolve ? requests : orders;
    collection.find(item => item.id === id).status = button.dataset.resolve ? 'Resolved' : 'Shipped';
    $('#record-dialog').close(); renderSummary(); renderTable(); announce(`${id} updated in this demo.`);
  } else if (button.hasAttribute('data-reset')) {
    $('#search').value = ''; $('#status-filter').value = ''; $('#state-preview').value = 'normal'; renderTable(); $('#search').focus();
  } else if (button.id === 'bulk-assign') {
    requests.filter(record => selected.has(record.id)).forEach(record => { record.owner = 'Alex Morgan'; });
    announce(`${selected.size} ${selected.size === 1 ? 'request' : 'requests'} assigned to Alex Morgan.`);
    selected.clear(); renderSummary(); renderTable();
  } else if (button.id === 'primary-action') {
    if (currentView === 'support') newRequest(button);
    else if (currentView === 'detail') { detailComplete = !detailComplete; setView('detail'); announce(detailComplete ? 'Sample request marked complete.' : 'Sample request reopened.'); }
    else {
      const csv = [['Order', 'Item', 'Organization', 'Amount', 'Status'], ...visibleRecords().map(r => [r.id, r.subject, r.organization, r.amount, r.status])].map(row => row.map(value => '"' + String(value).replaceAll('"', '""') + '"').join(',')).join('\r\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      const link = document.createElement('a'); link.href = url; link.download = 'fictional-orders.csv'; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000); announce('Fictional order records exported.');
    }
  } else if (button.id === 'refresh') {
    button.disabled = true; button.textContent = 'Refreshing…';
    setTimeout(() => { button.disabled = false; button.textContent = 'Refresh'; announce('Sample records refreshed.'); }, 500);
  }
});

document.addEventListener('change', event => {
  const target = event.target;
  if (target.id === 'status-filter' || target.id === 'state-preview') { selected.clear(); renderTable(); }
  else if (target.dataset.select) { target.checked ? selected.add(target.dataset.select) : selected.delete(target.dataset.select); renderTable(); }
  else if (target.id === 'select-all') { selected = target.checked ? new Set(visibleRecords().map(record => record.id)) : new Set(); renderTable(); }
});
$('#search').addEventListener('input', () => { selected.clear(); renderTable(); });
$('#record-dialog').addEventListener('close', () => {
  saveGeneration++;
  const replacement = dialogOpener?.dataset.inspect ? $(`[data-inspect="${dialogOpener.dataset.inspect}"]`) : null;
  const target = dialogOpener?.isConnected ? dialogOpener : replacement || $('#main');
  target.focus({ preventScroll: true });
});
document.addEventListener('submit', event => {
  if (event.target.id !== 'request-form') return;
  event.preventDefault();
  const subject = $('#request-subject').value.trim();
  if (!subject) { $('#request-subject').setCustomValidity('Enter a subject.'); $('#request-subject').reportValidity(); return; }
  $('#request-subject').setCustomValidity('');
  const priority = $('#request-priority').value;
  const fail = $('#simulate-failure').checked;
  const form = event.target;
  const saveButton = form.querySelector('#save-request');
  const saveError = form.querySelector('#save-error');
  const operation = ++saveGeneration;
  saveButton.disabled = true; saveButton.textContent = 'Creating…';
  saveError.hidden = true;
  setTimeout(() => {
    if (operation !== saveGeneration || !form.isConnected || !$('#record-dialog').open) return;
    saveButton.disabled = false; saveButton.textContent = 'Create request';
    if (fail) { saveError.textContent = 'Simulated save failure. Your text is preserved. Turn off the failure simulation and try again.'; saveError.hidden = false; return; }
    const id = `SUP-${1044 + requests.length - 7}`;
    requests.unshift({ id, subject, status: 'Open', priority, owner: 'Unassigned', date: 'Oct 23', organization: 'Cedar Studio' });
    $('#record-dialog').close(); $('#search').value = ''; $('#status-filter').value = ''; $('#state-preview').value = 'normal';
    renderSummary(); renderTable(); announce(`${id} created in this demo.`);
  }, 450);
});
document.addEventListener('input', event => { if (event.target.id === 'request-subject') event.target.setCustomValidity(''); });
setView('support');
