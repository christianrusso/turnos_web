import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { VerMapService } from '../../services/ver-mapa.service';
import { BusquedaService } from '../../services/busqueda.service';

declare const google: any;

@Component({
  selector: 'app-ver-mapa',
  templateUrl: './ver-mapa.component.html',
  styleUrls: ['./ver-mapa.component.css'],
  providers: [VerMapService, BusquedaService]
})
export class VerMapaComponent extends BaseComponent implements OnInit, AfterViewInit {
  constructor(private _MapService: VerMapService,
    private _BusquedaService: BusquedaService,
  ) {
    super();
  }
  public clinicas;
  public filtro;
  public busqueda;
  public locations = [];
  public distancia;
  public cantidadClinicas;
  public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public noData;
  public especialidades;
  public subEspecialidades;
  public obrasSociales;
  public cities;
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script6.js');
  }
  ngOnInit() {
    this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
    this.filtro = {
      "Cities": [this.busqueda.ubicacion],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": [],
      "medicalPlans": []

    }

    this.getByFilter(this.filtro);
    this.getSplecialties();
    this.getSubSplecialties();

    this.getMedicalInsurance();
    this.getCities();

  }
  public insertStart = [];
  public getByFilter(filtro) {
    this._BusquedaService.getByFilter(filtro).subscribe(
      response => {
        console.log(response.length);
        if (response.length == 0) {
          this.noData = true;
        }
        else {
          this.noData = false;
        }
        this.clinicas = response;
        this.cantidadClinicas = this.clinicas.length;
        this.locations = [];
        response.forEach(element => {
          this.score.forEach(star => {
            if (element.score - star >= star) {
              this.insertStart.push('<i class="fa fa-star"></i>');
            }
          });

          this.locations.push(['<div class="col-xs-12 col-md-12 infow"><div class="row"><div class="col-xs-12 col-md-5"><img src=' + element.logo + '></div><div class="col-xs-12 col-md-7"><h3>' + element.name + '</h3><p class="location"><i class="fa fa-map-marker"></i>' + element.address + '</p><div class="punt">' + element.score + '</div><div class="stars">' + this.insertStart + '</div></div></div></div>', element.latitude, element.longitude]);
          this.insertStart = [];
        });

        this._MapService.generateMap(this.locations, null);

      },
      error => {
        // Manejar errores
      }

    );
  }
  //Filtros
  public FiltrarEspecialidad(especialidad, deviceValue) {
    this.clinicas = [];
    if (deviceValue.target.checked) {
      this.filtro.Specialties.push(especialidad);
    } else {
      for (let index = 0; index < this.filtro.Specialties.length; index++) {
        if (especialidad == this.filtro.Specialties[index]) {
          this.filtro.Specialties.splice(index, 1);
        }
      }
    }
    if (this.filtro.Specialties.length > 0) {
      this.FiltrarSubEspecialidadOnEspecialidad(especialidad);

    } else {
      this.getSubSplecialties();

    }
    this.getByFilter(this.filtro);
  }

  //filtro cunado cambia la especialiad
  public FiltrarSubEspecialidadOnEspecialidad(especialidad) {
    this.clinicas = [];
    this._BusquedaService.getSubSpecialityOnEspeciality(especialidad).subscribe(
      response => {
        console.log(response);
        this.subEspecialidades = response;
      },
      error => {
        // Manejar errores
      }
    );

    this.getByFilter(this.filtro);
  }
  public FiltrarSubEspecialidad(Subspecialties, deviceValue) {
    this.clinicas = [];
    if (deviceValue.target.checked) {
      this.filtro.Subspecialties.push(Subspecialties);
    }
    else {
      for (let index = 0; index < this.filtro.Subspecialties.length; index++) {
        if (Subspecialties == this.filtro.Subspecialties[index]) {
          this.filtro.Subspecialties.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }
  public FiltrarObrasSocial(obraSocial, deviceValue) {
    this.clinicas = [];
    if (deviceValue.target.checked) {
      this.filtro.MedicalInsurances.push(obraSocial);
    }
    else {
      for (let index = 0; index < this.filtro.MedicalInsurances.length; index++) {
        if (obraSocial == this.filtro.MedicalInsurances[index]) {
          this.filtro.MedicalInsurances.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }

  //filtro city
  public FiltrarCities(Cities, deviceValue) {
    this.clinicas = [];
    if (deviceValue.target.checked) {
      this.filtro.Cities.push(Cities);
    }
    else {
      for (let index = 0; index < this.filtro.Cities.length; index++) {
        if (Cities == this.filtro.Cities[index]) {
          this.filtro.Cities.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }
  //filtro pro distancia
  FiltrarDistancia(deviceValue) {
    this.distancia = parseInt(deviceValue.target.value);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.filtro = {
      "Location": {
        "Latitude": position.coords.latitude,
        "Longitude": position.coords.longitude,
        "RadiusInMeters": this.distancia,
      },
      "Cities": [this.busqueda.lugar],
      "Specialties": this.filtro.Specialties,
      "Subspecialties": this.filtro.Subspecialties,
      "MedicalInsurances": this.filtro.MedicalInsurances
    }
    this.getByFilter(this.filtro);
  }
  //fin filtro por distancia.
  //Borrar los filtros
  public BorrarFiltros() {
    $('.modal-filtros').fadeOut();

    this.filtro = {
      "Cities": [this.busqueda.lugar],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": [],
      "medicalPlans": []

    }
    this.getByFilter(this.filtro);
  }

  public AplicarFiltros() {
    this.clinicas = [];
    $('.modal-filtros').fadeOut();

    this.getByFilter(this.filtro);

  }
  public test;
  public OpenMarkers(x) {
    this._MapService.generateMap(this.locations, x);
  }

  //Specialidades
  public getSplecialties() {
    this._BusquedaService.getSpeciality().subscribe(
      response => {
        this.especialidades = response;
      },
      error => {
        // Manejar errores
      }
    );
  }

  //SubEspecialidades
  public getSubSplecialties() {
    this._BusquedaService.getSubSpeciality().subscribe(
      response => {
        this.subEspecialidades = response;
      },
      error => {
        // Manejar errores
      }
    );
  }

  //ObrasSociales
  public getMedicalInsurance() {
    this._BusquedaService.getMedicalInsurance().subscribe(
      response => {
        this.obrasSociales = response;
      },
      error => {
        // Manejar errores
      }
    );
  }
   //Citys
   public getCities() {
    this._BusquedaService.getCities().subscribe(
      response => {
        this.cities = response;
      },
      error => {
        // Manejar errores
      }
    );
  }
}
