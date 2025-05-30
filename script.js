document.addEventListener("DOMContentLoaded", function() {
  const playerHeads = document.querySelectorAll(".player-head");
  playerHeads.forEach(head => {
    const localImage = head.getAttribute("data-local-img");
    if (localImage) {
      head.style.backgroundImage = `url('${localImage}')`;
    } else {
      const playerName = head.getAttribute("data-tooltip");
      if (playerName) {
        const imageUrl = `https://minotar.net/helm/${playerName}/40.png`;
        head.style.backgroundImage = `url('${imageUrl}')`;
      }
    }
    head.style.backgroundSize = "cover";
    head.style.backgroundPosition = "center";
  });
});
