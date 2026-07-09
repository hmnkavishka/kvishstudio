/* ==========================================================
   KVISH STUDIO — shared script
   SETTINGS: මේ lines 2 විතරක් වෙනස් කරන්න 👇
   ========================================================== */
const WHATSAPP_NUMBER = "94771234567";           // ඔයාගේ WhatsApp number (94 වලින්, + නැතුව)
const MY_EMAIL        = "hello@kvishstudio.com"; // ඔයාගේ email එක

/* ---------- WhatsApp links (anything with class .js-wa) ---------- */
const waBase = `https://wa.me/${WHATSAPP_NUMBER}`;
const defaultMsg = encodeURIComponent("Hi Kvish Studio! I'm interested in getting a website. 😊");
document.querySelectorAll('.js-wa').forEach(el => el.href = `${waBase}?text=${defaultMsg}`);
document.querySelectorAll('.js-wa-number').forEach(el =>
  el.textContent = "+" + WHATSAPP_NUMBER.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, "$1 $2 $3 $4"));
document.querySelectorAll('.js-mail').forEach(el => { el.href = `mailto:${MY_EMAIL}`; });
document.querySelectorAll('.js-mail-label').forEach(el => el.textContent = MY_EMAIL);

/* ---------- mobile menu ---------- */
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
if (burger && menu) {
  burger.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-q').forEach(q =>
  q.addEventListener('click', () => q.closest('.faq').classList.toggle('open')));

/* ---------- ticker: duplicate for seamless loop ---------- */
document.querySelectorAll('.ticker-track').forEach(t => t.innerHTML += t.innerHTML);

/* ---------- plan chips + contact form → WhatsApp ---------- */
let chosenPlan = "";
document.querySelectorAll('.chip').forEach(c => {
  c.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(x => {
      x.classList.remove('bg-brand', 'border-brand', 'text-white');
      x.classList.add('text-muted');
    });
    c.classList.add('bg-brand', 'border-brand', 'text-white');
    c.classList.remove('text-muted');
    chosenPlan = c.textContent.trim();
  });
});
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const biz  = (document.getElementById('biz') || {}).value || '-';
    const msg  = document.getElementById('msg').value;
    const text = encodeURIComponent(
      `Hi Kvish Studio! 👋\n\nName: ${name}\nBusiness: ${biz}\nPlan: ${chosenPlan || 'Not sure yet'}\n\n${msg}`
    );
    window.open(`${waBase}?text=${text}`, '_blank');
  });
}

/* ---------- footer year + active nav link ---------- */
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a[href]').forEach(a => {
  if (a.getAttribute('href') === here) a.classList.add('text-white');
});
