import { TestBed } from '@angular/core/testing';

import { BankPaymentService } from './bank-payment.service';

describe('BankPaymentService', () => {
  let service: BankPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
