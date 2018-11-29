import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoClinicaComponent } from "./infoclinica.component";

describe("BuscadorComponent", () => {
  let component: InfoClinicaComponent;
  let fixture: ComponentFixture<InfoClinicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoClinicaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
