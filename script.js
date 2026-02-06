(() => {
  const container = document.querySelector('.options');
  const noBtn = document.querySelector('.no');
  if (!container || !noBtn) return;

  const padding = 12; // leave a small gap from edges
  let cooldown = false;

  function placeAt(x, y) {
    // keep the button centered using translate(-50%,-50%) in CSS
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  function randomPosition() {
    const rect = container.getBoundingClientRect();
    const bRect = noBtn.getBoundingClientRect();
    const minX = rect.left + padding + bRect.width / 2;
    const maxX = rect.right - padding - bRect.width / 2;
    const minY = rect.top + padding + bRect.height / 2;
    const maxY = rect.bottom - padding - bRect.height / 2;
    const x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
    const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);
    // convert to coordinates relative to container for left/top
    return { x: x - rect.left, y: y - rect.top };
  }

  // initialize position to center
  const initRect = container.getBoundingClientRect();
  placeAt(initRect.width / 2, initRect.height / 2);

  container.addEventListener('mousemove', (e) => {
    if (cooldown) return;
    const rect = container.getBoundingClientRect();
    const bRect = noBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const btnCenterX = bRect.left + bRect.width / 2;
    const btnCenterY = bRect.top + bRect.height / 2;
    const dx = mouseX - btnCenterX;
    const dy = mouseY - btnCenterY;
    const dist = Math.hypot(dx, dy);
    const threshold = 120; // pixels

    if (dist < threshold) {
      cooldown = true;
      const pos = randomPosition();
      placeAt(pos.x, pos.y);
      // small delay to avoid rapid jumps
      setTimeout(() => (cooldown = false), 220);
    }
  });

  // keep button inside when window resizes
  window.addEventListener('resize', () => {
    const rect = container.getBoundingClientRect();
    placeAt(rect.width / 2, rect.height / 2);
  });
})();

// --- Yes button: show "Working (Image)" state ---
(function () {
  const yesBtn = document.querySelector('.yes');
  const main = document.querySelector('main.container');
  if (!yesBtn || !main) return;

  yesBtn.addEventListener('click', () => {
    // build working view with inline SVG spinner
    const working = document.createElement('div');
    working.className = 'working';
    working.setAttribute('role', 'status');
    working.setAttribute('aria-live', 'polite');
    working.innerHTML = `
      <div class="working-inner">
        <svg class="spinner" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4" stroke-linecap="round" />
        </svg>
        <div class="working-text">Working</div>
      </div>
    `;

    // replace main content
    main.innerHTML = '';
    main.appendChild(working);
  });
})();
