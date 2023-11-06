import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NoteModule,
    UserModule,
    AuthModule,
    PrismaModule,
    ProductModule,
    CategoryModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
