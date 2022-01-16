import { Module } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap.service';
import { CoinMarketCapController } from './coin-market-cap.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CoinMarketCapService],
  controllers: [CoinMarketCapController],
})
export class CoinMarketCapModule {}
