global.chrome = {
  tabs: {
    query: jest.fn((opts, cb) => cb([{ id: 1 }])),
    sendMessage: jest.fn()
  }
};

document.body.innerHTML = `
  <button id="startBtn">Iniciar</button>
  <button id="configBtn">Config</button>
`;

delete window.location;
window.location = { href: "" };

require('../popup.js');

test('Envía mensaje al hacer click en iniciar', () => {
  document.getElementById('startBtn').click();

  expect(chrome.tabs.query).toHaveBeenCalled();
});

test('Redirige a configuración', () => {
  document.getElementById('configBtn').click();

  expect(window.location.href).toBe("config.html");
});