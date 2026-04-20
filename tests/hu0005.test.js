const { activarExtension, verificarEstado } = require("../tests/logic");

global.chrome = {
  storage: {
    local: {
      set: jest.fn(),
      get: jest.fn()
    }
  }
};

describe("HU-0005 Activación y Persistencia", () => {

  test("Activa la extensión correctamente", () => {
    activarExtension();

    expect(chrome.storage.local.set).toHaveBeenCalledWith({ activo: true });
  });

  test("Mantiene la extensión activa", (done) => {

    chrome.storage.local.get.mockImplementation((key, callback) => {
      callback({ activo: true });
    });

    verificarEstado((activo) => {
      expect(activo).toBe(true);
      done();
    });

  });

});