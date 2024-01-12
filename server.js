const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const compression = require('compression');
// Logging mechanism
const morgan = reqquire('morgan')
// Improves application's security by setting various HTTP headers and controlling cross-origin requests
const helmet = require('helmet');
const cors = require('cors');
// Uses helmet and cors
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
//Compression middleware to compress response bodies for all requests, which improves performance of the app
app.use(compression());

// Makes sure that 'public folder' and its content are served correctly
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/login', (req, res) => {
  res.render('login');
});
