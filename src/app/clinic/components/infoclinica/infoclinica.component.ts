import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { BusquedaService } from "../../services/busqueda.service";
import { global } from "../../../global/global";
import { MapService } from "../../services/map.service";
import { RegisterLoginService } from "../../services/register-login.service";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { InfoService } from "../../services/info.service";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BaseComponent } from "../../core/base.component";
import { VerMapService } from "../../services/ver-mapa.service";


@Component({
  selector: "app-infoclinica",
  templateUrl: "./infoclinica.component.html",
  styleUrls: ["./infoclinica.component.css"],
  providers: [InfoService, BusquedaService]
})
export class InfoClinicaComponent
  implements OnInit {

  clinicId;
  clinicData;
  public identity;
  public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  galleryOptions = [
      {
        width: '100%'
      },
      {
        breakpoint: 768,
        fullWidth: true
      }
  ];
  galleryImages = [
      {
        small: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
        medium: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
        big: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg'
      },
      {
        small: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
        medium: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
        big: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg'
      },
      {
          small: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
          medium: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
          big: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg'
      },
      {
          small: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
          medium: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg',
          big: 'https://clinica-web.com.ar/wp-content/uploads/2016/01/clinica-santa-isabel.jpg'
      }
  ];

  constructor(
      private _route: ActivatedRoute,
      private _infoComponent: InfoService,
      private _RegisterLoginService: RegisterLoginService,
      private _BusquedaService: BusquedaService,
      private _router: Router
  ) {
  }
  
  ngOnDestroy() {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.clinicId = params["id"];
      this.GetByFilterClinic();
    });
    this.identity = this._RegisterLoginService.getToken();
  }

  public GetByFilterClinic() {
    const data = {
      ClinicId: this.clinicId,
      Cities: [],
      Specialties: [],
      Subspecialties: [],
      MedicalPlans: [],
      MedicalInsurances: [],
      Stars: []
    };
    this._infoComponent.GetByFilterClinic(data).subscribe(
        response => {
          this.clinicData = response[0];
          console.log(this.clinicData);
        },
        error => {
          // Manejar errores
        }
    );
  }

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

    noFavorito(id) {
        this.identity = this._RegisterLoginService.getToken();

        if (this.identity != null) {
            this.clinicData.isFavorite = false;
            this._BusquedaService.removeFavorito(id).subscribe(
                response => {
                    console.log(response);
                },
                error => {
                    // Manejar errores
                }
            );
        } else {
            $(".modal-gral").css("display", "block");
            $(".modulo-inicio").css("display", "block");
            $("#d-ini").addClass("activeInside");
            $("#d-reg").removeClass("activeInside");
        }
    }

    Favorito(id) {
        this.identity = this._RegisterLoginService.getToken();

        if (this.identity != null) {
            this.clinicData.isFavorite = true;
            this._BusquedaService.addFavorito(id).subscribe(
                response => {
                    console.log(response);
                },
                error => {
                    // Manejar errores
                }
            );
        } else {
            $(".modal-gral").css("display", "block");
            $(".modulo-inicio").css("display", "block");
            $("#d-ini").addClass("activeInside");
            $("#d-reg").removeClass("activeInside");
        }
    }
}
