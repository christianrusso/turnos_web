import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { BusquedaService } from '../../services/busqueda.service';
declare const google: any;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
  providers: [BusquedaService]
})
export class BuscadorComponent implements OnInit {
  public busqueda;
  public response;
  public filtro;
  public loader;
  public coments;
  public score=[1,2,3,4,5,6,7,8,9,10];
  constructor(private _BusquedaService: BusquedaService) { ; }

  ngOnInit() {
    this.filtro = {
      "Cities": [],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": []
    }

    this.getAll(this.filtro);
  
    this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
    console.log (this.busqueda);
  }
  public getAll(filtro) {
    this.loader = true;

   
    this._BusquedaService.getAll(filtro).subscribe(
      response => {
        this.response = response;
        this.loader = false;
        console.log(response);
      },
      error => {
        // this.errorMessage = <any>error;
        // if (this.errorMessage != null) {
        // }
      }
    );
  }

  public FiltrarEspecialidad(especialidad, deviceValue) {
    if (deviceValue.target.checked) {
      this.filtro.Specialties.push(especialidad);

    }
    else {
      for (let index = 0; index < this.filtro.Specialties.length; index++) {
        if (especialidad == this.filtro.Specialties[index]) {
          this.filtro.Specialties.splice(index, 1);
        }
      }
    }
    this.getAll(this.filtro);
  }
  public SubEspecialidad(Subspecialties, deviceValue) {
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
    this.getAll(this.filtro);
  }
  public BorrarFiltros() {
    this.filtro = {
      "Cities": [],
      "Specialties": [],
      "Subspecialties": [],
      "MedicalInsurances": []
    }
    this.getAll(this.filtro);

  }


  //colpase 
  public info(e){
      $("#info"+e).show();
      $("#comen"+e).hide();
      $("#ubi"+e).hide();
  }
  public comen(e){
    $("#info"+e).hide();
    $("#comen"+e).show();
    $("#ubi"+e).hide();
  }
  public ubi(e, latitud, longitud){
    $("#info"+e).hide();
    $("#comen"+e).hide();
    $("#ubi"+e).show();


      // console.log(json.results[0].geometry);
      const myLatlng = new google.maps.LatLng(latitud,longitud);
      const mapOptions = {
        zoom: 14,
        center: myLatlng,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          { 'featureType': 'water', 'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }] },
          {
            'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{ 'hue': '#ff0000' },
            { 'saturation': -100 }, { 'lightness': 99 }]
          },
          {
            'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#808080' },
            { 'lightness': 54 }]
          },
          { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ece2d9' }] },
          { 'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ccdca1' }] },
          { 'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#767676' }] },
          { 'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#ffffff' }] },
          { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] },
          {
            'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' },
            { 'color': '#b8cb93' }]
          },
          { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] },
          { 'featureType': 'poi.sports_complex', 'stylers': [{ 'visibility': 'on' }] },
          { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] },
          { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'simplified' }] }
        ]
      };
      $("#regularMap").removeAttr('hidden');

      const map = new google.maps.Map(document.getElementById('regularMap'+e), mapOptions);
      const Marker = new google.maps.Marker({
        position: myLatlng,
        title: 'Aqui estas!'
      });
      // To add the marker to the map, call setMap();
      Marker.setMap(map);
  }

  onChange(deviceValue) {
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
}
