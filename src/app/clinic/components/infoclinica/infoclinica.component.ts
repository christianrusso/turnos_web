import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { BusquedaService } from "../../services/busqueda.service";
import { RegisterLoginService } from "../../services/register-login.service";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { InfoService } from "../../services/info.service";
import { VerMapService } from "../../services/ver-mapa.service";
import { SlickModule } from 'ngx-slick';


@Component({
  selector: "app-infoclinica",
  templateUrl: "./infoclinica.component.html",
  styleUrls: ["./infoclinica.component.css"],
  providers: [InfoService, BusquedaService, VerMapService]
})
export class InfoClinicaComponent
  implements OnInit {

  clinicId;
  clinicData;
  public identity;
  public score = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  showMap = false;
  showShare = false;
  locations = [];
  insertStart = [];
  slides = [];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};

  constructor(
      private _route: ActivatedRoute,
      private _infoComponent: InfoService,
      private _RegisterLoginService: RegisterLoginService,
      private _BusquedaService: BusquedaService,
      private _router: Router,
      private _VerMapService: VerMapService
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
    this.locations = [];
    this.insertStart = [];
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

          this.score.forEach(star => {
              if (this.clinicData.score - star >= star) {
                  this.insertStart.push('<i class="fa fa-star"></i>');
              }
          });

          for (var i = 0; i < this.clinicData.images.length; i++) {
              var img = {
                  img: this.clinicData.images[i]
              }
              this.slides.push(img);
          }

          this.locations.push([
              '<div class="col-xs-12 col-md-12 infow"><div class="row"><div class="col-xs-12 col-md-5"><img src=' +
              this.clinicData.logo +
              '></div><div class="col-xs-12 col-md-7"><h3>' +
              this.clinicData.name +
              '</h3><p class="location"><i class="fa fa-map-marker"></i>' +
              this.clinicData.address +
              '</p><div class="punt">' +
              this.clinicData.score +
              '</div><div class="stars">' +
              this.insertStart +
              "</div></div></div></div>",
              this.clinicData.latitude,
              this.clinicData.longitude
          ]);
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

    closeMapa() {
        this.showMap = false;
    }

    closeShare() {
        this.showShare = false;
    }

    showShareWindow() {
      this.showShare = true;
    }

    showCompleteMap() {
      this.showMap = true;
      setTimeout (() => {
          this._VerMapService.generateMap(this.locations, null);
      }, 500);
    }
}
