import { TestBed } from '@angular/core/testing';

import { GenreRequestService } from './genre-request.service';

describe('GenreRequestService', () => {
  let service: GenreRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
