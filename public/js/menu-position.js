// menu-position.js
// Ensure flyout submenus don't overflow the viewport: flip to left when needed
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.menu-list');
  if (!menu) return;

  const checkAndFlip = (li) => {
    const child = li.querySelector(':scope > ul');
    if (!child) return;

    // Temporarily show the submenu invisibly to measure
    const prevDisplay = child.style.display;
    const prevVisibility = child.style.visibility;
    child.style.display = 'block';
    child.style.visibility = 'hidden';

    const rect = child.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // If submenu would overflow the viewport on the right, flip it to the left
    if (rect.right > viewportWidth - 8) {
      li.classList.add('fly-left');
    } else {
      li.classList.remove('fly-left');
    }

    // restore
    child.style.display = prevDisplay;
    child.style.visibility = prevVisibility;
  };

  // Attach listeners to all li elements that have child ul
  const items = menu.querySelectorAll('li');
  items.forEach((li) => {
    const child = li.querySelector(':scope > ul');
    if (!child) return;

    // check on mouseenter so the flip is applied before submenu shows
    li.addEventListener('mouseenter', () => checkAndFlip(li));

    // also check on window resize to update positions
    window.addEventListener('resize', () => checkAndFlip(li));
  });

  // Initial pass in case some menus are visible on load
  items.forEach((li) => checkAndFlip(li));
});
