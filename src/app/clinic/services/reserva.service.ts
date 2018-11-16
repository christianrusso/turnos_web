import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { global } from "../../global/global";
import { token } from "../../global/token";
import { Observable } from "rxjs";

import "rxjs/add/operator/map";
@Injectable()
export class ReservaService {
  public url: string;
  public token: string;
  private headers = new Headers({ "Content-Type": "application/json" });

  constructor(private _http: Http) {
    this.url = global.url;
    this.token = token.token;
  }

  GetAvailableAppontmentsPerDay(date) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Appointment/GetAvailableAppointmentsPerDay", date, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  GetDoctor(date) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Doctor/GetByFilter", date, {
        headers: this.headers
      })
      .map(res => res.json());
  }
  getToken() {
    let token = localStorage.getItem("tokenTurnos");
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }

    return JSON.parse(this.token);
  }

  GetAllAvailablesForDay(data) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Appointment/GetAllAvailablesForDay", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }
  //Specialty
  getSpeciality(id) {
    return this._http
      .post(
        this.url + "Api/Specialty/GetAllByClinic",
        { Id: id },
        { headers: this.headers }
      )
      .map(res => res.json());
  }
  //SubSpecialty
  getSubSpeciality(data) {
    return this._http
      .post(this.url + "api/Data/GetSubspecialtiesForSelect", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  getSubSpecialityOnEspeciality(id) {
    return this._http
      .post(
        this.url + "api/SubSpecialty/GetAllOfSpecialtyNoUserID",
        { id: id },
        { headers: this.headers }
      )
      .map(res => res.json());
  }

  //CheckPaciente
  checkPaciente(id) {
    return this._http
      .post(
        this.url + "api/Clinic/IsPatientOfClinic",
        { Id: id },
        { headers: this.headers }
      )
      .map(res => res.json());
  }

  //ObrasSociales
  getMedicalInsurance(id) {
    return this._http
      .post(
        this.url + "api/MedicalInsurance/GetAllByClinic",
        { Id: id },
        { headers: this.headers }
      )
      .map(res => res.json());
  }
  RequestAppointmentByClient(data) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Appointment/RequestAppointmentByClient", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }
  RequestAppointmentByPatient(data) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "api/Appointment/RequestAppointmentByPatient", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }

  GetByFilterClinic(data) {
    this.headers.set("Authorization", "Bearer " + this.getToken().token);
    return this._http
      .post(this.url + "Api/Clinic/GetByFilter", data, {
        headers: this.headers
      })
      .map(res => res.json());
  }


  //GetMedicalPlans
  GetMedicalPlans(idMedicalInsurance, idClinic) {
    return this._http
      .post(
        this.url + "api/MedicalPlan/GetAll",
        { Id: idMedicalInsurance, "UserId": idClinic },
        { headers: this.headers }
      )
      .map(res => res.json());
  }


}
