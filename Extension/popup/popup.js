document.addEventListener(
    "DOMContentLoaded",
    () => {

        const startBtn =
            document.getElementById(
                "startBtn"
            );

        const statusText =
            document.getElementById(
                "status"
            );

        startBtn.addEventListener(
            "click",
            async () => {

                const modo =
                    document.querySelector(
                        'input[name="modo"]:checked'
                    ).value;

                const [tab] =
                    await chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    });

                chrome.tabs.sendMessage(
                    tab.id,
                    {
                        action: "toggle",
                        active: true,
                        modo
                    }
                );

                statusText.textContent =
                    "Traducción activada";

            }
        );

    }
);