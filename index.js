const express = require('express');
const db = require('./db');
require("dotenv").config();
const routerApi = require('./app/network/index');
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./app/network/middlewares/error.handler');
const { DBURL } = require('./const.json');
//HACEMOS LA CONEXIÓN
db(DBURL);

const app = express();
const PORT = 3000;

app.use(
  express.json(
    { extended: false } // permite codificar matrices y objetos enriquecidos en formato codificado en url
  )
); //Selección de tipo de analisis de datos
app.use(express.static('app/storage')); //Sacarlos Recursos estaticos de esta carpeta


//app.use(customHeader);
routerApi(app);
app.use(logErrors); //El orden de los use es imPORTante
app.use(boomErrorHandler);
app.use(errorHandler); //Los middlewares de error van despues del routing

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Mi PORT' + PORT);
});
