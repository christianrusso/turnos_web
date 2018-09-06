import { Component, OnInit ,ChangeDetectionStrategy,ViewEncapsulation} from '@angular/core';
import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { colors } from '../../demo-utils/colors';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from '../reserva/custom-date-formatter.provider';
@Component({
  selector: 'app-misturnos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // hack to get the styles to apply locally
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },

  ],
})
export class MisturnosComponent  {

  constructor() { }


  view: string = 'month';
  refresh: Subject<any> = new Subject();

  viewDate: Date = new Date();
  locale: string = 'es';

  events: CalendarEvent[] = [
    {
      title: 'Turno con el doctor Manuel ',
      color: colors.yellow,
      start: new Date(),
      cssClass: 'my-custom-class',
      draggable: false

    }
  ];
  addEvent(): void {
    this.refresh.next();
  }

}
