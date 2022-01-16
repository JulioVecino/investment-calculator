import { Test, TestingModule } from '@nestjs/testing';
import { CoinMarketCapService } from './coin-market-cap.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';

class HttpServiceMok {
  get(): Observable<AxiosResponse<any>> {
    const result: AxiosResponse = {
      data: {
        data: {
          ETH: {
            name: 'Ethereum',
            symbol: 'ETH',
            quote: { USD: { price: 2344 } },
          },
          BTC: {
            name: 'Bitcoin',
            symbol: 'BTC',
            quote: { USD: { price: 90344 } },
          },
        },
      },
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    };
    return of(result);
  }
}

describe('CoinMarketCapService', () => {
  let service: CoinMarketCapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoinMarketCapService,
        { provide: HttpService, useClass: HttpServiceMok },
      ],
    }).compile();

    service = module.get<CoinMarketCapService>(CoinMarketCapService);
  });
  const expected = [{ name: 'Ethereum', symbol: 'ETH', price: 2344 }];

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Sussefully Service getAll cryptocurrency by Symbols', async () => {
    expect(await service.getAll()).toEqual(expect.arrayContaining(expected));
  });
});
