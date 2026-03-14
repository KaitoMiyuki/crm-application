import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './contacts/contacts.controller';
import { ContactEntity } from './contacts/contact.entity';
import { ContactsService } from './contacts/contacts.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'crm',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ContactEntity])
  ],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactsService],
  
})
export class AppModule {}
