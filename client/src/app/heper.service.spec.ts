import { TestBed } from '@angular/core/testing';

import { HeperService } from './heper.service';

describe('HeperService', () => {
  let service: HeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
