document.querySelector(".start").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    type: "start",
  });
});