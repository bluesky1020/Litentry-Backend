import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Secret, SecretSchema } from './schemas/secret.schema';
import * as dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: MONGO_URI,
          useNewUrlParser: true,
          useUnifiedtopology: true,
        }
      },
    }),
    MongooseModule.forFeature([{ name: Secret.name, schema: SecretSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
