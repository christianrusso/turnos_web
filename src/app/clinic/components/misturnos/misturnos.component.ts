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
  @ViewChild("modalContent") modalContent: TemplateRef<any>;
  @ViewChild("modalCanel") modalCanel: TemplateRef<any>;
  @ViewChild("modalConfrim") modalConfrim: TemplateRef<any>;

  refresh: Subject<any> = new Subject();

  public confirmTurn={Id:null,Score:"",Comment:""};
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
    StartDate: new Date(this.date.getFullYear(), this.date.getMonth(), 1),
    EndDate: this.endFecha
  };
  ngOnInit() {
    this.getTurns();
  }
  public misturns = [];
  public getTurns() {
    this.events=[];

    this._MiTurno.GetWeekForClient(this.filter).subscribe(
      response => {
        response.forEach(element => {
          if (element.appointments.length > 0) {
            element.appointments.forEach(appoint => {
              console.log(appoint);
              this.misturns.push(appoint);
              var date = new Date(appoint.dateTime);
              if(appoint.state==1){
                this.events.push({
                  title: appoint.specialty,
                  start: new Date(date.setDate(date.getDate())),
                  actions: this.actions,
                  id:appoint.id
                });
              }else if (appoint.state==3){
                this.events.push({
                  title: appoint.specialty,
                  start: new Date(date.setDate(date.getDate())),
                  actions: this.actionsCancel,
                  id:appoint.id
                });
              }else{
                this.events.push({
                  title: appoint.specialty,
                  start: new Date(date.setDate(date.getDate())),
                  actions: this.actionsConfirm,
                  id:appoint.id
                });
              }
              
              this.refresh.next();
            });
          }
        });
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
        this.handleEventConfirm("Edited", event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEventCanel("Deleted", event);
      }
    }
  ];
  actionsCancel: CalendarEventAction[] = [ 
    {
      label: '<i class="text-danger">Cancelado</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
 
      }
    }
  ];
  actionsConfirm: CalendarEventAction[] = [ 
    {
      label: '<i class="text-success">Confirmado</i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
 
      }
    }
  ];
  activeDayIsOpen: boolean = false;

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
    this.completeData=false;

  }
  events: CalendarEvent[] = [];
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
  public turn;
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.misturns.forEach(element => {
      if(element.id==event.id){
        this.turn=element;
      }
    });
    this.modal.open(this.modalContent, { size: "lg" });
  }
  handleEventCanel(action: string, event: CalendarEvent): void {
    this.confirmTurn.Id=event.id;
    this.modalData = { event, action };
    this.modal.open(this.modalCanel, { size: "lg" });

  }
  handleEventConfirm(action: string, event: CalendarEvent): void {
    this.confirmTurn.Id=event.id;
    this.modalData = { event, action };
    this.modal.open(this.modalConfrim, { size: "lg" });
  }

  addEvent(): void {
    this.events.push({
      title: "New event",
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: false,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  public completeData=false;
  onConfirm(){
    if(this.confirmTurn.Comment!='' && this.confirmTurn.Score){
      this._MiTurno.confirmTurn(this.confirmTurn).subscribe(
        response => {
          this.confirmTurn={Id:null,Score:"",Comment:""};
        },
        error => {
          // Manejar errores
        }
      );
      document.getElementById("confirmCancelButton").click(); // Click on the checkbox
      this.completeData=false;

      this.getTurns();


    }else{
      this.completeData=true;
    }
  
  }
  onCancel(){
    if(this.confirmTurn.Comment!=''){
      this._MiTurno.cancelTurn(this.confirmTurn).subscribe(
        response => {
          this.confirmTurn={Id:null,Score:"",Comment:""};
        },
        error => {
          // Manejar errores
        }
      );
      document.getElementById("cancelCancelButton").click(); // Click on the checkbox
      this.completeData=false;
      this.getTurns();


    }else{
      this.completeData=true;
    }
  }

  previus(data) {
      this.filter.EndDate = new Date(data.getFullYear(),data.getMonth() + 1,0);
      this.filter.StartDate = new Date(data.getFullYear(), data.getMonth(), 1);
      this.getTurns();
    
  }
  next(data) {
      this.filter.EndDate = new Date(data.getFullYear(),data.getMonth() + 1,0);
      this.filter.StartDate = new Date(data.getFullYear(), data.getMonth(), 1);
      this.getTurns();
    
  }
}
