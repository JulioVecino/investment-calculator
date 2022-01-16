import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoinMarketCapService {
  private url = `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/quotes/latest`;
  private apiKey = process.env.COINMARKETCAP_APIKEY;

  constructor(private httpService: HttpService) {}
  /*
   * Servicio de listado de precio de criptomonedas por default 'BTC,ETH'
   */
  async getAll(symbol = 'BTC,ETH') {
    const coins = await this.fetchCoinsBySymbol(symbol);

    const listCoins = Object.keys(coins);
    return listCoins.map((k) => ({
      name: coins[k].name,
      symbol: coins[k].symbol,
      price: coins[k].quote?.USD?.price,
    }));
  }

  private async fetchCoinsBySymbol(symbol: string): Promise<any> {
    let request;
    try {
      request = await this.httpService
        .get(this.url, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
          params: { symbol: symbol },
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || {};
  }
}
