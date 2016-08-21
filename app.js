var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var routes = require('./routes/index');
var autos = require('./routes/autos');


var app= express();

app.listen(3000,()=>{
	console.log("App esta escuchando en el puerto 3000");
});

mongoose.connect('mongodb://localhost/autos'); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	    console.log('Se ha establecido la conexion a la base de datos');
	});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);
app.use('/autos', autos);

var autosShema = mongoose.Schema({
	_id: Number,
	descripcion:{marca: String, modelo: String},
	anio: Number,
	fecha: {type: Date, default: Date.Now} 
});

var Autos = mongoose.model('auto', autosShema);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public','index.html')); 
});

app.get('/automoviles',(req,res)=>{
	Autos.find((err,auto)=>{
		if(err)
			res.status(500).send('Hubo un error en la base de datos');
		else
			res.status(200).json(auto);
	});
})

app.get('/automoviles/:id',(req,res)=>{
	Autos.findById(req.params.id,(err,auto)=>{
		if(err)
			res.status(500).send('Hubo un error en la base de datos');
		else{
			if(auto)
				res.status(200).json(auto);
			else
				res.status(404).send("No se encontro ese auto")
			}
	});
})


app.get('/automoviles/year/:anio',(req,res)=>{
	Autos.find({anio: {$gte: req.params.anio}},(err, auto)=>{
    		if (err) {
    			console.log(err);
    			res.send('Hubo un error en la base de datos');
    		}
    		else
    			res.json(auto);
    	});
	
})

app.get('/automoviles/year/:anioi/:aniof',(req,res)=>{
    Autos.find({anio:{$gte:req.params.anioi,$lte:req.params.aniof}},(err,auto)=>{
        if (err) 
            res.status(500).send("Hubo un error en la base de datos");
        else
            res.json(auto);
    });
})


//////////////////////////CRUD//////////////////////

app.post('/automoviles',(req,res)=>{
	var nuevAuto= new Autos({
	_id: req.body.id,
	descripcion: {marca: req.body.marca, modelo: req.body.modelo},
	anio: req.body.anio,
	fechan: new Date(req.body.anioing, req.body.mes, req.body.dia)
	})

	nuevAuto.save((err,auto)=>{
		if (err)
			res.status(409).send('Ya existe un auto con ese ID.');
		else
			res.status(200).send('Agregado correctamente');

	});

});

app.put('/automoviles/:id',(req,res)=>{
	Autos.findById(req.params.id,(err,auto)=>{
		if(err)
			res.status(500).send('Hubo un error en la base de datos');
		else{
			if(auto){
				auto.descripcion.marca = req.body.marca;
				auto.descripcion.modelo = req.body.modelo;
				auto.anio = req.body.anio;
				auto.fechan = new Date(req.body.anio, req.body.mes, req.body.dia);

				auto.save(function (error, auto) {
					if (error)
						res.status(500).send('Hubo un error en la base de datos');
					else
						res.status(200).send('Modificado correctamente');
				});
			}
			else
				res.status(404).send("No se encontro ese auto")
			}
	});
});


app.delete('/automoviles/:id',(req,res)=>{
	Autos.findById(req.params.id,(err, auto)=>{
		if (err)
			res.status(500).send('Error en la base de datos');
		else{
			if (auto){
				auto.remove((error, result)=>{
					if (error)
						res.status(500).send('hubo un error en la base de datos');
					else
						res.status(200).send('Eliminado correctamente');
				});
			}
			else
				res.status(404).send('No se encontro esa auto');
            }
        });
});




app.use((req, res, next)=>{
  res.status(404).send('Esa pagina no existe!');
});




