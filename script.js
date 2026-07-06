const storiesContainer = document.querySelector("#stories");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

stories.forEach((story) => {
  const card = document.createElement("article");
  card.className = "story-card";

  card.innerHTML = `
    <div class="tile" aria-hidden="true">
      <span class="tile-star">★</span>
    </div>

    <div class="story-main">
      <div class="meta">${story.label}</div>
      <h2 class="story-title">${story.title}</h2>

      <div class="player">
        <button class="play" type="button">▶ Abspielen</button>
        <div class="progress-wrap" aria-hidden="true">
          <div class="progress"></div>
        </div>
        <div class="time">0:00</div>
      </div>

      <audio preload="metadata" src="${story.audio}"></audio>
    </div>

    <a class="download" href="${story.audio}" download>
      ⬇<br>Download
    </a>
  `;

  const audio = card.querySelector("audio");
  const play = card.querySelector(".play");
  const progress = card.querySelector(".progress");
  const time = card.querySelector(".time");

  play.addEventListener("click", () => {
    document.querySelectorAll("audio").forEach((otherAudio) => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        const otherCard = otherAudio.closest(".story-card");
        const otherButton = otherCard.querySelector(".play");
        otherButton.textContent = "▶ Abspielen";
      }
    });

    if (audio.paused) {
      audio.play();
      play.textContent = "❚❚ Pause";
    } else {
      audio.pause();
      play.textContent = "▶ Abspielen";
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    time.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progress.style.width = `${percent}%`;
    time.textContent = `${formatTime(audio.currentTime)}`;
  });

  audio.addEventListener("ended", () => {
    play.textContent = "▶ Abspielen";
    progress.style.width = "0%";
    time.textContent = formatTime(audio.duration);
  });

  storiesContainer.appendChild(card);
});
