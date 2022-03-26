var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req,res)=>{ // cria a rota de post

  let form = new formidable.IncomingForm({

    uploadDir: './upload', // determina o diretorio que os arquivos que sofrerem upload serao armazenados
    keepExtensions: true // mantém a extensão do arquivo

  });

  // vai tratar o request do nodejs como formulario
  form.parse(req, (err, fields, files)=>{ // vai passar a requisiçao do express (do router), trata o erro e separa - em JSONs diferentes - quais dados foram enviados via post e quais deles sao arquivos

    res.json({ // cria um objeto

      files

    }); // responde os dados pro servidor

  });

  

});

module.exports = router;
