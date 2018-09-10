import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { Clinica } from '../../models/clinica.class';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClinicaService } from '../../services/clinica.service';
import { RegisterLoginService } from '../../services/register-login.service';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

declare const google: any;

@Component({
  selector: 'app-cargaclinica',
  templateUrl: './cargaclinica.component.html',
  styleUrls: ['./cargaclinica.component.css'],
  providers: [ClinicaService, RegisterLoginService, FormBuilder]

})
export class CargaclinicaComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('search') public searchElement: ElementRef;

  constructor(  
    private _ClinicaService: ClinicaService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.createForm();
  }
  form: FormGroup;
  public clinica=new Clinica();
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });

  }
  ngOnInit() {
    this.getCities();
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if (place.address_components === undefined) {
              console.log(place);
            }
            else {
              if (place.address_components.length >= 4) {
               this.clinica.Latitude =place.geometry.location.lat();
               this.clinica.Longitude=place.geometry.location.lng();
               this.clinica.Address = place.address_components[1].long_name + " " + place.address_components[0].long_name + " " + place.address_components[2].long_name + " " + place.address_components[4].long_name + " " + place.address_components[5].long_name;
              }
            }
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
  }
   //Citys
   public cities;
   public getCities() {
    this._ClinicaService.getCities().subscribe(
      response => {
        this.cities = response;
        console.log(response);
      },
      error => {
        // Manejar errores
      }
    );
  }

  onPost() {
    const formModel = this.form.value;
    this.clinica.Logo = formModel.avatar.value;
    console.log(this.clinica);
    this._ClinicaService.PostRegisterClinic(this.clinica).subscribe(
      response => {
        console.log(response);

      },
      error => {
        // Manejar errores
      }
    );
  }
  // convertir imagen noticia en base64
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename:file.name,
          filetype:file.type,
          value: "data:image/png;base64,"+  reader.result.split(',')[1]
        })
      };
    }
  }
  lugar(event) {
    this.clinica.City = event.value;

    }
}
