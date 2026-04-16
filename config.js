document.getElementById("saveBtn").addEventListener("click", () => {
  const modoCompleto = document.getElementById("modoCompleto").checked;
  const soloTranscripcion = document.getElementById("soloTranscripcion").checked;

  chrome.storage.local.set({ modoCompleto, soloTranscripcion }, () => {
    window.location.href = "popup.html";
  });
});