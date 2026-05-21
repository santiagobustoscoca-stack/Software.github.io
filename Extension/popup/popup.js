const startBtn =
    document.getElementById("startBtn");

const statusText =
    document.getElementById("status");

let active = false;

startBtn.addEventListener(
    "click",
    async () => {

        const modo =
            document.querySelector(
                'input[name="modo"]:checked'
            ).value;

        active = !active;

        const [tab] =
            await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

        chrome.tabs.sendMessage(
            tab.id,
            {
                action: "toggle",
                active,
                modo
            }
        );

        if(active){

            statusText.textContent =
                "Traducción activada";

            startBtn.textContent =
                "Detener traducción";

        }else{

            statusText.textContent =
                "Traducción desactivada";

            startBtn.textContent =
                "Iniciar traducción";

        }

    }
);