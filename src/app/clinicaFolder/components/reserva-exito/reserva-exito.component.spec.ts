import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReservaExitoComponent } from "./reserva-exito.component";

describe("ReservaExitoComponent", () => {
  let component: ReservaExitoComponent;
  let fixture: ComponentFixture<ReservaExitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaExitoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
