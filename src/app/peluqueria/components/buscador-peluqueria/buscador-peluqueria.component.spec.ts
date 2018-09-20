import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorPeluqueriaComponent } from './buscador-peluqueria.component';

describe('BuscadorPeluqueriaComponent', () => {
  let component: BuscadorPeluqueriaComponent;
  let fixture: ComponentFixture<BuscadorPeluqueriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorPeluqueriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorPeluqueriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
