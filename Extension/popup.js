document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const configBtn = document.getElementById("configBtn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      chrome.storage.local.set({ activo: true})
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
      });
    });
  }

  if (configBtn) {
    configBtn.addEventListener("click", () => {
      window.location.href = "config.html"
    });
  }
});