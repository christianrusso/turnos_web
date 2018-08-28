import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../../services/busqueda.service';
import { MapService } from '../../services/map.service';
import { RegisterLoginService } from '../../services/register-login.service';
import { Router } from "@angular/router";

declare const google: any;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  providers: [BusquedaService, MapService, RegisterLoginService]
})
export class BuscadorComponent implements OnInit {
  public busqueda;
  public clinicas;
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
  constructor(
    private _BusquedaService: BusquedaService,
    private _MapService: MapService,
    private _RegisterLoginService: RegisterLoginService,
    private _router: Router,

  ) { }

  ngOnInit() {
    $('header').show();
    this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
    this.identity = this._RegisterLoginService.getToken();
    this.filtro = {
      "Cities": [this.busqueda.ubicacion],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": [],
      "medicalPlans": [],
      "Score": "",
      "ScoreQuantity": "",
      "AvailableAppointmentDate":""

    }
    this.filtroFecha={
      "categorias":this.busqueda.ubicacion,
      "fecha":"",
    }
    this.dontResult = false;
    this.getByFilter(this.filtro);
    this.getSplecialties();
    this.getSubSplecialties();
    this.getMedicalInsurance();
    this.getCities();

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
  //Citys

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
  public getByFilter(filtro) {
    $("#loading-bar-spinner").removeAttr('hidden');
    $("#loading-bar-spinner").show();
    this._BusquedaService.getByFilter(filtro).subscribe(
      response => {
        if (response.length != 0) {
          this.dontResult = false;
          this.clinicas = response;
        }
        else {
          this.dontResult = true;
          this.clinicas = null;

        }
        $("#loading-bar-spinner").hide();

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
    if(this.filtro.Specialties.length>0){
      this.FiltrarSubEspecialidadOnEspecialidad(especialidad);

    }else{
      this.getSubSplecialties();

    }
    this.getByFilter(this.filtro);
  }

  //filtro cunado cambia la especialiad
  public FiltrarSubEspecialidadOnEspecialidad(especialidad) {
    this.clinicas = [];
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


  //filtro Score
  public FiltrarScore(score) {
    this.clinicas = [];
    this.filtro.Score = score;
    this.getByFilter(this.filtro);
  }
  //filtro ScoreQuantity
  public FiltrarScoreQuantity(ScoreQuantity) {

    this.clinicas = [];
    this.filtro.ScoreQuantity = ScoreQuantity;
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
    this.filtro = {
      "Cities": [],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": []
    }
    this.getByFilter(this.filtro);
  }

  // ACTIVADOR DE PESTAÑAS DE CADA CLINICA
  public info(idClinica) {
    $("#info" + idClinica).show();
    $("#comen" + idClinica).hide();
    $("#ubi" + idClinica).hide();
    $('.info-slide').addClass('activeFilter');
    $('.com-slide').removeClass('activeFilter');
    $('.ubi-slide').removeClass('activeFilter');
  }
  public comen(idClinica) {
    $("#info" + idClinica).hide();
    $("#comen" + idClinica).show();
    $("#ubi" + idClinica).hide();
    $('.com-slide').addClass('activeFilter');
    $('.info-slide').removeClass('activeFilter');
    $('.ubi-slide').removeClass('activeFilter');

  }
  public ubi(idClinica, latitud, longitud) {
    $("#info" + idClinica).hide();
    $("#comen" + idClinica).hide();
    $("#ubi" + idClinica).show();
    $('.ubi-slide').addClass('activeFilter');
    $('.com-slide').removeClass('activeFilter');
    $('.info-slide').removeClass('activeFilter');
    this._MapService.generateMap(latitud, longitud, idClinica);
  }

  //FILTROS DE CLINICAS
  filterOrderBy(deviceValue) {
    var select = deviceValue.target.value;
    if (select == 1) {
      this.clinicas.sort(function (a, b) {
        return b.score - a.score;
      });
    }
    else {
      this.clinicas.sort(function (a, b) {
        return b.scoreQuantity - a.scoreQuantity;
      });
    }
  }

  //FILTROS DE COMENTARIOS
  filterComentariosOrderBy(deviceValue, clinicId) {
    var select = deviceValue.target.value;
    if (select == 1) {
      this.clinicas.forEach(element => {
        if (element.clinicId == clinicId) {
          element.ratings.sort(function (a, b) {
            return b.score - a.score;
          });
        }
      });
    }
    else {
      this.clinicas.forEach(element => {
        if (element.clinicId == clinicId) {
          element.ratings.sort(function (a, b) {
            return b.score - a.score;
          });
        }
      });
    }
  }
  // BOTON DE RESERVAR
  Reservar(id){
    console.log(id);
    this.identity = this._RegisterLoginService.getToken();

    if(this.identity!=null){
    this._router.navigate(['/reserva/',id]);
    }
    else{
      $('.modal-gral').css('display','block');
      $(".modulo-inicio").css('display','block');
      $('#d-ini').addClass('activeInside');
      $('#d-reg').removeClass('activeInside');
    }
  }
  

  onFechaFilter(){
    this.filtro.AvailableAppointmentDate=this.filtroFecha.fecha;
    console.log(this.filtro);
    this.getByFilter(this.filtro);

  }
  categoria(id){
    this.filtroFecha.categorias=id.value;

  }


}
