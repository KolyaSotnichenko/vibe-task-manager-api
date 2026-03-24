import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Application compilation', () => {
  it('compiles the NestJS application module', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(moduleRef).toBeDefined();
  });
});
