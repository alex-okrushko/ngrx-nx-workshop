import { Test } from '@nestjs/testing';

import { ProductService } from './product/product.service';

describe('AppService', () => {
  let service: ProductService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductService]
    }).compile();

    service = app.get<ProductService>(ProductService);
  });

  // describe('getData', () => {
  //   it('should return "Welcome to api!"', () => {
  //     expect(service.getData()).toEqual({ message: 'Welcome to api!' });
  //   });
  // });
});
