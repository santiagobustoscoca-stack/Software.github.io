const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const detectedText = document.getElementById("detectedText");
const videoPlayer = document.getElementById("videoPlayer");
const configWarning = document.getElementById("configWarning");
const mainContent = document.getElementById("mainContent");
const configBtn = document.getElementById("configBtn");
const changeConfigBtn = document.getElementById("changeConfigBtn");
const currentMode = document.getElementById("currentMode");

chrome.storage.local.get(
    ["modoCompleto", "soloTranscripcion"],
    (result) => {

        if (
            result.modoCompleto ||
            result.soloTranscripcion
        ) {

            configWarning.style.display = "none";

            mainContent.style.display = "block";

            if(result.modoCompleto){

                currentMode.textContent =
                    "Modo completo";

            }else{

                currentMode.textContent =
                    "Solo transcripción";

            }

        } else {

            configWarning.style.display = "block";

            mainContent.style.display = "none";

        }

    }
);

configBtn.addEventListener("click", () => {
    window.location.href = "config.html";
});

changeConfigBtn.addEventListener("click", () => {
    window.location.href = "config.html";
});
let active = false;

startBtn.addEventListener("click", async () => {

    active = !active;

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.tabs.sendMessage(tab.id, {
        action: "toggle",
        active: active
    });

    if (active) {

        statusText.textContent = "Traducción activada";
        startBtn.textContent = "Detener traducción";

    } else {

        statusText.textContent = "Traducción desactivada";
        startBtn.textContent = "Iniciar traducción";

    }

});

chrome.storage.onChanged.addListener(async (changes) => {

    if (changes.currentText) {

        const texto = changes.currentText.newValue;

        detectedText.textContent = texto;

        await traducirTexto(texto);

    }

});

function limpiarTexto(texto) {

    return texto
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .trim();

}

async function traducirTexto(texto) {

    const palabras = texto.split(" ");

    for (const palabra of palabras) {

        await reproducirVideo(palabra);

    }

}

function reproducirVideo(palabra) {

    return new Promise((resolve) => {

        const ruta = chrome.runtime.getURL(`videos/${palabra}.mp4`);

        videoPlayer.src = ruta;

        videoPlayer.load();

        videoPlayer.onended = () => {
            resolve();
        };

        videoPlayer.onerror = () => {
            console.log(`No existe video para: ${palabra}`);
            resolve();
        };

        videoPlayer.play()
            .catch(() => {
                resolve();
            });

    });

}