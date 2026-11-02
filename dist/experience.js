/* One persistent landscape connects the archive's pages and reading sections. */
(() => {
  // Motion is part of the archive experience, without a visitor-facing switch.
  const reduced = {matches: false};
  document.documentElement.classList.add('motion-enabled');
  let observer;
  let frame;
  let origin = {x: innerWidth / 2, y: innerHeight / 2};
  let activeTransition;
  let transitionNumber = 0;
  const blooms = new WeakMap();

  const landscape = document.createElement('div');
  landscape.className = 'flow-landscape';
  landscape.setAttribute('aria-hidden', 'true');
  landscape.innerHTML = `<div class="landscape-light light-one"></div><div class="landscape-light light-two"></div>
    <svg class="landscape-ribbons" viewBox="0 0 1440 1800" preserveAspectRatio="xMidYMid slice" fill="none">
      <defs><linearGradient id="ribbon-ink" x1="100" y1="0" x2="1300" y2="1800" gradientUnits="userSpaceOnUse"><stop stop-color="#8b9b72" stop-opacity=".2"/><stop offset=".48" stop-color="#925469" stop-opacity=".58"/><stop offset="1" stop-color="#42623d" stop-opacity=".18"/></linearGradient></defs>
      <path class="ribbon-wide" d="M1530-100C480 80 1540 480 1070 710S-180 900 220 1270 1540 1410 1170 1910"/>
      <g stroke="url(#ribbon-ink)" stroke-width="1.2">
        <path d="M1510-100C460 80 1520 480 1050 710S-200 900 200 1270 1520 1410 1150 1910"/>
        <path d="M1525-100C475 80 1535 480 1065 710S-185 900 215 1270 1535 1410 1165 1910"/>
        <path d="M1540-100C490 80 1550 480 1080 710S-170 900 230 1270 1550 1410 1180 1910"/>
        <path d="M1555-100C505 80 1565 480 1095 710S-155 900 245 1270 1565 1410 1195 1910"/>
        <path d="M1570-100C520 80 1580 480 1110 710S-140 900 260 1270 1580 1410 1210 1910"/>
      </g>
      <g class="orbit-garden" stroke="#42623d" stroke-opacity=".23" stroke-width=".8">
        <ellipse cx="1110" cy="355" rx="250" ry="153" transform="rotate(-32 1110 355)"/>
        <ellipse cx="1110" cy="355" rx="250" ry="153" transform="rotate(28 1110 355)"/>
        <ellipse cx="1110" cy="355" rx="250" ry="153" transform="rotate(88 1110 355)"/>
        <circle cx="1110" cy="355" r="14" fill="#925469" fill-opacity=".18" stroke="none"/>
      </g>
      <g fill="#925469" fill-opacity=".34"><circle cx="1040" cy="704" r="5"/><circle cx="235" cy="1268" r="7"/><circle cx="1244" cy="1080" r="3"/></g>
    </svg><div class="landscape-grain"></div>`;
  document.body.prepend(landscape);
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  function paint() {
    frame = null;
    const range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const fraction = Math.min(1, Math.max(0, scrollY / range));
    document.documentElement.style.setProperty('--reading-progress', fraction);
    // The landscape moves a fraction of one viewport over the entire document.
    document.documentElement.style.setProperty('--landscape-shift', reduced.matches ? '0px' : `${-fraction * innerHeight * .68}px`);
    document.documentElement.style.setProperty('--garden-turn', reduced.matches ? '-12deg' : `${-12 + fraction * 34}deg`);
    document.body.classList.toggle('has-scrolled', scrollY > 30);
    const visual = document.querySelector('.event-image-frame');
    if (visual) visual.style.setProperty('--visual-shift', reduced.matches ? '0px' : `${Math.min(scrollY * .13, 85)}px`);
  }
  function requestPaint() { if (!frame) frame = requestAnimationFrame(paint); }
  window.addEventListener('scroll', requestPaint, {passive: true});
  window.addEventListener('resize', requestPaint);
  new ResizeObserver(requestPaint).observe(document.getElementById('main'));

  document.addEventListener('click', event => {
    const target = event.target.closest('a, button');
    if (!target) return;
    const rect = target.getBoundingClientRect();
    origin = {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
  }, true);

  function mount(chapter) {
    document.body.dataset.chapter = chapter || 'home';
    observer?.disconnect();
    const elements = document.querySelectorAll('#main .section-head, #main .history-block, #main .event-timeline, #main .chapter, #main .feature, #main .sources, #main .constellation, #main .burial, #main .archive-figure, #main .home-portraits');
    if (!reduced.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }, {threshold: .06, rootMargin: '0px 0px -24px 0px'});
      for (const el of elements) {
        el.classList.add('section-reveal');
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-visible');
        else observer.observe(el);
      }
    }
    requestPaint();
  }

  async function transition(render, animate = true) {
    const visit = ++transitionNumber;
    const content = document.getElementById('main');
    activeTransition?.skipTransition();
    const x = Math.max(0, Math.min(innerWidth, origin.x));
    const y = Math.max(0, Math.min(innerHeight, origin.y));
    document.documentElement.style.setProperty('--transition-x', `${x}px`);
    document.documentElement.style.setProperty('--transition-y', `${y}px`);
    if (!animate || reduced.matches) {
      content.inert = false;
      content.removeAttribute('aria-busy');
      render();
      return;
    }
    const update = () => {
      render();
      // Keep interactions on the arriving page from landing on a fading snapshot.
      content.inert = true;
      content.setAttribute('aria-busy', 'true');
    };
    if (document.startViewTransition) {
      activeTransition = document.startViewTransition(update);
      try { await activeTransition.finished; } catch { /* A new navigation may supersede this one. */ }
    } else {
      update();
      await content.animate([{opacity: .15, transform: 'translateY(20px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 600, easing: 'cubic-bezier(.2,.75,.2,1)'}).finished.catch(() => {});
    }
    if (visit === transitionNumber) {
      activeTransition = null;
      content.inert = false;
      content.removeAttribute('aria-busy');
      content.focus({preventScroll: true});
    }
  }

  function bloom(dialog, trigger, closing = false) {
    blooms.get(dialog)?.cancel();
    if (reduced.matches) return Promise.resolve();
    const panel = dialog.getBoundingClientRect();
    const point = trigger?.getBoundingClientRect();
    const x = Math.max(28, Math.min(panel.width - 28, point ? point.left + point.width / 2 - panel.left : panel.width / 2));
    const y = Math.max(28, Math.min(panel.height - 28, point ? point.top + point.height / 2 - panel.top : panel.height / 2));
    const small = `circle(24px at ${x}px ${y}px)`;
    const large = `circle(${Math.hypot(panel.width, panel.height)}px at ${x}px ${y}px)`;
    const animation = dialog.animate(closing ? [{clipPath: large, opacity: 1}, {clipPath: small, opacity: 0}] : [{clipPath: small, opacity: .3, transform: 'translateY(14px)'}, {clipPath: large, opacity: 1, transform: 'translateY(0)'}], {duration: closing ? 340 : 760, easing: closing ? 'cubic-bezier(.65,0,.8,.3)' : 'cubic-bezier(.16,.8,.2,1)', fill: 'both'});
    blooms.set(dialog, animation);
    return animation.finished.catch(() => {}).finally(() => {
      if (blooms.get(dialog) === animation) blooms.delete(dialog);
      animation.cancel();
    });
  }
  window.archiveMotion = {mount, transition, bloom, reduced};
  paint();
})();
