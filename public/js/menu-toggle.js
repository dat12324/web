// menu-toggle.js
// Mark LIs that have a child UL and add hover/click handlers
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.menu-list');
  if (!menu) return;

  // find all LIs with child UL
  const items = menu.querySelectorAll('li');
  items.forEach((li) => {
    const child = li.querySelector(':scope > ul');
    if (child) {
      li.classList.add('has-children');

      // mouse enter/leave for desktop hover with a small delay on leave
      let hideTimeout = null;
      li.addEventListener('mouseenter', () => {
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
        li.classList.add('open');
      });
      li.addEventListener('mouseleave', () => {
        // delay removing open so user can move pointer into submenu
        hideTimeout = setTimeout(() => {
          li.classList.remove('open');
        }, 300); // 300ms tolerance to reduce accidental closing
      });

      // click/tap toggles open on touch devices
      const anchor = li.querySelector(':scope > a');
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // For touch devices or if the link shouldn't immediately navigate,
        // on first click open the submenu; second click will navigate.
        if (li.classList.contains('open')) {
          // already open -> allow navigation
          return;
        }
        // Prevent immediate navigation and open submenu instead
        e.preventDefault();
        li.classList.add('open');
      });
    }
  });
});
