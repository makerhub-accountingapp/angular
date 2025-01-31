import { TestBed } from '@angular/core/testing';

import { DetailService } from './detail.service';

describe('HistoryService', () => {
  let service: DetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
