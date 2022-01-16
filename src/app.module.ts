import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoinMarketCapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
