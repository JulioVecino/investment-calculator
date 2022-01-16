import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CoinMarketCapModule } from '../src/coin-market-cap/coin-market-cap.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CoinMarketCapModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Prueba Técnica Disruptive Studio');
  });
  it('/api/coin-market-cap (GET)', () => {
    return request(app.getHttpServer()).get('/coin-market-cap').expect(200);
  });
});
