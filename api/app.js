var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var carrerasRouter = require('./routes/carreras');
var materiasRouter = require('./routes/materias');
var profesoresRouter = require('./routes/profesores');
var usuariosRouter = require('./routes/usuarios');

var app = express();

// Habilitar cors antes de las definiciones de rutas
const whiteList = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: whiteList
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// routing
app.use('/carrera', carrerasRouter);
app.use('/materia', materiasRouter);
app.use('/profesor', profesoresRouter);
app.use('/usuario', usuariosRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;