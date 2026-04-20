document.addEventListener("DOMContentLoaded", () => {
    const radioCompleto = document.getElementById("modoCompleto");
    const radioSolo = document.getElementById("soloTranscripcion");

    // Recuperar valores guardados
    chrome.storage.local.get(["modoCompleto", "soloTranscripcion"], (result) => {
        if (result.modoCompleto === true) {
            radioCompleto.checked = true;
        } else if (result.soloTranscripcion === true) {
            radioSolo.checked = true;
        } else {
            // Por defecto, seleccionar "Modo completo" si no hay nada guardado
            radioCompleto.checked = true;
        }
    });

document.getElementById("saveBtn").addEventListener("click", () => {
        const modoCompleto = radioCompleto.checked;
        const soloTranscripcion = radioSolo.checked;

        // Asegurar que solo una sea true (por si acaso)
        if (modoCompleto && soloTranscripcion) {
            // Esto no debería pasar con radios, pero por seguridad:
            console.warn("Ambos seleccionados, corrigiendo...");
            // Si ambos están marcados (error), priorizamos modo completo
            chrome.storage.local.set({ modoCompleto: true, soloTranscripcion: false }, () => {
                window.location.href = "popup.html";
            });
        } else {
            // Guardar normalmente
            chrome.storage.local.set({ modoCompleto, soloTranscripcion }, () => {
                window.location.href = "popup.html";
            });
        }
    });
});