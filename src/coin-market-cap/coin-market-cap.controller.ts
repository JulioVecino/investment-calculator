import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap.service';

@Controller('coin-market-cap')
export class CoinMarketCapController {
  constructor(private coinMarketCapService: CoinMarketCapService) {}

  // List coins filter by key
  @Get('/')
  async getAllCoins(@Res() res, @Req() req) {
    const { symbol } = req.params;
    const coins = await this.coinMarketCapService.getAll(symbol);
    return res.status(HttpStatus.OK).json(coins);
  }
}
