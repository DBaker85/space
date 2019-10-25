import { Db } from 'mongodb';

export type GraphQLContext = () => { db: Db };
