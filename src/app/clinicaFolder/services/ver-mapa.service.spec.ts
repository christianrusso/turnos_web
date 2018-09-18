import { TestBed, inject } from "@angular/core/testing";

import { VerMapaService } from "./ver-mapa.service";

describe("VerMapaService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerMapaService]
    });
  });

  it("should be created", inject(
    [VerMapaService],
    (service: VerMapaService) => {
      expect(service).toBeTruthy();
    }
  ));
});
