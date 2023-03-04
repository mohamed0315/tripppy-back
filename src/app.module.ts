import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FirebaseAuthStrategy } from './auth/firebase-auth.strategy';
import { AccommodationModule } from './accommodation/accommodation.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://tripppy:tripppy-back@cluster0.gzjmbdy.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
    AccommodationModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
