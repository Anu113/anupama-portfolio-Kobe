// Redrawn screens — round 7. Content read off her exports in screens/;
// illustrations, photos, logos and card art are cut from her exports into
// art/ (never redrawn). See redraw.css for the grid and brand type.

const I = {
  back: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  down: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5" stroke-linecap="round"/></svg>',
  lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
  bell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
  sliders: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
  layers: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 4l9 5-9 5-9-5z"/><path d="M3 14l9 5 9-5"/></svg>',
  eye: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-5.5 8-5.5s6.5 1.5 8 5.5"/></svg>',
  block: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>',
  card: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10.5h18"/></svg>',
  gift: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M3 7h18v3H3zM12 7v13M12 7c-1-3-5-3-5-1s3 1 5 1c2 0 5 1 5-1s-4-2-5 1"/></svg>',
  gear: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
  receipt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6" stroke-linecap="round"/></svg>',
  cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 11h10.6L20.5 7H7"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/></svg>',
  help: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17v.3"/></svg>',
  barcode: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6v12M8 6v12M11 6v12M15 6v12M18 6v12M20 6v12"/></svg>',
  flash: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>',
};
const sbIcons = `<span class="sb__r"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .7 10.4 10.4 0 0 0 .8 3.6L2 4.9a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4.3a6.6 6.6 0 0 0-4.7 1.8l1.3 1.3c.9-.8 2.1-1.3 3.4-1.3zM8 9.6l2-2a2.9 2.9 0 0 0-4 0z"/></svg><svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity=".4"/></svg></span>`;
const sb = (ink) => `<div class="sb" ${ink ? `style="--sb-ink:${ink}"` : ''}><span>9:41</span>${sbIcons}</div>`;
const nav = (l = I.back, t = '', r = '') => `<div class="nav">${l ? `<span>${l}</span>` : '<span></span>'}<span class="nav__t">${t}</span><span>${r}</span></div>`;
const brand = (v) => (v.includes('#003087') ? 'ui--pp' : 'ui--wm');
const screen = (vars, inner, home) => `<div class="ui ${brand(vars)}" style="${vars}">${inner}<div class="home" ${home ? `style="--home:${home}"` : ''}></div></div>`;

// brand sets
const PP = '--b:#003087;--b2:#0070e0;--tint:#eaf2fc';
const WM = '--b:#0071dc;--b2:#0071dc;--tint:#e8f2fc';
const OK = '--b:#00297a;--b2:#1662dd;--tint:#eef3fb';

// ---------- simple illustrations ----------
const ilLock = '<img src="art/pv-hero.png" alt="" style="width:150px;display:block;mix-blend-mode:multiply;">';
const ilId = '<img src="art/id-scan.png" alt="" style="width:170px;display:block;mix-blend-mode:multiply;">';
const ilPhoneQr = '<img src="art/sg-finish.png" alt="" style="width:300px;display:block;margin:20px auto 0;mix-blend-mode:multiply">';
const art = (k, w, st = '') => `<img src="art/${k}.png" alt="" style="width:${w}px;display:block;mix-blend-mode:multiply;${st}">`;

