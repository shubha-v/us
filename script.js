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
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  function randomPosition() {
    const rect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const minX = padding;
    const maxX = rect.width - btnRect.width - padding;
    const minY = padding;
    const maxY = rect.height - btnRect.height - padding;

    return {
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY
    };
  }

  container.addEventListener('mousemove', () => {
    if (cooldown) return;
    cooldown = true;
    const pos = randomPosition();
    placeAt(pos.x, pos.y);
    setTimeout(() => cooldown = false, 250);
  });

  noBtn.addEventListener('touchstart', () => {
    const pos = randomPosition();
    placeAt(pos.x, pos.y);
  });
})();

/* ===============================
   YES button – hearts + result
================================ */
(() => {
  const yesBtn = document.querySelector('.yes');
  const main = document.querySelector('main.container');

  if (!yesBtn || !main) return;

  function heartExplosion(x, y) {
    for (let i = 0; i < 24; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = '💖';

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 120 + 40;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
      heart.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1200);
    }
  }

  yesBtn.addEventListener('click', (e) => {
    const rect = yesBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    heartExplosion(x, y);

    setTimeout(() => {
      main.innerHTML = `
        <div class="result">
          <h1>Yayyyy ❤️</h1>
          <img src="bike.png" class="bike-img" alt="Bike">
          <p style="font-size:1.1rem;font-weight:600;color:#374151;">
            Forever ride together 🏍️💑
          </p>
        </div>
      `;
    }, 700);
  });
})();
