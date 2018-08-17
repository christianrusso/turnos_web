import { Component,ChangeDetectionStrategy,OnInit, AfterViewInit,ViewEncapsulation} from '@angular/core';
import { BaseComponent } from '../../core/base.component';
import { CalendarEvent,CalendarDateFormatter,DAYS_OF_WEEK,CalendarEventAction,CalendarMonthViewDay } from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./reserva.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
  encapsulation: ViewEncapsulation.None
})

export class ReservaComponent extends BaseComponent implements OnInit, AfterViewInit {
  public backGround;
  constructor() { super(); }
  async ngAfterViewInit(): Promise<void> {
    await this.loadScript('/assets/js/script7.js');
  }
  ngOnInit() {

  }
  view: string = 'month';
  viewDate: Date = new Date();

  events: CalendarEvent[] = [{
    title: 'title',
    start: new Date(),
    color: {primary: '#d1fbfa', secondary: '#d1fbfa'},
  },{
    title: 'title',
    start: new Date(),
    color: {primary: '#d1fbfa', secondary: '#d1fbfa'},
  },{
    title: 'title',
    start: new Date("2018-08-08"),
    color: {primary: '#d1fbfa', secondary: '#d1fbfa'},
  }];

  
  locale: string = 'es';
  
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  selectedMonthViewDay: CalendarMonthViewDay;
  selectedDays: any = [];

  dayClicked(day: CalendarMonthViewDay): void {
   
    this.selectedDays.forEach(element => {
      element.cssClass=""
    });
    this.selectedDays=[];
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
