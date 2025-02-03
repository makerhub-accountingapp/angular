import { TestBed } from '@angular/core/testing';
import { BaseHubService } from './base-hub.service';


describe('BaseHubService', () => {
  let service: BaseHubService<any, any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
