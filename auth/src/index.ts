import mongoose from 'mongoose';
import { app } from './app';

const PORT = 3000;
const MONGODB_URI = 'mongodb://auth-mongo-srv:27017/auth';

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY not provided');
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('auth-mongo connection successful!');
  } catch (error) {
    console.error(error, '>>>>>');
  }
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
  });
};

start();
