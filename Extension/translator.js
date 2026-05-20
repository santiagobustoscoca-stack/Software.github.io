function traducirALSC(texto){

    texto = texto.toLowerCase();

    const ignorar = [
        "una",
        "para",
        "el",
        "la",
        "de"
    ];

    let palabras = texto.split(" ");

    let resultado = [];

    palabras.forEach(p => {

        p = p.trim();

        if(!ignorar.includes(p) && p !== ""){
            resultado.push(p);
        }

    });

    return resultado;
}