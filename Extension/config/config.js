document.addEventListener("DOMContentLoaded", () => {

    const radioCompleto = document.getElementById("modoCompleto");
    const radioSolo = document.getElementById("soloTranscripcion");

    chrome.storage.local.get(["modoCompleto", "soloTranscripcion"], (result) => {
        if (result.modoCompleto) {
            radioCompleto.checked = true;
        } else if (result.soloTranscripcion) {
            radioSolo.checked = true;
        } else {
            radioCompleto.checked = true;
        }
    });

    document.getElementById("saveBtn").addEventListener("click", () => {

        const modoCompleto = radioCompleto.checked;
        const soloTranscripcion = radioSolo.checked;

        chrome.storage.local.set({ modoCompleto, soloTranscripcion }, () => {
            alert("Configuración guardada correctamente");
        });

    });

    document.getElementById("backBtn").addEventListener("click", () => {
        window.location.href = "popup.html";
    });
});