// The PayPal Debit Card, drawn in code from her card art (her export
// carried a baked-in shadow and grey ground): navy card, small P mark and
// "Debit Card", the big two-tone P with its yellow overlap, Mastercard.
const P_PATH = 'M0 0h40a30 30 0 0 1 0 60H24v44H0zM24 18h14a12 12 0 0 1 0 24H24z'; // a P with its counter (evenodd)
const debitCard = () => `<div class="dcard3d"><div class="dcard3d__face">
  <span class="dcard3d__mark"><svg width="16" height="20" viewBox="0 0 64 104"><path d="${P_PATH}" fill="#fff" fill-rule="evenodd"/></svg>Debit Card</span>
  <svg class="dcard3d__p" width="124" height="138" viewBox="-24 -4 112 126">
    <defs><clipPath id="dcp-x"><path d="${P_PATH}" clip-rule="evenodd"/></clipPath></defs>
    <g transform="skewX(-9)"><path d="${P_PATH}" fill="#0079c1" fill-rule="evenodd"/>
    <path d="${P_PATH}" fill="#79c6f0" fill-rule="evenodd" transform="translate(16 14)"/>
    <g clip-path="url(#dcp-x)"><path d="${P_PATH}" fill="#ffd140" fill-rule="evenodd" transform="translate(16 14)"/></g></g>
  </svg>
  <span class="dcard3d__mc"><i></i><i></i></span>
</div></div>`;
const pvRow = (icon, t, s) => `<div class="pvrow">${art(icon, 52, 'mix-blend-mode:normal;border-radius:50%')}<div><p class="pvrow__t">${t}</p><p class="pvrow__s">${s}</p></div></div>`;
const pvHub = (down) => screen(PP + ';--ui-bg:#faf8f5', `<div style="background:#fff;position:relative;z-index:2">${sb()}${nav()}</div>
    <div class="pvhub"><div class="pvhub__scroll${down ? ' is-down' : ''}">
      <div class="pvhub__head">${art('pv-hero', 150)}<p class="h1" style="margin-top:12px">Data and privacy</p><p class="sub" style="margin-top:6px;font-size:17px">Set your privacy controls and manage your data.</p></div>
      <div class="pvhub__body">
        <div class="pvcard"><div><p class="pvcard__t">You haven’t accessed privacy settings in the past year.</p><p class="pvcard__s">Are you still happy getting shopping deals?</p><p class="pvcard__l">Review your settings</p></div>${art('pv-card-shield-cut', 56, 'mix-blend-mode:normal')}</div>
        <p class="pvhub__h">Profile privacy</p>
        ${pvRow('pv-r-search', 'Search privacy', 'Manage how someone finds your profile on PayPal.')}
        ${pvRow('pv-r-blocked', 'Blocked profiles', 'Manage who can find you on PayPal.')}
        <p class="pvhub__h">Permissions and shared data</p>
        ${pvRow('pv-r-perm', 'Permissions', 'Manage access you’ve given to other sites and apps.')}
        ${pvRow('pv-r-cookies', 'Cookies', 'Control how PayPal.com uses your internet cookies.')}
      </div>
    </div></div>`);
