
const { ipcRenderer } = require('electron');

const button = document.getElementById('print')
const inputLinkYT = document.getElementById('link_yt');
const resultT = document.getElementById('result');

button.addEventListener('click', () => {
    console.log(window.ipcRenderer);
    
    resultT.innerText = 'Loading...';
    ipcRenderer.send('get_options_download', {
        link: inputLinkYT.value
    });
})

ipcRenderer.on('result_option', (ev, args) => {
    console.log(ev, args);
    resultT.innerText = JSON.stringify(args);
})
