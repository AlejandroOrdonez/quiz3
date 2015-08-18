var models = require('../models/models');

// Autolad - factoriza el código si ruta incluye: quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId = '+ quizId));
			}
		}
	).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index',{quizes: quizes})
	});
};

//GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz:quiz});
	})
};

//GET /quizes/:id/answer
exports.answer = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer',{quiz: quiz, respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer',{quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};

//GET /author
exports.author = function(req,res){
	res.render('author',{author:'Victor Alejandro Ordoñez'});
};

//GET /quizes/search
exports.search = function(req,res){
	res.render('quizes/search',{author:'Victor Alejandro Ordoñez'});
};

//GET /quizes/resultado
exports.searchResult = function(req,res){
	var buscado = '%'+req.query.search+'%';
	buscado = buscado.replace(' ','%');
	models.Quiz.findAll({where:["pregunta like ?", buscado]}).then(function(quizes){
		if(quizes.length){
			res.render('quizes/resultado',{quizes: quizes});
		}else{
			res.render('quizes/mensaje',{Mensaje: req.query.search});
		}
	});
};