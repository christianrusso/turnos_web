import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
  OnInit
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap/modal/modal.module";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from "angular-calendar";
import { CustomDateFormatter } from "./custom-date-formatter.provider";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { MiturnoService } from "../../services/miturno.service";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3"
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF"
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA"
  }
};

@Component({
  selector: "app-misturnos",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./misturnos.component.html",
  styleUrls: ["./misturnos.component.css"],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    MiturnoService
  ],
  encapsulation: ViewEncapsulation.None
})
export class MisturnosComponent implements OnInit {
  @ViewChild("modalContent")
  modalContent: TemplateRef<any>;
  refresh: Subject<any> = new Subject();

  constructor(
    private modal: NgbModal,
    private location: Location,
    private _route: ActivatedRoute,
    private _MiTurno: MiturnoService
  ) {}
  public date = new Date();
  public fecha = new Date();
  public endFecha = new Date(
    this.fecha.getFullYear(),
    this.fecha.getMonth() + 1,
    0
  );
  public filter = {
    StartDate: new Date(),
    EndDate: this.endFecha
  };
  ngOnInit() {
    this.getTurns();
  }
  public misturns = [];
  public getTurns() {
    this._MiTurno.GetWeekForClient(this.filter).subscribe(
      response => {
        response.forEach(element => {
          if (element.appointments.length > 0) {
            element.appointments.forEach(appoint => {
              var date = new Date(appoint.dateTime);

              this.events.push({
                title: appoint.specialty,
                start: new Date(date.setDate(date.getDate() + 1)),
                actions: this.actions
              });
              this.refresh.next();
            });
          }
        });

        console.log(this.events);
      },
      error => {
        // Manejar errores
      }
    );
  }

  Volver() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  view: string = "month";

  viewDate: Date = new Date();
  locale: string = "es";

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-check"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Edited", event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent("Deleted", event);
      }
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
  events: CalendarEvent[] = [
    // {
    //   start: new Date(this.date.setDate(this.date.getDate() + 1)),
    //   title: 'Turno con doctor manuel',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: new Date(this.date.setDate(this.date.getDate() + 1)),
    //   title: 'Turno con yamil',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: new Date(this.date.setDate(this.date.getDate() + 1)),
    //   title: 'Turno con pedro ',
    //   color: colors.blue
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'Turnos con alguien',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent("Dropped or resized", event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent(): void {
    this.events.push({
      title: "New event",
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