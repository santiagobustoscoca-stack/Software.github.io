let translationActive = false;

let modoActual = "completo";

let ultimoTexto = "";

let panel;

let detectedText;

let videoPlayer;

chrome.runtime.onMessage.addListener(
    (request) => {

        if(request.action === "toggle"){

            translationActive =
                request.active;

            modoActual =
                request.modo;

            if(translationActive){

                crearPanel();

            }else{

                eliminarPanel();

            }

        }

    }
);

document.addEventListener(
    "mouseover",
    async (e) => {

        if(!translationActive) return;

        const texto =
            e.target.innerText;

        if(!texto) return;

        const limpio = texto
            .trim()
            .toLowerCase()
            .replace(/[.,!?]/g, "");

        if(limpio.length < 2) return;

        if(limpio === ultimoTexto) return;

        ultimoTexto = limpio;

        detectedText.textContent =
            limpio;

        if(modoActual === "completo"){

            await traducirTexto(limpio);

        }

    }
);

function crearPanel(){

    if(document.getElementById("lsc-panel"))
        return;

    panel =
        document.createElement("div");

    panel.id = "lsc-panel";

    panel.innerHTML = `

        <div class="lsc-header">

            <h2>Asistente LSC</h2>

        </div>

        <div class="lsc-body">

            <h3>Texto detectado</h3>

            <div id="detectedText">
                Ninguno
            </div>

            <h3>Traducción LSC</h3>

            <video
                id="videoPlayer"
                controls
                autoplay
                muted>
            </video>

        </div>

    `;

    document.body.appendChild(panel);

    detectedText =
        document.getElementById(
            "detectedText"
        );

    videoPlayer =
        document.getElementById(
            "videoPlayer"
        );

}

function eliminarPanel(){

    const panel =
        document.getElementById(
            "lsc-panel"
        );

    if(panel){

        panel.remove();

    }

}

async function traducirTexto(texto){

    const palabras =
        texto.split(" ");

    for(const palabra of palabras){

        await reproducirVideo(palabra);

    }

}

function reproducirVideo(palabra){

    return new Promise((resolve) => {

        videoPlayer.src =
            chrome.runtime.getURL(
                `videos/${palabra}.mp4`
            );

        videoPlayer.load();

        videoPlayer.onended =
            resolve;

        videoPlayer.onerror = () => {

            console.log(
                "No existe video:",
                palabra
            );

            resolve();

        };

        videoPlayer.play()
            .catch(resolve);

    });

}