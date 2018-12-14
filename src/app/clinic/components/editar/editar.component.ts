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
  public isEditingPersonales = false;
  public nombre;
  public apellido;
  public dni;
  public emailPersonales;
  public address;
  public phone;

  constructor(
      private _route: ActivatedRoute,
      private editarService: EditarService
  ) { }
  ngOnInit() {
      this._route.params.subscribe(params => {
          this.userId = params["id"];
          this.email = localStorage.getItem("email");
      });
  }

  changeStep(step, element) {
      this.step = step;
      this.removeAllSelected();
      this.addAllUnselected();
      if (this.step == 2) {
          this.getPersonalesData();
      }

      (document.querySelector('#' + element) as HTMLElement).classList.add('selectedOption');
  }

  removeAllSelected() {
      (document.querySelector('#firstStep') as HTMLElement).classList.remove('selectedOption');
      (document.querySelector('#secondStep') as HTMLElement).classList.remove('selectedOption');
      (document.querySelector('#thirdStep') as HTMLElement).classList.remove('selectedOption');
      (document.querySelector('#fourthStep') as HTMLElement).classList.remove('selectedOption');
      (document.querySelector('#fifthStep') as HTMLElement).classList.remove('selectedOption');
  }
  addAllUnselected() {
      (document.querySelector('#firstStep') as HTMLElement).classList.add('unselectedOption');
      (document.querySelector('#secondStep') as HTMLElement).classList.add('unselectedOption');
      (document.querySelector('#thirdStep') as HTMLElement).classList.add('unselectedOption');
      (document.querySelector('#fourthStep') as HTMLElement).classList.add('unselectedOption');
      (document.querySelector('#fifthStep') as HTMLElement).classList.add('unselectedOption');
  }

  getPersonalesData() {
      this.editarService.getPersonalesData().subscribe(
          response => {
              this.nombre          = response.firstName;
              this.apellido        = response.lastName;
              this.dni             = response.dni;
              this.address         = response.address;
              this.phone           = response.phoneNumber;
              this.emailPersonales = this.email;
          },
          error => {
              // Manejar errores
          }
      );
  }

  savePersonales() {
      this.editarService.savePersonalesData(this.nombre, this.apellido, this.address, this.phone, this.dni, this.emailPersonales).subscribe(
          response => {
          },
          error => {
              // Manejar errores
          }
      );
      this.editStatePersonales();
  }

  editState() {
      if (!this.isEditing) {
          this.isEditing = true;
      } else if (this.isEditing) {
          this.isEditing = false;
      }
  }

  editStatePersonales() {
     if (!this.isEditingPersonales) {
      this.isEditingPersonales = true;
     } else if (this.isEditingPersonales) {
         this.isEditingPersonales = false;
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
