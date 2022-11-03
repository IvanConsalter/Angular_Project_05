import { TestBed } from '@angular/core/testing';

import { FornecedorGuard } from './fornecedor.guard';

describe('FornecedorGuard', () => {
  let guard: FornecedorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FornecedorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
