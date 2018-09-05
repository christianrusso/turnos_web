import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { CalendarEvent, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventAction, CalendarMonthViewDay } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ReservaService } from '../../services/reserva.service';
import { Subject } from 'rxjs';
import { BusquedaService } from '../../services/busqueda.service';
import { Router, ActivatedRoute } from "@angular/router";
declare const $: any;
import {Observable} from "rxjs/Rx";

import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
  isThisSecond
} from 'date-fns';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./reserva.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }, ReservaService, BusquedaService
  ],
  encapsulation: ViewEncapsulation.None
})

export class ReservaComponent extends BaseComponent implements OnInit, AfterViewInit {
  public backGround;
  public loading;
  public turnos = true;
  public especialidades;
  public subEspecialidades;
  public especialista;
  public fecha = new Date();
  public endFecha= new Date(this.fecha.getFullYear(), this.fecha.getMonth() + 1, 0);
  public horarios;
  public clinicId;

  public filter = {
    "StartDate":new Date(),
    "EndDate": this.endFecha,
    "ClinicId": "",
    "DoctorId": "",
    "SpecialtyId": "",
    "SubSpecialtyId": ""
  };
  public filterDoctor = {
    "SpecialtyId": null,
    "SubspecialtyId": null,
    "ClinicId": null,
  };
  public filterForDay = {
    "Day": null,
    "DoctorId": null,
    "ClinicId": null
  };

  public paciente={
    "ClinicId":null,
    "Day":null,
    "Time":null,
    "DoctorId":null,
    "FirstName": null,
    "LastName":null,
    "Address":null,
    "PhoneNumber": null,
    "Dni":null,
    "MedicalPlanId":null
    };
  refresh: Subject<any> = new Subject();
  public items:Observable<Array<any>>;

