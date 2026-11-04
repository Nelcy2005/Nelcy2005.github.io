// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Boxes fade in slowly as you scroll ----------
(function () {
  var items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

// ---------- Petals that float down behind the cursor ----------
(function () {
  var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!hasMouse || reduce) return;

  var last = 0;
  window.addEventListener('mousemove', function (e) {
    var now = performance.now();
    if (now - last < 110) return;
    last = now;

    var p = document.createElement('span');
    p.className = 'petal';
    p.style.left = (e.clientX - 8) + 'px';
    p.style.top = (e.clientY - 4) + 'px';
    p.style.setProperty('--dx', (Math.random() * 50 - 25) + 'px');
    p.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
    document.body.appendChild(p);
    setTimeout(function () { p.remove(); }, 1100);
  });
})();

// ---------- Light copy protection ----------
// This only discourages casual copying. Anything shown in a browser can still
// be saved, so the copyright notice in the footer is the real protection.
document.addEventListener('contextmenu', function (e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', function (e) {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
