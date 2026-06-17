const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");
const pageProgress = document.getElementById("pageProgress");
const cursorGlow = document.getElementById("cursorGlow");
const typedRole = document.getElementById("typedRole");

const rolePhrases = [
  "Aspiring Developer & Creative Builder",
  "Frontend Enthusiast",
  "Python Learner",
  "Cybersecurity Explorer",
  "Design-Minded Problem Solver"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = rolePhrases[phraseIndex];
  const visibleText = current.slice(0, charIndex);
  typedRole.textContent = visibleText;

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 55);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 28);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % rolePhrases.length;
  setTimeout(typeLoop, 180);
}

typeLoop();

function setProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  pageProgress.style.width = `${progress}%`;
}

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  setProgress();
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);

document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

hamburger.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");
  hamburger.classList.toggle("active", opened);
  hamburger.setAttribute("aria-expanded", String(opened));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

const sectionLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => link.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
    if (activeLink) activeLink.classList.add("active");
  });
}, {
  threshold: 0.45
});

sections.forEach((section) => sectionObserver.observe(section));

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.style.transitionDelay = `${(index % 6) * 70}ms`;
    el.classList.add("revealed");
    revealObserver.unobserve(el);
  });
}, {
  threshold: 0.12
});

revealEls.forEach((el) => revealObserver.observe(el));

const countEls = document.querySelectorAll("[data-count]");

function animateCount(el) {
  const target = Number(el.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toString().padStart(target >= 100 ? 3 : 1, "0").replace(/^0+(?=\d)/, "");
  
  
  
  // change later for '+'
  
    if (progress < 1) {
  requestAnimationFrame(frame);
} else {
  // el.textContent = target + "+";
  const suffix = el.dataset.suffix || "";
el.textContent = target + suffix;
}





  }

  requestAnimationFrame(frame);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCount(entry.target);
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

countEls.forEach((el) => statsObserver.observe(el));
