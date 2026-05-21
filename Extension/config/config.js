const saveBtn =
    document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {

    const modo =
        document.querySelector(
            'input[name="modo"]:checked'
        );

    if(!modo){

        alert("Selecciona un modo");
        return;

    }

    const completo =
        modo.value === "completo";

    chrome.storage.local.set({

        modoCompleto: completo,

        soloTranscripcion: !completo

    }, () => {

        alert("Configuración guardada");

    });

});