import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { BusquedaService } from '../../services/busqueda.service';
import { MapService } from '../../services/map.service';
declare const google: any;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  providers: [BusquedaService, MapService]
})
export class BuscadorComponent implements OnInit {
  public busqueda;
  public clinicas;
  public filtro;
  public coments;
  public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public dontResult;
  constructor(
    private _BusquedaService: BusquedaService,
    private _MapService: MapService
  ) { }

  ngOnInit() {
    this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
    console.log(this.busqueda);

    this.filtro = {
      "Cities": [this.busqueda.lugar],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": []
    }
    this.dontResult = false;
    this.getByFilter(this.filtro);
  }

  public getByFilter(filtro) {
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
        console.log(this.clinicas);
      },
      error => {
        // Manejar errores
      }
    );
  }

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
      this.clinicas.sort(function(a, b) {
        return b.score - a.score;
      });
    }
    else {
      this.clinicas.sort(function(a, b) {
        return b.scoreQuantity - a.scoreQuantity;
      });
    }
  }

  //FILTROS DE COMENTARIOS
  filterComentariosOrderBy(deviceValue,clinicId) {
    var select = deviceValue.target.value;
    if (select == 1) {
      this.clinicas.forEach(element => {
        if(element.clinicId==clinicId){
          element.ratings.sort(function(a, b) {
            return b.score - a.score;
          });
        }
      });
    }
    else {
      this.clinicas.forEach(element => {
        if(element.clinicId==clinicId){
          element.ratings.sort(function(a, b) {
            return b.score - a.score;
          });
        }
      });
    }
  }

}
