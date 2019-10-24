import { nearEarthObjectsQueries } from './resolvers/nearEarthObjects';
import { Db, MongoClient } from 'mongodb';
import chalk from 'chalk';

const localMongo = 'mongodb://localhost:27017';
const mongo = '';
const dbRetries = 3;
const MONGO_URL = process.env.PRODUCTION ? mongo : localMongo;

let db: Db | null = null;

const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  let i;
  for (i = 0; i < dbRetries; ++i) {
    try {
      await mongoClient.connect();
      console.log('Connection to database successfull');
      db = mongoClient.db('space');
      break;
    } catch (err) {
      console.log(chalk.red('Connection to database failed'));
    }
  }
})();

export const resolvers = { ...nearEarthObjectsQueries(db) };
