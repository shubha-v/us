/* ===============================
   NO button – runaway logic
================================ */
(() => {
  const container = document.querySelector('.options');
  const noBtn = document.querySelector('.no');

  if (!container || !noBtn) return;

  const padding = 20;
  let cooldown = false;

  function placeAt(x, y) {
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  function randomPosition() {
    const rect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const minX = padding + btnRect.width / 2;
    const maxX = rect.width - padding - btnRect.width / 2;
    const minY = padding + btnRect.height / 2;
    const maxY = rect.height - padding - btnRect.height / 2;

    return {
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY
    };
  }

  // Initial center position
  placeAt(container.clientWidth / 2, container.clientHeight / 2);

  // Desktop: mouse move
  container.addEventListener('mousemove', (e) => {
    if (cooldown) return;

    const btnRect = noBtn.getBoundingClientRect();
    const dx = e.clientX - (btnRect.left + btnRect.width / 2);
    const dy = e.clientY - (btnRect.top + btnRect.height / 2);
    const distance = Math.hypot(dx, dy);

    if (distance < 120) {
      cooldown = true;
      const pos = randomPosition();
      placeAt(pos.x, pos.y);
      setTimeout(() => cooldown = false, 200);
    }
  });

  // Mobile: touch start
  noBtn.addEventListener('touchstart', () => {
    const pos = randomPosition();
    placeAt(pos.x, pos.y);
  });

  // Keep inside container on resize
  window.addEventListener('resize', () => {
    placeAt(container.clientWidth / 2, container.clientHeight / 2);
  });
})();

/* ===============================
   YES button – final screen
================================ */
(() => {
  const yesBtn = document.querySelector('.yes');
  const main = document.querySelector('main.container');

  if (!yesBtn || !main) return;

  yesBtn.addEventListener('click', () => {
    const result = document.createElement('div');
    result.className = 'result';

    result.innerHTML = `
      <h1>Yayyyy ❤️</h1>
      <img src="bike.png" alt="Bike" class="bike-img">
      <p style="font-size:1.1rem;font-weight:600;color:#374151;">
        Forever ride together 🏍️💑
      </p>
    `;

    main.innerHTML = '';
    main.appendChild(result);
  });
})();
