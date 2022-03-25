class DropBoxController {
    constructor() {

        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.inputFileEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.initEvents();
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-bg');

    }

    initEvents() {

            this.btnSendFileEl.addEventListener("click", event=>{

            this.inputFileEl.click();

        });
 
        this.inputFileEl.addEventListener('change', event =>{ 

            this.uploadTask(event.target.files);

            this.snackModalEl.style.display='block'; // aparecer o modal

        });
    }

    uploadTask(files) {
        
        // como podemos fazer varios uploads ao mesmo tempo e cada um deles precisa ser verificado se vai dar certo ou nao, cria-se um array de promises
        let promises = [];

        // files é uma coleção, então precisa ser convertido em um array com spread; se forem requisitados 10 arquivos pra upload, o spread cria 10 posiçoes
        [...files].forEach(file=>{

            // se fizer o upload de 10 arquivos, vao ser criadas 10 promessas
            // como promise é um processo assíncrono, ele pode terminar de processar um arquivo de 50kb enquanto processa um de 50mb
            promises.push(new Promise((resolve, reject)=>{

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');

                ajax.onload = event => {

                    try {

                        resolve(JSON.parse(ajax.response));
                    
                    } catch(e) {

                        reject(e);
                    }

                };

                ajax.onerror = event => {

                    reject(event);

                };

                ajax.upload.onprogress = event => {

                    this.uploadProgress(event, file);

                };

                let formData = new FormData();

                formData.append('input-file', file);

                ajax.send(formData);

            }));

        });

        return Promise.all(promises); // Promise.all recebe um array de promisses
    }

    uploadProgress(event, file) {

        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded / total) * 100);

        this.progressBarEl.style.width = `${porcent}px`; // o atributo width vai determinar o preenchimento da barra. Como o css precisa de "px", concatena o recurso com px
    }
}