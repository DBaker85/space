import express, { static as Static } from 'express';
import { resolve } from 'path';

const localPort = 5055;

const port = process.env.PORT || localPort;

const app = express();
const clientPath = resolve(__dirname, '..', 'build');

app.use(Static(clientPath));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(resolve(clientPath, 'index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);
