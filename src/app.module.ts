import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import { ProjectModule } from './modules/project/project.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ProjectMaterialModule } from './modules/project-material/project-material.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    UserModule,
    AuthModule,
    ClientModule,
    ProjectModule,
    InventoryModule,
    ProjectMaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
