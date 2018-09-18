import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CargaclinicaComponent } from "./cargaclinica.component";

describe("CargaclinicaComponent", () => {
  let component: CargaclinicaComponent;
  let fixture: ComponentFixture<CargaclinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CargaclinicaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
