import { TestBed, inject } from "@angular/core/testing";

import { ClinicaService } from "./clinica.service";

describe("ClinicaService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicaService]
    });
  });

  it("should be created", inject(
    [ClinicaService],
    (service: ClinicaService) => {
      expect(service).toBeTruthy();
    }
  ));
});
