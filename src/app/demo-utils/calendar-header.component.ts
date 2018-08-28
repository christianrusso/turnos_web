import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mwl-demo-utils-calendar-header',
  template: `

  <div class="row text-center ">
  <div class="col-md-4 ">

  </div>
  <div class=" col-md-4 ">
      <p class="tamanioTexto " (click)="clickea()" >  <i  mwlCalendarPreviousView [view]="view" [(viewDate)]="viewDate" (viewDateChange)="viewDateChange.next(viewDate)"  class="fa fa-caret-left colorFlecha pointer "></i>      {{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}      <i mwlCalendarNextView [view]="view"[(viewDate)]="viewDate" (viewDateChange)="viewDateChange.next(viewDate)" class=" pointer colorFlecha fa fa-caret-right"></i></p> 
     
  </div>
</div>
  `
})
export class CalendarHeaderComponent {
  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'es';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}







// <div class="row text-center">
// <div class="col-md-4">
//   <div class="btn-group">
//     <div
//       class="btn btn-primary"
//       mwlCalendarPreviousView
//       [view]="view"
//       [(viewDate)]="viewDate"
//       (viewDateChange)="viewDateChange.next(viewDate)">
//       Anterior
//     </div>
//     <div
//       class="btn btn-outline-secondary"
//       mwlCalendarToday
//       [(viewDate)]="viewDate"
//       (viewDateChange)="viewDateChange.next(viewDate)">
//       Hoy
//     </div>
//     <div
//       class="btn btn-primary"
//       mwlCalendarNextView
//       [view]="view"
//       [(viewDate)]="viewDate"
//       (viewDateChange)="viewDateChange.next(viewDate)">
//       Siguiente
//     </div>
//   </div>
// </div>
// <div class="col-md-4">
//   <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
// </div>
// <div class="col-md-4">
//   <div class="btn-group">
//     <div
//       class="btn btn-primary"
//       (click)="viewChange.emit('month')"
//       [class.active]="view === 'month'">
//       Mes
//     </div>
//     <div
//       class="btn btn-primary"
//       (click)="viewChange.emit('week')"
//       [class.active]="view === 'week'">
//       Semana
//     </div>
//     <div
//       class="btn btn-primary"
//       (click)="viewChange.emit('day')"
//       [class.active]="view === 'day'">
//       Día
//     </div>
//   </div>
// </div>
// </div>
// <br>