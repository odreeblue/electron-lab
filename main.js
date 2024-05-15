// require('electron'): Electron 모듈을 가져옵니다. 이 모듈은 Electron 애플리케이션을 개발할 때 필요한 기능을 제공합니다.
// const { app, BrowserWindow } = require('electron'): app 객체는 Electron 애플리케이션의 라이프사이클 이벤트와 다양한 동작을 제어하는 데 사용되고, BrowserWindow 객체는 렌더링되는 창을 생성하고 제어하는 데 사용됩니다.
const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("node:path");

// createWindow라는 함수를 정의
//// () : 함수의 매개변수를 나타냄
//// {...} : 함수의 몸체
const createWindow = () => {
  // BrowserWindow 클래스의 새로운 인스턴스 생성
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle('ping',()=>'pong')
  createWindow();

  //   app.on('activate', () => {
  //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
  //   })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
