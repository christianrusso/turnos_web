import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { EditarService } from "../../services/editar.service";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [EditarService]

})
export class EditarComponent implements OnInit {

  public userId;
  public step = 1;
  public email;
  public isEditing = false;
  public actualPassword;
  public newPassword;

  constructor(
      private _route: ActivatedRoute,
      private editarService: EditarService
  ) { }
    public favoritos;
  ngOnInit() {
      this._route.params.subscribe(params => {
          this.userId = params["id"];
          this.email = localStorage.getItem("email");
      });
  }

  changeStep(step, element) {
      //
  }

  editState() {
      if (!this.isEditing) {
          this.isEditing = true;
      } else if (this.isEditing) {
          this.isEditing = false;
      }
  }

  saveAccount() {
      this.editarService.saveAccountData(this.email, this.actualPassword, this.newPassword).subscribe(
          response => {
          },
          error => {
              // Manejar errores
          }
      );
      this.editState();
  }


}
