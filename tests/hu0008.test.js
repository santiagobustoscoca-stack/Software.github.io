/**
 * @jest-environment jsdom
 */
global.chrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn((data, cb) => cb && cb())
    }
  }
};

describe('HU-0008 Configuración', () => {

  beforeEach(() => {
    jest.clearAllMocks();

    document.body.innerHTML = `
      <input type="radio" name="modo" id="modoCompleto">
      <input type="radio" name="modo" id="soloTranscripcion">
      <button id="saveBtn"></button>
      <button id="backBtn"></button>
    `;

    require('../Extension/config.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  window.alert = jest.fn();

  test('Guarda correctamente modo completo', () => {
    document.getElementById('modoCompleto').checked = true;

    document.getElementById('saveBtn').click();

    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { modoCompleto: true, soloTranscripcion: false },
      expect.any(Function)
    );
  });

  test('Guarda correctamente solo transcripción', () => {
    document.getElementById('modoCompleto').checked = false;
    document.getElementById('soloTranscripcion').checked = true;

    document.getElementById('saveBtn').click();

    expect(chrome.storage.local.set).toHaveBeenCalledWith(
      { modoCompleto: false, soloTranscripcion: true },
      expect.any(Function)
    );
  });

  test('Carga configuración guardada', () => {

    chrome.storage.local.get.mockImplementation((keys, callback) => {
      callback({ modoCompleto: false, soloTranscripcion: true });
    });

    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(document.getElementById('soloTranscripcion').checked).toBe(true);
  });

});