const ui = {
  // ---------------- Okta ----------------
  'okta-apps': () => screen(OK + ';--ui-bg:#f6f7f9', `${sb()}
    <div class="nav"><span>${I.menu}</span><span class="nav__t">My Apps</span><span class="ico ico--round" style="width:32px;height:32px;font-size:13px;font-weight:600">AM</span></div>
    <div class="body" style="gap:20px">
      <div class="field" style="height:46px;flex-direction:row;align-items:center;justify-content:flex-start;gap:10px;background:#fff;box-shadow:inset 0 0 0 1px #dcdfe4"><span style="color:#8a8e96">${I.search}</span><b style="color:#8a8e96">Search your apps</b></div>
      <div><p class="eyebrow" style="margin-bottom:12px">Work</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        ${[['Altmetric', '#e2513b', 'A'], ['Zendesk', '#03363d', 'Z'], ['Cerner', '#0a8fd1', 'C'], ['Confluence', '#1868db', 'C'], ['Office 365', '#d83b01', 'O'], ['Smartsheet', '#0b3f5e', 'S']]
          .map(([n, c, l]) => `<div class="card" style="padding:16px;display:flex;flex-direction:column;gap:14px;height:112px"><span class="logo" style="background:${c}">${l}</span><span style="font-weight:600;font-size:15px">${n}</span></div>`).join('')}
      </div></div>
    </div>`),

  // Okta: her own My Apps export, under a status bar (for the /work laptop tile)
  'okta-phone-shot': () => screen(OK, `${sb()}<img src="screens/okta-phone.webp" alt="" style="width:100%;display:block">`),

  // ---------------- PayPal · Privacy ----------------
  'pv-shopping': () => screen(PP + ';--ui-bg:#f7f6f0', `${sb()}
    ${nav('', 'Shopping', I.search)}
    <div class="body" style="gap:16px">
      <div style="display:flex;background:#e9eaee;border-radius:10px;padding:3px;font-size:14px;font-weight:600"><span style="flex:1;text-align:center;padding:7px;background:#fff;border-radius:8px;box-shadow:0 1px 3px rgb(0 0 0 / .1)">Shop</span><span style="flex:1;text-align:center;padding:7px;color:#5c6068">Deals</span><span style="flex:1;text-align:center;padding:7px;color:#5c6068">Saved</span></div>
      <div class="card" style="padding:18px;display:flex;gap:14px;align-items:flex-start">
        <div style="flex:1;display:flex;flex-direction:column;gap:8px"><p class="h3" style="line-height:1.3">You haven’t reviewed your privacy settings in a year</p><p class="small">Still happy getting shopping deals?</p><p class="link" style="margin-top:4px">Review your settings</p></div>
        ${art('pv-shield', 64)}
      </div>
      <div class="card" style="padding:14px 18px;display:flex;gap:14px;align-items:center">${art('pv-coin', 44)}<div><p class="h3">897</p><p class="small">Gold points · 50 pending</p></div></div>
      <p class="h2" style="font-size:20px;margin-top:4px">Browse by category</p>
      <div style="display:flex;gap:14px">${['Buy now, pay later', 'Clothing', 'Beauty', 'Home'].map((n, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:70px">${art('pv-cat' + (i + 1), 60, 'mix-blend-mode:normal')}<span class="small" style="color:#101114">${n}</span></div>`).join('')}</div>
    </div>
    <div class="tabbar" style="align-items:flex-start;padding-top:12px">${[1, 2, 3, 4, 5].map((n) => `<div>${art('pv-tab' + n, 36)}</div>`).join('')}</div>`),

  // Her redesigned hub, from the Wix board (w59): header, the reminder
  // card, then grouped rows. 'pv-hub-down' is the same screen scrolled.
  'pv-hub': () => pvHub(false),
  'pv-hub-down': () => pvHub(true),

  // ---------------- PayPal · ID check ----------------
  'id-steps': () => screen(PP, `${sb()}${nav()}
    <div class="body" style="gap:28px">
      <p class="h1">Verify your ID in two steps</p>
      <div style="display:flex;flex-direction:column;gap:0">
        ${[['1', 'Scan your photo ID', 'Driver’s licence or passport'], ['2', 'Scan your face', 'So we know the ID is yours']].map(([n, t, s], i) => `
        <div style="display:flex;gap:16px;align-items:flex-start;position:relative;padding-bottom:${i ? 0 : 20}px">
          ${art(i ? 'id-step2' : 'id-step1', 84)}
          <div style="padding-top:18px"><p class="small" style="font-weight:500;color:#101114">Step ${n}</p><p class="h3">${t}</p><p class="small">${s}</p></div></div>`).join('')}
      </div>
      <p class="small">About 2 minutes. <span class="link">Questions? Visit the FAQ</span></p>
    </div>
    <div class="foot"><p class="small" style="margin-bottom:12px">You allow PayPal to use and store your data as set out in <span class="link">PayPal’s Terms and Conditions</span>.</p><div class="btn">Agree and continue</div><div class="btn btn--ghost">Cancel</div></div>`),

  'id-scan': () => screen(PP, `${sb()}${nav()}
    <div class="body" style="gap:24px">
      ${ilId}
      <div><p class="h1">Scan your photo ID</p><p class="sub" style="margin-top:8px">This confirms it’s really you.</p></div>
      <div class="list">${['Have your driver’s licence or passport ready', 'Find a well-lit spot, with no glare on the ID'].map((t) => `<div class="li">${I.check}<span>${t}</span></div>`).join('')}</div>
    </div>
    <div class="foot"><div class="btn">I’m ready</div><div class="btn btn--ghost">Cancel</div></div>`),

  'id-camera': () => screen(PP, `${sb()}${nav()}
    <div class="body" style="gap:24px">${ilId}<div><p class="h1">Scan your photo ID</p><p class="sub" style="margin-top:8px">This confirms it’s really you.</p></div></div>
    <div class="foot"><div class="btn">I’m ready</div><div class="btn btn--ghost">Cancel</div></div>
    <div class="scrim" style="background:rgb(0 0 0 / .3)"></div>
    <div class="alert"><div class="alert__b"><b>“PayPal” would like to access the camera</b><p>Needed to scan your ID and your face.</p></div><div class="alert__a"><span>Don’t allow</span><span>OK</span></div></div>`),

  // ---------------- PayPal · Ads consent ----------------
  'ads-privacy': () => screen(PP + ';--ui-bg:#f6f7f9', `${sb()}${nav()}
    <div class="body" style="gap:20px">
      <p class="h1">Data & Privacy</p>
      <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;gap:14px"><span class="ico ico--round">${I.lock}</span><div><p class="h3">Review your privacy settings</p><p class="small">A quick checkup, one setting at a time.</p></div></div>
        <div style="display:flex;gap:8px;padding-left:54px"><span class="btn btn--sm">Start checkup</span><span class="btn btn--sm btn--ghost">Not now</span></div>
      </div>
      <p class="eyebrow" style="margin-top:4px">Manage your data</p>
      <div class="group">${[['Marketing preferences', ''], ['Online ad preferences', 'Off'], ['Cookies', ''], ['Get a copy of your data', '']].map(([t, v]) => `<div class="row">${t}<span class="row__end">${v}${I.chev}</span></div>`).join('')}</div>
    </div>`),

  'ads-checkup': () => screen(PP + ';--ui-bg:#f6f7f9', `${sb()}${nav()}
    <div class="body" style="gap:20px"><p class="h1">Data & Privacy</p></div>
    <div class="scrim"></div>
    <div class="sheet" style="gap:16px"><div class="sheet__grab"></div>
      <div style="display:flex;justify-content:space-between;align-items:center"><p class="eyebrow">Privacy checkup · 1 of 3</p><span style="color:#5c6068">${I.close}</span></div>
      <div style="display:flex">${['#142e8e', '#cee6f7', '#ffd13f'].map((c, i) => `<span style="width:40px;height:40px;border-radius:50%;background:${c};margin-left:${i ? -8 : 0}px"></span>`).join('')}</div>
      <p class="h1" style="font-size:26px">Want PayPal ads that match your interests?</p>
      <p class="sub">If you allow it, we’ll share some of your info with ad partners like Facebook, Google and LinkedIn, so PayPal ads on their sites fit what you’re into.</p>
      <p class="sub">It stays off unless you turn it on. You can change it any time.</p>
      <p class="link">How it works</p>
      <div class="foot--row" style="display:flex;gap:12px;margin-top:8px"><div class="btn btn--line" style="flex:1">Allow</div><div class="btn btn--line" style="flex:1">Not now</div></div>
    </div>`),

  'ads-prefs': () => screen(PP, `${sb()}${nav()}
    <div class="body" style="gap:20px">
      <div><p class="h1">Online ad preferences</p><p class="sub" style="margin-top:8px">Choose whether we share some of your info with our ad partners.</p></div>
      <div class="row" style="padding:16px;border-radius:14px;background:#f6f7f9;font-weight:600">Share my info with ad partners<span class="row__end"><span class="toggle toggle--b"></span></span></div>
      <p class="sub">When this is on, we may tell you about offers that suit you at checkout, and share some of your info with ad partners so PayPal ads on their sites match your interests.</p>
      <p class="link">How it works</p>
    </div>`),

  // ---------------- PayPal · Debit card ----------------
  'debit-intro': () => screen(PP, `${sb()}${nav(I.back, '', I.close)}
    <div class="body" style="gap:20px">
      ${art('pp-logo', 40)}
      <p class="h1">To get your debit card, let’s set you up with a PayPal Balance account</p>
      <div class="list">${['Use your PayPal Debit Mastercard® in stores and online', 'Set up direct deposit for your paycheck', 'Cash checks in the PayPal app'].map((t) => `<div class="li">${I.check}<span>${t}</span></div>`).join('')}</div>
      <div style="padding:16px;border-radius:14px;background:#f6f7f9"><p class="h3">$0 to set up</p><p class="small">Keep money in PayPal and use most features for free.</p></div>
      <div class="group" style="box-shadow:0 0 0 1px #e3e4e8">${['See all fees', 'Spending or sending money'].map((t) => `<div class="row">${t}<span class="row__end">${I.down}</span></div>`).join('')}</div>
    </div>
    <div class="foot"><div class="btn">Continue</div></div>`),

  'debit-confirm': () => screen(PP, `${sb()}${nav(I.back, '', I.close)}
    <div class="body" style="gap:16px">
      <p class="h1" style="margin-bottom:4px">Confirm your info</p>
      <div style="padding:2px 0 6px"><p class="small">Legal name</p><p style="font-size:17px;font-weight:600">Alisha A.</p></div>
      <div class="field"><small>Home address (no PO box)</small><b>208 Copperhead Road, Hartford</b>${I.down}</div>
      <div class="field field--empty"><b>Date of birth</b></div>
      <div class="field field--empty"><b>Last 4 digits of SSN</b></div>
      <p class="link">Or use ITIN</p>
      <p class="small" style="display:flex;gap:8px;align-items:center">${I.info}Why we ask for these</p>
    </div>
    <div class="foot"><p class="small" style="margin-bottom:12px">By continuing you agree to the <span class="link">PayPal Balance Terms</span>.</p><div class="btn">Continue</div></div>`),

  'debit-setup': () => screen(PP, `${sb()}
    <div class="body" style="gap:40px;align-items:center;justify-content:center;padding-bottom:80px">
      ${debitCard()}
      <div class="center"><p class="h1">Setting up your new card</p><p class="sub" style="margin-top:8px">This takes a few seconds.</p></div>
      <svg class="spin" width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="#e3e4e8" stroke-width="4"/><path d="M22 3a19 19 0 0 1 19 19" fill="none" stroke="#0070e0" stroke-width="4" stroke-linecap="round"/></svg>
    </div>`),

  // ---------------- Walmart · Scan & Go ----------------
  'sg-scan': () => screen(WM + ';--ui-bg:#1b1d22', `
    <div style="background:#0071dc">${sb('#fff')}<div class="nav" style="--nav-ink:#fff"><span>${I.back}</span><span class="nav__t">Scan & Go</span><span style="display:flex;gap:14px">${I.flash}${I.help}</span></div></div>
    <div class="sgx" style="flex:1;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center">
      <span style="position:absolute;inset:0;background:url(art/sg-camera.png) center top / cover"></span>
      <span class="sgx-band" style="left:89px;top:109px;width:213px;height:261px"></span>
      <span class="sgx-hit" style="left:59px;top:268px;width:80px;height:54px"></span>
      <span class="sgx-flash"></span>
      <div class="sheet sgx-sheet" style="border-radius:24px;left:12px;right:12px;bottom:12px;padding:18px;gap:14px;z-index:2">
        <div style="display:flex;justify-content:space-between"><p class="h3">Item added</p><p class="link" style="font-size:14px">Undo</p></div>
        <div style="display:flex;gap:14px;align-items:center"><span style="width:64px;height:64px;border-radius:12px;background:#f6f7f9;display:grid;place-items:center">${art('sg-jar', 52)}</span><div style="flex:1"><p style="font-weight:600">American Mustard Classic</p><p class="small">100% natural</p><p class="h3" style="margin-top:4px">$2.50</p></div><div class="stepper"><span>−</span><b>1</b><span>+</span></div></div>
      </div>
    </div>
    <div class="sgx-bar" style="background:#fff;display:flex;align-items:center;justify-content:space-between;padding:16px 20px 42px"><span style="display:flex;gap:10px;align-items:center;color:#0071dc">${I.cart}<span style="color:#101114">Subtotal <b class="sgx-amt"><i>$0.00</i><i>$2.50</i></b></span></span><span class="link">View cart</span></div>`, '#000'),

  'sg-cart': () => screen(WM + ';--ui-bg:#f2f3f5', `
    <div style="background:#0071dc">${sb('#fff')}<div class="nav" style="--nav-ink:#fff"><span>${I.back}</span><span class="nav__t">Cart</span><span>${I.help}</span></div></div>
    <div class="body" style="gap:12px;padding-top:16px">
      <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px"><div style="display:flex;justify-content:space-between"><p class="h3">Scanned items</p><p class="small">2 items</p></div>
        <div style="display:flex;gap:14px;align-items:center"><span style="width:56px;height:56px;border-radius:12px;background:#f6f7f9;display:grid;place-items:center">${art('sg-jar2', 40)}</span><div style="flex:1"><p style="font-weight:600;font-size:15px">American Mustard Classic</p><p class="h3" style="font-size:15px">$5.00</p></div><div class="stepper"><span>−</span><b>2</b><span>+</span></div></div></div>
      <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px"><div style="display:flex;justify-content:space-between"><p class="h3">Weighable produce</p><p class="small">2 items</p></div>
        <p class="small" style="background:#fff8e1;border-radius:10px;padding:10px 12px;color:#5c4400;display:flex;gap:8px">${I.info}Weigh these at self-checkout.</p>
        ${[['Corn, fresh', '$0.42 / lb', 'sg-corn', 28], ['Dole banana', '$0.24 / lb', 'sg-banana', 52]].map(([n, p, c, w]) => `<div style="display:flex;gap:14px;align-items:center"><span style="width:56px;height:56px;border-radius:12px;background:#fff;display:grid;place-items:center">${art(c, w)}</span><div style="flex:1"><p style="font-weight:600;font-size:15px">${n}</p><p class="small">${p} · priced at checkout</p></div><span class="link" style="font-size:14px">Remove</span></div>`).join('')}</div>
    </div>
    <div class="foot" style="gap:12px;box-shadow:0 -1px 0 rgb(0 0 0 / .06)"><div style="display:flex;justify-content:space-between"><span class="sub">Estimated total</span><b>$5.00</b></div><div class="foot--row" style="display:flex;gap:12px"><div class="btn btn--line" style="flex:1">${I.barcode}&nbsp; Scan items</div><div class="btn" style="flex:1">Check out</div></div></div>`),

  'sg-finish': () => screen(WM, `
    <div style="background:#0071dc">${sb('#fff')}<div class="nav" style="--nav-ink:#fff"><span>${I.back}</span><span class="nav__t">Finish trip</span><span>${I.help}</span></div></div>
    <div style="flex:none">${ilPhoneQr}</div>
    <div class="body" style="gap:28px;align-items:center;padding-top:28px">
      <div class="center"><p class="h1" style="font-size:26px">Check in at a self-checkout</p><p class="sub" style="margin-top:8px">Scan the code on the screen, weigh your produce, and get your receipt.</p></div>
    </div>
    <div class="foot"><div class="btn">Scan QR code</div><p class="small center" style="margin-top:12px">At a liquor store or fuel station? <span class="link">Pay at a register</span></p></div>`),

  // ---------------- Walmart · Chase Pay ----------------
  'ch-setup': () => screen(WM + ';--ui-bg:#f2f3f5', `
    <div style="background:#041e42">${sb('#fff')}<div class="nav" style="--nav-ink:#fff"><span>${I.back}</span><span class="nav__t">Set up Walmart Pay</span><span></span></div></div>
    <div class="body" style="gap:16px;padding-top:24px">
      <p class="h1" style="font-size:26px">Choose a payment type</p>
      <div class="group">${[['Credit or debit card', '', I.card], ['Walmart gift card', '', I.gift], ['Chase Pay', 'Use Ultimate Rewards® points at checkout with eligible Chase Visa® cards', `<img src="art/ch-paymini.png" alt="" style="width:34px;mix-blend-mode:multiply">`]]
        .map(([t, s, i]) => `<div class="row" style="padding:14px 16px;align-items:${s ? 'flex-start' : 'center'}"><span class="ico">${i}</span><div style="flex:1"><p style="font-weight:600">${t}</p>${s ? `<p class="small" style="margin-top:2px">${s}</p>` : ''}</div><span class="row__end" style="${s ? 'margin-top:10px' : ''}">${I.chev}</span></div>`).join('')}</div>
    </div>`),

  'ch-benefits': () => screen('--b:#117aca;--b2:#117aca;--tint:#e7f1fa', `
    <div style="background:#041e42">${sb('#fff')}<div class="nav" style="--nav-ink:#fff"><span>${I.close}</span><span class="nav__t">Chase Pay</span><span></span></div></div>
    <div class="body" style="gap:24px;padding-top:28px">
      ${art('ch-pay', 130)}
      <p class="h1">Benefits of linking Chase Pay®</p>
      <div class="list">${['Link all your Chase cards at once', 'Your linked cards stay up to date on their own', 'Redeem Ultimate Rewards® points for a statement credit on eligible purchases'].map((t) => `<div class="li">${I.check}<span>${t}</span></div>`).join('')}</div>
    </div>
    <div class="foot"><p class="small" style="margin-bottom:12px">By linking Chase Pay® you agree to <span class="link">Walmart’s terms</span> for using your rewards.</p><div class="btn">Link Chase Pay</div><div class="btn btn--ghost">No thanks</div></div>`),

  'ch-settings': () => screen('--b:#117aca;--b2:#0071dc;--tint:#e7f1fa;--ui-bg:#f2f3f5', `
    <div style="background:#041e42">${sb('#fff')}<div class="nav" style="--nav-ink:#fff"><span>${I.down}</span><span class="nav__t">Walmart Pay settings</span><span></span></div></div>
    <div class="body" style="gap:12px;padding-top:20px">
      <div><p class="h3">Credit and debit cards</p><p class="small">Your default card for Walmart Pay</p></div>
      <div class="group">${[['Visa ending 2323', 'Expires 09/22', 'ch-visa', 1], ['Chase Debit', 'Chase Pay · Debit ••9091', 'ch-debit'], ['Chase Freedom Visa', 'Chase Pay · Credit ••7232', 'ch-freedom']]
        .map(([t, s, c, on]) => `<div class="row" style="padding:12px 16px"><span style="width:22px;height:22px;border-radius:50%;box-shadow:inset 0 0 0 2px ${on ? '#0071dc' : '#b8bcc4'};display:grid;place-items:center">${on ? '<span style="width:12px;height:12px;border-radius:50%;background:#0071dc"></span>' : ''}</span>${art(c, 50, 'border-radius:4px')}<div><p style="font-weight:600;font-size:15px">${t}</p><p class="small">${s}</p></div></div>`).join('')}
        <div class="row" style="padding:12px 16px"><div style="flex:1"><p style="font-weight:600;font-size:15px">Ultimate Rewards® points</p><p class="small">1,232 available ($10.56)</p></div><span class="toggle toggle--off"></span></div></div>
      <div class="group" style="margin-top:8px">${[['Add a payment method', I.card], ['Manage payment methods', I.gear], ['View eReceipts', I.receipt]].map(([t, i]) => `<div class="row"><span style="color:#5c6068">${i}</span>${t}<span class="row__end">${I.chev}</span></div>`).join('')}</div>
    </div>`),
};

// Fit each 393pt artboard to the phone screen it sits in.
function fitUI(root = document) {
  root.querySelectorAll('.ui').forEach((el) => {
    const box = el.parentElement;
    const k = box.clientWidth / 393;
    if (!k) return;
    el.style.transform = `scale(${k})`;
    el.style.height = `${box.clientHeight / k}px`;
  });
}
new ResizeObserver(() => fitUI()).observe(document.documentElement);
