var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const filmesRouter = require('./routes/filmes');
const generosRouter = require('./routes/generos');



var app = express();

const cors = require('cors');
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');
app.use(session({
  secret: 'segredo-24819', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true se estiveres com HTTPS
}));

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ erro: 'Acesso não autorizado' });
  }
}

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/filmes', filmesRouter);  
app.use('/api/generos', generosRouter);


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bcrypt = require('bcrypt');
const User = require('./models/user');


//login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).send('Usuário não encontrado.');
    }

    const match = await bcrypt.compare(password, user.senha);
    if (!match) {
      return res.status(401).send('Senha incorreta.');
    }

    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.redirect('/dashboard.html');
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).send('Erro interno no servidor.');
  }
});

//register
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).send('Nome de utilizador já existe.');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // encripta com salt

    await User.create({ username, senha: hashedPassword, email });

    res.redirect('/login.html');
  } catch (err) {
    console.error('Erro ao registar utilizador:', err);
    res.status(500).send('Erro interno ao criar conta.');
  }
});

//logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
      return res.status(500).send('Erro interno ao fazer logout.');
    }
    res.redirect('/index.html');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');  
});

module.exports = app;