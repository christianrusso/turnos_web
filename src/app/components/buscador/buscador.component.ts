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
  public response;
  public filtro;
  public loader;
  public coments;
  public score = [1,2,3,4,5,6,7,8,9,10];

  constructor(
    private _BusquedaService: BusquedaService, 
    private _MapService: MapService
  ) {}

  ngOnInit() {
    this.filtro = {
      "Cities": [],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": []
    }
    this.getByFilter(this.filtro);
    this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
    console.log (this.busqueda);
  }

  public getByFilter(filtro) {
    this.loader = true;
    this._BusquedaService.getByFilter(filtro).subscribe(
      response => {
        this.response = response;
        this.loader = false;
        console.log(response);
      },
      error => {
        // Manejar errores
      }
    );
  }

  public FiltrarEspecialidad(especialidad, deviceValue) {
    if (deviceValue.target.checked) {
      this.filtro.Specialties.push(especialidad);
    }else {
      for (let index = 0; index < this.filtro.Specialties.length; index++) {
        if (especialidad == this.filtro.Specialties[index]) {
          this.filtro.Specialties.splice(index, 1);
        }
      }
    }
    this.getByFilter(this.filtro);
  }

  public FiltrarSubEspecialidad(Subspecialties, deviceValue) {
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

  public info(idClinica){
      $("#info"+idClinica).show();
      $("#comen"+idClinica).hide();
      $("#ubi"+idClinica).hide();
  }
  public comen(idClinica){
    $("#info"+idClinica).hide();
    $("#comen"+idClinica).show();
    $("#ubi"+idClinica).hide();
  }
  public ubi(idClinica, latitud, longitud){
    $("#info"+idClinica).hide();
    $("#comen"+idClinica).hide();
    $("#ubi"+idClinica).show();

    this._MapService.generateMap(latitud, longitud, idClinica);
  }

  filterOrderBy(deviceValue) {
    var select=deviceValue.target.value;
    var extra=0;
    var newArray=[];
    this.response.sort();
    if (select=="calificación"){
      this.response.forEach(element => {
        if(element.score<= extra ){
          newArray.push(element);
          extra=element.score;
        }else{
          newArray.push(element);
        }
      });
    }
    else{
      this.response.forEach(element => {
        if(element.scoreQuantity<= extra ){
          newArray.push(element);
          extra=element.scoreQuantity;
        }else{
          newArray.push(element);
        }
      });
    }
    this.response=[];
   this.response=newArray;
  }

  calculateStar(rating){
    return 2;
  }
}
