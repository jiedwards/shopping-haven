import { TestBed } from '@angular/core/testing';

import { ShoppingHavenFormService } from './shopping-haven-form.service';

describe('ShoppingHavenFormService', () => {
  let service: ShoppingHavenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingHavenFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
