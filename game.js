const RegionQuiz = (() => {
  const dishes = [
    { name: "Casabe", emoji: "🫓", region: "Caribe", desc: "Pan plano de yuca brava, base ancestral del litoral." },
    { name: "Tamal Tolimense", emoji: "🫔", region: "Andina", desc: "Masa de maíz rellena, cocida al vapor en hojas." },
    { name: "Encocado de Camarón", emoji: "🦐🥥", region: "Pacífica", desc: "Mariscos en leche de coco con especias." },
    { name: "Maito de Pescado", emoji: "🐟🌿", region: "Amazonía", desc: "Pescado asado envuelto en hojas de bijao." },
    { name: "Mamona", emoji: "🥩🔥", region: "Orinoquía", desc: "Carne asada en vara sobre fogón abierto." }
  ];
  const regions = ["Andina", "Caribe", "Pacífica", "Amazonía", "Orinoquía"];
  let currentQ = 0;
  const el = id => document.getElementById(id);

  function loadQuestion() {
    if (!el('quiz-question')) return;
    const d = dishes[currentQ % dishes.length];
    el('quiz-emoji').textContent = d.emoji;
    el('quiz-question').textContent = d.name;
    el('quiz-desc').textContent = d.desc;
    el('quiz-progress').textContent = `Pregunta ${currentQ + 1} de ${dishes.length}`;
    el('quiz-feedback').textContent = '';
    el('quiz-feedback').style.color = '';

    const btnContainer = el('quiz-buttons');
    btnContainer.innerHTML = '';
    regions.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'quiz-btn';
      btn.textContent = r;
      btn.onclick = () => checkAnswer(r, d.region, btn);
      btnContainer.appendChild(btn);
    });
  }

  function checkAnswer(selected, correct, btn) {
    const buttons = document.querySelectorAll('.quiz-btn');
    buttons.forEach(b => b.disabled = true);

    const fb = el('quiz-feedback');
    if (selected === correct) {
      btn.classList.add('correct');
      fb.textContent = '✅ ¡Correcto!';
      fb.style.color = 'var(--color-secondary, #52b788)';
    } else {
      btn.classList.add('incorrect');
      fb.textContent = `❌ Incorrecto. Era: ${correct}`;
      fb.style.color = '#e76f51';
      buttons.forEach(b => { if (b.textContent === correct) b.classList.add('correct'); });
    }

    setTimeout(() => {
      currentQ++;
      if (currentQ < dishes.length) {
        loadQuestion();
      } else {
        el('quiz-progress').textContent = '¡Quiz completado!';
        el('quiz-emoji').textContent = '🎉';
        el('quiz-question').textContent = '¡Excelente trabajo!';
        el('quiz-desc').textContent = 'Has recorrido la gastronomía ancestral de Colombia.';
        el('quiz-buttons').innerHTML = '<button class="quiz-btn" onclick="location.reload()">🔄 Volver a jugar</button>';
        el('quiz-feedback').textContent = '';
      }
    }, 1500);
  }

  return { init: loadQuestion };
})();

document.addEventListener('DOMContentLoaded', () => RegionQuiz.init());