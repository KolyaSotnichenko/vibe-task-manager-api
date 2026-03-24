import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TimeController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns New York time by default', async () => {
    const res = await request(app.getHttpServer()).get('/time').expect(200);
    expect(res.body.timezone).toBe('America/New_York');
    expect(typeof res.body.iso).toBe('string');
  });

  it('returns time for provided timezone', async () => {
    const res = await request(app.getHttpServer())
      .get('/time')
      .query({ timezone: 'Europe/Kyiv' })
      .expect(200);
    expect(res.body.timezone).toBe('Europe/Kyiv');
  });

  it('returns 400 for invalid timezone', async () => {
    const res = await request(app.getHttpServer())
      .get('/time')
      .query({ timezone: 'Invalid/Zone' })
      .expect(400);
    expect(res.body.code).toBe('INVALID_TIMEZONE');
  });
});
