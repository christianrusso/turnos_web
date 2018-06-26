import { Component, OnInit,AfterViewInit } from '@angular/core';
import {  Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from '../../code/base.component';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  extends BaseComponent implements AfterViewInit
{

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,

  )
  {super();}	

  ngOnInit() {
    this._route.params.subscribe(params => {
			let id = +params["id"];
 
			
		});
  }
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/select2.min.js');
  }
}
