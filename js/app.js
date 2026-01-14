let cachedLines = null; // wird nach dem ersten Laden gefüllt

async function loadLinesOnce(url) {
  if (cachedLines !== null) {
    return cachedLines; // schon geladen → direkt zurückgeben
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load file: " + response.status);
  }

  const text = await response.text();
  cachedLines = text.split(/\r?\n/).filter(line => line.trim() !== "");
  return cachedLines;
}

function getCryptoRandomIndex(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

async function getRandomLine(url) {
  const lines = await loadLinesOnce(url);
  const index = getCryptoRandomIndex(lines.length);
  return lines[index];
}

document.addEventListener("DOMContentLoaded", async () => {
  const url = "data/ideas.txt";
  const container = document.querySelector('.fire')
    const fireworks = new Fireworks.default(container, {
  autoresize: false,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 5,
  intensity: 30,
  flickering: 50,
  lineStyle: 'round',
  hue: {
    min: 0,
    max: 360
  },
  delay: {
    min: 0,
    max: 60
  },
  rocketsPoint: {
    min: 50,
    max: 50
  },
  lineWidth: {
    explosion: {
      min: 1,
      max: 3
    },
    trace: {
      min: 1,
      max: 2
    }
  },
  brightness: {
    min: 50,
    max: 80
  },
  decay: {
    min: 0.015,
    max: 0.03
  },
  mouse: {
    click: false,
    move: false,
    max: 1
  }
});
  const shittyIdeaEl = document.querySelector(".shittyidea");
  const notThatEl = document.querySelector(".notthat");
  const takeitEl = document.querySelector('.takeit')

  async function updateLine() {
    const line = await getRandomLine(url);
    if (line && shittyIdeaEl) {
      shittyIdeaEl.textContent = line;
    }
  }



  // Initial laden + anzeigen
  updateLine();

  // Neue Zeile würfeln ohne neuen fetch
  if (notThatEl) {
    notThatEl.addEventListener("click", updateLine);
  }
  if (takeitEl) {
    takeitEl.addEventListener("click", async() => {
      fireworks.start();
      new Promise(resolve => setTimeout(resolve, 3000))
      .then(() => {
        fireworks.stop();
    });
    } );
  }
});
