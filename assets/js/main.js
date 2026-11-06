// BJQ Hospital site script
// Set the hospital WhatsApp number (international format, digits only, e.g. "923001234567")
// to send appointment requests to WhatsApp.
const BJQ_WHATSAPP = "";

(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add('in'));

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  const form = document.getElementById('appt-form');
  if (form) form.addEventListener('submit', ev => {
    ev.preventDefault();
    const note = document.getElementById('form-note');
    const d = new FormData(form);
    if (!d.get('name') || !d.get('phone')) { note.textContent = 'Please add your name and phone number.'; return; }
    const text = `Appointment request - BJQ Hospital\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nDepartment: ${d.get('dept')}\nPreferred date: ${d.get('date') || 'Any'}\n${d.get('msg') || ''}`;
    if (BJQ_WHATSAPP) {
      window.open(`https://wa.me/${BJQ_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      note.textContent = 'Opening WhatsApp to send your request…';
    } else {
      note.textContent = 'Thank you. Online booking will be switched on soon; please call reception for now.';
    }
  });
})();
