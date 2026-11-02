(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    var setMenu = function (open) {
      mobileNav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
      toggle.textContent = open ? '✕' : '☰';
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    };

    toggle.addEventListener('click', function () {
      setMenu(!mobileNav.classList.contains('open'));
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 640) setMenu(false);
    });
  }

  /* ---------- project tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.project-tabs button'));

  var activate = function (tab) {
    tabs.forEach(function (item) {
      var isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;

      var panel = document.getElementById(item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !isActive;
    });
  };

  tabs.forEach(function (tab, index) {
    tab.tabIndex = tab.classList.contains('active') ? 0 : -1;

    tab.addEventListener('click', function () {
      activate(tab);
    });

    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      var next = tabs[(index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      activate(next);
      next.focus();
    });
  });

  /* ---------- scroll reveal ---------- */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(
    '.statement, .summary, .technology, .projects .section-heading, .project-tabs, .project-panel, .project-metrics, .strip article, .stack .section-heading, .stack-grid article, .education .section-heading, .edu-card, .about-copy, .values, .contact'
  ));

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced) {
    revealTargets.forEach(function (element) {
      element.classList.add('reveal');
    });

    var ticking = false;

    var checkReveal = function () {
      ticking = false;
      var limit = window.innerHeight * 0.9;

      for (var i = revealTargets.length - 1; i >= 0; i -= 1) {
        var element = revealTargets[i];
        if (element.getBoundingClientRect().top < limit) {
          element.classList.add('in');
          revealTargets.splice(i, 1);
        }
      }

      if (!revealTargets.length) {
        window.removeEventListener('scroll', requestCheck);
        window.removeEventListener('resize', requestCheck);
      }
    };

    var requestCheck = function () {
      if (ticking) return;
      ticking = true;
      window.setTimeout(checkReveal, 60);
    };

    window.addEventListener('scroll', requestCheck, { passive: true });
    window.addEventListener('resize', requestCheck);
    window.addEventListener('load', requestCheck);
    requestCheck();
  }
})();
