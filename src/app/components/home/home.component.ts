import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService} from "../../services/home.service"
import { busqueda } from '../../global/busqueda';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService]
})

export class HomeComponent implements OnInit {
  public busqueda: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _HomeService: HomeService
  ) {
    this.busqueda = busqueda.categoria;

   }

  public buscador;
  ngOnInit() {

    this._route.params.subscribe(params => {
      let id = +params["id"];
      $('select2 option[value=' + id + ']').attr("selected", true);

    });


    this.buscador = {
      "categoria": "2",
      "fecha": "2018/08/27",
      "ubicacion":"asd",

    }
  

    /*	 MODALES LOGIN Y REGISTRO */

    $('a#registrarte-link').click(function (e) {
      e.preventDefault();

    });

    $('a#login-link').click(function (e) {
      e.preventDefault();

    });

    /***
    LOGIN Y REGISTRO
    ***/
    $('#login-link').click(function (e) {
      e.preventDefault();
      $('.modal-gral').css('display', 'block');
      $(".modulo-inicio").css('display', 'block');
      $('#d-ini').addClass('activeInside');
      $('#d-reg').removeClass('activeInside');

      $(".modulo-registro").css('display', 'none');
    });

    $('#registrarte-link').click(function (e) {
      e.preventDefault();
      $('.modal-gral').css('display', 'block');
      $(".modulo-registro").css('display', 'block');
      $('#d-reg').addClass('activeInside');
      $('#d-ini').removeClass('activeInside');

      $(".modulo-inicio").css('display', 'none');
    });

    $('#d-ini').click(function (e) {
      e.preventDefault();
      $(this).addClass('activeInside');
      $('#d-reg').removeClass('activeInside');

      $(".modulo-inicio").css('display', 'block');
      $(".modulo-registro").css('display', 'none');
    });

    $('#d-reg').click(function (e) {
      e.preventDefault();
      $(this).addClass('activeInside');
      $('#d-ini').removeClass('activeInside');

      $(".modulo-registro").css('display', 'block');
      $(".modulo-inicio").css('display', 'none');
    });


    $('#close-modal').click(function (e) {
      e.preventDefault();
      $('.modal-gral').fadeOut();
    });

    $(document).keydown(function (e) {
      // ESCAPE key pressed
      if (e.keyCode == 27) {
        $('.modal-gral').fadeOut();
      }
    });
  }
  onSubmit() {
      this.buscador={"categoria":$(".select2-hidden-accessible").val(),"fecha":this.buscador.fecha,"lugar":$(".select2-hidden-accessible").val()};
      localStorage.setItem('busqueda', JSON.stringify(this.buscador));

      this.busqueda = JSON.parse(localStorage.getItem('busqueda'));
      console.log (this.busqueda);
      // window.location.href = '/buscador';

  }
}