  constructor(
    private _router: Router,

    private _ReservaComponent: ReservaService,
    private _BusquedaService: BusquedaService,
    private _route: ActivatedRoute,


  ) { super(); }
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script7.js');
  }

  view: string = 'month';
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  ngOnInit() {
    console.log(this.fecha);
    this._route.params.subscribe(params => {
      this.clinicId=params["id"];
      this.filter.ClinicId = params["id"];
      this.filterForDay.ClinicId=params["id"];
      this.filterDoctor.ClinicId=params["id"];

    });
    this.loading = true;
    //this.getAppointmentsPerDay(this.filter);
    this.getSplecialties();
    this.getSubSplecialties();

  }

  getAppointmentsPerDay(filtro) {
    this.loading = true;
    this._ReservaComponent.GetAvailableAppontmentsPerDay(filtro).subscribe(
      response => {
        var i;
        this.events = [];
        response.forEach(element => {
          for (i = 0; i < element.availableAppointments; i++) {
             var date=new Date(element.day);
            this.events.push(
              { title: "manuel", start: new Date(date.setDate(date.getDate()+1)) }
            );
          }
        });
        this.refresh.next();
        this.loading = false;
        $("#turnos").css("display", "block");
      },
      error => {
        // Manejar errores
      }
    );
  }


  addEvent(): void {
    this.refresh.next();
  }



  locale: string = 'es';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDays: any = [];

  dayClicked(day: CalendarMonthViewDay): void {
    if (day.events.length > 0) {
      this.selectedDays.forEach(element => {
        element.cssClass = ""
      });
      this.selectedDays = [];
      this.selectedMonthViewDay = day;
      const selectedDateTime = this.selectedMonthViewDay.date.getTime();
      const dateIndex = this.selectedDays.findIndex(
        selectedDay => selectedDay.date.getTime() === selectedDateTime
      );
      if (dateIndex > -1) {
        delete this.selectedMonthViewDay.cssClass;
        this.selectedDays.splice(dateIndex, 1);
      } else {
        this.selectedDays.push(this.selectedMonthViewDay);
        day.cssClass = 'selectedTurno';
        this.selectedMonthViewDay = day;
      }
    }
    this.filterForDay.Day = day.date;
    if(this.filter.DoctorId!=null){
      this.GetAllAvailablesForDay();
    }
    $("#horario").modal("show");

  }

  GetAllAvailablesForDay() {
    this._ReservaComponent.GetAllAvailablesForDay(this.filterForDay).subscribe(
      response => {
       this.horarios=[];
        response.forEach(appointment => {
          this.horarios.push(this.getHour(appointment));
        });
        this.refresh.next();
      },
      error => {
        // Manejar errores
      }
    );
  }
  getHour(date: string): string {
    let time = date.split('T')[1].split(':');
    return time[0] + ':' + time[1];
  }

  public getSplecialties() {
    this._ReservaComponent.getSpeciality(this.clinicId).subscribe(
      response => {
        console.log(response);
        this.especialidades = response;
        this.refresh.next();

      },
      error => {
        // Manejar errores
      }
    );
  }

  //SubEspecialidades
  public getSubSplecialties() {
    this._ReservaComponent.getSubSpeciality(this.filter).subscribe(
      response => {
        this.subEspecialidades = response;
      },
      error => {
        // Manejar errores
      }
    );
  }
  public FiltrarEspecialidad(especialidad) {
    this.filter.SpecialtyId = especialidad.value;
    this.filterDoctor.SpecialtyId = especialidad.value;
    this.filterDoctor.SubspecialtyId = null;
    this.horarios=null;
    this.especialista = null;
    this.filter.SubSpecialtyId=null;
    this.filter.DoctorId=null;
    this.time=null;
    this.FiltrarSubEspecialidadOnEspecialidad(especialidad.value);
  }

  //filtro cunado cambia la especialiad
  public FiltrarSubEspecialidadOnEspecialidad(especialidad) {
    this._BusquedaService.getSubSpecialityOnEspeciality(especialidad).subscribe(
      response => {
        this.subEspecialidades=null;
        this.subEspecialidades = response;
        this.refresh.next();

      },
      error => {
        // Manejar errores
      }
    );


  }

  public FiltrarSubEspecialidad(Subspecialties) {
    this.filter.SubSpecialtyId = Subspecialties.value;
    this.filterDoctor.SubspecialtyId = Subspecialties.value;

    this.horarios=null;
    this.filter.DoctorId=null;
    this.time=null;
    this.getDoctor();

  }

  public FiltrarEspecialista(especialista) {
    console.log(especialista.value);
    this.filter.DoctorId = especialista.value;
    this.filterForDay.DoctorId = especialista.value;

    this.horarios=null;
    this.time=null;
    this.refresh.next();

    if(this.filterForDay.Day !=null){
      this.GetAllAvailablesForDay();
    }



  }
  public getDoctor() {
    this.especialista = null;
    this._ReservaComponent.GetDoctor(this.filterDoctor).subscribe(
      response => {
        this.especialista = response;
        this.refresh.next();

      },
      error => {
        // Manejar errores
      }
    );
  }
  previus(data) {
    if(data.getMonth()==this.fecha.getMonth()){
      this.filter.EndDate = this.endFecha;
      this.filter.StartDate = this.fecha;
      this.getAppointmentsPerDay(this.filter);

    }else if(data.getMonth()>this.fecha.getMonth()){
      this.filter.EndDate = data;
      this.filter.StartDate = new Date(data.getFullYear(), data.getMonth() , 1);
      this.getAppointmentsPerDay(this.filter);

    }

  }
  next(data) {
    if((data.getMonth()+1)==this.fecha.getMonth()+1){
      this.filter.EndDate = this.endFecha;
      this.filter.StartDate = this.fecha;
      this.getAppointmentsPerDay(this.filter);

    }else if((data.getMonth()+1)>this.fecha.getMonth()+1){
      this.filter.EndDate = data;
      this.filter.StartDate = new Date(data.getFullYear(), data.getMonth() , 1);
      this.getAppointmentsPerDay(this.filter);
    }
  }
  public time;
  public FiltrarHoraSelect(hora){
    this.time=hora.value;
  }

  Paso2(){
    if( this.filter.SpecialtyId != null && this.filter.SubSpecialtyId != null  ){
      this.getAppointmentsPerDay(this.filter);
      $(".filters-turnos").css("display", "none");
      $(".calendario-confirmacion").css("display", "none");
      $('.calendario').css("display", "block");
      $('#b1').removeClass('activeReserva');
      $('#b3').removeClass('activeReserva');
      $('#b2').addClass('activeReserva');

    }else{
      console.log("No entro");
    }
  }
  Paso3(){
    if( this.filter.SpecialtyId != null && this.filter.SubSpecialtyId != null  ){
      this.getAppointmentsPerDay(this.filter);
      $(".calendario").css("display", "none");
      $('.calendario-confirmacion').css("display", "block");
      $('#b1').removeClass('activeReserva');
      $('#b2').removeClass('activeReserva');
      $('#b3').addClass('activeReserva');

    }else{
      console.log("No entro");
    }
  }

  CheckPaciente(){
    this._ReservaComponent.checkPaciente(this.clinicId).subscribe(
      response => {
        this.paciente.ClinicId=this.clinicId;
        this.paciente.DoctorId=this.filter.DoctorId;
        this.paciente.Day= this.filterForDay.Day;
        this.paciente.Time=this.time;

        if(response==false){
          this.getMedicalInsurance();
          $("#myModal").modal("show");

        }else{
          this._ReservaComponent.RequestAppointmentByPatient(this.paciente).subscribe(
            response => {

            },
            error => {
              // Manejar errores
            }
          );
          this._router.navigate(['/exito']);

        }

      },
      error => {
        // Manejar errores
      }
    );
  }
  public obrasSociales=[];
  //ObrasSociales
  public getMedicalInsurance() {
    this._ReservaComponent.getMedicalInsurance(this.clinicId).subscribe(
      response => {
        this.obrasSociales = response;
      },
      error => {
        // Manejar errores
      }
    );
  }
  onSubmit(){
    $("#myModal").modal("hide");
    this._ReservaComponent.RequestAppointmentByClient(this.paciente).subscribe(
      response => {

      },
      error => {
        // Manejar errores
      }
    );
    this._router.navigate(['/exito']);

  }
}
