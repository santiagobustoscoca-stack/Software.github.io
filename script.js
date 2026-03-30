// ==================== HU-0001: Simplificar contenido ====================
function activarAsistente() {
    let texto = document.getElementById("contenido").innerText;

    let reemplazos = {
        "procedimiento": "proceso",
        "complejo": "dificil",
        "realizar": "hacer",
        "tramite": "gestion",
        "digital": "en linea",
        "plataforma": "pagina",
        "institucional": "oficial"
    };

    let textoSimple = texto;
    for (let palabra in reemplazos) {
        let regex = new RegExp(palabra, "gi");
        textoSimple = textoSimple.replace(regex, reemplazos[palabra]);
    }

    document.getElementById("resultado").innerHTML = "🤖 Texto simplificado: " + textoSimple;
}

// ==================== HU-0004: Activación del asistente (esbozo) ====================
function mostrarAyudaVisual() {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "🤖 Asistente activado. Puedes pedir ayuda con la guía o con la simplificación de texto.";
    // Aquí se podría desplegar un avatar, pero por ahora es un mensaje.
}

// ==================== HU-0002: Guía paso a paso para trámites ====================
let pasoActual = 1;
const totalPasos = 3;
let datosTramite = {
    especialidad: null,
    fecha: null,
    hora: null
};

// Elementos del DOM
const btnSiguiente = document.getElementById("btnSiguiente");
const numeroPasoSpan = document.getElementById("numeroPaso");
const totalPasosSpan = document.getElementById("totalPasos");
const textoPaso = document.getElementById("textoPaso");
const opcionesDiv = document.getElementById("opcionesPaso");

// Configuración de los pasos
const pasos = {
    1: {
        texto: "Selecciona el tipo de especialidad médica que necesitas.",
        opciones: [
            { valor: "medicina-general", texto: "Medicina General" },
            { valor: "pediatria", texto: "Pediatría" },
            { valor: "cardiologia", texto: "Cardiología" }
        ],
        procesar: (opcion) => {
            datosTramite.especialidad = opcion;
            mostrarNotificacion(`Especialidad seleccionada: ${opcion}`, "exito");
            return true;
        }
    },
    2: {
        texto: "Selecciona una fecha para tu cita (formato DD/MM/AAAA).",
        opciones: [], // Sin opciones predefinidas, usaremos input
        procesar: (valorInput) => {
            // Validación simple de formato fecha
            const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (fechaRegex.test(valorInput)) {
                datosTramite.fecha = valorInput;
                mostrarNotificacion(`Fecha registrada: ${valorInput}`, "exito");
                return true;
            } else {
                mostrarNotificacion("Formato de fecha inválido. Usa DD/MM/AAAA", "error");
                return false;
            }
        }
    },
    3: {
        texto: "Selecciona una hora para tu cita (formato HH:MM, 24h).",
        opciones: [],
        procesar: (valorInput) => {
            const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if (horaRegex.test(valorInput)) {
                datosTramite.hora = valorInput;
                mostrarNotificacion(`Hora registrada: ${valorInput}`, "exito");
                return true;
            } else {
                mostrarNotificacion("Formato de hora inválido. Usa HH:MM (ej. 14:30)", "error");
                return false;
            }
        }
    }
};

// Función para mostrar notificaciones visuales (HU-0003)
function mostrarNotificacion(mensaje, tipo = "info") {
    const notificacion = document.getElementById("notificacionVisual");
    const mensajeNotificacion = document.getElementById("mensajeNotificacion");
    mensajeNotificacion.innerText = mensaje;
    notificacion.className = `notificacion ${tipo}`;
    notificacion.style.display = "block";

    // Auto-ocultar después de 5 segundos si no se presiona Aceptar
    setTimeout(() => {
        if (notificacion.style.display === "block") {
            notificacion.style.display = "none";
        }
    }, 5000);
}

// Cerrar notificación manualmente
document.getElementById("btnCerrarNotificacion").addEventListener("click", () => {
    document.getElementById("notificacionVisual").style.display = "none";
});

// Función para renderizar el paso actual
function renderizarPaso() {
    numeroPasoSpan.innerText = pasoActual;
    const paso = pasos[pasoActual];
    textoPaso.innerText = paso.texto;

    // Limpiar opciones anteriores
    opcionesDiv.innerHTML = "";

    if (paso.opciones && paso.opciones.length > 0) {
        // Paso con botones de opción
        paso.opciones.forEach(opcion => {
            const btn = document.createElement("button");
            btn.className = "opcion-btn";
            btn.innerText = opcion.texto;
            btn.dataset.opcion = opcion.valor;
            btn.addEventListener("click", () => {
                const exito = paso.procesar(opcion.texto);
                if (exito && pasoActual < totalPasos) {
                    // Avanzar automáticamente al siguiente paso
                    pasoActual++;
                    renderizarPaso();
                } else if (exito && pasoActual === totalPasos) {
                    finalizarTramite();
                }
            });
            opcionesDiv.appendChild(btn);
        });
        btnSiguiente.style.display = "none";
    } else {
        // Paso con entrada de texto (fecha/hora)
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = pasoActual === 2 ? "DD/MM/AAAA" : "HH:MM";
        input.id = "inputPaso";
        input.style.padding = "10px";
        input.style.margin = "10px";
        input.style.borderRadius = "6px";
        input.style.border = "1px solid #555";
        input.style.backgroundColor = "#333";
        input.style.color = "white";
        
        const btnConfirmar = document.createElement("button");
        btnConfirmar.innerText = "Confirmar";
        btnConfirmar.className = "opcion-btn";
        
        btnConfirmar.addEventListener("click", () => {
            const valor = input.value.trim();
            const exito = paso.procesar(valor);
            if (exito) {
                if (pasoActual < totalPasos) {
                    pasoActual++;
                    renderizarPaso();
                } else {
                    finalizarTramite();
                }
            } else {
                input.value = "";
                input.focus();
            }
        });
        
        opcionesDiv.appendChild(input);
        opcionesDiv.appendChild(btnConfirmar);
        btnSiguiente.style.display = "none";
    }
}

function finalizarTramite() {
    mostrarNotificacion(`✅ Trámite completado exitosamente. Cita agendada para ${datosTramite.fecha} a las ${datosTramite.hora} con especialidad ${datosTramite.especialidad}.`, "exito");
    // Reiniciar la guía después de completar
    setTimeout(() => {
        reiniciarGuia();
    }, 3000);
}

function reiniciarGuia() {
    pasoActual = 1;
    datosTramite = { especialidad: null, fecha: null, hora: null };
    renderizarPaso();
}

// Inicializar la guía al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    totalPasosSpan.innerText = totalPasos;
    renderizarPaso();
});

// ==================== Eventos del Asistente (HU-0001 y HU-0004) ====================
const btnAsistente = document.getElementById("btnActivarAsistente");
btnAsistente.addEventListener("click", () => {
    // Se activa el asistente: muestra ayuda visual y simplifica contenido
    mostrarAyudaVisual();
    activarAsistente(); // Simplifica el contenido principal
});
