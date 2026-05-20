function crearPanel() {

    if (document.getElementById("mi-extension-panel")) return;

    const panel = document.createElement("div");

    panel.id = "mi-extension-panel";

    panel.style.position = "fixed";
    panel.style.top = "0";
    panel.style.right = "0";
    panel.style.width = "350px";
    panel.style.height = "100vh";
    panel.style.background = "#ffffff";
    panel.style.zIndex = "999999";
    panel.style.borderLeft = "2px solid black";
    panel.style.padding = "10px";
    panel.style.overflowY = "auto";

    panel.innerHTML = `
        <h2>Traducción LSC</h2>

        <button id="btnTraducir">
            Traducir página
        </button>

        <hr>

        <div id="contenedorVideos"></div>
    `;

    document.body.appendChild(panel);

    document.getElementById("btnTraducir")
        .onclick = traducirPagina;
}

async function traducirPagina(){

    const mensajes =
        document.querySelectorAll(".mensaje");

    const response = await fetch(
        chrome.runtime.getURL(
            "data/diccionario.json"
        )
    );

    const diccionario = await response.json();

    const contenedor =
        document.getElementById(
            "contenedorVideos"
        );

    contenedor.innerHTML = "";

    for(const mensaje of mensajes){

        const texto = mensaje.innerText;

        const palabras =
            traducirALSC(texto);

        const titulo =
            document.createElement("h3");

        titulo.innerText = texto;

        contenedor.appendChild(titulo);

        for(const palabra of palabras){

            const ruta = diccionario[palabra];

            if(ruta){

                const video =
                    document.createElement("video");

                video.src =
                    chrome.runtime.getURL(ruta);

                video.width = 250;

                video.controls = true;

                video.autoplay = true;

                contenedor.appendChild(video);

                await esperarVideo(video);
            }
        }

        const linea =
            document.createElement("hr");

        contenedor.appendChild(linea);
    }
}

function esperarVideo(video){

    return new Promise(resolve => {

        video.onended = () => {
            resolve();
        };

    });
}

chrome.runtime.onMessage.addListener(

    (request, sender, sendResponse) => {

        if(request.action === "start"){

            crearPanel();

        }

    }

);