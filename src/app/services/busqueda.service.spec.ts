import { TestBed, inject } from '@angular/core/testing';

import { BusquedaService } from './busqueda.service';

describe('BusquedaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusquedaService]
    });
  });

  it('should be created', inject([BusquedaService], (service: BusquedaService) => {
    expect(service).toBeTruthy();
  }));
});
