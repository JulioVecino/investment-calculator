import { Test, TestingModule } from '@nestjs/testing';
import { CoinMarketCapController } from './coin-market-cap.controller';
import { CoinMarketCapService } from './coin-market-cap.service';

const valueMok = [{ name: 'Ethereum', symbol: 'ETH', price: 2344 }];

class CoinMarketCapServiceMok {
  async getAll(): Promise<any> {
    return new Promise((rs) => {
      rs(valueMok);
    });
  }
}

describe('CoinMarketCapController', () => {
  let controller: CoinMarketCapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinMarketCapController],
      providers: [
        { provide: CoinMarketCapService, useClass: CoinMarketCapServiceMok },
      ],
    }).compile();

    controller = module.get<CoinMarketCapController>(CoinMarketCapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('success Controller getAllCoins ', async () => {
    const res = {
      json: (body?: any) => body,
      status: () => res,
    };
    expect(await controller.getAllCoins(res, { params: {} })).toEqual(
      expect.arrayContaining(valueMok),
    );
  });
});
