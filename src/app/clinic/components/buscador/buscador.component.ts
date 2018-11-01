import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { BusquedaService } from "../../services/busqueda.service";
import { global } from "../../../global/global";
import { MapService } from "../../services/map.service";
import { RegisterLoginService } from "../../services/register-login.service";
import { Router, NavigationEnd } from "@angular/router";
import { BaseComponent } from "../../core/base.component";


@Component({
  selector: "app-buscador",
  templateUrl: "./buscador.component.html",
  styleUrls: ["./buscador.component.css"],
  providers: [BusquedaService, MapService, RegisterLoginService]
})
export class BuscadorComponent extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public busqueda = null;
  public clinicas = [];
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
  public limitForEspecialidad = 115;
  public limitForSubEspecialidad = 115;
  public limitForObraSocial = 115;
  public limitForUbicacion = 115;
  public idRubro= 1;
  public currentDate= new Date();
  public availableStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() , this.currentDate.getDate());
  public availableEnd= new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() , this.currentDate.getDate()+15);
  public from = 0;
  public showLoading = true;
  constructor(
    private _BusquedaService: BusquedaService,
    private _MapService: MapService,
    private _RegisterLoginService: RegisterLoginService,
    private _router: Router,
  ) {
    super();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script3.js");
  }
  
  ngOnDestroy() {}

  ngOnInit() {
    $("header").show();
    this.busqueda = JSON.parse(localStorage.getItem("busqueda"));
    this.identity = this._RegisterLoginService.getToken();
    if(this.busqueda.ubicacion!=""){
      this.filtro = {
        AvailableAppointmentStartDate:this.availableStart,
        AvailableAppointmentEndDate:this.availableEnd,
        Cities: [this.busqueda.ubicacion],
        Specialties: [],
        Subspecialties: [],
        MedicalInsurances: [],
        medicalPlans: [],
        Score: "",
        ScoreQuantity: "",
        AvailableAppointmentDate: "",
        SortField: "score",
        AscendingOrder: false
      };
    }else{
      this.filtro = {
        AvailableAppointmentStartDate:this.availableStart,
        AvailableAppointmentEndDate:this.availableEnd,
        Cities: [],
        Specialties: [],
        Subspecialties: [],
        MedicalInsurances: [],
        medicalPlans: [],
        Score: "",
        ScoreQuantity: "",
        AvailableAppointmentDate: "",
        SortField: "score",
        AscendingOrder: false
      };
    }    
    this.filtroFecha = {
      categorias: this.busqueda.ubicacion,
      fecha: ""
    };
    this.dontResult = false;
    this.getByFilter(this.filtro, false);
    this.getSplecialties();
    this.getSubSplecialties();
    this.getMedicalInsurance();
    this.getCities();
  }

  //Specialidades
  public getSplecialties() {
    this._BusquedaService.getSpeciality(this.idRubro).subscribe(
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
    this._BusquedaService.getSubSpeciality(this.idRubro).subscribe(
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
  public getByFilter(filtro, page) {
    filtro.From = 0;
    if (page != 'undefined' && page == true) {
      filtro.to = this.from;
    } else {
      this.clinicas = null;
      this.from = 0;
      filtro.to = global.quantityOfResultsToShow;
    }

    if (this.clinicas) {
      var actualClinics = this.clinicas.length;
    } else {
      var actualClinics = 0;
    }
    this.showLoading = true;
    $("#loading-bar-spinner").removeAttr("hidden");
    $("#loading-bar-spinner").show();
    this._BusquedaService.getByFilter(filtro).subscribe(
      response => {
        this.showLoading = false;
        if (response.length != 0) {
          this.dontResult = false;
          this.clinicas = response;
          if (this.from == 0) {
            this.from = this.from + response.length + global.quantityOfResultsToShow;
          } else {
            this.from = this.from + (response.length - actualClinics);
          }
          if ((response.length - actualClinics) == global.quantityOfResultsToShow) {
            (document.querySelector('#verMasButton') as HTMLElement).style.display = 'block';
          } else {
            (document.querySelector('#verMasButton') as HTMLElement).style.display = 'none';
          }
        } else {
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
    if (this.filtro.Specialties.length > 0) {
      this.FiltrarSubEspecialidadOnEspecialidad(especialidad);
    } else {
      this.getSubSplecialties();
    }
    this.getByFilter(this.filtro, false);
  }

  //filtro cunado cambia la especialiad
  public FiltrarSubEspecialidadOnEspecialidad(especialidad) {
    this.clinicas = [];
    this._BusquedaService.getSubSpecialityOnEspeciality(especialidad,this.idRubro).subscribe(
      response => {
        this.subEspecialidades = response;
      },
      error => {
        // Manejar errores
      }
    );

    this.getByFilter(this.filtro, false);
  }
  public FiltrarSubEspecialidad(Subspecialties, deviceValue) {
    this.clinicas = [];
    if (deviceValue.target.checked) {
      this.filtro.Subspecialties.push(Subspecialties);
    } else {
      for (let index = 0; index < this.filtro.Subspecialties.length; index++) {
        if (Subspecialties == this.filtro.Subspecialties[index]) {
          this.filtro.Subspecialties.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro, false);
  }
  public FiltrarObrasSocial(obraSocial, deviceValue) {
    this.clinicas = [];
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
    this.getByFilter(this.filtro, false);
  }

  //filtro city
  public FiltrarCities(Cities, deviceValue) {
    this.clinicas = [];
    if (deviceValue.target.checked) {
      this.filtro.Cities.push(Cities);
    } else {
      for (let index = 0; index < this.filtro.Cities.length; index++) {
        if (Cities == this.filtro.Cities[index]) {
          this.filtro.Cities.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro, false);
  }

  //filtro Score
  public FiltrarScore(score) {
    this.clinicas = [];
    this.filtro.Score = score;
    this.getByFilter(this.filtro, false);
  }
  //filtro ScoreQuantity
  public FiltrarScoreQuantity(ScoreQuantity) {
    this.clinicas = [];
    this.filtro.ScoreQuantity = ScoreQuantity;
    this.getByFilter(this.filtro, false);
  }

  //filtro pro distancia
  public geolocation;
FiltrarDistancia(deviceValue) {
  this.distancia = parseInt(deviceValue.target.value);
  if (navigator.geolocation) {
 
    navigator.geolocation.watchPosition(position => {
      this.showPosition(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

  showPosition(position) {
    if(this.busqueda.ubicacion!=""){
      this.filtro = {
        Location: {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
          RadiusInMeters: this.distancia * 1000
        },
        Cities: [this.busqueda.ubicacion],
        Specialties: this.filtro.Specialties,
        Subspecialties: this.filtro.Subspecialties,
        MedicalInsurances: this.filtro.MedicalInsurances,
        MedicalPlans: []
      };
    }else{
      this.filtro = {
        Location: {
          Latitude: position.coords.latitude,
          Longitude: position.coords.longitude,
          RadiusInMeters: this.distancia * 1000
        },
        Cities: [],
        Specialties: this.filtro.Specialties,
        Subspecialties: this.filtro.Subspecialties,
        MedicalInsurances: this.filtro.MedicalInsurances,
        MedicalPlans: []
      };
    }   
     this.getByFilter(this.filtro, false);
  }
  //fin filtro por distancia.

  //Borrar los filtros
  public BorrarFiltros() {
 
    this.filtro = {
      Cities: [],
      Specialties: [],
      Subspecialties: [],
      MedicalInsurances: [],
      medicalPlans: [],
      Score: "",
      ScoreQuantity: "",
      AvailableAppointmentDate: ""
    };
    
    $("input[type=checkbox]").prop("checked", false);
    $(".range-slider").val(0);
    $(".range-slider__range").val(0);
    $(".range-slider__value").text(0);
    this.getByFilter(this.filtro, false);
  }

  // ACTIVADOR DE PESTAÑAS DE CADA CLINICA
  public info(idClinica) {
    $("#info" + idClinica).show();
    $("#comen" + idClinica).hide();
    $("#ubi" + idClinica).hide();
    $(".info-slide").addClass("activeFilter");
    $(".com-slide").removeClass("activeFilter");
    $(".ubi-slide").removeClass("activeFilter");
  }
  public comen(idClinica) {
    $("#info" + idClinica).hide();
    $("#comen" + idClinica).show();
    $("#ubi" + idClinica).hide();
    $(".com-slide").addClass("activeFilter");
    $(".info-slide").removeClass("activeFilter");
    $(".ubi-slide").removeClass("activeFilter");
  }
  public ubi(idClinica, latitud, longitud) {
    $("#info" + idClinica).hide();
    $("#comen" + idClinica).hide();
    $("#ubi" + idClinica).show();
    $(".ubi-slide").addClass("activeFilter");
    $(".com-slide").removeClass("activeFilter");
    $(".info-slide").removeClass("activeFilter");
    this._MapService.generateMap(latitud, longitud, idClinica);
  }

  //FILTROS DE CLINICAS
  filterOrderBy(deviceValue) {
    var select = deviceValue.target.value;
    if (select == 1) {
      this.clinicas.sort(function(a, b) {
        return b.score - a.score;
      });
    } else {
      this.clinicas.sort(function(a, b) {
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
          element.ratings.sort(function(a, b) {
            return b.score - a.score;
          });
        }
      });
    } else {
      this.clinicas.forEach(element => {
        if (element.clinicId == clinicId) {
          element.ratings.sort(function(a, b) {
            return b.score - a.score;
          });
        }
      });
    }
  }
  // BOTON DE RESERVAR
  Reservar(id) {
    this.identity = this._RegisterLoginService.getToken();

    if (this.identity != null) {
      this._router.navigate(["/reserva/", id]);
      //window.location.href = "/reserva/"+id+"";
    } else {
      $(".modal-gral").css("display", "block");
      $(".modulo-inicio").css("display", "block");
      $("#d-ini").addClass("activeInside");
      $("#d-reg").removeClass("activeInside");
    }
  }

  onFechaFilter() {
    this.filtro.AvailableAppointmentDate = this.filtroFecha.fecha;
    this.getByFilter(this.filtro, false);
  }
  categoria(id) {
    this.filtroFecha.categorias = id.value;
  }

  VerMapa() {
    this._router.navigate(["/ver-mapa"]);
  }

  getDayName(day): string {
    switch (day) {
      case 0:
        return "Domingo";
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miercoles";
      case 5:
        return "Jueves";
      case 6:
        return "Viernes";
      case 7:
        return "Sabado";
      default:
        return "Dia desconocido";
    }
  }
  getHour(date) {
    let time = date.split(":");

    return time[0] + ":" + time[1];
  }

  // ver mas

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
  verMasObraSocial(status) {
    if (status == true) {
      this.limitForObraSocial = 100;
    } else {
      this.limitForObraSocial = 5;
    }
  }
  verMasUbicacion(status) {
    if (status == true) {
      this.limitForUbicacion = 100;
    } else {
      this.limitForUbicacion = 5;
    }
  }
   public favorite=[]
  favorito(index,id){
   
    if(this.favorite.includes(index)){
      this.favorite.splice(index, 1);
      $("#icon"+id).removeClass("fa fa-heart corazon").addClass("fa fa-heart-o corazon");
      this._BusquedaService.removeFavorito(id).subscribe(
        response => {
         console.log(response);
        },
        error => {
          // Manejar errores
        }
      );

    }else{
      this.favorite.push(index);
      $("#icon"+id).removeClass("fa fa-heart-o corazon").addClass("fa fa-heart corazon");
      this._BusquedaService.addFavorito(id).subscribe(
        response => {
         console.log(response);
        },
        error => {
          // Manejar errores
        }
      );

    }

  }
  BuscarFilterTop(){
    this.filtro.AvailableAppointmentEndDate =new Date(this.filtro.AvailableAppointmentStartDate);
    this.filtro.AvailableAppointmentStartDate= new Date(this.filtro.AvailableAppointmentStartDate);
    this.getByFilter(this.filtro, false);
  }

  orderResults(sort, order, element) {
    (document.querySelector('#bestScore') as HTMLElement).style.color = 'black';
    (document.querySelector('#bestScore') as HTMLElement).style.borderBottom = '1px black solid';
    (document.querySelector('#lessScore') as HTMLElement).style.color = 'black';
    (document.querySelector('#lessScore') as HTMLElement).style.borderBottom = '1px black solid';
    (document.querySelector('#bestComments') as HTMLElement).style.color = 'black';
    (document.querySelector('#bestComments') as HTMLElement).style.borderBottom = '1px black solid';
    (document.querySelector('#lessComments') as HTMLElement).style.color = 'black';
    (document.querySelector('#lessComments') as HTMLElement).style.borderBottom = '1px black solid';

    (document.querySelector('#' + element) as HTMLElement).style.color = '#00b1f2';
    (document.querySelector('#' + element) as HTMLElement).style.borderBottom = '2px #00b1f2 solid';
    this.filtro.SortField = sort;
    this.filtro.AscendingOrder = order;
    this.getByFilter(this.filtro, false);
  }
}
