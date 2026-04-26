/* script.js - Raíces Rebeldes | Funcionalidad del Sitio */
document.addEventListener('DOMContentLoaded', () => {
  
  // Utilidades seguras
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // 1. Menú Móvil
  const toggle = $('.mobile-toggle');
  const menu = $('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // 2. Resaltado automático del enlace activo
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href').replace('./', '').split('#')[0];
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Scroll suave para anclas internas
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 4. Animaciones de entrada al hacer scroll
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  $$('.content-section > div').forEach(el => fadeObserver.observe(el));

});