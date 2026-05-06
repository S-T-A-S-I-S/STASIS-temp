(function () {

  /* ── Shared nav + footer ── */

  var NAV = '<nav>' +
    '<a href="index.html" class="button">Home</a>' +
    '<a href="archives.html" class="button">Archives</a>' +
    '<a href="selected-work.html" class="button">Selected Work</a>' +
    '<a href="regional-expansion.html" class="button">Regional Expansion</a>' +
    '<a href="contact.html" class="button">Contact</a>' +
    '</nav>';

  var FOOTER = '<footer>' +
    '<img src="logo.png" alt="S.T.A.S.I.S. Logo" class="footer-logo">' +
    '<div class="social-icons">' +
    '<a href="https://www.tiktok.com/@stasiscreations"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg" alt="TikTok"></a>' +
    '<a href="https://www.instagram.com/s.t.a.s.i.s.creations/"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram"></a>' +
    '<a href="https://x.com/STASISCreations"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X"></a>' +
    '<a href="#"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube"></a>' +
    '</div>' +
    '<div class="contact-info">' +
    '<p>Email: <a href="mailto:2024mmorgan@gmail.com">2024mmorgan@gmail.com</a></p>' +
    '<p>Phone: <a href="tel:+16414810176">(641) 481-0176</a></p>' +
    '</div>' +
    '<p class="footer-note">© 2025</p>' +
    '</footer>';

  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  /* ── Particle background ── */

  function initParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
    document.body.prepend(canvas);

    var W, H, particles;
    var mouse = { x: -9999, y: -9999 };

    var CONNECT_DIST = 145;
    var MOUSE_DIST   = 190;
    var MAX_SPEED    = 1.1;
    var FRICTION     = 0.991;

    function rand(a, b) { return a + Math.random() * (b - a); }

    function particleCount() {
      return Math.min(80, Math.round((W * H) / 13000));
    }

    function buildParticles() {
      particles = [];
      for (var i = 0, n = particleCount(); i < n; i++) {
        particles.push({
          x:  rand(0, W),
          y:  rand(0, H),
          vx: rand(-0.4, 0.4),
          vy: rand(-0.4, 0.4),
          r:  rand(1.2, 2.8),
          a:  rand(0.2, 0.55)
        });
      }
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildParticles();
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      var i, j, p, dx, dy, d, f;

      /* update + draw dots */
      for (i = 0; i < particles.length; i++) {
        p = particles[i];

        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        d  = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < MOUSE_DIST) {
          f = ((MOUSE_DIST - d) / MOUSE_DIST) * 0.22;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        var spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 1;
        if (spd > MAX_SPEED) { p.vx = (p.vx / spd) * MAX_SPEED; p.vy = (p.vy / spd) * MAX_SPEED; }
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -12) p.x = W + 12; else if (p.x > W + 12) p.x = -12;
        if (p.y < -12) p.y = H + 12; else if (p.y > H + 12) p.y = -12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(96,165,250,' + p.a + ')';
        ctx.fill();
      }

      /* draw connections */
      for (i = 0; i < particles.length - 1; i++) {
        for (j = i + 1; j < particles.length; j++) {
          dx = particles[i].x - particles[j].x;
          dy = particles[i].y - particles[j].y;
          d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(96,165,250,' + (0.22 * (1 - d / CONNECT_DIST)) + ')';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', function ()  { mouse.x = -9999;    mouse.y = -9999; });
    window.addEventListener('touchmove', function (e)  { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchend',  function ()   { mouse.x = -9999;    mouse.y = -9999; });

    resize();
    tick();
  }

  /* ── Init ── */

  function run() {
    inject('site-nav', NAV);
    inject('site-footer', FOOTER);
    initParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
