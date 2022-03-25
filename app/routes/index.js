var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res)=>{

  let form = new formidable.IncomingForm({

    uploadDir: './upload', // à partir do diretório (./) vai procurar upload
    keepExtensions: true // mantém as extensões do arquivo
  });

  form.parse(req, (err, fields, files)=>{ // passa a requisição do express, um parametro de erro e separa os campos e os arquivos em dois JSONs diferentes

    res.json({
      files
    });
    
  }); 

  res.json(req.body); // req.body sao os dados

})

module.exports = router;
