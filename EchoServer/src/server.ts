import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {router} from './messageController'

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(router)
  .set('trust proxy', true);

app.listen(4201, () => {
  return console.log('My Node App listening on port 4201');
});