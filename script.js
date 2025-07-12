document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Hero carousel logic
  const slides = document.querySelectorAll('#hero-carousel img');
  const texts = [
    "Innovative IT Solutions",
    "Scalable Cloud Infrastructure",
    "Next-Gen Cybersecurity & Support"
  ];
  const textElement = document.getElementById("carousel-text");
  const overlay = document.getElementById("hero-overlay");
  let curr = 0;

  function getAverageBrightness(imgEl, callback) {
    const canvas = document.createElement('canvas');
    canvas.width = imgEl.naturalWidth;
    canvas.height = imgEl.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let total = 0;
    const pixels = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      total += 0.299 * r + 0.587 * g + 0.114 * b;
    }
    callback(total / pixels);
  }

  function adjustOverlayForImage(img) {
    getAverageBrightness(img, (brightness) => {
      if (brightness > 180) overlay.style.background = 'rgba(0, 0, 0, 0.5)';
      else if (brightness > 100) overlay.style.background = 'rgba(0, 0, 0, 0.35)';
      else overlay.style.background = 'rgba(0, 0, 0, 0.2)';
    });
  }

  function updateSlide(index) {
    slides.forEach((slide, i) => slide.classList.replace('opacity-100', 'opacity-0'));
    const current = slides[index];
    current.classList.replace('opacity-0', 'opacity-100');
    adjustOverlayForImage(current);
  }

  function typeWriterEffect(text, element, speed = 50) {
    element.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
  }

  function cycleHero() {
    updateSlide(curr);
    typeWriterEffect(texts[curr], textElement);
    curr = (curr + 1) % slides.length;
  }

  cycleHero();
  setInterval(cycleHero, 5000);
});