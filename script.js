/* ============================================================
   Elite Tennis Academy — script.js
   Nav · scroll reveals · stat counters · FAQ · contact form
   · rule-based chatbot with guided booking
   Pure vanilla JS. Progressive enhancement (works without GSAP).
   ============================================================ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var BOOK_URL = 'https://elitetennis.intennis.com.au/secure/customer/registration/v1/public';
  var EMAIL = 'play@elitetennis.com.au';
  var PHONE = '0407 697 941';
  var PHONE2 = '0410 286 786';

  /* -------------------- NAV -------------------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }
  window.addEventListener('resize', function () { if (window.innerWidth >= 1024) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Mobile drawer accordions (Programs, About, ...)
  document.querySelectorAll('.nav__drawer-toggle').forEach(function (drawerToggle) {
    var grp = drawerToggle.closest('.nav__drawer-group');
    var sub = grp.querySelector('.nav__drawer-sub');
    if (!grp || !sub) return;
    drawerToggle.addEventListener('click', function () {
      var open = grp.classList.toggle('open');
      drawerToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      sub.style.maxHeight = open ? sub.scrollHeight + 'px' : '0px';
    });
  });

  // Desktop dropdowns: keep open via focus; close on Escape (hover handled by CSS)
  document.querySelectorAll('.has-dropdown').forEach(function (ddItem) {
    ddItem.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { ddItem.querySelector('.nav__link').focus(); document.activeElement.blur(); }
    });
  });

  /* -------------------- SCROLL PROGRESS -------------------- */
  var prog = document.getElementById('scrollProgress');
  if (prog) {
    var ticking = false;
    var updateProg = function () {
      var st = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateProg); ticking = true; }
    }, { passive: true });
    updateProg();
  }

  /* -------------------- SCROLL REVEAL -------------------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // light stagger among siblings sharing a parent
          var siblings = Array.prototype.slice.call(el.parentNode.querySelectorAll(':scope > .reveal'));
          var idx = siblings.indexOf(el);
          el.style.transitionDelay = (idx > 0 ? Math.min(idx * 60, 240) : 0) + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });

    // Failsafe: on some devices/browsers the initial IntersectionObserver callback
    // doesn't fire reliably for above-the-fold elements, leaving them stuck at
    // opacity:0. After load, force-reveal anything already in (or above) the
    // viewport so important content (e.g. the hero highlight) can never stay hidden.
    var revealVisible = function () {
      reveals.forEach(function (el) {
        if (el.classList.contains('in')) return;
        if (el.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight)) {
          el.classList.add('in');
        }
      });
    };
    window.addEventListener('load', function () { window.setTimeout(revealVisible, 400); });
    window.setTimeout(revealVisible, 1500);
  }

  /* -------------------- STAT COUNTERS -------------------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function runCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCount(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* -------------------- PREMIUM MOTION (GSAP, disabled under reduced-motion) -------------------- */
  if (!reduceMotion && window.gsap) {
    var heroImg = document.querySelector('.hero__media img');
    var heroArc = document.querySelector('.hero__arc');
    var heroBadge = document.querySelector('.hero__badge');
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); }

    // Hero parallax
    if (heroImg && window.ScrollTrigger) {
      gsap.to(heroImg, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      if (heroArc) gsap.to(heroArc, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
    // Gentle floating badge
    if (heroBadge) gsap.to(heroBadge, { y: -8, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Self-drawing arc motif (hero + inner page heads)
    document.querySelectorAll('.hero__arc path, .page-head__arc path').forEach(function (p) {
      try {
        var len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', delay: 0.2 });
      } catch (e) {}
    });

    // Image clip-path reveal on scroll (layered under the .reveal fade)
    if (window.ScrollTrigger) {
      gsap.utils.toArray('.split__media img, .svc-card__img img, .video-reel__frame').forEach(function (el) {
        gsap.fromTo(el,
          { clipPath: 'inset(0 0 16% 0 round 24px)' },
          { clipPath: 'inset(0 0 0% 0 round 24px)', duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
    }

    // Magnetic large CTAs (fine pointers only)
    if (finePointer) {
      document.querySelectorAll('.btn-lg').forEach(function (btn) {
        btn.addEventListener('pointermove', function (e) {
          var r = btn.getBoundingClientRect();
          gsap.to(btn, { x: (e.clientX - (r.left + r.width / 2)) * 0.3, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.4, ease: 'power3.out' });
        });
        btn.addEventListener('pointerleave', function () {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
        });
      });
    }

    // Page-transition curtain (exit wipe on internal navigation)
    var curtain = document.createElement('div');
    curtain.className = 'page-curtain';
    curtain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(curtain);
    gsap.set(curtain, { yPercent: 100 });
    var navigating = false;
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a || navigating) return;
      var href = a.getAttribute('href');
      if (!href || a.target === '_blank' || /^(#|mailto:|tel:)/.test(href)) return;
      if (a.host !== window.location.host) return;            // external link
      if (a.hash && a.pathname === window.location.pathname) return; // same-page anchor
      e.preventDefault();
      navigating = true;
      gsap.to(curtain, { yPercent: 0, duration: 0.5, ease: 'power3.inOut', onComplete: function () { window.location.href = a.href; } });
    });
    // Reset curtain when arriving via back/forward cache
    window.addEventListener('pageshow', function () { gsap.set(curtain, { yPercent: 100 }); navigating = false; });
  }

  /* -------------------- FAQ ACCORDION -------------------- */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var q = item.querySelector('.faq__q');
    var a = item.querySelector('.faq__a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });

  /* -------------------- CONTACT FORM (mailto handoff) -------------------- */
  var cForm = document.getElementById('contactForm');
  if (cForm) {
    cForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Honeypot: if the hidden "company" field is filled, silently drop the submission (bot).
      var honeypot = (document.getElementById('cf-company') || {}).value || '';
      if (honeypot.trim()) { return; }
      var firstname = (document.getElementById('cf-firstname').value || '').trim();
      var surname = (document.getElementById('cf-surname').value || '').trim();
      var name = (firstname + ' ' + surname).trim();
      var email = (document.getElementById('cf-email').value || '').trim();
      var phone = (document.getElementById('cf-phone').value || '').trim();
      var dob = (document.getElementById('cf-dob').value || '').trim();
      var program = document.getElementById('cf-program').value;
      var message = (document.getElementById('cf-message').value || '').trim();
      if (!firstname || !surname || !email) { alert('Please add your name and email so we can reply.'); return; }
      var subject = 'Enquiry: ' + program + ', ' + name;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone +
        (dob ? '\nDate of birth: ' + dob : '') +
        '\nInterested in: ' + program + '\n\nMessage:\n' + message + '\n';
      var ok = document.getElementById('formOk');
      if (ok) ok.classList.add('show');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* ============================================================
     CHATBOT — rule-based assistant + guided booking
     ============================================================ */
  var fab = document.getElementById('chatFab');
  var panel = document.getElementById('chatPanel');
  var closeBtn = document.getElementById('chatClose');
  var body = document.getElementById('chatBody');
  var chips = document.getElementById('chatChips');
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatText');
  if (!fab || !panel || !body) return;

  var greeted = false;
  var booking = null; // active booking flow state

  // ---- Knowledge base (covers everything on the site) ----
  var KB = {
    programs: 'We run programs for every age and level:<br>• <b>Junior development</b> (from age 3): Pre School &amp; junior tennis, Hot Shots group classes ($20/session), squads, competition pathways, plus holiday &amp; birthday programs<br>• <b>Adult coaching</b>, beginner to advanced, plus social cardio tennis ($20/session)<br>• <b>Private &amp; semi-private</b> lessons (1:1 or 2 to 3 players)<br>• <b>Pickleball</b><br>• <b>In-house UTR leagues</b><br><a href="programs.html">See all programs →</a>',
    junior: 'Our <b>junior development</b> programs start from age 3 and cover Pre School &amp; junior tennis, Hot Shots group classes ($20 per session), group &amp; squad training, competition pathways, plus holiday and birthday programs. Fun, structured and run by accredited coaches. <a href="programs.html#junior">More on junior programs →</a>',
    adult: 'For adults we offer coaching from beginner to advanced, <b>social cardio tennis</b> ($20 per 45-minute session, booked online in advance), and in-house <b>UTR leagues</b> for friendly competition. <a href="programs.html#adult">More on adult programs →</a>',
    private: 'Our <b>private (1:1)</b> and <b>semi-private (2 to 3 players)</b> lessons are tailored to your goals. A private hour runs from $82.50 to $90, with cheaper per-session rates when you book a 5 or 10-session pack (all prices include GST). <a href="programs.html#private">Prices &amp; details →</a>',
    pickleball: 'Pickleball is growing fast at the club. We are not running a formal program just yet, so send us an enquiry and we will let you know what is coming up. <a href="programs.html#pickleball">Pickleball →</a>',
    leagues: 'We run in-house <b>UTR leagues</b> and competitions, matched fairly by rating so games are competitive and fun for all levels. <a href="programs.html#leagues">League info →</a>',
    pricing: 'Here are our main prices:<br>• <b>Junior Hot Shots group classes</b>: $20 per session<br>• <b>Adult social cardio tennis</b>: $20 per 45-min session<br>• <b>Private (1:1)</b>: $82.50 to $90 per hour (less in a 5 or 10 pack)<br>• <b>Ball machine hire</b>: $50 + GST/hour<br>• <b>Restringing</b>: $40 to $60<br>• <b>Corporate days</b>: Package A from $70/person, B from $105<br>Want me to help you enquire or book?',
    corporate: 'Our <b>corporate days</b> are a great team-building option:<br>• <b>Package A, from $70/person</b>: shirt, court hire, equipment, racquets &amp; balls, matchplay management, lunch &amp; refreshments<br>• <b>Package B, from $105/person</b>: everything in A plus trophies for finalists<br><a href="services.html#corporate">Corporate details →</a>',
    hours: 'We are open <b>7 days a week, 6:00am to 10:00pm</b>. Plenty of options to fit your schedule.',
    location: 'You will find us at <b>East Coburg Tennis Club, 45 Pentridge Blvd, Coburg VIC 3058</b>, in Melbourne. <a href="contact.html">Map &amp; directions →</a>',
    contact: 'You can reach us on <b>' + PHONE + '</b> or <b>' + PHONE2 + '</b>, or email <b>' + EMAIL + '</b>. We are open 7 days, 6am to 10pm. <a href="contact.html">Contact page →</a>',
    coaches: 'We have a team of <b>12 accredited AATC coaches</b>, led by founder Lynton Joseph, ranging from junior development specialists to high-performance coaches. <a href="about.html#team">Meet the team →</a>',
    proshop: 'Our <b>pro shop</b> stocks racquets, apparel, shoes and accessories, with staff to help you choose. <a href="services.html#proshop">Pro shop →</a>',
    restring: 'We offer professional <b>restringing &amp; regripping</b>, $40 to $60 depending on the string, with a free overgrip on every restring and a 24 hour turnaround. You only pay when you come in. <a href="services.html#restringing-prices">String menu →</a>',
    ballmachine: 'Yes, <b>ball machine hire</b> is $50 + GST per hour or $75 + GST for two hours, with balls and a ball tube included. <a href="services.html#ball-machine">Ball machine hire →</a>',
    courthire: 'We offer <b>court &amp; equipment hire</b>, book a court for a hit, with racquets and balls available if you need them. <a href="services.html#court-hire">Court hire →</a>',
    vouchers: 'We sell <b>gift vouchers</b> in $20, $50, $100 and $200, valid 12 months, towards lessons, hire, parties or the pro shop. <a href="services.html#vouchers">Vouchers →</a>',
    birthday: 'We host tennis-themed <b>birthday parties</b>: Option A is $600 (everything provided, up to 20 kids) and Option B is $400 (up to 20 kids, you bring the food and drinks, $15 per extra child). <a href="programs.html#birthday">Birthday parties →</a>',
    beginner: 'Beginners are very welcome, lots of our players start with zero experience. Beginner adult classes and social cardio tennis are a great starting point, and our coaches will look after you. Want to book a class?',
    about: 'Elite Tennis Academy is a Coburg club focused on great coaching and a welcoming community, for every age and level. <a href="about.html">About us →</a>',
    childsafety: 'We take child safety seriously, our coaches follow child-safe practices and we provide a safe, welcoming environment for every junior. <a href="about.html#child-safety">More →</a>'
  };

  // ---- Intent matching ----
  var INTENTS = [
    { keys: ['book', 'booking', 'enrol', 'enroll', 'sign up', 'register', 'reserve', 'schedule'], action: 'startBooking' },
    { keys: ['price', 'pricing', 'cost', 'how much', 'fee', 'fees', 'rates'], reply: 'pricing' },
    { keys: ['corporate', 'team building', 'work event', 'company', 'staff'], reply: 'corporate' },
    { keys: ['hour', 'open', 'opening', 'time', 'when are you', 'close'], reply: 'hours' },
    { keys: ['where', 'location', 'address', 'directions', 'find you', 'map', 'parking'], reply: 'location' },
    { keys: ['phone', 'call', 'email', 'contact', 'reach', 'number'], reply: 'contact' },
    { keys: ['coach', 'coaches', 'instructor', 'teacher', 'staff', 'team', 'lynton'], reply: 'coaches' },
    { keys: ['junior', 'kid', 'child', 'children', 'toddler', 'pre school', 'preschool', 'hot shots', 'hotshots', 'son', 'daughter', 'teen'], reply: 'junior' },
    { keys: ['adult', 'cardio', 'social tennis', 'fitness'], reply: 'adult' },
    { keys: ['private', 'semi', 'one on one', '1:1', 'one-on-one', 'individual lesson'], reply: 'private' },
    { keys: ['pickleball', 'pickle ball'], reply: 'pickleball' },
    { keys: ['league', 'utr', 'competition', 'tournament', 'compete', 'match'], reply: 'leagues' },
    { keys: ['restring', 're-string', 'string', 'regrip', 'grip'], reply: 'restring' },
    { keys: ['ball machine', 'machine'], reply: 'ballmachine' },
    { keys: ['court hire', 'hire a court', 'book a court', 'rent court', 'court'], reply: 'courthire' },
    { keys: ['pro shop', 'proshop', 'racket', 'racquet', 'shoes', 'apparel', 'gear', 'buy'], reply: 'proshop' },
    { keys: ['voucher', 'gift', 'present'], reply: 'vouchers' },
    { keys: ['birthday', 'party', 'parties'], reply: 'birthday' },
    { keys: ['beginner', 'never played', 'new to', 'first time', 'start'], reply: 'beginner' },
    { keys: ['child safety', 'safe', 'safety', 'wellbeing'], reply: 'childsafety' },
    { keys: ['about', 'who are you', 'tell me about', 'history'], reply: 'about' },
    { keys: ['program', 'programs', 'classes', 'class', 'lesson', 'lessons', 'coaching', 'what do you offer', 'options'], reply: 'programs' },
    { keys: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'], reply: 'greet' },
    { keys: ['thank', 'thanks', 'cheers', 'great', 'awesome'], reply: 'thanks' }
  ];

  var DEFAULT_CHIPS = ['Book a class', 'View programs', 'Pricing', 'Opening hours', 'Where are you?'];

  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function addMsg(html, who) {
    var el = document.createElement('div');
    el.className = 'chat-msg ' + (who || 'bot');
    if (who === 'user') { el.textContent = html; } else { el.innerHTML = html; }
    body.appendChild(el);
    scrollDown();
  }

  function showTyping() {
    var t = document.createElement('div');
    t.className = 'chat-typing'; t.id = 'chatTyping';
    t.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(t); scrollDown();
  }
  function hideTyping() { var t = document.getElementById('chatTyping'); if (t) t.remove(); }

  function botSay(html, delay) {
    showTyping();
    window.setTimeout(function () { hideTyping(); addMsg(html, 'bot'); }, reduceMotion ? 0 : (delay || 480));
  }

  function setChips(list) {
    chips.innerHTML = '';
    (list || []).forEach(function (label) {
      var b = document.createElement('button');
      b.className = 'chat-chip'; b.type = 'button'; b.textContent = label;
      b.addEventListener('click', function () { handleUser(label); });
      chips.appendChild(b);
    });
  }

  function greet() {
    addMsg('Hi! I\'m the Elite Tennis assistant. 🎾 I can answer questions about our programs, prices, coaches, hours and location, or help you book a class. What can I help with?', 'bot');
    setChips(DEFAULT_CHIPS);
    greeted = true;
  }

  // ---------- Guided booking flow ----------
  var PROGRAM_OPTIONS = ['Junior classes', 'Adult coaching', 'Private / semi-private', 'Pickleball', 'Cardio tennis', 'Corporate day'];

  function startBooking() {
    booking = { step: 'program', data: {} };
    botSay('Happy to help you book. 🎾 Which program is it for?');
    window.setTimeout(function () { setChips(PROGRAM_OPTIONS); }, reduceMotion ? 0 : 500);
  }

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function bookingStep(text) {
    var d = booking.data;
    switch (booking.step) {
      case 'program':
        d.program = text;
        booking.step = 'name';
        botSay('Great choice. What\'s the name of the person who\'ll be playing?');
        setChips([]);
        break;
      case 'name':
        d.name = text;
        booking.step = 'email';
        botSay('Thanks ' + escapeHtml(d.name.split(' ')[0]) + '. What\'s the best email to reach you on?');
        break;
      case 'email':
        if (!isEmail(text)) { botSay('That doesn\'t look quite right, could you type your email again? (e.g. name@example.com)'); return; }
        d.email = text;
        booking.step = 'phone';
        botSay('Got it. And a phone number? (You can type "skip" if you\'d rather not.)');
        break;
      case 'phone':
        d.phone = /skip/i.test(text) ? 'Not provided' : text;
        booking.step = 'time';
        botSay('When would suit you best? Tell me a day and rough time, e.g. "Saturday morning" or "weekday evenings".');
        break;
      case 'time':
        d.time = text;
        booking.step = 'done';
        finishBooking();
        break;
    }
  }

  function finishBooking() {
    var d = booking.data;
    var summary = 'Perfect, here\'s your booking request:<br><br>' +
      '• <b>Program:</b> ' + escapeHtml(d.program) + '<br>' +
      '• <b>Name:</b> ' + escapeHtml(d.name) + '<br>' +
      '• <b>Email:</b> ' + escapeHtml(d.email) + '<br>' +
      '• <b>Phone:</b> ' + escapeHtml(d.phone) + '<br>' +
      '• <b>Preferred time:</b> ' + escapeHtml(d.time) + '<br><br>' +
      'Two ways to lock it in:';
    botSay(summary);

    var subject = 'Booking request: ' + d.program + ', ' + d.name;
    var mailBody = 'Hi Elite Tennis Academy,\n\nI\'d like to book the following:\n\n' +
      'Program: ' + d.program + '\nName: ' + d.name + '\nEmail: ' + d.email +
      '\nPhone: ' + d.phone + '\nPreferred time: ' + d.time + '\n\nThanks!';
    var mailto = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailBody);

    window.setTimeout(function () {
      addMsg('<a href="' + BOOK_URL + '" target="_blank" rel="noopener">1) Book online now →</a><br>' +
        '<a href="' + mailto + '">2) Send this to us by email →</a><br><br>' +
        'Or call us on ' + PHONE + '. We\'ll confirm your spot shortly. 🎾', 'bot');
      setChips(['Book something else', 'Ask another question']);
      booking = null;
    }, reduceMotion ? 0 : 900);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- Main dispatcher ----------
  function respondTo(text) {
    var t = text.toLowerCase();
    for (var i = 0; i < INTENTS.length; i++) {
      var intent = INTENTS[i];
      for (var j = 0; j < intent.keys.length; j++) {
        if (t.indexOf(intent.keys[j]) !== -1) {
          if (intent.action === 'startBooking') { startBooking(); return; }
          if (intent.reply === 'greet') { botSay('Hello! 👋 How can I help, programs, prices, booking, or something else?'); setChips(DEFAULT_CHIPS); return; }
          if (intent.reply === 'thanks') { botSay('You\'re welcome! Anything else I can help with?'); setChips(DEFAULT_CHIPS); return; }
          botSay(KB[intent.reply]);
          // contextual follow-up chips
          if (['pricing', 'corporate', 'junior', 'adult', 'private', 'pickleball', 'beginner'].indexOf(intent.reply) !== -1) {
            window.setTimeout(function () { setChips(['Book a class', 'Ask another question']); }, reduceMotion ? 0 : 520);
          } else {
            setChips(DEFAULT_CHIPS);
          }
          return;
        }
      }
    }
    // Fallback
    botSay('Good question, I\'m not totally sure on that one. You can reach the team directly on <b>' + PHONE + '</b>, <b>' + PHONE2 + '</b> or <b>' + EMAIL + '</b>, or try one of these:');
    setChips(DEFAULT_CHIPS);
  }

  function handleUser(text) {
    text = (text || '').trim();
    if (!text) return;
    addMsg(text, 'user');
    setChips([]);
    if (booking) { bookingStep(text); return; }
    if (/book something else/i.test(text)) { startBooking(); return; }
    if (/ask another question/i.test(text)) { botSay('Sure, what would you like to know?'); setChips(DEFAULT_CHIPS); return; }
    if (/view programs/i.test(text)) { botSay(KB.programs); setChips(['Book a class', 'Pricing']); return; }
    respondTo(text);
  }

  // ---------- Open / close ----------
  function openChat() {
    document.body.classList.add('chat-open');
    panel.setAttribute('aria-modal', 'true');
    if (!greeted) greet();
    window.setTimeout(function () { if (input) input.focus(); }, 300);
  }
  function closeChat() {
    document.body.classList.remove('chat-open');
    panel.setAttribute('aria-modal', 'false');
    fab.focus();
  }
  fab.addEventListener('click', openChat);
  if (closeBtn) closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('chat-open')) closeChat(); });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = '';
      handleUser(v);
    });
  }

  /* -------------------- WELCOME ANNOUNCEMENT POPUP --------------------
     Shows once per browser session, a short delay after the first page
     loads. Placeholder image for now; swap images/announce.jpg when the
     client supplies a banner. */
  (function initAnnouncement() {
    try { if (sessionStorage.getItem('etaAnnounceDismissed') === '1') return; } catch (e) {}
    var overlay = document.createElement('div');
    overlay.className = 'announce-overlay';
    overlay.innerHTML =
      '<div class="announce" role="dialog" aria-modal="true" aria-labelledby="announceTitle">' +
        '<button type="button" class="announce__close" aria-label="Close">&times;</button>' +
        '<div class="announce__media"><img src="images/gallery-7.jpg" alt="" /></div>' +
        '<div class="announce__body">' +
          '<span class="announce__eyebrow">Now enrolling</span>' +
          '<h2 id="announceTitle">Free trial junior class</h2>' +
          '<p>New to the club? Try a junior class on us, or jump into Adult Social Cardio Tennis from $20 a session. Get in touch and we will find you a spot.</p>' +
          '<div class="announce__cta">' +
            '<a href="contact.html" class="btn btn-primary">Get in touch</a>' +
            '<button type="button" class="btn btn-ghost announce__dismiss">Maybe later</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    function close() {
      overlay.classList.remove('show');
      try { sessionStorage.setItem('etaAnnounceDismissed', '1'); } catch (e) {}
      window.setTimeout(function () { if (overlay.parentNode) overlay.remove(); }, 320);
    }
    overlay.addEventListener('click', function (e) {
      // A CTA link (e.g. "Get in touch") navigates away — record dismissal so
      // the popup does not reappear on the destination page, then let it through.
      if (e.target.closest('.announce__cta a')) {
        try { sessionStorage.setItem('etaAnnounceDismissed', '1'); } catch (err) {}
        return;
      }
      if (e.target === overlay || e.target.closest('.announce__close') || e.target.closest('.announce__dismiss')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('show')) close();
    });
    document.body.appendChild(overlay);
    window.setTimeout(function () { overlay.classList.add('show'); }, reduceMotion ? 250 : 1100);
  })();

  /* -------------------- HOT SHOTS CAROUSEL (pathway + video) -------------------- */
  (function hsCarousel() {
    var root = document.getElementById('hsCarousel');
    if (!root) return;
    var track = root.querySelector('.hs-carousel__track');
    var slides = root.querySelectorAll('.hs-carousel__slide');
    var dots = root.querySelectorAll('.hs-carousel__dot');
    var prev = root.querySelector('.hs-carousel__arrow--prev');
    var next = root.querySelector('.hs-carousel__arrow--next');
    var n = slides.length, i = 0;
    function go(k) {
      i = (k + n) % n;
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('is-active', di === i); });
    }
    // Auto-advance (pauses on hover; stops for good once the user interacts,
    // so it never slides away from the video they're watching)
    var timer = null, stopped = false;
    function play() { if (stopped || reduceMotion || n < 2) return; stopAuto(); timer = window.setInterval(function () { go(i + 1); }, 5000); }
    function stopAuto() { if (timer) { window.clearInterval(timer); timer = null; } }
    function userStop() { stopped = true; stopAuto(); }

    if (prev) prev.addEventListener('click', function () { userStop(); go(i - 1); });
    if (next) next.addEventListener('click', function () { userStop(); go(i + 1); });
    dots.forEach(function (d, di) { d.addEventListener('click', function () { userStop(); go(di); }); });
    root.addEventListener('pointerdown', userStop);
    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', function () { if (!stopped) play(); });
    // Touch swipe
    var x0 = null;
    root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { userStop(); go(i + (dx < 0 ? 1 : -1)); }
      x0 = null;
    });
    go(0);
    play();
  })();

  /* -------------------- HIGHLIGHTS VIDEO --------------------
     Autoplay (muted) when the section scrolls into view, pause when it
     leaves. Always starts muted; sound only on after the user opts in. */
  var ytMount = document.getElementById('ytHighlights');
  if (ytMount) {
    var ytPlayer = null, ytReady = false, inView = false;
    var soundBtn = document.getElementById('videoSound');
    var soundLbl = soundBtn ? soundBtn.querySelector('.video-reel__sound-lbl') : null;

    // Inject the YouTube IFrame Player API
    var ytTag = document.createElement('script');
    ytTag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(ytTag);

    window.onYouTubeIframeAPIReady = function () {
      ytPlayer = new YT.Player('ytHighlights', {
        videoId: '_lVtdsBD42g',
        playerVars: {
          mute: 1, controls: 1, rel: 0, playsinline: 1,
          modestbranding: 1, start: 1
        },
        events: {
          onReady: function () {
            ytReady = true;
            ytPlayer.mute();
            if (inView && !reduceMotion) ytPlayer.playVideo();
          }
        }
      });
    };

    if (soundBtn) {
      soundBtn.addEventListener('click', function () {
        if (!ytReady) return;
        if (ytPlayer.isMuted()) {
          ytPlayer.unMute();
          ytPlayer.setVolume(80);
          ytPlayer.playVideo();
          soundBtn.setAttribute('aria-pressed', 'true');
          soundBtn.setAttribute('aria-label', 'Mute video');
          if (soundLbl) soundLbl.textContent = 'Mute';
        } else {
          ytPlayer.mute();
          soundBtn.setAttribute('aria-pressed', 'false');
          soundBtn.setAttribute('aria-label', 'Unmute video');
          if (soundLbl) soundLbl.textContent = 'Tap to unmute';
        }
      });
    }

    if (!reduceMotion && 'IntersectionObserver' in window) {
      var ytObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inView = entry.isIntersecting;
          if (!ytReady) return;
          if (inView) ytPlayer.playVideo();
          else ytPlayer.pauseVideo();
        });
      }, { threshold: 0.5 });
      ytObserver.observe(ytMount);
    }
  }
})();
