import { Component, OnInit, AfterViewInit } from "@angular/core";
import { BaseComponent } from "../../core/base.component";

@Component({
  selector: "app-ayuda",
  templateUrl: "./ayuda.component.html",
  styleUrls: ["./ayuda.component.css"]
})
export class AyudaComponent extends BaseComponent
  implements OnInit, AfterViewInit {
  constructor() {
    super();
  }
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/script5.js");
  }
  
  ngOnInit() {}
}
