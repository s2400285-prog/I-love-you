const openLetterButton = document.getElementById("openLetter");
const envelope = document.getElementById("envelope");
const letterCard = document.getElementById("letterCard");
const clickHint = document.getElementById("clickHint");

const music = document.getElementById("loveMusic");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const musicArt = document.getElementById("musicArt");

const secretButton = document.getElementById("secretButton");
const heartButton = document.getElementById("heartButton");
const prayerButton = document.getElementById("prayerButton");

const secretMessage = document.getElementById("secretMessage");
const prayerMessage = document.getElementById("prayerMessage");

const floatingHearts = document.getElementById("floatingHearts");
const toast = document.getElementById("toast");

let letterOpened = false;
let toastTimer;

// Open the love letter
openLetterButton.addEventListener("click", () => {
  if (letterOpened) {
    letterCard.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  letterOpened = true;

  envelope.classList.add("open");
  openLetterButton.setAttribute("aria-expanded", "true");
  clickHint.textContent = "A little love, written just for you ♡";

  setTimeout(() => {
    letterCard.classList.add("visible");
    letterCard.setAttribute("aria-hidden", "false");

    letterCard.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    createHeartBurst(22);
    showToast("Your little love letter is finally open! 💌");
  }, 550);
});

// Music player
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();

      musicToggle.textContent = "❚❚";
      musicToggle.classList.add("playing");
      musicArt.textContent = "🎶";
      musicStatus.textContent = "Playing a little melody for you 💗";

      showToast("A little music for my favorite girl 🎵");
    } catch (error) {
      musicStatus.textContent =
        "Couldn't play music. Check your music.mp3 file.";
      showToast("Please check that music.mp3 is in your folder.");
    }
  } else {
    music.pause();

    musicToggle.textContent = "▶";
    musicToggle.classList.remove("playing");
    musicArt.textContent = "🎵";
    musicStatus.textContent = "Paused, but still thinking of you 💜";
  }
});

// Keep the player in sync if playback stops or ends.
music.addEventListener("pause", () => {
  musicToggle.textContent = "▶";
  musicToggle.classList.remove("playing");
  musicArt.textContent = "🎵";
});

music.addEventListener("play", () => {
  musicToggle.textContent = "❚❚";
  musicToggle.classList.add("playing");
  musicArt.textContent = "🎶";
});

music.addEventListener("error", () => {
  musicStatus.textContent = "Add music.mp3 to play your song";
});

// Secret love message
secretButton.addEventListener("click", () => {
  const willOpen = secretMessage.hidden;

  secretMessage.hidden = !willOpen;

  secretButton.textContent = willOpen
    ? "💌 Hide my secret"
    : "💌 Open a secret";

  if (willOpen) {
    createHeartBurst(15);

    secretMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
});

// Prayer for Julie
prayerButton.addEventListener("click", () => {
  const willOpen = prayerMessage.hidden;

  prayerMessage.hidden = !willOpen;

  prayerButton.textContent = willOpen ? "🙏 Hide prayer" : "🙏 A little prayer";

  if (willOpen) {
    prayerMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
});

// Send hearts
heartButton.addEventListener("click", () => {
  createHeartBurst(35);

  showToast("Sending Julie a big virtual hug! 💗🫂");

  heartButton.textContent = "💖 Lots of love sent!";

  setTimeout(() => {
    heartButton.textContent = "💗 Send me some love";
  }, 2200);
});

// Create a floating heart
function createHeart() {
  const heart = document.createElement("span");
  const symbols = ["♡", "♥", "💕", "💗", "✧"];

  heart.className = "heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 14 + Math.random() * 18 + "px";
  heart.style.animationDuration = 7 + Math.random() * 5 + "s";

  floatingHearts.appendChild(heart);

  heart.addEventListener("animationend", () => {
    heart.remove();
  });
}

// A burst of hearts after clicking something special
function createHeartBurst(amount = 15) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 65);
  }
}

// Small notification
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// Gentle hearts in the background
setInterval(createHeart, 900);
