/**
 * Robin & Anjali Wedding Invitation - Interactive Engine
 */

// Paste your Google Apps Script Web App URL here to capture RSVPs directly to Google Sheets:
// (e.g. 'https://script.google.com/macros/s/AKfycb.../exec')
const GOOGLE_SHEET_URL = '';

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Audio Element & Music Controller ---
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle-btn');
  let isPlaying = false;

  function playAudio() {
    if (!bgMusic) return;
    bgMusic.play().then(() => {
      isPlaying = true;
      if (musicBtn) musicBtn.classList.remove('paused');
    }).catch(err => {
      console.log('Autoplay blocked, user interaction required:', err);
    });
  }

  function pauseAudio() {
    if (!bgMusic) return;
    bgMusic.pause();
    isPlaying = false;
    if (musicBtn) musicBtn.classList.add('paused');
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // --- 2. Welcome Envelope Opening Flow ---
  const welcomeScreen = document.getElementById('welcome-screen');
  const openBtn = document.getElementById('open-invite-btn');
  const envelopeSeal = document.getElementById('envelope-seal');

  function openEnvelope() {
    if (!welcomeScreen || welcomeScreen.classList.contains('opened')) return;

    // Start opening animations
    welcomeScreen.classList.add('opening');
    
    // Play music immediately on click
    playAudio();

    // After animation finishes, fade out welcome screen
    setTimeout(() => {
      welcomeScreen.classList.add('opened');
      // Scroll to top of main invitation smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  }

  if (openBtn) openBtn.addEventListener('click', openEnvelope);
  if (envelopeSeal) envelopeSeal.addEventListener('click', openEnvelope);

  // Check URL params for ?open=1
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('open') === '1') {
    if (welcomeScreen) {
      welcomeScreen.classList.add('opened');
    }
  }

  // --- 3. Live Countdown Timer (Target: Nov 25, 2026, 19:00:00 IST) ---
  const targetDate = new Date('2026-11-25T19:00:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const bannerEl = document.getElementById('live-countdown-text');

    if (distance <= 0) {
      if (bannerEl) bannerEl.innerText = 'The wedding celebration is today!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (bannerEl) {
      bannerEl.innerText = `${days} days ${hours} hours ${minutes} min ${seconds} sec`;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 4. Add to Calendar (Google & ICS generator) ---
  const addToCalLinks = document.querySelectorAll('.btn-add-calendar');
  addToCalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      downloadICS({
        title: "Wedding of Anjali & Robin",
        description: "We warmly invite you to celebrate the wedding of Anjali & Robin at Midori By Tivoli, Kapashera, New Delhi.",
        location: "Midori By Tivoli, D Block, Kapas Hera, New Delhi, Delhi 110097",
        start: "20261125T133000Z", // 19:00 IST in UTC
        end: "20261126T000000Z"
      });
    });
  });

  function downloadICS({ title, description, location, start, end }) {
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Robin and Anjali Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${start}
DTEND:${end}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Anjali-Robin-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- 5. RSVP Modal Logic ---
  const rsvpModal = document.getElementById('rsvp-modal');
  const openRsvpBtns = document.querySelectorAll('.open-rsvp-btn');
  const closeRsvpBtn = document.getElementById('close-rsvp-btn');
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpThankYou = document.getElementById('rsvp-thank-you');

  function openRSVP() {
    if (rsvpModal) {
      rsvpModal.classList.add('active');
      if (rsvpForm) rsvpForm.style.display = 'block';
      if (rsvpThankYou) rsvpThankYou.classList.remove('active');
    }
  }

  function closeRSVP() {
    if (rsvpModal) rsvpModal.classList.remove('active');
  }

  openRsvpBtns.forEach(btn => btn.addEventListener('click', openRSVP));
  if (closeRsvpBtn) closeRsvpBtn.addEventListener('click', closeRSVP);

  if (rsvpModal) {
    rsvpModal.addEventListener('click', (e) => {
      if (e.target === rsvpModal) closeRSVP();
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const guestName = document.getElementById('rsvp-name').value.trim();
      const attendance = document.querySelector('input[name="attending"]:checked')?.value || 'yes';
      const guestsCount = document.getElementById('rsvp-count').value;
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');

      if (!guestName) return;

      const rsvpData = {
        name: guestName,
        attending: attendance === 'yes' ? 'Attending' : 'Not Attending',
        guests: parseInt(guestsCount, 10) || 1,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      };

      // Always save locally as backup
      try {
        const rsvps = JSON.parse(localStorage.getItem('robin_anjali_rsvps') || '[]');
        rsvps.push(rsvpData);
        localStorage.setItem('robin_anjali_rsvps', JSON.stringify(rsvps));
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }

      // Show submitting state on button
      const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
      }

      // Send directly to Google Sheet if configured
      if (typeof GOOGLE_SHEET_URL === 'string' && GOOGLE_SHEET_URL.trim().length > 0) {
        try {
          await fetch(GOOGLE_SHEET_URL.trim(), {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rsvpData)
          });
        } catch (networkErr) {
          console.warn('Google Sheet submission warning (saved to local backup):', networkErr);
        }
      }

      // Reset button & transition to thank you confirmation
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
      rsvpForm.style.display = 'none';
      if (rsvpThankYou) rsvpThankYou.classList.add('active');
    });
  }

  // --- 6. Ambient Falling Rose Petals & Golden Hearts Canvas ---
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.9 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        type: Math.random() > 0.4 ? 'petal' : 'heart',
        opacity: Math.random() * 0.45 + 0.25
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y / 35) * 0.6;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'heart') {
          ctx.fillStyle = '#d4af37'; // Golden heart
          drawHeart(ctx, 0, 0, p.size * 0.8);
        } else {
          ctx.fillStyle = '#6e1921'; // Deep burgundy petal
          drawPetal(ctx, 0, 0, p.size);
        }

        ctx.restore();
      });

      requestAnimationFrame(renderParticles);
    }

    function drawHeart(ctx, x, y, size) {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      // bottom left curve
      ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
      // bottom right curve
      ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      // top right curve
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    }

    function drawPetal(ctx, x, y, size) {
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.5, size * 0.9, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    renderParticles();
  }
});
