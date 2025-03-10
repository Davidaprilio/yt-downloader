// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const childProc = require('child_process')
const {parseResolutionOutput } = require('./parse')

function ytDl(link, args) {
    const comands = [
        './youtube-dl',
        ...args,
        link
    ]
    console.log(comands);
    return new Promise(function(resolve, reject){
        let result = ''
        var python = childProc.spawn('python3', comands);
        python.stdout.on('data',function(data){
            result += data.toString('utf8')
        });
        // end of process
        python.on('exit', function (code) {
            console.log('YTDL End', code);
            resolve(result);
        })

        python.on('error', function (err) {
            console.log('YTDL Error', err);
            reject(err);
        })
    })
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

    ipcMain.on('get_options_download', (event, arg) => {
      console.log("BISA", arg);
      ytDl(arg.link, [
          '-F',
      ]).then(data => {
        const hsil = parseResolutionOutput(data)
          console.log('HASIL', hsil);
          mainWindow.webContents.send('result_option', hsil)
      })
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.