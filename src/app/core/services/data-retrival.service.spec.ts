import { TestBed } from '@angular/core/testing';

import { DataRetrivalService } from './data-retrival.service';

describe('DataRetrivalService', () => {
  let service: DataRetrivalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRetrivalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
