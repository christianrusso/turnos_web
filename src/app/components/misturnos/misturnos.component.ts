import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,ViewEncapsulation, OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,CalendarDateFormatter
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-misturnos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './misturnos.component.html',
  styleUrls: ['./misturnos.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }, 
  ],
  encapsulation: ViewEncapsulation.None
})
export class MisturnosComponent implements OnInit {
  constructor(private modal: NgbModal,    private location: Location,    private _route: ActivatedRoute,

  ) {}
  ngOnInit() {


  }
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  Volver() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  view: string = 'month';

  viewDate: Date = new Date();
  locale: string = 'es';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-check"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
    public date= new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(this.date.setDate(this.date.getDate()+1)),
      title: 'Turno con doctor manuel',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: new Date(this.date.setDate(this.date.getDate()+1)),
      title: 'Turno con yamil',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: new Date(this.date.setDate(this.date.getDate()+1)),
      title: 'Turno con pedro ',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Turnos con alguien',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}
