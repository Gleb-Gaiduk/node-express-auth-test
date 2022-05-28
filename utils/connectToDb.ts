import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

export async function connectToDb() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    log.info('Connected to DB');
  } catch (error) {
    process.exit(1);
  }
}
