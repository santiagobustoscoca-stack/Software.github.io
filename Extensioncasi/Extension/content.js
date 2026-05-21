let translationActive = false;

let ultimoTexto = "";

chrome.runtime.onMessage.addListener((request) => {

    if (request.action === "toggle") {

        translationActive = request.active;

        console.log("Modo traducción:", translationActive);

    }

});

document.addEventListener("mouseover", async (e) => {

    if (!translationActive) return;

    const element = e.target;

    if (!element) return;

    const texto = element.innerText;

    if (!texto) return;

    const limpio = texto
        .trim()
        .toLowerCase()
        .replace(/[.,!?]/g, "");

    if (limpio.length < 2) return;

    if (limpio === ultimoTexto) return;

    ultimoTexto = limpio;

    console.log("Texto detectado:", limpio);

    chrome.storage.local.set({
        currentText: limpio
    });

});