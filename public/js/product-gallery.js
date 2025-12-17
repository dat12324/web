// product-gallery.js
// Simple thumbnail click to swap main image and active state
document.addEventListener('DOMContentLoaded', function () {
  const mainImg = document.getElementById('mainProductImage');
  if (!mainImg) return;

  const thumbs = document.querySelectorAll('.product-gallery .thumb');
  thumbs.forEach((t) => {
    t.addEventListener('click', function () {
      const src = this.getAttribute('data-src');
      if (!src) return;
      mainImg.src = src;
      thumbs.forEach(x => x.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
