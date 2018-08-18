import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { CalendarEvent, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventAction, CalendarMonthViewDay } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ReservaService } from '../../services/reserva.service';
import { Subject } from 'rxjs';

import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
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
    }, ReservaService
  ],
  encapsulation: ViewEncapsulation.None
})

export class ReservaComponent extends BaseComponent implements OnInit, AfterViewInit {
  public backGround;
  public loading;
  public turnos = true;
  refresh: Subject<any> = new Subject();


  constructor(private _ReservaComponent: ReservaService,
  ) { super(); }
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script7.js');
  }

  view: string = 'month';
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  ngOnInit() {
    this.loading = true;
    this._ReservaComponent.GetAvailableAppontmentsPerDay({ "StartDate": new Date(), "EndDate": "2018-08-31T21:10:58.509Z" }).subscribe(
      response => {
        var i;
        console.log(this.events);
        response.forEach(element => {
          for (i = 0; i < element.availableAppointments; i++) {
            this.events.push(
              { title: "manuel", start: new Date(element.day) }

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
    if(day.events.length>0){
      this.selectedDays.forEach(element => {
        element.cssClass = ""
      });
      console.log(day);
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
    }
    

}
