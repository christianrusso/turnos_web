import { TestBed, inject } from '@angular/core/testing';

import { RegisterLoginService } from './register-login.service';

describe('RegisterLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterLoginService]
    });
  });

  it('should be created', inject([RegisterLoginService], (service: RegisterLoginService) => {
    expect(service).toBeTruthy();
  }));
});
