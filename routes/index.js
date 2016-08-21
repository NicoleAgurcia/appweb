var express = require('express');
var router = express.Router();


/*router.get('/', function(req, res, next) {
  res.send('WELCOME AUTOMAX');
});

*/




router.get("/",(req,res)=>{
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />'+
    '<title> Welcome </title>'+
    '</head>'+
    '<body>'+ 
    '<br>' + 
    '<h2>-- WELCOME -- </h2>'+
    '<a href="/autos">Ir a Descargas</a>' +
    '<br>' +
    '</body>'+
    '</html>';
    res.send(body);
})

module.exports = router;
