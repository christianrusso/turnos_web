import { Component, OnInit,AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../core/base.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor() { super();}
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script7.js');
  }
  ngOnInit() {
  }

}
