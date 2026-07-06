const container = document.querySelector("#stories");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

stories.forEach((story) => {
  const card = document.createElement("article");
  card.className = "story";

  card.innerHTML = `
    <div class="starbox" aria-hidden="true"><span>★</span></div>

    <div>
      <p class="kicker">${story.label}</p>
      <h2 class="title">${story.title}</h2>

      <div class="player">
        <button class="play" type="button">▶ Abspielen</button>
        <div class="bar"><div class="fill"></div></div>
        <span class="time">0:00</span>
      </div>

      <audio src="${story.audio}" preload="metadata"></audio>
    </div>

    <a class="download" href="${story.audio}" download>⬇<br>Download</a>
  `;

  const audio = card.querySelector("audio");
  const button = card.querySelector(".play");
  const fill = card.querySelector(".fill");
  const time = card.querySelector(".time");

  button.addEventListener("click", async () => {
    document.querySelectorAll("audio").forEach((other) => {
      if (other !== audio) {
        other.pause();
        const otherCard = other.closest(".story");
        const otherButton = otherCard.querySelector(".play");
        otherButton.textContent = "▶ Abspielen";
      }
    });

    if (audio.paused) {
      await audio.play();
      button.textContent = "❚❚ Pause";
    } else {
      audio.pause();
      button.textContent = "▶ Abspielen";
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    time.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    fill.style.width = `${progress}%`;
    time.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    button.textContent = "▶ Abspielen";
    fill.style.width = "0%";
    time.textContent = formatTime(audio.duration);
  });

  container.appendChild(card);
});
