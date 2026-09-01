// mobile nav toggle
const navtoggle = document.getElementById('navtoggle');
const navlinks = document.getElementById('navlinks');
const iconMenu = document.getElementById('iconMenu');
const iconClose = document.getElementById('iconClose');
navtoggle.addEventListener('click', () => {
  const open = navlinks.classList.toggle('open');
  navtoggle.setAttribute('aria-expanded', open);
  iconMenu.style.display = open ? 'none' : 'block';
  iconClose.style.display = open ? 'block' : 'none';
});
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navlinks.classList.remove('open');
  navtoggle.setAttribute('aria-expanded', false);
  iconMenu.style.display = 'block';
  iconClose.style.display = 'none';
}));

// scroll reveal (with safety fallbacks so content is never stuck hidden)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.02, rootMargin: '0px 0px -6% 0px' });
  revealEls.forEach(el => io.observe(el));
  // fallback: force-reveal anything IO misses (slow devices, throttled tabs, headless renderers)
  setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 2500);
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();

// order form: build a pre-filled email instead of posting to a backend
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderType = orderForm.orderType.value;
    const fullName = orderForm.fullName.value.trim();
    const phone = orderForm.phone.value.trim();
    const email = orderForm.email.value.trim();
    const details = orderForm.details.value.trim();

    const subject = `Order Request: ${orderType} - ${fullName}`;
    const bodyLines = [
      `Order type: ${orderType}`,
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      '',
      'Details:',
      details
    ].filter(line => line !== null);

    const mailto = `mailto:sundayson26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
  });
}
