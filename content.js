function crearPanel() {
  if (document.getElementById("mi-extension-panel")) return;

  const panel = document.createElement("div");
  panel.id = "mi-extension-panel";

  panel.innerHTML = `
  <div class="asistente-container">

    <div class="avatar-container">
      <video id="avatar" autoplay loop muted>
        <source src="${chrome.runtime.getURL("avatar.mp4")}" type="video/mp4">
      </video>
    </div>

    <div class="controls">
      <button id="btnPlay">Iniciar</button>
      <button id="btnConfig">Configuración</button>
      <button id="btnBack">Volver</button>
    </div>

    <div class="texto-actual">
      <p id="textoMostrado">Aquí aparecerá el contenido...</p>
    </div>

  </div>`;

  // 👇 EMPUJAR LA WEB
  document.body.style.display = "flex";

  const contenido = document.createElement("div");
  contenido.id = "contenido-original";

  while (document.body.firstChild) {
    contenido.appendChild(document.body.firstChild);
  }

  document.body.appendChild(contenido);
  document.body.appendChild(panel);

  // ✅ AHORA SÍ (después de insertarlo)

  document.getElementById("btnBack").onclick = () => {
    location.reload();
  };

  document.getElementById("btnPlay").onclick = () => {
    const texto = document.body.innerText;
    document.getElementById("textoMostrado").innerText = texto.substring(0, 300);
  };

  document.getElementById("btnConfig").onclick = () => {
    alert("Aquí irá configuración");
  };
}