import { TestBed, inject } from "@angular/core/testing";

import { EditarService } from "./editar.service";

describe("EditarService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditarService]
    });
  });

  it("should be created", inject(
    [EditarService],
    (service: EditarService) => {
      expect(service).toBeTruthy();
    }
  ));
});
