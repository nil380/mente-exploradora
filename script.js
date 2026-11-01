const questions = [
  {
    text: "Miras al cielo de noche. ¿Qué te viene primero a la cabeza?",
    answers: [
      ["Hay algo o alguien detrás de tanta maravilla.", "faith"],
      ["¡Qué inmenso! Me encanta no tenerlo todo resuelto.", "wonder"],
      ["Estrellas, planetas y un montón de física fascinante.", "skeptic"]
    ]
  },
  {
    text: "¿De dónde crees que salió el universo?",
    answers: [
      ["De una creación con intención.", "faith"],
      ["No lo sé, ¡y esa pregunta me parece alucinante!", "wonder"],
      ["Del Big Bang y de procesos naturales que seguimos estudiando.", "skeptic"]
    ]
  },
  {
    text: "Si pudieras hacerle una pregunta a Dios, ¿cuál sería?",
    answers: [
      ["¿Cómo puedo acercarme más a ti?", "faith"],
      ["¿Por qué existe algo en vez de nada?", "wonder"],
      ["¿Qué prueba podría demostrar que existes?", "skeptic"]
    ]
  },
  {
    text: "¿Qué te parece la idea de que exista vida en otros planetas?",
    answers: [
      ["El universo es una creación enorme; ¡quién sabe qué más hay!", "faith"],
      ["¡Ojalá! Sería increíble descubrirlo.", "wonder"],
      ["Con tantos planetas, parece posible, aunque aún no hay pruebas.", "skeptic"]
    ]
  },
  {
    text: "Cuando haces algo bueno por alguien, ¿qué te inspira?",
    answers: [
      ["Mi fe y el amor que siento por los demás.", "faith"],
      ["La conexión que tenemos y cómo se siente ayudar.", "wonder"],
      ["La empatía: somos seres sociales y nos cuidamos.", "skeptic"]
    ]
  },
  {
    text: "¿Qué haces cuando la vida se pone difícil?",
    answers: [
      ["Rezo o me apoyo en mi fe.", "faith"],
      ["Busco sentido, hablo con alguien y voy paso a paso.", "wonder"],
      ["Me centro en lo que puedo cambiar y pido ayuda.", "skeptic"]
    ]
  },
  {
    text: "¿Qué te parece que haya tantas religiones distintas?",
    answers: [
      ["Muchas tradiciones pueden buscar una verdad divina.", "faith"],
      ["Muestran lo mucho que las personas se preguntan por el sentido.", "wonder"],
      ["Son ideas humanas que han cambiado con la historia y las culturas.", "skeptic"]
    ]
  },
  {
    text: "¿Y los milagros? ¿Qué opinas?",
    answers: [
      ["Creo que pueden ser señales de algo divino.", "faith"],
      ["Me intrigan; escucho las historias con curiosidad.", "wonder"],
      ["Antes de llamarlo milagro, buscaría una explicación comprobable.", "skeptic"]
    ]
  },
  {
    text: "Si el universo tuviera una banda sonora, ¿cómo sonaría?",
    answers: [
      ["Como un coro celestial lleno de esperanza.", "faith"],
      ["Como música misteriosa que invita a imaginar.", "wonder"],
      ["Como el zumbido de las ondas, los púlsares y el espacio.", "skeptic"]
    ]
  },
  {
    text: "¿Crees que la ciencia y la fe pueden llevarse bien?",
    answers: [
      ["Sí: pueden responder preguntas diferentes.", "faith"],
      ["Depende de cómo las viva cada persona.", "wonder"],
      ["La ciencia explica el mundo con pruebas; la fe es otra clase de creencia.", "skeptic"]
    ]
  },
  {
    text: "¿Qué hace que una vida tenga sentido?",
    answers: [
      ["Conocer a Dios y vivir según sus enseñanzas.", "faith"],
      ["El amor, las experiencias y lo que vamos descubriendo.", "wonder"],
      ["Lo que elegimos construir con otras personas aquí y ahora.", "skeptic"]
    ]
  },
  {
    text: "¿Cómo te imaginas lo que pasa después de la muerte?",
    answers: [
      ["Espero que haya vida junto a Dios.", "faith"],
      ["No lo sé; es uno de los grandes misterios.", "wonder"],
      ["Creo que termina nuestra experiencia, y por eso esta vida importa.", "skeptic"]
    ]
  },
  {
    text: "¿Qué te convence más al pensar en Dios?",
    answers: [
      ["La fe, la oración o una experiencia personal.", "faith"],
      ["Las preguntas que todavía no tienen respuesta.", "wonder"],
      ["Las pruebas y las explicaciones que se pueden comprobar.", "skeptic"]
    ]
  },
  {
    text: "Última pregunta: ¿qué te llevas de este viaje?",
    answers: [
      ["Más ganas de explorar mi fe.", "faith"],
      ["Más preguntas interesantes que antes.", "wonder"],
      ["La satisfacción de pensar con espíritu crítico.", "skeptic"]
    ]
  }
];

