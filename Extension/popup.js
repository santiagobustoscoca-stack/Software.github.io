document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const configBtn = document.getElementById("configBtn");

  if (startBtn) {
    startBtn.addEventListener("click", async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["translator.js", "content.js"]
      }, () => {
        chrome.tabs.sendMessage(tab.id, {
          action: "start"
        });
      });
    });
  }

  if (configBtn) {
    configBtn.addEventListener("click", () => {
      window.location.href = "config.html"
    });
  }
});