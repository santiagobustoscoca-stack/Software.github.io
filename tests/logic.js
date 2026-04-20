function activarExtension() {
  chrome.storage.local.set({ activo: true });
}

function verificarEstado(callback) {
  chrome.storage.local.get("activo", (data) => {
    callback(data.activo);
  });
}

module.exports = { activarExtension, verificarEstado };