import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService} from "../../services/home.service"
import { busqueda } from '../../global/busqueda';
import { BaseComponent } from '../../core/base.component';
import { RegisterLoginService } from '../../services/register-login.service';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[HomeService,RegisterLoginService]
})

export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit{
 
  public buscador;
  public register;
  public login;
  public user;
  public token = localStorage.getItem('tokenTurnos');
  public busqueda: string;
	public identity;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _HomeService: HomeService,
    private _RegisterLoginService: RegisterLoginService,

  ){
    super();
    this.busqueda = busqueda.categoria;
  }

   async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script2.js');
  }


  ngOnInit() {
    $('header').hide();

    this._route.params.subscribe(params => {
      let id = +params["id"];
      $('select2 option[value=' + id + ']').attr("selected", true);
    });
    this.identity = this._RegisterLoginService.getToken();
    console.log(this.identity);
    this.buscador = {
      "categoria": "",
      "fecha": "",
      "ubicacion":"",
    }
    this.register={
      "email":"",
      "password":"",
      "passwordSecond":""

    }
    this.login={
      "email":"",
      "password":""
    }
  }

  onSubmit() {
    this._router.navigate(['/buscador']);

  }

  onRegister(){
    console.log(this.register);
    if(this.register.password==this.register.passwordSecond){

      this._RegisterLoginService.onRegister(this.register).subscribe(
        response => {
          console.log(response);

        },
        error => {
          // Manejar errores
        }
      );
      $(".modulo-inicio").css('display','block');
      $(".modulo-registro").css('display','none');
      $('#d-ini').addClass('activeInside');
      $('#d-reg').removeClass('activeInside');
    }
    else{

    }

  }
  onLogin(){
    this._RegisterLoginService.onLogin(this.login).subscribe(
      response => {
        localStorage.setItem('tokenTurnos', JSON.stringify(response));
        this.identity = this._RegisterLoginService.getToken();
        this.user=response.logo;
        $('.modal-gral').fadeOut();

      },
      error => {
        // Manejar errores
      }
    );
  }

  lugar(lugar){
    this.buscador.lugar=lugar.data[0].text;
    localStorage.setItem('busqueda', JSON.stringify(this.buscador));

  }
  categoria(categoria){
    this.buscador.categoria=categoria.data[0].text;
    localStorage.setItem('busqueda', JSON.stringify(this.buscador));

  }


}
