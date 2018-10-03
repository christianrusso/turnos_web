import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { BusquedaService } from "../../services/busqueda.service";
import { MapService } from "../../services/map.service";
import { RegisterLoginService } from "../../services/register-login.service";
import { Router, NavigationEnd } from "@angular/router";
import { BaseComponent } from "../../core/base.component";

declare const google: any;
@Component({
  selector: 'app-buscador-peluqueria',
  templateUrl: './buscador-peluqueria.component.html',
  styleUrls: ['./buscador-peluqueria.component.css'],
  providers: [BusquedaService, MapService, RegisterLoginService]

})
export class BuscadorPeluqueriaComponent extends BaseComponent
  implements OnInit, AfterViewInit {

  constructor(
    private _BusquedaService: BusquedaService,
    private _MapService: MapService,
    private _RegisterLoginService: RegisterLoginService,
    private _router: Router
  ) {
    super();
  }
  public busqueda = null;
  public allData;
  public filtro;
  public coments;
  public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public dontResult;
  public distancia;
  public especialidades;
  public subEspecialidades;
  public obrasSociales;
  public cities;
  public identity;
  public filtroFecha;
  public limitForEspecialidad = 5;
  public limitForSubEspecialidad = 5;
  public limitForObraSocial = 5;
  public limitForUbicacion = 5;

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script3.js");
  }
  ngOnInit() {
    $("header").show();
    this.busqueda = JSON.parse(localStorage.getItem("busqueda"));
    this.identity = this._RegisterLoginService.getToken();
    if (this.busqueda.ubicacion != "") {
      var cities = [this.busqueda.ubicacion]
    } else {
      var cities = []
    }
    this.filtro = {
      Cities: cities,
      Specialties: [],
      Subspecialties: [],
      Score: "",
      ScoreQuantity: "",
    };
    this.dontResult = false;
    this.getByFilter(this.filtro);
    this.getSplecialties();
    this.getSubSplecialties();
    this.getCities();
  }
  public getByFilter(filtro) {
    $("#loading-bar-spinner").removeAttr("hidden");
    $("#loading-bar-spinner").show();
    this._BusquedaService.getByFilter(filtro).subscribe(
      response => {
        if (response.length != 0) {
          console.log(response);
          this.dontResult = false;
          this.allData = response;
        } else {
          this.dontResult = true;
          this.allData = null;
        }
        $("#loading-bar-spinner").hide();
      },
      error => {
        // Manejar errores
      }
    );
  }
  // ACTIVADOR DE PESTAÑAS DE CADA CLINICA
  public info(IdValue) {
    $("#info" + IdValue).show();
    $("#comen" + IdValue).hide();
    $("#ubi" + IdValue).hide();
    $(".info-slide").addClass("activeFilter");
    $(".com-slide").removeClass("activeFilter");
    $(".ubi-slide").removeClass("activeFilter");
  }
  public comen(IdValue) {
    $("#info" + IdValue).hide();
    $("#comen" + IdValue).show();
    $("#ubi" + IdValue).hide();
    $(".com-slide").addClass("activeFilter");
    $(".info-slide").removeClass("activeFilter");
    $(".ubi-slide").removeClass("activeFilter");
  }
  public ubi(IdValue, latitud, longitud) {
    $("#info" + IdValue).hide();
    $("#comen" + IdValue).hide();
    $("#ubi" + IdValue).show();
    $(".ubi-slide").addClass("activeFilter");
    $(".com-slide").removeClass("activeFilter");
    $(".info-slide").removeClass("activeFilter");
    this._MapService.generateMap(latitud, longitud, IdValue);
  }
  //FILTROS COMENTARIOS  POR CALIFICACION O POPULAR
  filterOrderBy(deviceValue) {
    var select = deviceValue.target.value;
    if (select == 1) {
      this.allData.sort(function (a, b) {
        return b.score - a.score;
      });
    } else {
      this.allData.sort(function (a, b) {
        return b.scoreQuantity - a.scoreQuantity;
      });
    }
  }

  getHour(date) {
    let time = date.split(":");

    return time[0] + ":" + time[1];
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
  // ver mas y menos de la columna
  verMasEspecialista(status) {
    if (status == true) {
      this.limitForEspecialidad = 100;
    } else {
      this.limitForEspecialidad = 5;
    }
  }
  verMasSubEspecialista(status) {
    if (status == true) {
      this.limitForSubEspecialidad = 100;
    } else {
      this.limitForSubEspecialidad = 5;
    }
  }

  verMasUbicacion(status) {
    if (status == true) {
      this.limitForUbicacion = 100;
    } else {
      this.limitForUbicacion = 5;
    }
  }
  VerMapa() {
  }



  //Filtros
  public FiltrarEspecialidad(especialidad, deviceValue) {
    this.allData = [];
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
    this.allData = [];
    this._BusquedaService.getSubSpecialityOnEspeciality(especialidad).subscribe(
      response => {
        this.subEspecialidades = response;
      },
      error => {
        // Manejar errores
      }
    );

    this.getByFilter(this.filtro);
  }
  public FiltrarSubEspecialidad(Subspecialties, deviceValue) {
    this.allData = [];
    if (deviceValue.target.checked) {
      this.filtro.Subspecialties.push(Subspecialties);
    } else {
      for (let index = 0; index < this.filtro.Subspecialties.length; index++) {
        if (Subspecialties == this.filtro.Subspecialties[index]) {
          this.filtro.Subspecialties.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }
  public FiltrarObrasSocial(obraSocial, deviceValue) {
    this.allData = [];
    if (deviceValue.target.checked) {
      this.filtro.MedicalInsurances.push(obraSocial);
    } else {
      for (
        let index = 0;
        index < this.filtro.MedicalInsurances.length;
        index++
      ) {
        if (obraSocial == this.filtro.MedicalInsurances[index]) {
          this.filtro.MedicalInsurances.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }

  //filtro city
  public FiltrarCities(Cities, deviceValue) {
    this.allData = [];
    if (deviceValue.target.checked) {
      this.filtro.Cities.push(Cities);
    } else {
      for (let index = 0; index < this.filtro.Cities.length; index++) {
        if (Cities == this.filtro.Cities[index]) {
          this.filtro.Cities.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }

  //filtro Score
  public FiltrarScore(score) {
    this.allData = [];
    this.filtro.Score = score;
    this.getByFilter(this.filtro);
  }
  //filtro ScoreQuantity
  public FiltrarScoreQuantity(ScoreQuantity) {
    this.allData = [];
    this.filtro.ScoreQuantity = ScoreQuantity;
    this.getByFilter(this.filtro);
  }


  //filtro pro distancia
  FiltrarDistancia(deviceValue) {
    this.distancia = parseInt(deviceValue.target.value);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.showPosition(position);
      }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    if (this.busqueda.ubicacion != "") {
      this.filtro = {
        Location: {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
          RadiusInMeters: this.distancia * 100
        },
        Cities: [this.busqueda.ubicacion],
        Specialties: this.filtro.Specialties,
        Subspecialties: this.filtro.Subspecialties,
        MedicalInsurances: this.filtro.MedicalInsurances,
        MedicalPlans: []
      };
    } else {
      this.filtro = {
        Location: {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
          RadiusInMeters: this.distancia * 100
        },
        Cities: [],
        Specialties: this.filtro.Specialties,
        Subspecialties: this.filtro.Subspecialties,
        MedicalInsurances: this.filtro.MedicalInsurances,
        MedicalPlans: []
      };
    }
    this.getByFilter(this.filtro);
  }
  //fin filtro por distancia.

  //Borrar los filtros
  public BorrarFiltros() {

    this.filtro = {
      Cities: [],
      Specialties: [],
      Subspecialties: [],
      Score: "",
      ScoreQuantity: "",
      AvailableAppointmentDate: ""
    };

    $("input[type=checkbox]").prop("checked", false);
    $(".range-slider").val(0);
    $(".range-slider__range").val(0);
    $(".range-slider__value").text(0);
    this.getByFilter(this.filtro);
  }
}
