const { app, BrowserWindow } = require('electron');
const path = require('path');

// Função para criar a janela principal
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // É uma boa prática de segurança, mas requer configuração extra para expor APIs do Node.js
      // contextIsolation: true,
      // preload: path.join(__dirname, 'preload.js') // Descomente se for usar um script de preload
    },
  });

  // Em desenvolvimento, carregamos a URL do servidor de desenvolvimento do Vite.
  // Em produção, carregaríamos o arquivo index.html compilado.
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // Abre as ferramentas de desenvolvedor (DevTools)
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  }
}

// Este método será chamado quando o Electron terminar a inicialização
// e estiver pronto para criar janelas do navegador.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // No macOS, é comum recriar uma janela no aplicativo quando o
    // ícone do dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Encerre quando todas as janelas forem fechadas, exceto no macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});