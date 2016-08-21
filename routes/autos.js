var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var path = require('path');




router.get("/",(req,res)=>{
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />'+
    '<title>Menu Descargas</title>'+
    '</head>'+
    '<body>'+
    'Seleccione una alguna opcion:' + 
    '<br>' + 
    '<a href="/autos/toyota">Descargar imagen de Toyota</a>' +
    '<br>' +
    '<a href="/autos/nissan">Descargar imagen de Nissan</a>' +
    '<br>' +
    '<a href="/autos/honda">Descargar imagen de Honda</a>' +
    '<br>' +
    '<a href="/autos/hyundai">Descargar imagen de Hyundai</a>' +
    '<br>' +
    '</body>'+
    '</html>';
    res.send(body);
})

router.get("/toyota",(req,res)=>{
    res.download(path.join(__dirname,'../public/images/toyota1.jpg'),'toyota.jpg',
    (err)=>{
        if (err)
            console.log("Error al descargar");
        else
            console.log("Imagen Descargada");
    });
})

router.get("/nissan",(req,res)=>{
    res.download(path.join(__dirname,'../public/images/nissan.jpg'),'nissan.png',
    (err)=>{
        if (err)
            console.log("Error al descargar");
        else
            console.log("Imagen Descargada");
    });
})
router.get("/honda",(req,res)=>{
    res.download(path.join(__dirname,'../public/images/honda.jpg'),'honda.png',
    (err)=>{
        if (err)
            console.log("Error al descargar");
        else
            console.log("Imagen Descargada");
    });
})
router.get("/hyundai",(req,res)=>{
    res.download(path.join(__dirname,'../public/images/hyundai.jpg'),'hyundai.png',
    (err)=>{
        if (err)
            console.log("Error al descargar");
        else
            console.log("Imagen Descargada");
    });
})


module.exports = router;
