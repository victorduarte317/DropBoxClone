class DropBoxController{

    constructor() {
        
        // objetos que buscam o id dos elementos dentro do documento e pegam o valor pra si
        this.btnSendFileEl = document.querySelector("#btn-send-file");
        this.inputFilesEl = document.querySelector("#files"); 
        this.snackModalEl = document.querySelector("#react-snackbar-root");
    
        this.initEvents(); // método pra iniciar eventos

    }

    initEvents() {

        this.btnSendFileEl.addEventListener("click", event =>{ // adiciona um evento no click

            this.inputFilesEl.click(); // evento que vai ser adicionado no click

        })

        this.inputFilesEl.addEventListener("change", event =>{

            this.uploadTask(event.target.files); // especifica que o alvo do evento é "files" e passa como parâmetro pra uploadTask tratar
            this.snackModalEl.style.display='block';
            
        });

    }

    uploadTask(files) {
        
        let promises = [];

        // pra cada arquivo faça
        [...files].forEach(file=>{ // usa spread em files pq files é uma coleçao e o usuario pode escolher varios arquivos pra fazer upload, entao o spread vai criar uma posiçao pra cada arquivo

            promises.push(new Promise((resolve, reject)=>{ // coloca novos elementos no fim do array e retorna o novo tamanho do array

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload'); //passa o método (post) e o evento (upload)

                ajax.onload = event => { // no load do ajax faz um try catch

                    try {
                        resolve(JSON.parse(ajax.responseText)); // tenta tratar os dados da resposta do servidor (ajax.responseText) com JSON
                    } catch(e) {

                        reject(e); // se nao der certo, retorna o evento do erro
                    }
                }; // fecha o ajax onload

                ajax.onerror = event => { // se der erro no ajax

                    reject(event); // retorna o evento do erro
                }

                let formData = new FormData(); // api formdata

                formData.append('input-file', file); // usa o append pra colocar file dentro do campo que o post vai receber (pode ter qualquer nome, nesse caso é input-file)

                ajax.send(formData); // envia formData via ajax

            })); // fecha a promise

        }); // fecha o forEach

        return Promise.all(promises); // promise all recebe um array de promessas. Funciona como um promise normal, se der tudo certo retorna resolve, se nao reject.


    }
}