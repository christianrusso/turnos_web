import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Select2OptionData } from 'ng2-select2';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,

  ) { }

  public buscador;
  ngOnInit() {
  
    this._route.params.subscribe(params => {
      let id = +params["id"];
      $('select2 option[value='+id+']').attr("selected",true);

    });


    this.buscador={
      "value":"2",
      "fecha":"2018/08/27"
    }
  }
  onSubmit() {

    
  }
}
