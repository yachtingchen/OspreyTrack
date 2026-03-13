/**
 * 安心伴 Landing Page — 主要 JavaScript
 *
 * 模組：
 * 1. 導覽列：滾動效果 + 手機選單
 * 2. 平滑滾動：點選導覽連結
 * 3. 捲動動畫：IntersectionObserver
 * 4. 數字計數動畫
 * 5. 回到頂部按鈕
 */

'use strict';

// ============================================================
// 1. 導覽列
// ============================================================
(function initNav() {
  const header    = document.getElementById('site-header');
  const toggle    = document.getElementById('nav-toggle');
  const menu      = document.getElementById('nav-menu');
  const navLinks  = menu ? menu.querySelectorAll('a') : [];

  // 滾動後加上陰影
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 漢堡選單開關
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('is-open', !isOpen);
    });

    // 點選導覽連結後關閉選單
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      });
    });

    // 點選選單外部關閉
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
      }
    });
  }
})();


// ============================================================
// 2. 捲動動畫（IntersectionObserver）
// ============================================================
(function initScrollAnimation() {
  const targets = document.querySelectorAll('.animate-on-scroll');
  if (!targets.length) return;

  // 如果瀏覽器不支援 IntersectionObserver，直接顯示
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 動畫只播一次
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
})();


// ============================================================
// 3. 數字計數動畫
// ============================================================
(function initCountAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  /**
   * 將數字格式化為適合顯示的字串
   * @param {number} value
   * @param {number} target - 目標值（用於判斷小數位數）
   */
  function formatNumber(value, target) {
    if (target < 10) {
      // 保留一位小數（例如 4.9）
      return value.toFixed(1);
    }
    // 千分位格式
    return Math.round(value).toLocaleString('zh-TW');
  }

  /**
   * 執行計數動畫
   * @param {HTMLElement} el
   * @param {number} target
   * @param {number} duration - 毫秒
   */
  function countUp(el, target, duration = 1600) {
    const start     = performance.now();
    const startVal  = 0;

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = startVal + (target - startVal) * eased;

      el.textContent = formatNumber(current, target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNumber(target, target);
      }
    }

    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    statNumbers.forEach(el => {
      const target = parseFloat(el.dataset.target);
      countUp(el, target);
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseFloat(el.dataset.target);
        countUp(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
})();


// ============================================================
// 4. 回到頂部按鈕
// ============================================================
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function updateVisibility() {
    const shouldShow = window.scrollY > 400;
    if (shouldShow) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// ============================================================
// 5. 平滑滾動（補強原生 scroll-behavior）
// ============================================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const headerHeight = document.getElementById('site-header')?.offsetHeight ?? 0;
      const targetTop    = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      // 更新 URL（不觸發跳轉）
      history.pushState(null, '', targetId);
    });
  });
})();
