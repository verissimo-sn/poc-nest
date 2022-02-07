import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from './database/dbConfig';

@Module({
  imports: [
    MongooseModule.forRoot(dbConfig.mongo_uri, {
      useNewUrlParser: true,
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
