const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow;


app.commandLine.appendSwitch('enable-transparent-visuals');
// app.commandLine.appendSwitch('disable-gpu');


function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        transparent: true,
        show: false,
        titleBarStyle: 'hiddenInset',
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            experimentalFeatures: true
        }
    })


   mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/www/index.html`),
            protocol: "file:",
            slashes: true
        })
        // path.join(__dirname, `/www/index.html`)
    );
    // Open the DevTools.
   // mainWindow.webContents.openDevTools({mode:'undocked'})

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

// app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
//
app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

let splash;

app.on('ready', () => {
    createWindow();
    mainWindow.once('ready-to-show', () => {
            mainWindow.show();
    });
});
