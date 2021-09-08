const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();
const { sequelize } = require('./models');

const rootRoutes = require('./routes');

// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerOption = require('./swagger');

const app = express();
const port = process.env.PORT || 5000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

require('./config/passport')(passport);

app.use('/', rootRoutes);

// const specs = swaggerJsDoc(swaggerOption);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  console.log(err);
  res.status(err.status || 500);
  res.status(404).send(err);
});


if (process.env.ENV == "production") {
  const options = {
    ca: fs.readFileSync(`/etc/letsencrypt/live/doran.yummeal.ai/fullchain.pem`),
    key: fs.readFileSync(`/etc/letsencrypt/live/doran.yummeal.ai/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/doran.yummeal.ai/cert.pem`)    
  }

  http.createServer(app).listen(80);
  https.createServer(options, app).listen(443);
} else {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;