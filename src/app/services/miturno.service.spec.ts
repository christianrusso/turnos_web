import { TestBed, inject } from "@angular/core/testing";

import { MiturnoService } from "./miturno.service";

describe("MiturnoService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiturnoService]
    });
  });

  it("should be created", inject(
    [MiturnoService],
    (service: MiturnoService) => {
      expect(service).toBeTruthy();
    }
  ));
});
