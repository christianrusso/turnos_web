import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../code/base.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  extends BaseComponent implements OnInit, AfterViewInit{

  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('../assets/js/script.js');
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
