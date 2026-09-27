document.getElementById('year').textContent = new Date().getFullYear();

requestAnimationFrame(() => document.body.classList.add('page-ready'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.intro, .service-list article, .project, .process li').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});
