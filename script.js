function activarAsistente(){

    let texto = document.getElementById("contenido").innerText;

    let reemplazos = {
        "procedimiento" : "proceso",
        "complejo" : "dificil",
        "realizar" : "hacer",
        "tramite" : "gestion",
        "Digital" : "en linea",
        "plataforma" : "pagina",
        "institucional" : "oficial"
    };

    let textoSimple = texto;
    for (let palabra in reemplazos){
        let regex = new RegExp(palabra, "gi")
        textoSimple = textoSimple.replace(regex, reemplazos[palabra])
    }

    document.getElementById("resultado").innerText = "Texto simplificado: " + textoSimple;
}