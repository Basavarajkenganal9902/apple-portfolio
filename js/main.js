/**
 * Apple Style Reference - Portfolio Main JavaScript
 * Interactive navigation, copy actions, carousel controls, and smooth scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initAnchorLinks();
  initCarouselControls();
  initCopyActions();
});

/**
 * Update active state of in-page anchor links based on scroll position
 */
function initAnchorLinks() {
  const sections = document.querySelectorAll('section[id]');
  const anchorLinks = document.querySelectorAll('.anchor-link');

  if (!sections.length || !anchorLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    anchorLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Handle Sticky Nav visual effect on scroll
 */
function initStickyNav() {
  const localNav = document.querySelector('.product-local-nav');
  if (!localNav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 44) {
      localNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
    } else {
      localNav.style.boxShadow = 'none';
    }
  });
}

/**
 * Interactive Carousel Dot switching for Highlights section
 */
function initCarouselControls() {
  const dots = document.querySelectorAll('.playback-dot');
  const cards = document.querySelectorAll('.feature-media-card');

  if (!dots.length || !cards.length) return;

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    });
  });
}

/**
 * Utility function to copy email or contact details to clipboard with a toast notification
 */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard`);
      }).catch(err => {
        console.error('Copy failed', err);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}







const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀" : "☾";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Restore saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀";
}