const profiles = {
  faith: {
    title: "El corazón creyente",
    description: "Te resuena la posibilidad de que exista algo más grande. La fe, la esperanza y la conexión espiritual son parte de tu manera de explorar el universo."
  },
  wonder: {
    title: "La mente exploradora",
    description: "Te encanta vivir con preguntas abiertas. Te mueves con curiosidad entre el misterio, las ideas y las distintas formas de encontrar sentido."
  },
  skeptic: {
    title: "El detective del cosmos",
    description: "Te gusta buscar explicaciones, hacer preguntas y seguir las pruebas. Para ti, pensar con cuidado también es una aventura cósmica."
  }
};

const labels = {
  faith: "Corazón creyente",
  wonder: "Mente exploradora",
  skeptic: "Detective del cosmos"
};
const letters = ["A", "B", "C"];

const intro = document.querySelector("#intro");
const quiz = document.querySelector("#quiz");
const result = document.querySelector("#result");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const soundToggle = document.querySelector("#sound-toggle");
const soundLabel = document.querySelector("#sound-label");
const soundIcon = document.querySelector("#sound-icon");
const questionCount = document.querySelector("#question-count");
const progressLabel = document.querySelector("#progress-label");
const progress = document.querySelector("#progress");
const progressFill = document.querySelector("#progress-fill");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const resultTitle = document.querySelector("#result-title");
const resultDescription = document.querySelector("#result-description");
const resultStats = document.querySelector("#result-stats");

let currentQuestion = 0;
let scores = createScores();
let soundEnabled = true;
let audioContext;

function createScores() {
  return { faith: 0, wonder: 0, skeptic: 0 };
}

function playTone(frequency, duration = 0.12, type = "sine") {
  if (!soundEnabled) return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext ??= new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playFinishSound() {
  [523.25, 659.25, 783.99].forEach((frequency, index) => {
    window.setTimeout(() => playTone(frequency, 0.3, "triangle"), index * 130);
  });
}

function updateProgress() {
  const completed = currentQuestion;
  const percentage = (completed / questions.length) * 100;
  questionCount.textContent = `PREGUNTA ${Math.min(currentQuestion + 1, questions.length)} DE ${questions.length}`;
  progressLabel.textContent = completed === 0 ? "¡Calentando motores!" : "¡Vas por buen camino!";
  progress.setAttribute("aria-valuenow", String(completed));
  progressFill.style.width = `${percentage}%`;
}

function renderQuestion() {
  const question = questions[currentQuestion];
  if (!question) {
    showResult();
    return;
  }

  updateProgress();
  questionText.textContent = question.text;
  answersContainer.replaceChildren();

  question.answers.forEach(([answer, category], index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${letters[index]}</span><span></span>`;
    button.lastElementChild.textContent = answer;
    button.addEventListener("click", () => selectAnswer(category, button));
    answersContainer.append(button);
  });
}

function selectAnswer(category, selectedButton) {
  if (selectedButton.disabled) return;
  answersContainer.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
  scores[category] += 1;
  playTone(440 + currentQuestion * 18, 0.11, "triangle");

  window.setTimeout(() => {
    currentQuestion += 1;
    renderQuestion();
  }, 220);
}

function showResult() {
  quiz.hidden = true;
  result.hidden = false;
  questionCount.textContent = `PREGUNTA ${questions.length} DE ${questions.length}`;
  progressLabel.textContent = "¡Misión cumplida!";
  progress.setAttribute("aria-valuenow", String(questions.length));
  progressFill.style.width = "100%";

  const highestScore = Math.max(...Object.values(scores));
  const winner = Object.keys(scores).find((category) => scores[category] === highestScore);
  const profile = profiles[winner];
  resultTitle.textContent = profile.title;
  resultDescription.textContent = profile.description;
  resultStats.replaceChildren();

  Object.entries(scores).forEach(([category, score]) => {
    const stat = document.createElement("div");
    stat.className = "stat";
    const value = document.createElement("strong");
    value.textContent = `${score}/14`;
    const label = document.createElement("span");
    label.textContent = labels[category];
    stat.append(value, label);
    resultStats.append(stat);
  });
  playFinishSound();
  resultTitle.focus?.();
}

function startGame() {
  currentQuestion = 0;
  scores = createScores();
  intro.hidden = true;
  result.hidden = true;
  quiz.hidden = false;
  renderQuestion();
  playTone(587.33, 0.16, "triangle");
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundLabel.textContent = `Sonido: ${soundEnabled ? "sí" : "no"}`;
  soundIcon.textContent = soundEnabled ? "♪" : "×";
  if (soundEnabled) playTone(587.33, 0.14, "triangle");
});
