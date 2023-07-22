import express, { Express, urlencoded, json } from 'express';
import { createServer } from 'http';
import { Environments } from './utils';
import router from './routes';

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/v1', router);

createServer(app).listen(Environments.server.port, 
    () => console.log(`Server is running on port: ${Environments.server.port}`)
);