const cards = document.querySelectorAll('.story-card');

cards.forEach((card) => {
  const button = card.querySelector('.play-button');
  const audio = card.querySelector('audio');

  button.addEventListener('click', () => {
    document.querySelectorAll('audio').forEach((otherAudio) => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.currentTime = otherAudio.currentTime;
      }
    });

    document.querySelectorAll('.play-button').forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.classList.remove('is-playing');
        otherButton.textContent = '▶ Abspielen';
      }
    });

    if (audio.paused) {
      audio.play();
      button.classList.add('is-playing');
      button.textContent = '⏸ Pause';
    } else {
      audio.pause();
      button.classList.remove('is-playing');
      button.textContent = '▶ Abspielen';
    }
  });

  audio.addEventListener('ended', () => {
    button.classList.remove('is-playing');
    button.textContent = '▶ Abspielen';
  });
});
