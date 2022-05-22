import { TestBed } from '@angular/core/testing';

import { EchoService } from './echo.service';

describe('EchoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EchoService = TestBed.get(EchoService);
    expect(service).toBeTruthy();
  });
});
